import { useState, useEffect } from "react";

const GOAL_WEIGHT = 160;
const START_WEIGHT = 210;
const DEADLINE = "2025-08-23";
const CALORIES_MIN = 1700;
const CALORIES_MAX = 1800;
const PROTEIN_MIN = 120;
const STEPS_MIN = 8000;
const STORAGE_KEY = "fat-loss-log-v1";
const BREAKFAST = { calories: 310, protein: 43, mealName: "Matcha Latte Protein (1 scoop) + High Protein Milk 2% (1.06 cups)" };

function getDaysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}
function getDeadlineDays() {
  return getDaysBetween(new Date().toISOString().slice(0, 10), DEADLINE);
}
function calcScore(row) {
  let s = 0;
  if (row.calories && parseInt(row.calories) >= CALORIES_MIN && parseInt(row.calories) <= CALORIES_MAX) s++;
  if (row.protein && parseInt(row.protein) >= PROTEIN_MIN) s++;
  if (row.steps && parseInt(row.steps) >= STEPS_MIN) s++;
  if (row.training && row.training.trim() !== "") s++;
  return s;
}
function getProjectedWeight(logs) {
  const weighIns = logs.filter(l => l.weight && parseFloat(l.weight) > 0);
  if (weighIns.length < 2) return null;
  const first = weighIns[0];
  const last = weighIns[weighIns.length - 1];
  const days = getDaysBetween(first.date, last.date);
  if (days === 0) return null;
  const rate = (parseFloat(first.weight) - parseFloat(last.weight)) / days;
  const daysLeft = getDaysBetween(last.date, DEADLINE);
  return (parseFloat(last.weight) - rate * daysLeft).toFixed(1);
}
function getWeekKey(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDay();
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - day);
  return sunday.toISOString().slice(0, 10);
}
function getWeekLogs(logs, weekStartStr) {
  return logs.filter(l => getWeekKey(l.date) === weekStartStr);
}
function getCurrentWeekStart() {
  return getWeekKey(new Date().toISOString().slice(0, 10));
}
function getPreviousWeekStart() {
  const d = new Date(getCurrentWeekStart());
  d.setDate(d.getDate() - 7);
  return d.toISOString().slice(0, 10);
}
function isSunday() {
  return new Date().getDay() === 0;
}
function buildWeekStats(weekLogs) {
  const withCals = weekLogs.filter(l => l.calories && parseInt(l.calories) > 0);
  const withPro = weekLogs.filter(l => l.protein && parseInt(l.protein) > 0);
  const withSteps = weekLogs.filter(l => l.steps && parseInt(l.steps) > 0);
  const trained = weekLogs.filter(l => l.training && l.training.trim() !== "");
  const weighIns = weekLogs.filter(l => l.weight && parseFloat(l.weight) > 0);
  const calHits = weekLogs.filter(l => l.calories && parseInt(l.calories) >= CALORIES_MIN && parseInt(l.calories) <= CALORIES_MAX);
  const proHits = weekLogs.filter(l => l.protein && parseInt(l.protein) >= PROTEIN_MIN);
  const stepHits = weekLogs.filter(l => l.steps && parseInt(l.steps) >= STEPS_MIN);
  const avgCals = withCals.length ? Math.round(withCals.reduce((s, l) => s + parseInt(l.calories), 0) / withCals.length) : null;
  const avgPro = withPro.length ? Math.round(withPro.reduce((s, l) => s + parseInt(l.protein), 0) / withPro.length) : null;
  const avgSteps = withSteps.length ? Math.round(withSteps.reduce((s, l) => s + parseInt(l.steps), 0) / withSteps.length) : null;
  const startW = weighIns.length ? parseFloat(weighIns[0].weight) : null;
  const endW = weighIns.length ? parseFloat(weighIns[weighIns.length - 1].weight) : null;
  const weekLoss = startW && endW ? (startW - endW).toFixed(1) : null;
  const totalScore = weekLogs.reduce((s, l) => s + (l.score || 0), 0);
  const maxPossible = weekLogs.length * 4;
  const compliance = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;
  return {
    avgCals, avgPro, avgSteps, startW, endW, weekLoss,
    compliance, totalScore, maxPossible,
    calHitRate: weekLogs.length ? Math.round((calHits.length / weekLogs.length) * 100) : 0,
    proHitRate: weekLogs.length ? Math.round((proHits.length / weekLogs.length) * 100) : 0,
    stepHitRate: weekLogs.length ? Math.round((stepHits.length / weekLogs.length) * 100) : 0,
    trainingDays: trained.length,
    daysLogged: weekLogs.length,
    weighIns,
  };
}

function generateReportHTML(weekStart, weekLogs, allLogs) {
  const stats = buildWeekStats(weekLogs);
  const projected = getProjectedWeight(allLogs);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const weekLabel = `${weekStart} – ${weekEnd.toISOString().slice(0, 10)}`;
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Weekly Report · ${weekLabel}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bebas+Neue&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080b0f; color: #c8cdd6; font-family: 'DM Mono', monospace; font-size: 12px; padding: 40px; }
  h1 { font-family: 'Bebas Neue', sans-serif; font-size: 48px; color: #00e5a0; letter-spacing: 6px; }
  h2 { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: #00e5a0; letter-spacing: 3px; margin: 32px 0 12px; border-bottom: 1px solid #1a2030; padding-bottom: 8px; }
  .sub { color: #3a4560; font-size: 11px; letter-spacing: 1px; margin-top: 4px; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 8px; }
  .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 8px; }
  .card { background: #0d1220; border: 1px solid #1a2030; border-radius: 6px; padding: 18px; }
  .big { font-family: 'Bebas Neue', sans-serif; font-size: 42px; line-height: 1; }
  .label { color: #3a4560; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; }
  .green { color: #00e5a0; } .red { color: #ff4d6d; } .yellow { color: #ffd166; } .cyan { color: #00e5a0; }
  .bar-bg { height: 3px; background: #1a2030; border-radius: 2px; margin-top: 10px; }
  .bar-fill { height: 3px; border-radius: 2px; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 8px; }
  th { color: #3a4560; font-weight: 400; letter-spacing: 1px; text-transform: uppercase; padding: 8px 10px; text-align: left; border-bottom: 1px solid #1a2030; }
  td { padding: 8px 10px; border-bottom: 1px solid #0d1220; }
  tr:nth-child(even) { background: #0a0f1a; }
  .footer { margin-top: 40px; color: #2a3040; font-size: 10px; letter-spacing: 1px; border-top: 1px solid #1a2030; padding-top: 16px; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style>
</head>
<body>
<h1>WEEKLY REPORT</h1>
<div class="sub">${weekLabel} · 210 → 160 lb · Aug 23 Wedding</div>
<h2>WEIGHT</h2>
<div class="grid">
  <div class="card"><div class="label">Week Start</div><div class="big cyan">${stats.startW || '—'}</div><div class="sub">lb</div></div>
  <div class="card"><div class="label">Week End</div><div class="big cyan">${stats.endW || '—'}</div><div class="sub">lb</div></div>
  <div class="card"><div class="label">Week Loss</div><div class="big ${stats.weekLoss && parseFloat(stats.weekLoss) > 0 ? 'green' : 'red'}">${stats.weekLoss ? (parseFloat(stats.weekLoss) > 0 ? '-' : '+') + Math.abs(stats.weekLoss) : '—'}</div><div class="sub">lb this week</div></div>
</div>
<div class="grid2">
  <div class="card"><div class="label">Projected Aug 23</div><div class="big ${projected && parseFloat(projected) <= GOAL_WEIGHT ? 'green' : projected && parseFloat(projected) <= GOAL_WEIGHT + 5 ? 'yellow' : 'red'}">${projected || '—'}</div><div class="sub">${projected ? (parseFloat(projected) <= GOAL_WEIGHT ? '✓ on track for 160' : `${(parseFloat(projected) - GOAL_WEIGHT).toFixed(1)} lb above goal`) : 'need more weigh-ins'}</div></div>
  <div class="card"><div class="label">Total Lost Since Start</div><div class="big green">${stats.endW ? (START_WEIGHT - stats.endW).toFixed(1) : '—'}</div><div class="sub">lb from ${START_WEIGHT} lb</div></div>
</div>
<h2>NUTRITION</h2>
<div class="grid">
  <div class="card"><div class="label">Avg Calories</div><div class="big ${stats.avgCals && stats.avgCals >= CALORIES_MIN && stats.avgCals <= CALORIES_MAX ? 'green' : stats.avgCals ? 'red' : 'cyan'}">${stats.avgCals || '—'}</div><div class="sub">target 1700–1800</div><div class="bar-bg"><div class="bar-fill" style="width:${stats.avgCals ? Math.min(100, Math.round(stats.avgCals / CALORIES_MAX * 100)) : 0}%; background:${stats.avgCals && stats.avgCals >= CALORIES_MIN && stats.avgCals <= CALORIES_MAX ? '#00e5a0' : '#ff4d6d'}"></div></div></div>
  <div class="card"><div class="label">Avg Protein</div><div class="big ${stats.avgPro && stats.avgPro >= PROTEIN_MIN ? 'green' : stats.avgPro ? 'yellow' : 'cyan'}">${stats.avgPro ? stats.avgPro + 'g' : '—'}</div><div class="sub">target ≥120g</div><div class="bar-bg"><div class="bar-fill" style="width:${stats.avgPro ? Math.min(100, Math.round(stats.avgPro / PROTEIN_MIN * 100)) : 0}%; background:${stats.avgPro && stats.avgPro >= PROTEIN_MIN ? '#00e5a0' : '#ffd166'}"></div></div></div>
  <div class="card"><div class="label">Avg Steps</div><div class="big ${stats.avgSteps && stats.avgSteps >= STEPS_MIN ? 'green' : stats.avgSteps ? 'red' : 'cyan'}">${stats.avgSteps ? stats.avgSteps.toLocaleString() : '—'}</div><div class="sub">target ≥8,000</div><div class="bar-bg"><div class="bar-fill" style="width:${stats.avgSteps ? Math.min(100, Math.round(stats.avgSteps / STEPS_MIN * 100)) : 0}%; background:${stats.avgSteps && stats.avgSteps >= STEPS_MIN ? '#00e5a0' : '#ff4d6d'}"></div></div></div>
</div>
<h2>TRAINING</h2>
<div class="grid2">
  <div class="card"><div class="label">Training Days</div><div class="big ${stats.trainingDays >= 5 ? 'green' : stats.trainingDays >= 3 ? 'yellow' : 'red'}">${stats.trainingDays}<span style="font-size:20px;color:#2a3040"> / 5</span></div><div class="sub">target: Tue–Sat</div></div>
  <div class="card"><div class="label">Overall Compliance</div><div class="big ${stats.compliance >= 80 ? 'green' : stats.compliance >= 60 ? 'yellow' : 'red'}">${stats.compliance}%</div><div class="sub">${stats.totalScore}/${stats.maxPossible} pts across ${stats.daysLogged} days</div></div>
</div>
<h2>DAY-BY-DAY</h2>
<table>
  <thead><tr><th>Date</th><th>Weight</th><th>Calories</th><th>Protein</th><th>Steps</th><th>Training</th><th>Score</th></tr></thead>
  <tbody>
    ${weekLogs.map(row => {
      const calHit = row.calories && parseInt(row.calories) >= CALORIES_MIN && parseInt(row.calories) <= CALORIES_MAX;
      const proHit = row.protein && parseInt(row.protein) >= PROTEIN_MIN;
      const stepHit = row.steps && parseInt(row.steps) >= STEPS_MIN;
      return `<tr>
        <td style="color:#6a7590">${row.date.slice(5)}</td>
        <td style="color:#00e5a0">${row.weight || '—'}</td>
        <td style="color:${calHit ? '#00e5a0' : row.calories ? '#ff4d6d' : '#2a3040'}">${row.calories || '—'}</td>
        <td style="color:${proHit ? '#00e5a0' : row.protein ? '#ff4d6d' : '#2a3040'}">${row.protein ? row.protein + 'g' : '—'}</td>
        <td style="color:${stepHit ? '#00e5a0' : row.steps ? '#ff4d6d' : '#2a3040'}">${row.steps ? parseInt(row.steps).toLocaleString() : '—'}</td>
        <td style="color:${row.training ? '#00e5a0' : '#2a3040'}">${row.training || '—'}</td>
        <td style="color:${row.score === 4 ? '#00e5a0' : row.score >= 3 ? '#ffd166' : '#ff4d6d'};font-family:'Bebas Neue',sans-serif;font-size:18px">${row.score ?? '—'}/4</td>
      </tr>`;
    }).join('')}
  </tbody>
</table>
<div class="footer">LOCKED IN · Generated ${new Date().toLocaleDateString()} · Goal: 210 → 160 lb by Aug 23, 2025</div>
</body>
</html>`;
}

async function parseMealScreenshot(base64Image, mealType) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Image } },
        { type: "text", text: `This is a nutrition tracking app screenshot for a ${mealType} meal. Extract the following and respond ONLY with valid JSON, no markdown, no explanation:\n{\n  "mealName": "brief description of what was eaten",\n  "calories": number or null,\n  "protein": number or null,\n  "notes": "any relevant notes about the meal"\n}\nIf calories or protein are not visible, return null for those fields. Estimate if needed based on food items shown.` }
      ]}]
    })
  });
  const data = await response.json();
  const text = data.content.map(i => i.text || "").join("");
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

async function parseScaleScreenshot(base64Image) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Image } },
        { type: "text", text: `This is a RENPHO smart scale app screenshot. Extract the following metrics and respond ONLY with valid JSON, no markdown, no explanation:\n{\n  "weight": number or null,\n  "bodyFat": number or null,\n  "muscleMass": number or null,\n  "visceralFat": number or null\n}\nweight should be in lbs. bodyFat is a percentage (e.g. 28.5). muscleMass in lbs. visceralFat is a rating number. Return null for any field not visible.` }
      ]}]
    })
  });
  const data = await response.json();
  const text = data.content.map(i => i.text || "").join("");
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

const TABS = ["Summary", "Nutrition", "Training", "Adherence", "Weekly Report", "Weight Tracker", "Progress Photos"];
const TRAINING_KEY = "fat-loss-training-v1";
const PROGRESS_KEY = "fat-loss-progress-v1";
const PROGRESS_INTERVAL_DAYS = 14;
const ANGLES = ["front", "side", "side_flexed", "back", "video"];

function getDaysSinceLastProgress(entries) {
  if (!entries || entries.length === 0) return null;
  const last = entries[entries.length - 1];
  return getDaysBetween(last.date, new Date().toISOString().slice(0, 10));
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#080b0f",
  surface: "#0d1220",
  surfaceHigh: "#111827",
  border: "#1a2030",
  borderLight: "#222d40",
  accent: "#00e5a0",
  accentDim: "#00e5a022",
  accentMid: "#00e5a044",
  red: "#ff4d6d",
  yellow: "#ffd166",
  purple: "#a78bfa",
  text: "#c8cdd6",
  textMid: "#6a7590",
  textDim: "#3a4560",
  textFaint: "#1e2a3a",
};

const scoreColor = (score, max = 4) => {
  const pct = score / max;
  if (pct >= 1) return C.accent;
  if (pct >= 0.75) return C.yellow;
  return C.red;
};

// ─── Reusable UI primitives ────────────────────────────────────────────────────
function Card({ children, style, accent }) {
  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${accent ? C.accentMid : C.border}`,
      borderRadius: 8,
      padding: "20px 22px",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children, style }) {
  return (
    <div style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: C.textDim,
      ...style,
    }}>
      {children}
    </div>
  );
}

function BigNum({ children, color = C.accent, size = 48, style }) {
  return (
    <div style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: size,
      lineHeight: 1,
      color,
      ...style,
    }}>
      {children}
    </div>
  );
}

function MiniLabel({ children, style }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.textDim, ...style }}>
      {children}
    </div>
  );
}

function Bar({ pct, color = C.accent, height = 3 }) {
  return (
    <div style={{ height, background: C.border, borderRadius: height, overflow: "hidden", marginTop: 8 }}>
      <div style={{ height: "100%", width: `${Math.min(100, pct)}%`, background: color, borderRadius: height, transition: "width 0.6s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

function StatusDot({ hit }) {
  return <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: hit ? C.accent : C.red, marginRight: 6 }} />;
}

function Badge({ children, color = C.accent, bg }) {
  return (
    <span style={{
      background: bg || color + "18",
      border: `1px solid ${color}44`,
      color,
      fontSize: 9,
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 600,
      letterSpacing: "0.12em",
      padding: "2px 8px",
      borderRadius: 3,
      textTransform: "uppercase",
    }}>
      {children}
    </span>
  );
}

function FieldInput({ label, children, style }) {
  return (
    <div style={style}>
      <MiniLabel style={{ marginBottom: 6 }}>{label}</MiniLabel>
      {children}
    </div>
  );
}

function UploadZone({ icon, label, onFile, accept = "image/*", style }) {
  return (
    <label style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      border: `1px dashed ${C.border}`,
      borderRadius: 8, padding: "28px 16px",
      cursor: "pointer", color: C.textDim, fontSize: 11, gap: 8,
      transition: "border-color 0.2s",
      ...style,
    }}
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.preventDefault(); onFile(e.dataTransfer.files[0]); }}
    >
      <span style={{ fontSize: 26, opacity: 0.5 }}>{icon}</span>
      <span style={{ letterSpacing: "0.05em" }}>{label}</span>
      <input type="file" accept={accept} style={{ display: "none" }} onChange={e => onFile(e.target.files[0])} />
    </label>
  );
}

export default function App() {
  const [tab, setTab] = useState("Summary");
  const [logs, setLogs] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  });
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    weight: "", bodyFat: "", muscleMass: "", visceralFat: "",
    calories: "", protein: "", steps: "", training: "",
    lunch: "", dinner: "", anchor: "", notes: ""
  });
  const [saved, setSaved] = useState(false);
  const [mealUploads, setMealUploads] = useState({ lunch: null, dinner: null, anchor: null });
  const [mealParsing, setMealParsing] = useState({ lunch: false, dinner: false, anchor: false });
  const [mealResults, setMealResults] = useState({ lunch: null, dinner: null, anchor: null });
  const [mealError, setMealError] = useState({ lunch: null, dinner: null, anchor: null });
  const [reportWeek, setReportWeek] = useState(getPreviousWeekStart());
  const [scaleUpload, setScaleUpload] = useState(null);
  const [scaleParsing, setScaleParsing] = useState(false);
  const [scaleResult, setScaleResult] = useState(null);
  const [scaleError, setScaleError] = useState(null);
  const [progressEntries, setProgressEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || []; } catch { return []; }
  });
  const [progressForm, setProgressForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    front: null, side: null, side_flexed: null, back: null, video: null, notes: ""
  });
  const [progressSaved, setProgressSaved] = useState(false);
  const [compareIdx, setCompareIdx] = useState(null);
  const [workouts, setWorkouts] = useState(() => {
    try { return JSON.parse(localStorage.getItem(TRAINING_KEY)) || []; } catch { return []; }
  });
  const [workoutForm, setWorkoutForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    name: "",
    exercises: [{ id: Date.now(), name: "", sets: [{ reps: "", weight: "" }] }]
  });
  const [workoutSaved, setWorkoutSaved] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  async function handleScaleUpload(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result.split(",")[1];
      setScaleUpload(e.target.result);
      setScaleParsing(true); setScaleError(null); setScaleResult(null);
      try {
        const result = await parseScaleScreenshot(base64);
        setScaleResult(result);
        if (result.weight) setForm(f => ({ ...f, weight: String(result.weight), bodyFat: result.bodyFat ? String(result.bodyFat) : f.bodyFat, muscleMass: result.muscleMass ? String(result.muscleMass) : f.muscleMass, visceralFat: result.visceralFat ? String(result.visceralFat) : f.visceralFat }));
      } catch { setScaleError("Could not read scale screenshot. Try again."); }
      finally { setScaleParsing(false); }
    };
    reader.readAsDataURL(file);
  }

  async function handleMealUpload(file, mealType) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result.split(",")[1];
      setMealUploads(m => ({ ...m, [mealType]: e.target.result }));
      setMealParsing(m => ({ ...m, [mealType]: true }));
      setMealError(m => ({ ...m, [mealType]: null }));
      setMealResults(m => ({ ...m, [mealType]: null }));
      try {
        const result = await parseMealScreenshot(base64, mealType);
        setMealResults(m => ({ ...m, [mealType]: result }));
        setForm(f => ({ ...f, [mealType]: result.mealName || "" }));
      } catch { setMealError(m => ({ ...m, [mealType]: "Could not parse screenshot. Try again." })); }
      finally { setMealParsing(m => ({ ...m, [mealType]: false })); }
    };
    reader.readAsDataURL(file);
  }

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(logs)); }, [logs]);
  useEffect(() => { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressEntries)); }, [progressEntries]);
  useEffect(() => { localStorage.setItem(TRAINING_KEY, JSON.stringify(workouts)); }, [workouts]);

  function saveWorkout() {
    const filled = workoutForm.exercises.filter(e => e.name.trim());
    if (!filled.length) return;
    const entry = { ...workoutForm, exercises: filled, id: workoutForm.id || Date.now() };
    const idx = workouts.findIndex(w => w.id === entry.id);
    const updated = idx >= 0 ? workouts.map((w, i) => i === idx ? entry : w) : [...workouts, entry].sort((a, b) => a.date.localeCompare(b.date));
    setWorkouts(updated);
    setWorkoutSaved(true);
    setTimeout(() => setWorkoutSaved(false), 2000);
    setWorkoutForm({ date: new Date().toISOString().slice(0, 10), name: "", exercises: [{ id: Date.now(), name: "", sets: [{ reps: "", weight: "" }] }] });
  }

  function addExercise() { setWorkoutForm(f => ({ ...f, exercises: [...f.exercises, { id: Date.now(), name: "", sets: [{ reps: "", weight: "" }] }] })); }
  function removeExercise(id) { setWorkoutForm(f => ({ ...f, exercises: f.exercises.filter(e => e.id !== id) })); }
  function updateExerciseName(id, name) { setWorkoutForm(f => ({ ...f, exercises: f.exercises.map(e => e.id === id ? { ...e, name } : e) })); }
  function addSet(exId) { setWorkoutForm(f => ({ ...f, exercises: f.exercises.map(e => e.id === exId ? { ...e, sets: [...e.sets, { reps: "", weight: "" }] } : e) })); }
  function removeSet(exId, setIdx) { setWorkoutForm(f => ({ ...f, exercises: f.exercises.map(e => e.id === exId ? { ...e, sets: e.sets.filter((_, i) => i !== setIdx) } : e) })); }
  function updateSet(exId, setIdx, field, val) { setWorkoutForm(f => ({ ...f, exercises: f.exercises.map(e => e.id === exId ? { ...e, sets: e.sets.map((s, i) => i === setIdx ? { ...s, [field]: val } : s) } : e) })); }
  function toggleSuperset(exId) {
    setWorkoutForm(f => {
      const idx = f.exercises.findIndex(e => e.id === exId);
      if (idx === -1 || idx >= f.exercises.length - 1) return f;
      const updated = f.exercises.map((e, i) => i === idx ? { ...e, supersetWith: e.supersetWith ? null : f.exercises[idx + 1].id } : e);
      return { ...f, exercises: updated };
    });
  }
  function getPRForExercise(exName) {
    let pr = 0;
    workouts.forEach(w => w.exercises.forEach(e => {
      if (e.name.toLowerCase() === exName.toLowerCase())
        e.sets.forEach(s => { if (parseFloat(s.weight) > pr) pr = parseFloat(s.weight); });
    }));
    return pr;
  }
  function getLastSessionForExercise(exName, currentWorkoutDate) {
    const past = [...workouts].reverse().find(w => w.date < currentWorkoutDate && w.exercises.some(e => e.name.toLowerCase() === exName.toLowerCase()));
    if (!past) return null;
    return past.exercises.find(e => e.name.toLowerCase() === exName.toLowerCase());
  }
  function saveProgressEntry() {
    const hasMedia = ANGLES.some(a => progressForm[a]);
    if (!hasMedia) return;
    const idx = progressEntries.findIndex(e => e.date === progressForm.date);
    const newEntries = idx >= 0 ? progressEntries.map((e, i) => i === idx ? { ...progressForm } : e) : [...progressEntries, { ...progressForm }].sort((a, b) => a.date.localeCompare(b.date));
    setProgressEntries(newEntries);
    setProgressSaved(true);
    setTimeout(() => setProgressSaved(false), 2000);
  }
  function handleProgressMedia(file, angle) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setProgressForm(f => ({ ...f, [angle]: e.target.result }));
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (isSunday()) {
      const prevWeek = getPreviousWeekStart();
      if (getWeekLogs(logs, prevWeek).length > 0) setTab("Weekly Report");
    }
  }, []);

  function saveLog() {
    const idx = logs.findIndex(l => l.date === form.date);
    const newLog = { ...form, score: calcScore(form) };
    const newLogs = idx >= 0 ? logs.map((l, i) => i === idx ? newLog : l) : [...logs, newLog].sort((a, b) => a.date.localeCompare(b.date));
    setLogs(newLogs);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }
  function downloadReport(weekStart) {
    const wl = getWeekLogs(logs, weekStart);
    const html = generateReportHTML(weekStart, wl, logs);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `weekly-report-${weekStart}.html`; a.click();
    URL.revokeObjectURL(url);
  }

  const today = logs.find(l => l.date === new Date().toISOString().slice(0, 10));
  const latestWeight = [...logs].reverse().find(l => l.weight && parseFloat(l.weight) > 0);
  const projected = getProjectedWeight(logs);
  const daysLeft = getDeadlineDays();
  const totalScore = logs.reduce((s, l) => s + (l.score || 0), 0);
  const maxScore = logs.length * 4;
  const compliance = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const weighIns = logs.filter(l => l.weight && parseFloat(l.weight) > 0);
  const lostSoFar = weighIns.length > 0 ? (START_WEIGHT - parseFloat(weighIns[weighIns.length - 1].weight)).toFixed(1) : 0;
  const allWeekStarts = [...new Set(logs.map(l => getWeekKey(l.date)))].sort().reverse();
  const daysSinceLastProgress = getDaysSinceLastProgress(progressEntries);

  const inputStyle = {
    background: C.surfaceHigh,
    border: `1px solid ${C.border}`,
    color: C.text,
    fontFamily: "'DM Mono', 'Courier New', monospace",
    fontSize: 12,
    borderRadius: 6,
    padding: "9px 12px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.15s",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Mono', 'Courier New', monospace", fontSize: 13 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
        input, textarea, select {
          background: ${C.surfaceHigh};
          border: 1px solid ${C.border};
          color: ${C.text};
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          border-radius: 6px;
          padding: 9px 12px;
          width: 100%;
          outline: none;
          transition: border-color 0.15s;
        }
        input:focus, textarea:focus, select:focus { border-color: ${C.accent}; }
        button { cursor: pointer; font-family: inherit; }
        .tab-btn {
          background: none; border: none; border-bottom: 2px solid transparent;
          color: ${C.textDim}; padding: 12px 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          transition: color 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .tab-btn.active { color: ${C.accent}; border-bottom-color: ${C.accent}; }
        .tab-btn:hover:not(.active) { color: ${C.text}; }
        .save-btn {
          background: ${C.accent}; color: #000;
          border: none; padding: 10px 28px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          border-radius: 6px; transition: opacity 0.15s, transform 0.1s;
        }
        .save-btn:hover { opacity: 0.88; }
        .save-btn:active { transform: scale(0.98); }
        .save-btn.secondary {
          background: none; border: 1px solid ${C.accent};
          color: ${C.accent};
        }
        .save-btn.secondary:hover { background: ${C.accentDim}; }
        .row-even { background: ${C.surface}; }
        .row-odd { background: ${C.bg}; }
        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 13px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: ${C.accent}; margin-bottom: 18px;
        }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        @media (max-width: 680px) {
          .grid2, .grid3, .grid4 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 420px) {
          .grid2, .grid3, .grid4 { grid-template-columns: 1fr; }
        }
        .chip {
          display: inline-block;
          background: ${C.surfaceHigh}; border: 1px solid ${C.border};
          border-radius: 4px; padding: 2px 8px;
          font-size: 10px; color: ${C.textMid}; margin: 2px;
        }
        .tbl-th {
          padding: 8px 12px; color: ${C.textDim};
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase;
          text-align: left; border-bottom: 1px solid ${C.border};
        }
        .tbl-td { padding: 9px 12px; }
        tr:hover td { background: ${C.surfaceHigh}22; }
        .inject-badge {
          background: #1a0a2e; border: 1px solid #7c3aed44;
          color: #a78bfa; font-size: 10px; padding: 3px 10px;
          border-radius: 4px; letter-spacing: 0.08em;
          font-family: 'Space Grotesk', sans-serif; font-weight: 600;
        }
        select option { background: ${C.surfaceHigh}; }
        .metric-row { display: flex; flex-direction: column; gap: 6px; padding: 14px 0; border-bottom: 1px solid ${C.border}; }
        .metric-row:last-child { border-bottom: none; }
      `}</style>

      {/* ── Header ── */}
      <div style={{
        borderBottom: `1px solid ${C.border}`,
        padding: "0 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 8,
        background: C.surface,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0" }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22, letterSpacing: "0.3em",
            color: C.accent,
          }}>Daily Accountability Log</div>
          <div style={{ width: 1, height: 16, background: C.border }} />
          <div style={{ color: C.textDim, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em" }}>
            210 → 160 lb · Aug 23
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 0", flexWrap: "wrap" }}>
          {isSunday() && <Badge color={C.accent}>📊 Report Day</Badge>}
          {(daysSinceLastProgress === null || daysSinceLastProgress >= PROGRESS_INTERVAL_DAYS) && (
            <span onClick={() => setTab("Progress Photos")} style={{ cursor: "pointer" }}>
              <Badge color={C.yellow}>📸 Progress Due</Badge>
            </span>
          )}
          <span className="inject-badge">💉 Thursday Injection</span>
          <div style={{
            background: C.surfaceHigh, border: `1px solid ${C.border}`,
            borderRadius: 5, padding: "3px 10px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 16, color: daysLeft < 30 ? C.red : C.accent,
          }}>{daysLeft}d</div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ borderBottom: `1px solid ${C.border}`, display: "flex", overflowX: "auto", background: C.surface }}>
        {TABS.map(t => (
          <button key={t} className={`tab-btn${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {/* ══════════════════════════════════════════════
            SUMMARY
        ══════════════════════════════════════════════ */}
        {tab === "Summary" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {(daysSinceLastProgress === null || daysSinceLastProgress >= PROGRESS_INTERVAL_DAYS) && (
              <div style={{ background: "#1a1400", border: `1px solid ${C.yellow}33`, borderRadius: 8, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <span style={{ color: C.yellow, fontSize: 12 }}>📸 {daysSinceLastProgress === null ? "Time for your first progress check-in" : `Progress check-in due · ${daysSinceLastProgress} days since last`}</span>
                <button className="save-btn" style={{ fontSize: 11, padding: "6px 16px", background: C.yellow }} onClick={() => setTab("Progress Photos")}>Log Now</button>
              </div>
            )}

            {isSunday() && getWeekLogs(logs, getPreviousWeekStart()).length > 0 && (
              <div style={{ background: `${C.accent}0d`, border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: C.accent, fontSize: 12 }}>📊 Sunday — your weekly report is ready</span>
                <button className="save-btn" style={{ fontSize: 11, padding: "6px 16px" }} onClick={() => setTab("Weekly Report")}>View Report</button>
              </div>
            )}

            {/* Key stats row */}
            <div className="grid4">
              {[
                { label: "Current Weight", val: latestWeight ? `${latestWeight.weight}` : "—", unit: "lb", color: C.accent },
                { label: "Lost So Far", val: lostSoFar > 0 ? lostSoFar : "—", unit: "lb", color: "#4ade80" },
                {
                  label: "To Goal", unit: "lb to 160",
                  val: latestWeight ? (parseFloat(latestWeight.weight) - GOAL_WEIGHT).toFixed(1) : "—",
                  color: latestWeight ? (parseFloat(latestWeight.weight) - GOAL_WEIGHT <= 10 ? "#4ade80" : parseFloat(latestWeight.weight) - GOAL_WEIGHT <= 20 ? C.yellow : C.red) : C.textDim,
                },
                { label: "Days to Wedding", val: daysLeft, unit: "Aug 23", color: daysLeft < 30 ? C.red : C.accent },
              ].map(({ label, val, unit, color }) => (
                <Card key={label}>
                  <MiniLabel>{label}</MiniLabel>
                  <BigNum color={color} size={40} style={{ marginTop: 6 }}>{val}</BigNum>
                  <div style={{ color: C.textMid, fontSize: 10, marginTop: 4, fontFamily: "'Space Grotesk', sans-serif" }}>{unit}</div>
                </Card>
              ))}
            </div>

            {/* Progress + compliance */}
            <div className="grid2">
              <Card>
                <MiniLabel>Projected Aug 23</MiniLabel>
                {projected ? (
                  <>
                    <BigNum size={40} color={parseFloat(projected) <= GOAL_WEIGHT ? "#4ade80" : parseFloat(projected) <= GOAL_WEIGHT + 5 ? C.yellow : C.red} style={{ marginTop: 6 }}>
                      {projected}<span style={{ fontSize: 18, color: C.textDim }}> lb</span>
                    </BigNum>
                    <div style={{ color: C.textMid, fontSize: 11, marginTop: 6 }}>
                      {parseFloat(projected) <= GOAL_WEIGHT ? "✓ on track for goal" : `${(parseFloat(projected) - GOAL_WEIGHT).toFixed(1)} lb above goal`}
                    </div>
                  </>
                ) : <div style={{ color: C.textDim, marginTop: 10, fontSize: 12 }}>Need 2+ weigh-ins</div>}
                {latestWeight && (() => {
                  const pct = Math.round(((START_WEIGHT - parseFloat(latestWeight.weight)) / (START_WEIGHT - GOAL_WEIGHT)) * 100);
                  return <>
                    <Bar pct={pct} color="#4ade80" />
                    <div style={{ color: C.textDim, fontSize: 10, marginTop: 4 }}>{pct}% complete</div>
                  </>;
                })()}
              </Card>
              <Card>
                <MiniLabel>Overall Compliance</MiniLabel>
                <BigNum size={40} color={scoreColor(compliance, 100)} style={{ marginTop: 6 }}>
                  {compliance}<span style={{ fontSize: 20, color: C.textDim }}>%</span>
                </BigNum>
                <Bar pct={compliance} color={scoreColor(compliance, 100)} />
                <div style={{ color: C.textMid, fontSize: 11, marginTop: 6 }}>{totalScore}/{maxScore} pts · {logs.length} days logged</div>
              </Card>
            </div>

            {/* Today */}
            <Card>
              <div className="section-title">Today</div>
              {today ? (
                <div className="grid4">
                  {[
                    { label: "Calories", val: today.calories, hit: today.calories && parseInt(today.calories) >= CALORIES_MIN && parseInt(today.calories) <= CALORIES_MAX, unit: "kcal" },
                    { label: "Protein", val: today.protein, hit: today.protein && parseInt(today.protein) >= PROTEIN_MIN, unit: "g" },
                    { label: "Steps", val: today.steps ? parseInt(today.steps).toLocaleString() : null, hit: today.steps && parseInt(today.steps) >= STEPS_MIN, unit: "steps" },
                    { label: "Training", val: today.training ? "✓" : null, hit: !!today.training, unit: today.training || "—" },
                  ].map(({ label, val, hit, unit }) => (
                    <div key={label} style={{ textAlign: "center" }}>
                      <MiniLabel style={{ marginBottom: 6 }}>{label}</MiniLabel>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: val ? (hit ? "#4ade80" : C.red) : C.textFaint }}>{val || "—"}</div>
                      <div style={{ color: C.textMid, fontSize: 10, marginTop: 2 }}>{typeof unit === "string" && unit.length < 8 ? unit : ""}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: C.textDim, fontSize: 12 }}>
                  No log for today yet.{" "}
                  <button onClick={() => setTab("Weight Tracker")} style={{ background: "none", border: "none", color: C.accent, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>Log now →</button>
                </div>
              )}
              {today && <div style={{ marginTop: 12, color: C.textMid, fontSize: 11 }}>Score: <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: scoreColor(today.score) }}>{today.score}</span>/4</div>}
            </Card>

            {/* Recent weigh-ins */}
            {weighIns.length > 0 && (
              <Card>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div className="section-title" style={{ marginBottom: 0 }}>Recent Weigh-ins</div>
                  <button onClick={() => setTab("Weight Tracker")} style={{ background: "none", border: "none", color: C.accent, fontSize: 11, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}>View all →</button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {[...weighIns].slice(-5).map((w, i, arr) => {
                    const prev = i > 0 ? arr[i - 1] : null;
                    const delta = prev ? (parseFloat(w.weight) - parseFloat(prev.weight)).toFixed(1) : null;
                    return (
                      <div key={w.date} style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 14px", textAlign: "center", minWidth: 90 }}>
                        <div style={{ color: C.textDim, fontSize: 9, letterSpacing: "0.1em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 4 }}>{w.date.slice(5)}</div>
                        <BigNum size={22} color={C.accent}>{w.weight}</BigNum>
                        {delta !== null && <div style={{ fontSize: 10, color: parseFloat(delta) < 0 ? "#4ade80" : C.red, marginTop: 2, fontFamily: "'Space Grotesk', sans-serif" }}>{parseFloat(delta) > 0 ? "+" : ""}{delta}</div>}
                        {w.bodyFat && <div style={{ color: C.purple, fontSize: 9, marginTop: 3 }}>{w.bodyFat}%</div>}
                      </div>
                    );
                  })}
                </div>
                {weighIns.some(w => w.bodyFat) && (() => {
                  const first = weighIns.find(w => w.bodyFat);
                  const last = [...weighIns].reverse().find(w => w.bodyFat);
                  const fatChange = first && last && first !== last ? (parseFloat(last.bodyFat) - parseFloat(first.bodyFat)).toFixed(1) : null;
                  const muscleChange = first && last && first !== last && first.muscleMass && last.muscleMass ? (parseFloat(last.muscleMass) - parseFloat(first.muscleMass)).toFixed(1) : null;
                  return (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}`, display: "flex", gap: 24, flexWrap: "wrap" }}>
                      {fatChange !== null && <div><MiniLabel>Body Fat Δ</MiniLabel><BigNum size={22} color={parseFloat(fatChange) < 0 ? "#4ade80" : C.red}>{parseFloat(fatChange) > 0 ? "+" : ""}{fatChange}%</BigNum></div>}
                      {muscleChange !== null && <div><MiniLabel>Muscle Δ</MiniLabel><BigNum size={22} color={parseFloat(muscleChange) > 0 ? "#4ade80" : C.red}>{parseFloat(muscleChange) > 0 ? "+" : ""}{muscleChange} lb</BigNum></div>}
                      {last?.visceralFat && <div><MiniLabel>Visceral Fat</MiniLabel><BigNum size={22} color={parseFloat(last.visceralFat) <= 12 ? "#4ade80" : C.red}>{last.visceralFat}</BigNum></div>}
                    </div>
                  );
                })()}
              </Card>
            )}
          </div>
        )}


        {/* ══════════════════════════════════════════════
            WEIGHT TRACKER
        ══════════════════════════════════════════════ */}
        {tab === "Weight Tracker" && (() => {
          const isWeighInDay = [2, 4, 6].includes(new Date().getDay());
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="section-title" style={{ marginBottom: 0 }}>Weight Tracker</div>
                <MiniLabel>Weigh-in days: Tue · Thu · Sat</MiniLabel>
              </div>

              {isWeighInDay && (
                <div style={{ background: `${C.accent}0d`, border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "10px 16px", color: C.accent, fontSize: 11 }}>
                  ⚖️ Today is a weigh-in day — upload your RENPHO screenshot below
                </div>
              )}

              <Card>
                <div className="section-title">Log Weigh-in</div>
                <FieldInput label="Date" style={{ marginBottom: 14 }}>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={{ maxWidth: 200 }} />
                </FieldInput>

                <FieldInput label="RENPHO Screenshot" style={{ marginBottom: 14 }}>
                  {!scaleUpload ? (
                    <UploadZone icon="⚖️" label="Drop screenshot or tap to upload" onFile={handleScaleUpload} />
                  ) : (
                    <div>
                      <img src={scaleUpload} alt="scale" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 6, marginBottom: 8, opacity: scaleParsing ? 0.4 : 1 }} />
                      {scaleParsing && <div style={{ color: C.accent, fontSize: 11, marginBottom: 6 }}>⟳ Reading scale data...</div>}
                      {scaleError && <div style={{ color: C.red, fontSize: 11, marginBottom: 6 }}>{scaleError}</div>}
                      {scaleResult && (
                        <div style={{ background: C.surfaceHigh, borderRadius: 6, padding: 10, marginBottom: 8, display: "flex", flexWrap: "wrap", gap: 12 }}>
                          {scaleResult.weight && <div><span className="chip">Weight</span> <span style={{ color: C.accent }}>{scaleResult.weight} lb</span></div>}
                          {scaleResult.bodyFat && <div><span className="chip">Body Fat</span> <span style={{ color: C.accent }}>{scaleResult.bodyFat}%</span></div>}
                          {scaleResult.muscleMass && <div><span className="chip">Muscle</span> <span style={{ color: C.accent }}>{scaleResult.muscleMass} lb</span></div>}
                          {scaleResult.visceralFat && <div><span className="chip">Visceral</span> <span style={{ color: C.accent }}>{scaleResult.visceralFat}</span></div>}
                        </div>
                      )}
                      <label style={{ color: C.textDim, fontSize: 10, cursor: "pointer", letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                        ↑ REPLACE <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => { setScaleUpload(null); setScaleResult(null); handleScaleUpload(e.target.files[0]); }} />
                      </label>
                    </div>
                  )}
                </FieldInput>

                <div className="grid2" style={{ marginBottom: 12 }}>
                  <FieldInput label="Weight (lb)"><input type="number" placeholder="207.4" value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} /></FieldInput>
                  <FieldInput label="Body Fat %"><input type="number" placeholder="28.5" step="0.1" value={form.bodyFat} onChange={e => setForm(f => ({ ...f, bodyFat: e.target.value }))} /></FieldInput>
                </div>
                <div className="grid2" style={{ marginBottom: 18 }}>
                  <FieldInput label="Muscle Mass (lb)"><input type="number" placeholder="142.0" step="0.1" value={form.muscleMass} onChange={e => setForm(f => ({ ...f, muscleMass: e.target.value }))} /></FieldInput>
                  <FieldInput label="Visceral Fat (rating)"><input type="number" placeholder="12" value={form.visceralFat} onChange={e => setForm(f => ({ ...f, visceralFat: e.target.value }))} /></FieldInput>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="save-btn" onClick={saveLog}>{saved ? "Saved ✓" : "Save Weigh-in"}</button>
                </div>
              </Card>

              {weighIns.length > 0 && (
                <Card>
                  <div className="section-title">History</div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                      <thead>
                        <tr>
                          {["Date", "Weight", "Body Fat %", "Muscle Mass", "Visceral Fat", "Δ Weight"].map(h => (
                            <th key={h} className="tbl-th">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {weighIns.map((w, i) => {
                          const prev = i > 0 ? weighIns[i - 1] : null;
                          const delta = prev ? (parseFloat(w.weight) - parseFloat(prev.weight)).toFixed(1) : null;
                          return (
                            <tr key={w.date} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                              <td className="tbl-td" style={{ color: C.textMid }}>{w.date}</td>
                              <td className="tbl-td"><BigNum size={18} color={C.accent}>{w.weight}</BigNum></td>
                              <td className="tbl-td" style={{ color: C.purple }}>{w.bodyFat ? w.bodyFat + "%" : "—"}</td>
                              <td className="tbl-td" style={{ color: "#4ade80" }}>{w.muscleMass ? w.muscleMass + " lb" : "—"}</td>
                              <td className="tbl-td" style={{ color: w.visceralFat ? (parseFloat(w.visceralFat) <= 12 ? "#4ade80" : C.red) : C.textFaint }}>{w.visceralFat || "—"}</td>
                              <td className="tbl-td"><span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: delta === null ? C.textFaint : parseFloat(delta) < 0 ? "#4ade80" : C.red }}>{delta === null ? "—" : (parseFloat(delta) > 0 ? "+" : "") + delta}</span></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          );
        })()}


        {/* ══════════════════════════════════════════════
            NUTRITION
        ══════════════════════════════════════════════ */}
        {tab === "Nutrition" && (() => {
          const scannedCals = ["lunch", "dinner", "anchor"].reduce((sum, k) => sum + (mealResults[k]?.calories || 0), 0);
          const scannedPro = ["lunch", "dinner", "anchor"].reduce((sum, k) => sum + (mealResults[k]?.protein || 0), 0);
          const totalCals = BREAKFAST.calories + scannedCals;
          const totalPro = BREAKFAST.protein + scannedPro;
          const anyScanned = ["lunch", "dinner", "anchor"].some(k => mealResults[k]);
          const calColor = totalCals >= CALORIES_MIN && totalCals <= CALORIES_MAX ? "#4ade80" : totalCals > CALORIES_MAX ? C.red : C.yellow;
          const proColor = totalPro >= PROTEIN_MIN ? "#4ade80" : C.yellow;
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="section-title">Daily Nutrition</div>

              {/* Running total */}
              <Card accent>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: C.accent, letterSpacing: "0.08em", textTransform: "uppercase" }}>Running Total</div>
                  {anyScanned && (
                    <button className="save-btn" style={{ fontSize: 11, padding: "6px 16px" }}
                      onClick={() => { setForm(f => ({ ...f, calories: String(totalCals), protein: String(totalPro) })); setTimeout(saveLog, 50); }}>
                      Push to Log ↗
                    </button>
                  )}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                      <MiniLabel>Calories</MiniLabel>
                      <BigNum size={26} color={calColor}>{totalCals}</BigNum>
                    </div>
                    <Bar pct={Math.min(100, Math.round(totalCals / CALORIES_MAX * 100))} color={calColor} />
                    <div style={{ color: C.textDim, fontSize: 10, marginTop: 5 }}>
                      1700–1800 · {CALORIES_MAX - totalCals > 0 ? `${CALORIES_MAX - totalCals} remaining` : totalCals > CALORIES_MAX ? `${totalCals - CALORIES_MAX} over` : "✓ at max"}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                      <MiniLabel>Protein</MiniLabel>
                      <BigNum size={26} color={proColor}>{totalPro}g</BigNum>
                    </div>
                    <Bar pct={Math.min(100, Math.round(totalPro / PROTEIN_MIN * 100))} color={proColor} />
                    <div style={{ color: C.textDim, fontSize: 10, marginTop: 5 }}>
                      ≥120g · {totalPro >= PROTEIN_MIN ? "✓ hit" : `${PROTEIN_MIN - totalPro}g to go`}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Breakfast (fixed) — same format as meal cards */}
              <Card>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: C.text }}>🥤 Breakfast</div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ color: C.accent, fontSize: 11 }}>{BREAKFAST.calories} cal · {BREAKFAST.protein}g pro</span>
                    <Badge color="#4ade80">Fixed</Badge>
                  </div>
                </div>
                <div style={{ background: C.surfaceHigh, borderRadius: 6, padding: 12 }}>
                  <div style={{ color: C.textMid, fontSize: 12 }}>{BREAKFAST.mealName}</div>
                </div>
              </Card>

              {/* Meals */}
              {[{ key: "lunch", label: "Lunch", emoji: "🥗" }, { key: "dinner", label: "Dinner", emoji: "🍽️" }, { key: "anchor", label: "Anchor Snack ~7:30pm", emoji: "🎯" }].map(({ key, label, emoji }) => (
                <Card key={key}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: mealResults[key] ? "#4ade80" : C.text }}>{emoji} {label}</div>
                    {mealResults[key] && (
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ color: C.accent, fontSize: 11 }}>{mealResults[key].calories} cal · {mealResults[key].protein}g pro</span>
                        <Badge color="#4ade80">Scanned</Badge>
                      </div>
                    )}
                  </div>
                  {!mealUploads[key] ? (
                    <UploadZone icon="📸" label="Drop screenshot or tap to upload" onFile={f => handleMealUpload(f, key)} />
                  ) : (
                    <div>
                      <img src={mealUploads[key]} alt="meal" style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 6, marginBottom: 10, opacity: mealParsing[key] ? 0.4 : 1 }} />
                      {mealParsing[key] && <div style={{ color: C.accent, fontSize: 11, marginBottom: 8 }}>⟳ Scanning...</div>}
                      {mealError[key] && <div style={{ color: C.red, fontSize: 11, marginBottom: 8 }}>{mealError[key]}</div>}
                      {mealResults[key] && (
                        <div style={{ background: C.surfaceHigh, borderRadius: 6, padding: 12, marginBottom: 10 }}>
                          <div style={{ color: C.text, fontSize: 12, marginBottom: 8 }}>{mealResults[key].mealName}</div>
                          <div style={{ display: "flex", gap: 16 }}>
                            {mealResults[key].calories != null && <div><span className="chip">Cal</span> <span style={{ color: C.accent }}>{mealResults[key].calories}</span></div>}
                            {mealResults[key].protein != null && <div><span className="chip">Pro</span> <span style={{ color: C.accent }}>{mealResults[key].protein}g</span></div>}
                          </div>
                          {mealResults[key].notes && <div style={{ color: C.textMid, fontSize: 11, marginTop: 6 }}>{mealResults[key].notes}</div>}
                        </div>
                      )}
                      <label style={{ color: C.textDim, fontSize: 10, cursor: "pointer", letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                        ↑ REPLACE <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => { setMealUploads(m => ({ ...m, [key]: null })); setMealResults(m => ({ ...m, [key]: null })); handleMealUpload(e.target.files[0], key); }} />
                      </label>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          );
        })()}


        {/* ══════════════════════════════════════════════
            TRAINING
        ══════════════════════════════════════════════ */}
        {tab === "Training" && (() => (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="section-title">Training Log</div>

            <Card>
              <div className="section-title" style={{ fontSize: 12 }}>Log Workout</div>
              <div className="grid2" style={{ marginBottom: 14 }}>
                <FieldInput label="Date"><input type="date" value={workoutForm.date} onChange={e => setWorkoutForm(f => ({ ...f, date: e.target.value }))} /></FieldInput>
                <FieldInput label="Session Name"><input type="text" placeholder="Push Day, Upper Body..." value={workoutForm.name} onChange={e => setWorkoutForm(f => ({ ...f, name: e.target.value }))} /></FieldInput>
              </div>

              {/* Apple Watch */}
              <FieldInput label="Apple Watch Screenshot (optional)" style={{ marginBottom: 14 }}>
                {!workoutForm.watchPhoto ? (
                  <UploadZone icon="⌚" label="Drop Apple Watch screenshot or tap to upload"
                    onFile={file => { const r = new FileReader(); r.onload = ev => setWorkoutForm(f => ({ ...f, watchPhoto: ev.target.result })); r.readAsDataURL(file); }} />
                ) : (
                  <div style={{ position: "relative" }}>
                    <img src={workoutForm.watchPhoto} alt="Apple Watch" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 6, border: `1px solid ${C.accentMid}` }} />
                    <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 6 }}>
                      <label style={{ background: "#00000099", color: C.text, fontSize: 9, padding: "4px 8px", borderRadius: 3, cursor: "pointer", letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                        REPLACE <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const r = new FileReader(); r.onload = ev => setWorkoutForm(f => ({ ...f, watchPhoto: ev.target.result })); r.readAsDataURL(e.target.files[0]); }} />
                      </label>
                      <button onClick={() => setWorkoutForm(f => ({ ...f, watchPhoto: null }))} style={{ background: "#00000099", border: "none", color: C.red, fontSize: 9, padding: "4px 8px", borderRadius: 3, letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>REMOVE</button>
                    </div>
                  </div>
                )}
              </FieldInput>

              {/* Exercises */}
              <div style={{ paddingLeft: 20 }}>
                {workoutForm.exercises.map((ex, exIdx) => {
                  const pr = ex.name ? getPRForExercise(ex.name) : 0;
                  const lastSession = getLastSessionForExercise(ex.name, workoutForm.date);
                  const isInSuperset = ex.supersetWith || (exIdx > 0 && workoutForm.exercises[exIdx - 1]?.supersetWith === ex.id);
                  const isSupStart = !!ex.supersetWith;
                  const isSupEnd = exIdx > 0 && workoutForm.exercises[exIdx - 1]?.supersetWith === ex.id;
                  const canSuperset = exIdx < workoutForm.exercises.length - 1;
                  return (
                    <div key={ex.id} style={{ position: "relative" }}>
                      {isInSuperset && (
                        <div style={{ position: "absolute", left: -16, top: isSupStart ? 20 : 0, bottom: isSupEnd ? 20 : 0, width: 10, borderLeft: `2px solid ${C.accentMid}`, borderTop: isSupStart ? `2px solid ${C.accentMid}` : "none", borderBottom: isSupEnd ? `2px solid ${C.accentMid}` : "none", borderRadius: isSupStart ? "4px 0 0 0" : isSupEnd ? "0 0 0 4px" : 0 }} />
                      )}
                      <div style={{ background: isInSuperset ? "#0a1420" : C.surfaceHigh, border: `1px solid ${isInSuperset ? C.accentMid : C.border}`, borderRadius: 6, padding: 14, marginBottom: isSupStart ? 3 : 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                          <input type="text" placeholder="Exercise name (e.g. Bench Press)" value={ex.name} onChange={e => updateExerciseName(ex.id, e.target.value)} style={{ flex: 1 }} />
                          {canSuperset && (
                            <button onClick={() => toggleSuperset(ex.id)} style={{ background: ex.supersetWith ? C.accentDim : "none", border: `1px solid ${ex.supersetWith ? C.accent : C.border}`, color: ex.supersetWith ? C.accent : C.textDim, fontSize: 9, padding: "4px 8px", borderRadius: 4, letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                              {ex.supersetWith ? "SS ✓" : "SS"}
                            </button>
                          )}
                          <button onClick={() => removeExercise(ex.id)} style={{ background: "none", border: "none", color: C.red, fontSize: 16, padding: "0 4px" }}>✕</button>
                        </div>
                        {ex.name && pr > 0 && (
                          <div style={{ color: C.yellow, fontSize: 10, letterSpacing: "0.06em", marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
                            🏆 PR: {pr} lb
                            {lastSession && <span style={{ color: C.textDim, marginLeft: 12 }}>Last: {lastSession.sets.map(s => `${s.reps}×${s.weight}lb`).join(", ")}</span>}
                          </div>
                        )}
                        <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr 28px", gap: 6, alignItems: "center", marginBottom: 6 }}>
                          <MiniLabel>Set</MiniLabel><MiniLabel>Reps</MiniLabel><MiniLabel>Weight (lb)</MiniLabel><div />
                        </div>
                        {ex.sets.map((set, sIdx) => {
                          const isPR = ex.name && parseFloat(set.weight) > 0 && parseFloat(set.weight) >= getPRForExercise(ex.name) && parseFloat(set.weight) > pr;
                          return (
                            <div key={sIdx} style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr 28px", gap: 6, alignItems: "center", marginBottom: 5 }}>
                              <div style={{ color: C.textDim, fontSize: 11, textAlign: "center" }}>{sIdx + 1}</div>
                              <input type="number" placeholder="12" value={set.reps} onChange={e => updateSet(ex.id, sIdx, "reps", e.target.value)} style={{ textAlign: "center" }} />
                              <div style={{ position: "relative" }}>
                                <input type="number" placeholder="135" value={set.weight} onChange={e => updateSet(ex.id, sIdx, "weight", e.target.value)} style={{ textAlign: "center", borderColor: isPR ? C.yellow : undefined }} />
                                {isPR && <span style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", fontSize: 9, color: C.yellow, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>PR!</span>}
                              </div>
                              <button onClick={() => removeSet(ex.id, sIdx)} style={{ background: "none", border: "none", color: C.textDim, fontSize: 13, padding: "0 4px" }}>✕</button>
                            </div>
                          );
                        })}
                        <button onClick={() => addSet(ex.id)} style={{ background: "none", border: `1px solid ${C.border}`, color: C.textMid, fontSize: 10, padding: "4px 12px", borderRadius: 4, marginTop: 6, letterSpacing: "0.06em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                          + Add Set
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <button onClick={addExercise} style={{ background: "none", border: `1px solid ${C.accentMid}`, color: C.accent, fontSize: 11, padding: "8px 16px", borderRadius: 6, letterSpacing: "0.06em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                  + Add Exercise
                </button>
                <button className="save-btn" onClick={saveWorkout}>{workoutSaved ? "Saved ✓" : "Save Workout"}</button>
              </div>
            </Card>

            {/* History */}
            {workouts.length > 0 && (
              <Card>
                <div className="section-title">History</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[...workouts].reverse().map((w, i) => (
                    <div key={w.id || i} style={{ borderBottom: i < workouts.length - 1 ? `1px solid ${C.border}` : "none", paddingBottom: i < workouts.length - 1 ? 14 : 0 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", paddingBottom: 6 }} onClick={() => setSelectedWorkout(selectedWorkout === (w.id || i) ? null : (w.id || i))}>
                        <div>
                          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: C.accent }}>
                            {w.name || "Workout"} <span style={{ fontSize: 11, color: C.textMid, fontWeight: 400 }}>· {w.date}</span>
                          </div>
                          <div style={{ color: C.textDim, fontSize: 11, marginTop: 2 }}>
                            {w.exercises.length} exercise{w.exercises.length !== 1 ? "s" : ""} · {w.exercises.reduce((s, e) => s + e.sets.length, 0)} sets
                          </div>
                        </div>
                        <span style={{ color: C.textDim, fontSize: 12 }}>{selectedWorkout === (w.id || i) ? "▲" : "▼"}</span>
                      </div>
                      {selectedWorkout === (w.id || i) && (
                        <div style={{ marginTop: 8 }}>
                          {w.watchPhoto && (
                            <div style={{ marginBottom: 12 }}>
                              <MiniLabel style={{ marginBottom: 6 }}>⌚ Apple Watch</MiniLabel>
                              <img src={w.watchPhoto} alt="Apple Watch" style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 6, border: `1px solid ${C.accentMid}` }} />
                            </div>
                          )}
                          {w.exercises.map((ex, ei) => {
                            const currentPR = getPRForExercise(ex.name);
                            const maxWeight = Math.max(...ex.sets.map(s => parseFloat(s.weight) || 0));
                            return (
                              <div key={ei} style={{ background: C.bg, borderRadius: 6, padding: 10, marginBottom: 8 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                  <span style={{ color: C.text, fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{ex.name}</span>
                                  {maxWeight > 0 && maxWeight >= currentPR && <Badge color={C.yellow}>🏆 PR</Badge>}
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                  {ex.sets.map((s, si) => (
                                    <span key={si} className="chip" style={{ color: C.text }}>
                                      {s.reps && s.weight ? `${s.reps} × ${s.weight}lb` : s.reps ? `${s.reps} reps` : `${s.weight}lb`}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* PR Board */}
            {workouts.length > 0 && (() => {
              const allExerciseNames = [...new Set(workouts.flatMap(w => w.exercises.map(e => e.name.trim().toLowerCase())).filter(Boolean))];
              return allExerciseNames.length > 0 ? (
                <Card>
                  <div className="section-title">🏆 PR Board</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
                    {allExerciseNames.map(name => {
                      const pr = getPRForExercise(name);
                      const sessions = workouts.filter(w => w.exercises.some(e => e.name.toLowerCase() === name));
                      return pr > 0 ? (
                        <div key={name} style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 6, padding: 12 }}>
                          <MiniLabel style={{ marginBottom: 4 }}>{name}</MiniLabel>
                          <BigNum size={24} color={C.yellow}>{pr}<span style={{ fontSize: 12, color: C.textDim }}> lb</span></BigNum>
                          <div style={{ color: C.textDim, fontSize: 10, marginTop: 3 }}>{sessions.length} session{sessions.length !== 1 ? "s" : ""}</div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </Card>
              ) : null;
            })()}
          </div>
        ))()}


        {/* ══════════════════════════════════════════════
            ADHERENCE
        ══════════════════════════════════════════════ */}
        {tab === "Adherence" && (
          <div>
            <div className="section-title">Adherence Log</div>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: C.surfaceHigh }}>
                      {["Date", "Weight", "Calories", "Protein", "Steps", "Training", "Score"].map(h => (
                        <th key={h} className="tbl-th">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {logs.length === 0 ? (
                      <tr><td colSpan={7} style={{ padding: "32px 12px", color: C.textDim, textAlign: "center" }}>No logs yet. Start logging on Day 1.</td></tr>
                    ) : logs.map((row, i) => {
                      const calHit = row.calories && parseInt(row.calories) >= CALORIES_MIN && parseInt(row.calories) <= CALORIES_MAX;
                      const proHit = row.protein && parseInt(row.protein) >= PROTEIN_MIN;
                      const stepHit = row.steps && parseInt(row.steps) >= STEPS_MIN;
                      const trainHit = row.training && row.training.trim() !== "";
                      return (
                        <tr key={row.date} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                          <td className="tbl-td" style={{ color: C.textMid }}>{row.date.slice(5)}</td>
                          <td className="tbl-td"><BigNum size={16} color={row.weight ? C.accent : C.textFaint}>{row.weight || "—"}</BigNum></td>
                          <td className="tbl-td"><StatusDot hit={calHit} /><span style={{ color: calHit ? "#4ade80" : row.calories ? C.red : C.textFaint }}>{row.calories || "—"}</span></td>
                          <td className="tbl-td"><StatusDot hit={proHit} /><span style={{ color: proHit ? "#4ade80" : row.protein ? C.red : C.textFaint }}>{row.protein || "—"}</span></td>
                          <td className="tbl-td"><StatusDot hit={stepHit} /><span style={{ color: stepHit ? "#4ade80" : row.steps ? C.red : C.textFaint }}>{row.steps ? parseInt(row.steps).toLocaleString() : "—"}</span></td>
                          <td className="tbl-td" style={{ color: trainHit ? "#4ade80" : C.textFaint, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.training || "—"}</td>
                          <td className="tbl-td">
                            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: scoreColor(row.score) }}>{row.score ?? "—"}</span>
                            <span style={{ fontSize: 10, color: C.textFaint }}>/4</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
            {logs.length > 0 && (
              <div style={{ marginTop: 12, color: C.textDim, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif" }}>
                Total: {totalScore}/{maxScore} pts · {compliance}% compliance · {logs.length} days
              </div>
            )}
          </div>
        )}


        {/* ══════════════════════════════════════════════
            WEEKLY REPORT
        ══════════════════════════════════════════════ */}
        {tab === "Weekly Report" && (() => {
          const weekLogs = getWeekLogs(logs, reportWeek);
          const stats = weekLogs.length > 0 ? buildWeekStats(weekLogs) : null;
          const weekEnd = new Date(reportWeek);
          weekEnd.setDate(weekEnd.getDate() + 6);
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                <div className="section-title" style={{ marginBottom: 0 }}>Weekly Report</div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <select value={reportWeek} onChange={e => setReportWeek(e.target.value)} style={{ width: "auto", fontSize: 11 }}>
                    {allWeekStarts.length === 0
                      ? <option value={getPreviousWeekStart()}>Week of {getPreviousWeekStart()}</option>
                      : allWeekStarts.map(w => {
                        const we = new Date(w); we.setDate(we.getDate() + 6);
                        return <option key={w} value={w}>Week of {w} – {we.toISOString().slice(0, 10)}</option>;
                      })}
                  </select>
                  {stats && <button className="save-btn secondary" onClick={() => downloadReport(reportWeek)}>↓ Download</button>}
                </div>
              </div>

              {isSunday() && <div style={{ background: `${C.accent}0d`, border: `1px solid ${C.accentMid}`, borderRadius: 6, padding: "10px 16px", color: C.accent, fontSize: 11 }}>📊 It's Sunday — showing last week's report automatically.</div>}

              {!stats ? (
                <Card style={{ color: C.textDim, textAlign: "center", padding: 40 }}>No logs found for this week.</Card>
              ) : (
                <>
                  {/* Weight */}
                  <Card>
                    <div className="section-title" style={{ fontSize: 12 }}>Weight</div>
                    <div className="grid3">
                      {[
                        { label: "Week Start", val: stats.startW ? `${stats.startW} lb` : "—", color: C.accent },
                        { label: "Week End", val: stats.endW ? `${stats.endW} lb` : "—", color: C.accent },
                        { label: "Week Loss", val: stats.weekLoss ? `${parseFloat(stats.weekLoss) > 0 ? "-" : "+"}${Math.abs(stats.weekLoss)} lb` : "—", color: stats.weekLoss && parseFloat(stats.weekLoss) > 0 ? "#4ade80" : C.red },
                      ].map(({ label, val, color }) => (
                        <div key={label} style={{ textAlign: "center" }}>
                          <MiniLabel style={{ marginBottom: 6 }}>{label}</MiniLabel>
                          <BigNum size={30} color={color}>{val}</BigNum>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}`, display: "flex", gap: 32 }}>
                      <div>
                        <MiniLabel>Total Lost Since Start</MiniLabel>
                        <BigNum size={24} color="#4ade80" style={{ marginTop: 4 }}>{stats.endW ? (START_WEIGHT - stats.endW).toFixed(1) : "—"} lb</BigNum>
                      </div>
                      <div>
                        <MiniLabel>Projected Aug 23</MiniLabel>
                        <BigNum size={24} color={projected && parseFloat(projected) <= GOAL_WEIGHT ? "#4ade80" : projected && parseFloat(projected) <= GOAL_WEIGHT + 5 ? C.yellow : C.red} style={{ marginTop: 4 }}>
                          {projected || "—"} lb
                        </BigNum>
                        <div style={{ color: C.textDim, fontSize: 10, marginTop: 2 }}>{projected ? (parseFloat(projected) <= GOAL_WEIGHT ? "✓ on track" : `${(parseFloat(projected) - GOAL_WEIGHT).toFixed(1)} lb above goal`) : ""}</div>
                      </div>
                    </div>
                  </Card>

                  {/* Nutrition */}
                  <Card>
                    <div className="section-title" style={{ fontSize: 12 }}>Nutrition Averages</div>
                    {[
                      { label: "Avg Calories", val: stats.avgCals, display: stats.avgCals, target: "1700–1800", pct: stats.avgCals ? Math.min(100, Math.round(stats.avgCals / CALORIES_MAX * 100)) : 0, color: stats.avgCals && stats.avgCals >= CALORIES_MIN && stats.avgCals <= CALORIES_MAX ? "#4ade80" : C.red, hitRate: stats.calHitRate },
                      { label: "Avg Protein", display: stats.avgPro ? `${stats.avgPro}g` : null, target: "≥120g", pct: stats.avgPro ? Math.min(100, Math.round(stats.avgPro / PROTEIN_MIN * 100)) : 0, color: stats.avgPro && stats.avgPro >= PROTEIN_MIN ? "#4ade80" : C.yellow, hitRate: stats.proHitRate },
                      { label: "Avg Steps", display: stats.avgSteps ? stats.avgSteps.toLocaleString() : null, target: "≥8,000", pct: stats.avgSteps ? Math.min(100, Math.round(stats.avgSteps / STEPS_MIN * 100)) : 0, color: stats.avgSteps && stats.avgSteps >= STEPS_MIN ? "#4ade80" : C.red, hitRate: stats.stepHitRate },
                    ].map(({ label, display, target, pct, color, hitRate }) => (
                      <div key={label} className="metric-row">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <MiniLabel>{label}</MiniLabel>
                          <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                            <span style={{ color: C.textDim, fontSize: 10 }}>hit {hitRate}% of days</span>
                            <BigNum size={22} color={color}>{display || "—"}</BigNum>
                          </div>
                        </div>
                        <Bar pct={pct} color={color} />
                        <div style={{ color: C.textDim, fontSize: 10, marginTop: 2 }}>target {target}</div>
                      </div>
                    ))}
                  </Card>

                  {/* Training */}
                  <Card>
                    <div className="section-title" style={{ fontSize: 12 }}>Training</div>
                    <div className="grid2">
                      <div style={{ textAlign: "center" }}>
                        <MiniLabel>Training Days</MiniLabel>
                        <BigNum size={44} color={stats.trainingDays >= 5 ? "#4ade80" : stats.trainingDays >= 3 ? C.yellow : C.red} style={{ marginTop: 6 }}>
                          {stats.trainingDays}<span style={{ fontSize: 22, color: C.border }}>/5</span>
                        </BigNum>
                        <div style={{ color: C.textDim, fontSize: 11, marginTop: 4 }}>target: Tue–Sat</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <MiniLabel>Week Compliance</MiniLabel>
                        <BigNum size={44} color={scoreColor(stats.compliance, 100)} style={{ marginTop: 6 }}>
                          {stats.compliance}<span style={{ fontSize: 22, color: C.border }}>%</span>
                        </BigNum>
                        <div style={{ color: C.textDim, fontSize: 11, marginTop: 4 }}>{stats.totalScore}/{stats.maxPossible} pts</div>
                      </div>
                    </div>
                  </Card>

                  {/* Day by day */}
                  <Card style={{ padding: 0, overflow: "hidden" }}>
                    <div style={{ padding: "18px 20px 10px" }}><div className="section-title" style={{ fontSize: 12, marginBottom: 0 }}>Day-by-Day</div></div>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                        <thead>
                          <tr style={{ background: C.surfaceHigh }}>
                            {["Date", "Weight", "Cal", "Pro", "Steps", "Training", "Score"].map(h => (
                              <th key={h} className="tbl-th">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {weekLogs.map((row, i) => {
                            const calHit = row.calories && parseInt(row.calories) >= CALORIES_MIN && parseInt(row.calories) <= CALORIES_MAX;
                            const proHit = row.protein && parseInt(row.protein) >= PROTEIN_MIN;
                            const stepHit = row.steps && parseInt(row.steps) >= STEPS_MIN;
                            return (
                              <tr key={row.date} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                <td className="tbl-td" style={{ color: C.textMid }}>{row.date.slice(5)}</td>
                                <td className="tbl-td" style={{ color: C.accent }}>{row.weight || "—"}</td>
                                <td className="tbl-td" style={{ color: calHit ? "#4ade80" : row.calories ? C.red : C.textFaint }}>{row.calories || "—"}</td>
                                <td className="tbl-td" style={{ color: proHit ? "#4ade80" : row.protein ? C.red : C.textFaint }}>{row.protein ? row.protein + "g" : "—"}</td>
                                <td className="tbl-td" style={{ color: stepHit ? "#4ade80" : row.steps ? C.red : C.textFaint }}>{row.steps ? parseInt(row.steps).toLocaleString() : "—"}</td>
                                <td className="tbl-td" style={{ color: row.training ? "#4ade80" : C.textFaint, maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.training || "—"}</td>
                                <td className="tbl-td">
                                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: scoreColor(row.score) }}>{row.score ?? "—"}</span>
                                  <span style={{ fontSize: 10, color: C.textFaint }}>/4</span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Card>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button className="save-btn secondary" onClick={() => downloadReport(reportWeek)}>↓ Download Report</button>
                  </div>
                </>
              )}
            </div>
          );
        })()}


        {/* ══════════════════════════════════════════════
            PROGRESS PHOTOS
        ══════════════════════════════════════════════ */}
        {tab === "Progress Photos" && (() => {
          try {
          const isDue = daysSinceLastProgress === null || daysSinceLastProgress >= PROGRESS_INTERVAL_DAYS;
          const lastEntry = progressEntries.length > 0 ? progressEntries[progressEntries.length - 1] : null;
          const compareEntry = compareIdx !== null ? progressEntries[compareIdx] : (progressEntries.length >= 2 ? progressEntries[progressEntries.length - 2] : null);
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div className="section-title" style={{ marginBottom: 0 }}>Progress Photos</div>
                <MiniLabel>Every 2 weeks · Front / Side / Back / Video</MiniLabel>
              </div>

              {isDue && (
                <div style={{ background: `${C.accent}0a`, border: `1px solid ${C.accentMid}`, borderRadius: 8, padding: "12px 16px" }}>
                  <div style={{ color: C.accent, fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                    {daysSinceLastProgress === null ? "📸 Time for your first progress check-in" : `📸 Progress check-in due · ${daysSinceLastProgress} days since last`}
                  </div>
                  <div style={{ color: C.textDim, fontSize: 10, marginTop: 2 }}>Log front, side, back, and video below</div>
                </div>
              )}
              {!isDue && daysSinceLastProgress !== null && (
                <div style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 16px", color: C.textDim, fontSize: 11 }}>
                  Next check-in in <span style={{ color: C.accent }}>{PROGRESS_INTERVAL_DAYS - daysSinceLastProgress} days</span> · Last logged {lastEntry?.date}
                </div>
              )}

              <Card>
                <div className="section-title" style={{ fontSize: 12 }}>New Check-in</div>
                <FieldInput label="Date" style={{ marginBottom: 14 }}>
                  <input type="date" value={progressForm.date} onChange={e => setProgressForm(f => ({ ...f, date: e.target.value }))} style={{ maxWidth: 200 }} />
                </FieldInput>
                <div className="grid2" style={{ marginBottom: 14 }}>
                  {["front", "side", "side_flexed", "back"].map(angle => (
                    <div key={angle}>
                      <MiniLabel style={{ marginBottom: 6 }}>{angle.replace("_", " ")} photo</MiniLabel>
                      {!progressForm[angle] ? (
                        <UploadZone icon="📷" label={`Upload ${angle.replace("_", " ")}`} onFile={f => handleProgressMedia(f, angle)} />
                      ) : (
                        <div style={{ position: "relative" }}>
                          <img src={progressForm[angle]} alt={angle} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }} />
                          <label style={{ position: "absolute", bottom: 6, right: 6, background: "#00000088", color: C.text, fontSize: 9, padding: "3px 8px", borderRadius: 3, cursor: "pointer", letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                            REPLACE <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleProgressMedia(e.target.files[0], angle)} />
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <FieldInput label="Video" style={{ marginBottom: 14 }}>
                  {!progressForm.video ? (
                    <UploadZone icon="🎥" label="Upload video" onFile={f => handleProgressMedia(f, "video")} accept="video/*" />
                  ) : (
                    <div style={{ position: "relative" }}>
                      <video src={progressForm.video} style={{ width: "100%", maxHeight: 200, borderRadius: 6 }} controls />
                      <label style={{ position: "absolute", bottom: 6, right: 6, background: "#00000088", color: C.text, fontSize: 9, padding: "3px 8px", borderRadius: 3, cursor: "pointer", letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                        REPLACE <input type="file" accept="video/*" style={{ display: "none" }} onChange={e => handleProgressMedia(e.target.files[0], "video")} />
                      </label>
                    </div>
                  )}
                </FieldInput>
                <FieldInput label="Notes (optional)" style={{ marginBottom: 18 }}>
                  <textarea rows={2} placeholder="How are you feeling? Any observations..." value={progressForm.notes} onChange={e => setProgressForm(f => ({ ...f, notes: e.target.value }))} style={{ resize: "vertical" }} />
                </FieldInput>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="save-btn" onClick={saveProgressEntry}>{progressSaved ? "Saved ✓" : "Save Check-in"}</button>
                </div>
              </Card>

              {/* Comparison */}
              {lastEntry && (
                <Card>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div className="section-title" style={{ fontSize: 12, marginBottom: 0 }}>Before / After</div>
                    {progressEntries.length > 1 && (
                      <select value={compareIdx ?? ""} onChange={e => setCompareIdx(e.target.value === "" ? null : parseInt(e.target.value))} style={{ width: "auto", fontSize: 11 }}>
                        <option value="">Auto (2nd latest)</option>
                        {progressEntries.slice(0, -1).map((e, i) => <option key={e.date} value={i}>{e.date}</option>)}
                      </select>
                    )}
                  </div>
                  {["front", "side", "side_flexed", "back"].map(angle => {
                    const latestImg = lastEntry?.[angle];
                    const compareImg = compareEntry?.[angle];
                    if (!latestImg && !compareImg) return null;
                    return (
                      <div key={angle} style={{ marginBottom: 20 }}>
                        <MiniLabel style={{ marginBottom: 8 }}>{angle.replace("_", " ")}</MiniLabel>
                        <div style={{ display: "grid", gridTemplateColumns: compareImg ? "1fr 1fr" : "1fr", gap: 8 }}>
                          {compareImg && (
                            <div>
                              <div style={{ color: C.textDim, fontSize: 9, letterSpacing: "0.1em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 4 }}>BEFORE · {compareEntry.date}</div>
                              <img src={compareImg} alt={`before ${angle}`} style={{ width: "100%", borderRadius: 6, objectFit: "cover", maxHeight: 280 }} />
                            </div>
                          )}
                          {latestImg && (
                            <div>
                              <div style={{ color: C.accent, fontSize: 9, letterSpacing: "0.1em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 4 }}>LATEST · {lastEntry.date}</div>
                              <img src={latestImg} alt={`latest ${angle}`} style={{ width: "100%", borderRadius: 6, objectFit: "cover", maxHeight: 280 }} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </Card>
              )}

              {progressEntries.length > 0 && (
                <Card>
                  <div className="section-title" style={{ fontSize: 12 }}>All Check-ins</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[...progressEntries].reverse().map((entry, i) => (
                      <div key={entry.date} style={{ borderBottom: i < progressEntries.length - 1 ? `1px solid ${C.border}` : "none", paddingBottom: i < progressEntries.length - 1 ? 16 : 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: C.accent }}>{entry.date}</div>
                          {(() => { const log = logs.find(l => l.date === entry.date); return log?.weight ? <div style={{ color: C.textMid, fontSize: 11 }}>{log.weight} lb{log.bodyFat ? ` · ${log.bodyFat}% fat` : ""}</div> : null; })()}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: entry.video ? 8 : 0 }}>
                          {["front", "side", "side_flexed", "back"].map(angle => entry[angle] ? (
                            <div key={angle}>
                              <MiniLabel style={{ marginBottom: 3 }}>{angle.replace("_", " ")}</MiniLabel>
                              <img src={entry[angle]} alt={angle} style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 4 }} />
                            </div>
                          ) : null)}
                        </div>
                        {entry.video && <div style={{ marginTop: 6 }}><MiniLabel style={{ marginBottom: 3 }}>Video</MiniLabel><video src={entry.video} style={{ width: "100%", maxHeight: 200, borderRadius: 4 }} controls /></div>}
                        {entry.notes && <div style={{ color: C.textMid, fontSize: 11, marginTop: 8, fontStyle: "italic" }}>"{entry.notes}"</div>}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          );
          } catch(e) {
            return <Card style={{ color: C.red, textAlign: "center", padding: 40 }}>Something went wrong. Try refreshing.</Card>;
          }
        })()}

      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "10px 20px", display: "flex", justifyContent: "space-between", color: C.textFaint, fontSize: 10, letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
        <span>TARGETS: 1700–1800 kcal · ≥120g protein · ≥8000 steps</span>
        <span>WEIGH-INS: TUE · THU · SAT · TRAINING: TUE–SAT</span>
      </div>
    </div>
  );
}
