import { useState, useEffect, useRef } from "react";

// Inline SVG icons — no external dependency
const Icon = ({ d, size = 16, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} {...p}>{d}</svg>
);
const LayoutDashboard = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>} />;
const Utensils = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></>} />;
const Dumbbell = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><rect x="2" y="10" width="4" height="4" rx="1"/><rect x="18" y="10" width="4" height="4" rx="1"/><rect x="5" y="8" width="3" height="8" rx="1"/><rect x="16" y="8" width="3" height="8" rx="1"/><line x1="8" y1="12" x2="16" y2="12" strokeWidth="2"/></>} />;
const Scale = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></>} />;
const BarChart2 = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>} />;
const Camera = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></>} />;
const Zap = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>} />;
const ChevronRight = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><polyline points="9 18 15 12 9 6"/></>} />;
const Bell = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>} />;
const BookTemplate = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="12" y1="7" x2="16" y2="7"/><line x1="12" y1="11" x2="16" y2="11"/></>} />;
const TrendingDown = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></>} />;
const Trophy = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></>} />;
const Trash2 = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></>} />;
const Download = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>} />;
const Sun = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>} />;
const Moon = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>} />;
const RefreshCw = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>} />;
const Medal = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>} />;
const Activity = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>} />;
const ChevronLeft = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><polyline points="15 18 9 12 15 6"/></>} />;
const Settings2 = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></>} />;
const Droplets = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></>} />;
const Plus = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} />;
const Minus = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><line x1="5" y1="12" x2="19" y2="12"/></>} />;
const Check = ({ size = 16, ...p }) => <Icon size={size} {...p} d={<><polyline points="20 6 9 17 4 12"/></>} />;

// Animated counter hook
function useCountUp(target, duration = 600, active = true) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);
  useEffect(() => {
    if (!active) return;
    const num = parseFloat(target);
    if (isNaN(num)) { setVal(target); return; }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal((num * ease).toFixed(num % 1 === 0 ? 0 : 1));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active]);
  return val;
}

// Skeleton shimmer component
function Skeleton({ w = "100%", h = 20, r = 6 }) {
  return <div style={{ width: w, height: h, borderRadius: r, background: "linear-gradient(90deg,#0f1623 25%,#1e2d4088 50%,#0f1623 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />;
}

// Swipe hook
function useSwipe(onLeft, onRight) {
  const startX = useRef(null);
  return {
    onTouchStart: e => { startX.current = e.touches[0].clientX; },
    onTouchEnd: e => {
      if (startX.current === null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(dx) > 60) { dx < 0 ? onLeft() : onRight(); }
      startX.current = null;
    }
  };
}

function haptic(type = "light") {
  if (!navigator.vibrate) return;
  if (type === "light") navigator.vibrate(8);
  if (type === "success") navigator.vibrate([10, 50, 10]);
  if (type === "error") navigator.vibrate([30, 20, 30]);
  if (type === "pr") navigator.vibrate([20, 40, 20, 40, 60]);
  if (type === "milestone") navigator.vibrate([50, 30, 50, 30, 50, 30, 100]);
  if (type === "perfect") navigator.vibrate([30, 20, 30, 20, 30, 20, 80]);
}

// Smooth value transition hook — animates between old and new value on change
function useAnimatedValue(value, duration = 500) {
  const [display, setDisplay] = useState(value);
  const [prev, setPrev] = useState(value);
  const rafRef = useRef(null);
  useEffect(() => {
    if (value === prev) return;
    const numNew = parseFloat(value), numPrev = parseFloat(prev);
    if (isNaN(numNew) || isNaN(numPrev)) { setDisplay(value); setPrev(value); return; }
    const start = performance.now();
    const isFloat = String(value).includes(".");
    const dec = isFloat ? (String(value).split(".")[1]?.length || 1) : 0;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const cur = numPrev + (numNew - numPrev) * ease;
      setDisplay(cur.toFixed(dec));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else { setDisplay(value); setPrev(value); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);
  return display;
}

function fmt(n, dec = 0) {
  if (n == null || n === "" || isNaN(Number(n))) return "—";
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

const DEFAULTS = {
  goalWeight: 160,
  startWeight: 210,
  deadline: "2025-08-23",
  caloriesMin: 1400,
  caloriesMax: 1800,
  proteinMin: 120,
  stepsMin: 8000,
  userName: "Ellen",
  waterGoal: 8,
};

function getSettings() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem("dat-settings") || "{}") }; }
  catch { return DEFAULTS; }
}

const GOAL_WEIGHT = DEFAULTS.goalWeight;
const START_WEIGHT = DEFAULTS.startWeight;
const DEADLINE = DEFAULTS.deadline;
const CALORIES_MIN = DEFAULTS.caloriesMin;
const CALORIES_MAX = DEFAULTS.caloriesMax;
const PROTEIN_MIN = DEFAULTS.proteinMin;
const STEPS_MIN = DEFAULTS.stepsMin;
const STORAGE_KEY = "fat-loss-log-v1";
const BREAKFAST = { calories: 310, protein: 43, mealName: "Matcha Latte Protein (1 scoop) + High Protein Milk 2% (1.06 cups)" };

function getLocalDateStr(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function getDaysBetween(a, b) {
  const toDate = s => new Date(s + "T12:00:00");
  return Math.round((toDate(b) - toDate(a)) / 86400000);
}
function getDeadlineDays() {
  return getDaysBetween(getLocalDateStr(), DEADLINE);
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

// Get the Sunday-starting week key for a date string
function getWeekKey(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDay(); // 0=Sun
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - day);
  return getLocalDateStr(sunday);
}

function getWeekLogs(logs, weekStartStr) {
  return logs.filter(l => getWeekKey(l.date) === weekStartStr);
}

function getCurrentWeekStart() {
  return getWeekKey(getLocalDateStr());
}

function getPreviousWeekStart() {
  const d = new Date(getCurrentWeekStart());
  d.setDate(d.getDate() - 7);
  return getLocalDateStr(d);
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
  const bestDay = weekLogs.length ? weekLogs.reduce((b, l) => (l.score || 0) > (b.score || 0) ? l : b, weekLogs[0]) : null;
  const worstDay = weekLogs.length ? weekLogs.reduce((b, l) => (l.score || 0) < (b.score || 0) ? l : b, weekLogs[0]) : null;
  const totalScore = weekLogs.reduce((s, l) => s + (l.score || 0), 0);
  // Smart max with max 2 rest days cap
  let restCount = 0;
  const maxPossible = weekLogs.reduce((s, l) => {
    const trained = l.training && l.training.trim() !== "";
    const isRest = !trained && restCount < 2;
    if (!trained) restCount++;
    return s + (isRest ? 3 : 4);
  }, 0);
  const compliance = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;
  return {
    avgCals, avgPro, avgSteps, startW, endW, weekLoss,
    bestDay, worstDay, compliance, totalScore, maxPossible,
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
  const weekLabel = `${weekStart} – ${getLocalDateStr(weekEnd)}`;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Weekly Report · ${weekLabel}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bebas+Neue&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #07080d; color: #e2e8f0; font-family: 'DM Mono', monospace; font-size: 12px; padding: 40px; }
  h1 { font-family: 'Bebas Neue', sans-serif; font-size: 42px; color: #10b981; letter-spacing: 4px; }
  h2 { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: #10b981; letter-spacing: 3px; margin: 28px 0 14px; }
  .sub { color: #475569; font-size: 11px; letter-spacing: 1px; margin-top: 4px; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 8px; }
  .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 8px; }
  .card { background: #0c0e18; border: 1px solid #131929; border-radius: 10px; padding: 16px; }
  .big { font-family: 'Bebas Neue', sans-serif; font-size: 40px; line-height: 1; }
  .label { color: #475569; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
  .green { color: #34d399; } .red { color: #f87171; } .yellow { color: #fbbf24; } .cyan { color: #10b981; }
  .bar-bg { height: 4px; background: #131929; border-radius: 2px; margin-top: 8px; }
  .bar-fill { height: 4px; border-radius: 2px; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 8px; }
  th { color: #475569; font-weight: 400; letter-spacing: 1px; text-transform: uppercase; padding: 6px 10px; text-align: left; border-bottom: 1px solid #131929; }
  td { padding: 6px 10px; border-bottom: 1px solid #0c0e18; }
  tr:nth-child(even) { background: #0b0d15; }
  .footer { margin-top: 40px; color: #334155; font-size: 10px; letter-spacing: 1px; border-top: 1px solid #131929; padding-top: 16px; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style>
</head>
<body>
<h1>WEEKLY REPORT</h1>
<div class="sub">${weekLabel} · Daily Accountability Tracker</div>

<h2>WEIGHT</h2>
<div class="grid">
  <div class="card">
    <div class="label">Week Start</div>
    <div class="big cyan">${stats.startW || '—'}</div>
    <div class="sub">lb</div>
  </div>
  <div class="card">
    <div class="label">Week End</div>
    <div class="big cyan">${stats.endW || '—'}</div>
    <div class="sub">lb</div>
  </div>
  <div class="card">
    <div class="label">Week Loss</div>
    <div class="big ${stats.weekLoss && parseFloat(stats.weekLoss) > 0 ? 'green' : 'red'}">${stats.weekLoss ? (parseFloat(stats.weekLoss) > 0 ? '-' : '+') + Math.abs(stats.weekLoss) : '—'}</div>
    <div class="sub">lb this week</div>
  </div>
</div>
<div class="grid2">
  <div class="card">
    <div class="label">Projected Aug 23</div>
    <div class="big ${projected && parseFloat(projected) <= GOAL_WEIGHT ? 'green' : projected && parseFloat(projected) <= GOAL_WEIGHT + 5 ? 'yellow' : 'red'}">${projected || '—'}</div>
    <div class="sub">${projected ? (parseFloat(projected) <= GOAL_WEIGHT ? '✓ on track for 160' : `${(parseFloat(projected) - GOAL_WEIGHT).toFixed(1)} lb above goal`) : 'need more weigh-ins'}</div>
  </div>
  <div class="card">
    <div class="label">Total Lost Since Start</div>
    <div class="big green">${stats.endW ? (START_WEIGHT - stats.endW).toFixed(1) : '—'}</div>
    <div class="sub">lb from ${START_WEIGHT} lb</div>
  </div>
</div>

<h2>NUTRITION</h2>
<div class="grid">
  <div class="card">
    <div class="label">Avg Calories</div>
    <div class="big ${stats.avgCals && stats.avgCals >= CALORIES_MIN && stats.avgCals <= CALORIES_MAX ? 'green' : stats.avgCals ? 'red' : 'cyan'}">${stats.avgCals || '—'}</div>
    <div class="sub">target 1400–1800</div>
    <div class="bar-bg"><div class="bar-fill" style="width:${stats.avgCals ? Math.min(100, Math.round(stats.avgCals / CALORIES_MAX * 100)) : 0}%; background:${stats.avgCals && stats.avgCals >= CALORIES_MIN && stats.avgCals <= CALORIES_MAX ? '#34d399' : '#f87171'}"></div></div>
  </div>
  <div class="card">
    <div class="label">Avg Protein</div>
    <div class="big ${stats.avgPro && stats.avgPro >= PROTEIN_MIN ? 'green' : stats.avgPro ? 'yellow' : 'cyan'}">${stats.avgPro ? stats.avgPro + 'g' : '—'}</div>
    <div class="sub">target ≥120g</div>
    <div class="bar-bg"><div class="bar-fill" style="width:${stats.avgPro ? Math.min(100, Math.round(stats.avgPro / PROTEIN_MIN * 100)) : 0}%; background:${stats.avgPro && stats.avgPro >= PROTEIN_MIN ? '#34d399' : '#fbbf24'}"></div></div>
  </div>
  <div class="card">
    <div class="label">Avg Steps</div>
    <div class="big ${stats.avgSteps && stats.avgSteps >= STEPS_MIN ? 'green' : stats.avgSteps ? 'red' : 'cyan'}">${stats.avgSteps ? stats.avgSteps.toLocaleString() : '—'}</div>
    <div class="sub">target ≥8,000</div>
    <div class="bar-bg"><div class="bar-fill" style="width:${stats.avgSteps ? Math.min(100, Math.round(stats.avgSteps / STEPS_MIN * 100)) : 0}%; background:${stats.avgSteps && stats.avgSteps >= STEPS_MIN ? '#34d399' : '#f87171'}"></div></div>
  </div>
</div>
<div class="grid">
  <div class="card">
    <div class="label">Calorie Goal Hit</div>
    <div class="big ${stats.calHitRate >= 80 ? 'green' : stats.calHitRate >= 50 ? 'yellow' : 'red'}">${stats.calHitRate}%</div>
    <div class="sub">of logged days</div>
  </div>
  <div class="card">
    <div class="label">Protein Goal Hit</div>
    <div class="big ${stats.proHitRate >= 80 ? 'green' : stats.proHitRate >= 50 ? 'yellow' : 'red'}">${stats.proHitRate}%</div>
    <div class="sub">of logged days</div>
  </div>
  <div class="card">
    <div class="label">Steps Goal Hit</div>
    <div class="big ${stats.stepHitRate >= 80 ? 'green' : stats.stepHitRate >= 50 ? 'yellow' : 'red'}">${stats.stepHitRate}%</div>
    <div class="sub">of logged days</div>
  </div>
</div>

<h2>TRAINING</h2>
<div class="grid2">
  <div class="card">
    <div class="label">Training Days</div>
    <div class="big ${stats.trainingDays >= 5 ? 'green' : stats.trainingDays >= 3 ? 'yellow' : 'red'}">${stats.trainingDays}<span style="font-size:20px;color:#475569"> / 5</span></div>
    <div class="sub">target: Tue–Sat</div>
  </div>
  <div class="card">
    <div class="label">Overall Compliance</div>
    <div class="big ${stats.compliance >= 80 ? 'green' : stats.compliance >= 60 ? 'yellow' : 'red'}">${stats.compliance}%</div>
    <div class="sub">${stats.totalScore}/${stats.maxPossible} pts across ${stats.daysLogged} days</div>
  </div>
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
        <td style="color:#94a3b8">${row.date.slice(5)}</td>
        <td style="color:#10b981">${row.weight || '—'}</td>
        <td style="color:${calHit ? '#34d399' : row.calories ? '#f87171' : '#334155'}">${row.calories || '—'}</td>
        <td style="color:${proHit ? '#34d399' : row.protein ? '#f87171' : '#334155'}">${row.protein ? row.protein + 'g' : '—'}</td>
        <td style="color:#60a5fa">${row.steps ? parseInt(row.steps).toLocaleString() : '—'}</td>
        <td style="color:${row.training ? '#34d399' : '#334155'}">${row.training || '—'}</td>
        <td style="color:${row.score === 4 ? '#34d399' : row.score >= 3 ? '#fbbf24' : '#f87171'};font-family:'Bebas Neue',sans-serif;font-size:18px">${row.score ?? '—'}/4</td>
      </tr>`;
    }).join('')}
  </tbody>
</table>

<div class="footer">
  LOCKED IN · Generated ${new Date().toLocaleDateString()} · Goal: 210 → 160 lb by Aug 23, 2025
</div>
</body>
</html>`;
}

async function parseMealScreenshot(base64Image, mealType, mediaType = "image/jpeg") {
  const response = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: [
        { type: "image", source: { type: "base64", media_type: mediaType, data: base64Image } },
        { type: "text", text: `This is a nutrition tracking app screenshot for a ${mealType} meal. Extract the following and respond ONLY with valid JSON, no markdown, no explanation:\n{\n  "mealName": "brief description of what was eaten",\n  "calories": number or null,\n  "protein": number or null,\n  "notes": "any relevant notes about the meal"\n}\nIf calories or protein are not visible, return null for those fields. Estimate if needed based on food items shown.` }
      ]}]
    })
  });
  const data = await response.json();
  if (!data.content) throw new Error(data.error?.message || JSON.stringify(data));
  const text = data.content.map(i => i.text || "").join("");
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

async function parseScaleScreenshot(base64Image) {
  const response = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      messages: [{ role: "user", content: [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Image } },
        { type: "text", text: `Look at this RENPHO scale screenshot and extract the numbers. Reply with ONLY this JSON, no markdown, no explanation, just fill in the numbers:\n{"weight":0,"bodyFat":0,"muscleMass":0,"visceralFat":0}\nweight in lbs, bodyFat as percentage number, muscleMass in lbs, visceralFat as rating number. Use null for any value not visible in the screenshot.` }
      ]}]
    })
  });
  const data = await response.json();
  if (!data.content) throw new Error(`API error: ${JSON.stringify(data).slice(0, 200)}`);
  const text = data.content.map(i => i.text || "").join("");
  console.log("Scale Claude response:", text);
  const jsonMatch = text.match(/\{[\s\S]*?\}/);
  if (!jsonMatch) throw new Error(`No JSON found in response: "${text.slice(0, 100)}"`);
  return JSON.parse(jsonMatch[0]);
}


function getLoggingStreak(logs) {
  const qualifiedLogs = logs.filter(l =>
    (l.calories && parseInt(l.calories) > 0) ||
    (l.steps && parseInt(l.steps) > 0) ||
    (l.protein && parseInt(l.protein) > 0) ||
    (l.training && l.training.trim() !== "")
  );
  if (!qualifiedLogs.length) return 0;
  const sorted = [...qualifiedLogs].sort((a, b) => b.date.localeCompare(a.date));
  const today = getLocalDateStr();
  const yesterday = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return getLocalDateStr(d); })();
  if (sorted[0].date !== today && sorted[0].date !== yesterday) return 0;
  let streak = 0;
  let checkDate = sorted[0].date === today ? new Date() : new Date(yesterday + "T12:00:00");
  for (const log of sorted) {
    const logDate = getLocalDateStr(new Date(log.date + "T12:00:00"));
    const expected = getLocalDateStr(checkDate);
    if (logDate === expected) { streak++; checkDate.setDate(checkDate.getDate() - 1); }
    else break;
  }
  return streak;
}

const TABS = ["Home", "Nutrition", "Training", "Weight Tracker", "Weekly Report", "Progress Photos", "Settings"];
const TRAINING_KEY = "fat-loss-training-v1";
const TEMPLATES_KEY = "dat-templates-v1";
const MILESTONES = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const PROGRESS_KEY = "fat-loss-progress-v1";
const PROGRESS_INTERVAL_DAYS = 30;
const ANGLES = ["front", "side", "side_flexed", "back", "video"];

function getDaysSinceLastProgress(entries) {
  if (!entries || entries.length === 0) return null;
  const last = entries[entries.length - 1];
  return getDaysBetween(last.date, getLocalDateStr());
}

const PRELOADED_FOODS = [
  { id: "pre-1", name: "Wonderful Pistachios Honey Roasted No Shells", brand: "Wonderful", calories: 180, protein: 6, carbs: 8, fat: 14, fiber: 2, sugar: 4, servingSize: "1 oz (28g)", basePer100g: { calories: 643, protein: 21, carbs: 29, fat: 50 } },
  { id: "pre-2", name: "Gardein Suprême Chick'n Tenders", brand: "Gardein", calories: 250, protein: 18, carbs: 22, fat: 9, fiber: 2, sugar: 1, servingSize: "3 pieces (approx 100g)", basePer100g: { calories: 250, protein: 18, carbs: 22, fat: 9 } },
  { id: "pre-3", name: "Steeves Sugar Free Maple Syrup", brand: "Steeves Maples", calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, servingSize: "4 tbsp (60ml)", basePer100g: { calories: 0, protein: 0, carbs: 0, fat: 0 } },
  { id: "pre-4", name: "Lao Gan Ma Chili Oil with Peanuts", brand: "Laoganma", calories: 100, protein: 1, carbs: 4, fat: 10, fiber: 1, sugar: 0, servingSize: "1 tbsp (15g)", basePer100g: { calories: 628, protein: 7, carbs: 28, fat: 53 } },
  { id: "pre-5", name: "Oomé Maple Soy Smoked Tofu", brand: "Oomé", calories: 190, protein: 19, carbs: 6, fat: 11, fiber: 1, sugar: 3, servingSize: "per 100g", basePer100g: { calories: 190, protein: 19, carbs: 6, fat: 11 } },
  { id: "pre-6", name: "Annie's Shells & White Cheddar Mac & Cheese", brand: "Annie's", calories: 260, protein: 10, carbs: 48, fat: 3, fiber: 2, sugar: 5, servingSize: "1 serving dry (about ⅓ box)", basePer100g: { calories: 370, protein: 14, carbs: 69, fat: 4 } },
  { id: "pre-7", name: "Annie's Shells & White Cheddar Mac & Cheese (whole box prepared)", brand: "Annie's", calories: 780, protein: 30, carbs: 144, fat: 9, fiber: 6, sugar: 15, servingSize: "whole box prepared", basePer100g: { calories: 370, protein: 14, carbs: 69, fat: 4 } },
  { id: "pre-8", name: "Arbonne Feel Fit Vanilla Protein Shake", brand: "Arbonne", calories: 160, protein: 20, carbs: 19, fat: 3, fiber: 6, sugar: 6, servingSize: "2 scoops (42g)", basePer100g: { calories: 381, protein: 48, carbs: 45, fat: 7 } },
];

export default function App() {
  const [tab, setTab] = useState("Home");
  const [logs, setLogs] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const today = getLocalDateStr();
      const tomorrow = (() => { const d = new Date(); d.setDate(d.getDate() + 1); return getLocalDateStr(d); })();
      const fixed = stored.map(l => l.date === tomorrow ? { ...l, date: today } : l);

      // Inject historical days if not already present
      const historicalDays = [
        { date: "2026-03-19", calories: "1440", protein: "128", fiber: "7", sugar: "25", steps: "8353", training: "", weight: "", bodyFat: "", muscleMass: "", visceralFat: "" },
        { date: "2026-03-20", calories: "1445", protein: "126", fiber: "40", sugar: "38", steps: "9100", training: "", weight: "", bodyFat: "", muscleMass: "", visceralFat: "" },
        { date: "2026-03-21", calories: "1874", protein: "139", steps: "9472", training: "", weight: "205.0", bodyFat: "44.5", muscleMass: "107.2", visceralFat: "17" },
      ];
      historicalDays.forEach(day => {
        const existing = fixed.find(l => l.date === day.date);
        if (!existing) {
          fixed.push({ ...day, score: calcScore(day) });
        } else {
          // Force-merge all fields from historical data (overwrite blanks AND update steps/nutrition)
          Object.keys(day).forEach(k => { if (day[k]) existing[k] = day[k]; });
          existing.score = calcScore(existing);
        }
      });

      const merged = Object.values(fixed.reduce((acc, l) => {
        if (!acc[l.date]) { acc[l.date] = l; }
        else {
          acc[l.date] = { ...acc[l.date] };
          Object.keys(l).forEach(k => { if (l[k] && !acc[l.date][k]) acc[l.date][k] = l[k]; });
          acc[l.date].score = calcScore(acc[l.date]);
        }
        return acc;
      }, {})).sort((a, b) => a.date.localeCompare(b.date));
      return merged;
    } catch { return []; }
  });
  const [form, setForm] = useState({
    date: getLocalDateStr(),
    weight: "", bodyFat: "", muscleMass: "", visceralFat: "",
    calories: "", protein: "", steps: "", training: "",
    lunch: "", dinner: "", anchor: "", notes: ""
  });
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState(() => getSettings());
  const [waterCups, setWaterCups] = useState(() => {
    try { const w = JSON.parse(localStorage.getItem("dat-water") || "{}"); return w[getLocalDateStr()] || 0; } catch { return 0; }
  });
  const [waterUnit, setWaterUnit] = useState(() => localStorage.getItem("dat-water-unit") || "L");
  const [localSettings, setLocalSettings] = useState(() => getSettings());
  useEffect(() => { setLocalSettings(settings); }, [JSON.stringify(settings)]);
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem("dat-onboarded"));
  const [onboardStep, setOnboardStep] = useState(0);
  const [onboardData, setOnboardData] = useState({ userName: "", goalWeight: "", startWeight: "", deadline: "", caloriesMin: "", caloriesMax: "", proteinMin: "", stepsMin: "" });

  // Derived settings values — these shadow the module-level constants throughout the component
  const S_GOAL_WEIGHT = settings.goalWeight;
  const S_START_WEIGHT = settings.startWeight;
  const S_DEADLINE = settings.deadline;
  const S_CALORIES_MIN = settings.caloriesMin;
  const S_CALORIES_MAX = settings.caloriesMax;
  const S_PROTEIN_MIN = settings.proteinMin;
  const S_STEPS_MIN = settings.stepsMin;
  const S_WATER_GOAL = settings.waterGoal || 8;
  // Override module constants with live settings inside component
  const CALORIES_MIN = S_CALORIES_MIN; // eslint-disable-line no-shadow
  const CALORIES_MAX = S_CALORIES_MAX; // eslint-disable-line no-shadow
  const PROTEIN_MIN = S_PROTEIN_MIN;   // eslint-disable-line no-shadow
  const STEPS_MIN = S_STEPS_MIN;       // eslint-disable-line no-shadow
  const GOAL_WEIGHT = S_GOAL_WEIGHT;   // eslint-disable-line no-shadow
  const START_WEIGHT = S_START_WEIGHT; // eslint-disable-line no-shadow
  const DEADLINE = S_DEADLINE;         // eslint-disable-line no-shadow

  function saveSettings(newSettings) {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    localStorage.setItem("dat-settings", JSON.stringify(merged));
  }

  // Water unit helpers
  const WATER_UNITS = [
    { id: "halfL", label: "½L", ml: 500 },
    { id: "L",     label: "L",  ml: 1000 },
    { id: "gal",   label: "gal",ml: 3785 },
  ];
  // Water goal stored in ml (default 2000ml = 2L)
  const [waterGoalMlState, setWaterGoalMlState] = useState(() => parseInt(localStorage.getItem("dat-water-goal-ml") || "2000"));
  function saveWaterGoalMl(ml) { setWaterGoalMlState(ml); localStorage.setItem("dat-water-goal-ml", ml); }
  function waterUnitMl() { return WATER_UNITS.find(u => u.id === waterUnit)?.ml || 1000; }
  function waterTotalMl() { return waterCups * waterUnitMl(); }
  function waterGoalDisplay() {
    const ml = waterGoalMlState;
    if (waterUnit === "halfL") return parseFloat((ml / 500).toFixed(1));
    if (waterUnit === "L")     return parseFloat((ml / 1000).toFixed(2));
    if (waterUnit === "gal")   return parseFloat((ml / 3785).toFixed(2));
    return ml;
  }
  function waterDisplayVal() {
    const ml = waterTotalMl();
    if (waterUnit === "halfL") return parseFloat((ml / 500).toFixed(1));
    if (waterUnit === "L")     return parseFloat((ml / 1000).toFixed(2));
    if (waterUnit === "gal")   return parseFloat((ml / 3785).toFixed(2));
    return ml;
  }
  function addWater() {
    const next = Math.min(waterCups + 1, 40);
    setWaterCups(next);
    const all = JSON.parse(localStorage.getItem("dat-water") || "{}");
    all[getLocalDateStr()] = next;
    localStorage.setItem("dat-water", JSON.stringify(all));
    haptic("light");
  }
  function removeWater() {
    const next = Math.max(waterCups - 1, 0);
    setWaterCups(next);
    const all = JSON.parse(localStorage.getItem("dat-water") || "{}");
    all[getLocalDateStr()] = next;
    localStorage.setItem("dat-water", JSON.stringify(all));
  }
  const [mealUploads, setMealUploads] = useState({ lunch: null, dinner: null, anchor: null });
  const [mealParsing, setMealParsing] = useState({ lunch: false, dinner: false, anchor: false });
  const [mealResults, setMealResults] = useState({ lunch: null, dinner: null, anchor: null });
  const [mealError, setMealError] = useState({ lunch: null, dinner: null, anchor: null });

  // Macro tracker state
  const [foodSearch, setFoodSearch] = useState("");
  const [foodSearching, setFoodSearching] = useState(false);
  const [foodSearchPhase, setFoodSearchPhase] = useState(""); // "db" | "ai" | ""
  const [foodResults, setFoodResults] = useState(null);
  const [foodError, setFoodError] = useState(null);
  const [trackedFoods, setTrackedFoods] = useState(() => { try { return JSON.parse(localStorage.getItem("dat-tracked-foods") || "[]"); } catch { return []; } });
  const [favorites, setFavorites] = useState(() => { try { return JSON.parse(localStorage.getItem("dat-favorites") || "[]"); } catch { return []; } });
  const [recipes, setRecipes] = useState(() => { try { return JSON.parse(localStorage.getItem("dat-recipes") || "[]"); } catch { return []; } });
  const [recipeBuilder, setRecipeBuilder] = useState({ open: false, name: "", ingredients: [] });
  const [barcodeScanning, setBarcodeScanning] = useState(false);
  const [barcodeError, setBarcodeError] = useState(null);
  const [macroTab, setMacroTab] = useState("search");
  const videoRef = useRef(null);
  const barcodeStreamRef = useRef(null);

  // Meal-based nutrition system
  const MEAL_SLOTS = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const MEAL_ICONS = { Breakfast: "🌅", Lunch: "☀️", Dinner: "🌙", Snacks: "🍎" };
  const [mealFoods, setMealFoods] = useState(() => {
    try {
      const today = getLocalDateStr();
      // Try dated key first (most accurate), fall back to undated key
      const dated = localStorage.getItem(`dat-meal-foods-${today}`);
      if (dated) return JSON.parse(dated);
      return JSON.parse(localStorage.getItem("dat-meal-foods") || "{}");
    } catch { return {}; }
  });
  const [activeMealSlot, setActiveMealSlot] = useState(null);
  const [showManualMacros, setShowManualMacros] = useState(false);
  const [manualMacros, setManualMacros] = useState(() => { try { return JSON.parse(localStorage.getItem("dat-manual-macros") || "{}"); } catch { return {}; } });
  function getManualToday(date) { return manualMacros[date || getLocalDateStr()] || {}; }
  function saveManualMacro(field, val) {
    const today = getLocalDateStr();
    const updated = { ...manualMacros, [today]: { ...getManualToday(), [field]: val } };
    setManualMacros(updated);
    localStorage.setItem("dat-manual-macros", JSON.stringify(updated));
  }
  const [savedMeals, setSavedMeals] = useState(() => { try { return JSON.parse(localStorage.getItem("dat-saved-meals") || "[]"); } catch { return []; } });
  const [saveMealName, setSaveMealName] = useState("");
  const [saveMealSlot, setSaveMealSlot] = useState(null);
  const [loadMealPreview, setLoadMealPreview] = useState(null);
  const [personalFoods, setPersonalFoods] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("dat-personal-foods") || "[]");
      // Merge preloaded foods — add any that aren't already in the DB
      const storedIds = new Set(stored.map(f => f.id));
      const toAdd = PRELOADED_FOODS.filter(f => !storedIds.has(f.id));
      return [...stored, ...toAdd];
    } catch { return PRELOADED_FOODS; }
  });
  const [manualFoodForm, setManualFoodForm] = useState({ name: "", calories: "", protein: "", carbs: "", fat: "", fiber: "", sugar: "", servingSize: "1 serving" });
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [nutritionDate, setNutritionDate] = useState(getLocalDateStr());

  function navigateNutritionDate(newDate) {
    // Save current date's foods before navigating away
    localStorage.setItem(`dat-meal-foods-${nutritionDate}`, JSON.stringify(mealFoods));
    setNutritionDate(newDate);
    try {
      const stored = localStorage.getItem(`dat-meal-foods-${newDate}`);
      setMealFoods(stored ? JSON.parse(stored) : {});
    } catch { setMealFoods({}); }
  }
  const [editingFood, setEditingFood] = useState(null); // { slot, id, grams }
  const [pendingGrams, setPendingGrams] = useState(100); // grams before adding

  useEffect(() => { localStorage.setItem("dat-meal-foods", JSON.stringify(mealFoods)); }, [mealFoods]);

  // Auto-save today's meal totals to logs whenever foods change (merges, never overwrites steps/weight)
  useEffect(() => {
    if (nutritionDate > getLocalDateStr()) return; // don't log future dates
    const totals = getAllDayTotals();
    if (totals.calories === 0 && totals.protein === 0) return;
    setLogs(prevLogs => {
      const idx = prevLogs.findIndex(l => l.date === nutritionDate);
      const existing = idx >= 0 ? prevLogs[idx] : { date: nutritionDate };
      // Only update calories and protein — preserve everything else (steps, weight, training etc)
      const updated = { ...existing, calories: String(totals.calories), protein: String(totals.protein) };
      updated.score = calcScore(updated);
      if (idx >= 0) return prevLogs.map((l, i) => i === idx ? updated : l);
      return [...prevLogs, updated].sort((a, b) => a.date.localeCompare(b.date));
    });
  }, [mealFoods, manualMacros]);
  useEffect(() => { localStorage.setItem("dat-saved-meals", JSON.stringify(savedMeals)); }, [savedMeals]);
  useEffect(() => { localStorage.setItem("dat-personal-foods", JSON.stringify(personalFoods)); }, [personalFoods]);

  function addFoodToMeal(slot, food) {
    const item = { ...food, id: Date.now() + Math.random() };
    setMealFoods(m => ({ ...m, [slot]: [...(m[slot] || []), item] }));
    haptic("success");
  }

  function removeFoodFromMeal(slot, id) {
    setMealFoods(m => ({ ...m, [slot]: (m[slot] || []).filter(f => f.id !== id) }));
  }

  function updateFoodInMeal(slot, id, grams) {
    setMealFoods(m => ({
      ...m,
      [slot]: (m[slot] || []).map(f => {
        if (f.id !== id) return f;
        const base = f.basePer100g || { calories: f.calories, protein: f.protein, carbs: f.carbs, fat: f.fat };
        const multiplier = grams / 100;
        return {
          ...f,
          basePer100g: base,
          grams,
          calories: Math.round(base.calories * multiplier),
          protein: Math.round(base.protein * multiplier * 10) / 10,
          carbs: Math.round((base.carbs || 0) * multiplier * 10) / 10,
          fat: Math.round((base.fat || 0) * multiplier * 10) / 10,
          servingSize: `${grams}g`,
        };
      })
    }));
  }

  function getMealTotals(slot) {
    const foods = mealFoods[slot] || [];
    return { calories: foods.reduce((s, f) => s + (f.calories || 0), 0), protein: Math.round(foods.reduce((s, f) => s + (f.protein || 0), 0)) };
  }

  function saveMeal(slot) {
    const foods = mealFoods[slot] || [];
    if (!foods.length || !saveMealName.trim()) return;
    const meal = { id: Date.now(), name: saveMealName.trim(), slot, foods, calories: getMealTotals(slot).calories, protein: getMealTotals(slot).protein };
    setSavedMeals(m => [...m, meal]);
    setSaveMealName(""); setSaveMealSlot(null);
    haptic("success");
  }

  function loadSavedMeal(meal, slot) {
    // Show preview with adjustable servings
    setLoadMealPreview({ meal, slot, adjustments: meal.foods.map(f => ({ ...f, multiplier: 1 })) });
  }

  function confirmLoadMeal(meal, slot) {
    // Add as a single named entry — totals only, not individual items
    const item = {
      id: Date.now() + Math.random(),
      name: meal.name,
      brand: "Saved Meal",
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.foods?.reduce((s, f) => s + (f.carbs || 0), 0) || 0,
      fat: meal.foods?.reduce((s, f) => s + (f.fat || 0), 0) || 0,
      servingSize: `${meal.foods?.length || 1} items`,
      basePer100g: null,
    };
    setMealFoods(m => ({ ...m, [slot]: [...(m[slot] || []), item] }));
    haptic("success");
  }

  function savePersonalFood(food) {
    if (personalFoods.some(f => f.name.toLowerCase() === food.name.toLowerCase())) return;
    setPersonalFoods(pf => [...pf, { ...food, id: Date.now() }]);
    haptic("light");
  }

  function getRecentFoods() {
    const all = Object.values(mealFoods).flat();
    const seen = new Set();
    return all.filter(f => { if (seen.has(f.name)) return false; seen.add(f.name); return true; }).slice(-5).reverse();
  }

  function getAllDayTotals() {
    const manual = getManualToday();
    const fromFoods = MEAL_SLOTS.reduce((acc, slot) => {
      const t = getMealTotals(slot);
      return { calories: acc.calories + t.calories, protein: acc.protein + t.protein };
    }, { calories: 0, protein: 0 });
    return {
      calories: fromFoods.calories + (parseInt(manual.calories) || 0),
      protein: fromFoods.protein + (parseInt(manual.protein) || 0),
    };
  }
  function copyYesterdayMeals() {
    const prevDate = (() => { const d = new Date(nutritionDate + "T12:00:00"); d.setDate(d.getDate() - 1); return getLocalDateStr(d); })();
    const isViewingTomorrow = nutritionDate > getLocalDateStr();
    try {
      if (isViewingTomorrow) {
        // Copy live state (today) into tomorrow view
        if (Object.values(mealFoods).some(foods => foods.length > 0)) {
          setMealFoods({ ...mealFoods });
          haptic("success");
          return true;
        }
      } else {
        const yMeals = JSON.parse(localStorage.getItem(`dat-meal-foods-${prevDate}`) || "{}");
        if (Object.keys(yMeals).length > 0) {
          setMealFoods(yMeals);
          haptic("success");
          return true;
        }
      }
    } catch {}
    return false;
  }

  function copyYesterdaySlot(slot) {
    // "Yesterday" is relative to the currently viewed date, not real today
    const prevDate = (() => { const d = new Date(nutritionDate + "T12:00:00"); d.setDate(d.getDate() - 1); return getLocalDateStr(d); })();
    const prevKey = `dat-meal-foods-${prevDate}`;
    try {
      // If copying from today (when viewing tomorrow), use live mealFoods state
      const isViewingTomorrow = nutritionDate > getLocalDateStr();
      const prevSlotFoods = isViewingTomorrow
        ? (mealFoods[slot] || [])  // live state = today's foods
        : (JSON.parse(localStorage.getItem(prevKey) || "{}")[slot] || []);
      if (prevSlotFoods.length > 0) {
        const newItems = prevSlotFoods.map(f => ({ ...f, id: Date.now() + Math.random() }));
        setMealFoods(m => ({ ...m, [slot]: [...(m[slot] || []), ...newItems] }));
        haptic("success");
        return true;
      }
    } catch {}
    return false;
  }

  // Save today's meals with date key on change
  useEffect(() => {
    const key = `dat-meal-foods-${nutritionDate}`;
    localStorage.setItem(key, JSON.stringify(mealFoods));
  }, [mealFoods, nutritionDate]);

  async function searchFood(query) {
    if (!query.trim()) return;
    setFoodSearching(true); setFoodError(null); setFoodResults(null); setFoodSearchPhase("db");

    // Check personal foods + preloaded first — instant results
    const q = query.toLowerCase();
    const personalMatches = [...personalFoods, ...PRELOADED_FOODS.filter(pf => !personalFoods.some(f => f.id === pf.id))]
      .filter(f => f.name.toLowerCase().includes(q) || (f.brand || "").toLowerCase().includes(q));
    if (personalMatches.length > 0) {
      setFoodResults({ multiple: true, products: personalMatches });
      setFoodSearching(false); setFoodSearchPhase("");
      return;
    }
    try {
      const simplified = query
        .replace(/\d+\s*(cup|cups|oz|g|ml|lb|tbsp|tsp|serving|piece|pieces|slice|slices|scoop|scoops)s?\b/gi, "")
        .replace(/\b(high|low|plain|original|classic|organic|natural|light|non.fat|nonfat|fat.free|sugar.free|whole|2%|0%|1%)\b/gi, "")
        .trim().split(/\s+/).slice(0, 4).join(" ");

      // Detect if query is a specific branded/compound product — skip DB for these
      const words = query.trim().split(/\s+/);
      const isGeneric = words.length <= 2;
      const isBranded = /beyond|siggi|chobani|fairlife|quest|kind|rx bar|larabar|clif|premier|muscle|built|oikos|fage|stonyfield|dairyland|activia/i.test(query);

      let dbFound = false;
      if (isGeneric || isBranded) {
        try {
          const r = await fetch(`/api/claude?food_search=${encodeURIComponent(simplified || query)}`);
          if (r.ok) {
            const d = await r.json();
            if (d.found && d.products?.length > 0) {
              // Only filter if we have enough results — don't over-filter
              const queryWords = simplified.toLowerCase().split(/\s+/).filter(w => w.length > 2);
              const relevant = d.products.filter(p =>
                queryWords.some(w => p.name.toLowerCase().includes(w) || (p.brand || "").toLowerCase().includes(w))
              );
              const toShow = relevant.length > 0 ? relevant : d.products.slice(0, 4);
              setFoodResults({ multiple: true, products: toShow });
              dbFound = true;
            }
          }
        } catch { }
      }

      if (dbFound) return;

      setFoodSearchPhase("ai");
      try {
        const res = await fetch("/api/claude", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 400,
            messages: [{ role: "user", content: `Nutrition facts for "${query}". Reply with ONLY this JSON and nothing else:\n{"name":"${query}","brand":"","calories":0,"protein":0,"carbs":0,"fat":0,"servingSize":"1 serving","estimated":true}\nFill in the real numbers. No explanation, no markdown, just the JSON object.` }]
          })
        });
        const data = await res.json();
        const rawText = data.content?.filter(b => b.type === "text").map(b => b.text).join("") || data.content?.map(i => i.text||"").join("") || "";
        const jsonMatch = rawText.match(/\{[\s\S]*?\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.calories != null) {
            setFoodResults(parsed);
            return;
          }
        }
      } catch { /* fall through to manual */ }

      // Last resort — open manual entry pre-filled with the query
      setMacroTab("manual");
      setManualFoodForm(f => ({ ...f, name: query, calories: "", protein: "", carbs: "", fat: "", fiber: "", sugar: "" }));
      setFoodError(`"${query}" not found — fill in the nutrition below and add it to your database.`);
    } catch {
      // Open manual entry as absolute last resort
      setMacroTab("manual");
      setManualFoodForm(f => ({ ...f, name: query }));
      setFoodError(`Couldn't find "${query}" — enter the nutrition manually below.`);
    } finally { setFoodSearching(false); setFoodSearchPhase(""); }
  }

  function addTrackedFood(food) {
    const item = { ...food, id: Date.now() };
    setTrackedFoods(f => [...f, item]);
    haptic("success");
  }

  function removeTrackedFood(id) { setTrackedFoods(f => f.filter(x => x.id !== id)); }

  function saveFavorite(food) {
    if (favorites.some(f => f.name.toLowerCase() === food.name.toLowerCase())) return;
    setFavorites(f => [...f, { ...food, id: Date.now() }]);
    haptic("light");
  }

  function removeFavorite(id) { setFavorites(f => f.filter(x => x.id !== id)); }

  function saveRecipe() {
    if (!recipeBuilder.name.trim() || !recipeBuilder.ingredients.length) return;
    const totalCal = recipeBuilder.ingredients.reduce((s, i) => s + (i.calories || 0), 0);
    const totalPro = recipeBuilder.ingredients.reduce((s, i) => s + (i.protein || 0), 0);
    const recipe = { id: Date.now(), name: recipeBuilder.name, ingredients: recipeBuilder.ingredients, calories: totalCal, protein: totalPro };
    setRecipes(r => [...r, recipe]);
    setRecipeBuilder({ open: false, name: "", ingredients: [] });
    haptic("success");
  }

  async function scanBarcodeFromPhoto(file) {
    if (!file) return;
    setBarcodeError(null);
    setFoodSearching(true);
    setFoodResults(null);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const dataUrl = e.target.result;
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width; canvas.height = img.height;
          canvas.getContext("2d").drawImage(img, 0, 0);
          const base64 = canvas.toDataURL("image/jpeg", 0.9).split(",")[1];

          // Step 1: Claude reads the barcode number from the photo
          let barcode = null;
          try {
            const res = await fetch("/api/claude", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: "claude-sonnet-4-6",
                max_tokens: 50,
                messages: [{ role: "user", content: [
                  { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64 } },
                  { type: "text", text: "Read the barcode number from this image. Respond with ONLY the digits of the barcode — nothing else, no explanation. If you cannot see a barcode, respond with NONE." }
                ]}]
              })
            });
            const data = await res.json();
            const raw = data.content?.map(i => i.text || "").join("").trim().replace(/\D/g, "");
            if (raw && raw.length >= 6) barcode = raw;
          } catch { /* continue to fallback */ }

          if (!barcode) {
            setBarcodeError("Couldn't read the barcode. Make sure it's in focus and well-lit, or enter the number manually below.");
            setFoodSearching(false);
            return;
          }

          // Step 2: Look up barcode in real database via /api/food
          await lookupBarcode(barcode);
        };
        img.onerror = () => { setBarcodeError("Couldn't load image. Try again."); setFoodSearching(false); };
        img.src = dataUrl;
      } catch { setBarcodeError("Something went wrong. Try again."); setFoodSearching(false); }
    };
    reader.readAsDataURL(file);
  }

  async function lookupBarcode(barcode) {
    setFoodSearching(true); setFoodError(null); setFoodResults(null);
    try {
      // Try database first
      let found = false;
      try {
        const r = await fetch(`/api/claude?food_barcode=${encodeURIComponent(barcode)}`);
        if (r.ok) {
          const d = await r.json();
          if (d.found) { setFoodResults(d); found = true; }
        }
      } catch { /* fall through */ }

      if (!found) {
        // Claude estimation fallback
        const res = await fetch("/api/claude", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 400,
            messages: [{ role: "user", content: `Barcode: ${barcode}. Estimate nutrition per serving for this product. Respond ONLY with valid JSON:\n{"name":"product name","brand":"","calories":number,"protein":number,"carbs":number,"fat":number,"servingSize":"description","estimated":true}` }]
          })
        });
        const data = await res.json();
        const rawText = data.content?.map(i => i.text||"").join("").trim();
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON");
        const parsed = JSON.parse(jsonMatch[0]);
        setFoodResults(parsed);
      }
    } catch {
      setBarcodeError("Couldn't identify this product. Try searching by name instead.");
    } finally {
      setFoodSearching(false);
    }
  }

  async function lookupBarcodeManual(barcode) {
    if (!barcode.trim()) return;
    await lookupBarcode(barcode.trim());
  }
  const [reportWeek, setReportWeek] = useState(isSunday() ? getPreviousWeekStart() : getPreviousWeekStart());
  const [scaleUpload, setScaleUpload] = useState(null);
  const [scaleParsing, setScaleParsing] = useState(false);
  const [scaleResult, setScaleResult] = useState(null);
  const [scaleError, setScaleError] = useState(null);
  const [progressEntries, setProgressEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || []; } catch { return []; }
  });
  const [progressForm, setProgressForm] = useState({
    date: getLocalDateStr(),
    front: null, side: null, back: null, video: null, notes: ""
  });
  const [progressSaved, setProgressSaved] = useState(false);
  const [compareIdx, setCompareIdx] = useState(null);
  const [workouts, setWorkouts] = useState(() => {
    try { return JSON.parse(localStorage.getItem(TRAINING_KEY)) || []; } catch { return []; }
  });
  const [workoutForm, setWorkoutForm] = useState({
    date: getLocalDateStr(),
    name: "",
    exercises: [{ id: Date.now(), name: "", sets: [{ reps: "", weight: "" }] }]
  });
  const [workoutSaved, setWorkoutSaved] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showShortcutModal, setShowShortcutModal] = useState(false);
  const [viewedDate, setViewedDate] = useState(getLocalDateStr());
  const [showManualSteps, setShowManualSteps] = useState(false);
  const [manualStepsInput, setManualStepsInput] = useState("");
  const [showCircuitTimer, setShowCircuitTimer] = useState(false);
  const [summaryPeriod, setSummaryPeriod] = useState("7");
  const [showPlateCalc, setShowPlateCalc] = useState(false);
  const [plateWeight, setPlateWeight] = useState("");
  const [circuitPhase, setCircuitPhase] = useState("build");
  const [circuitRunning, setCircuitRunning] = useState(false);
  const [circuitConfig, setCircuitConfig] = useState({ work: 40, rest: 20, rounds: 4, restBetween: 60 });
  const [circuitState, setCircuitState] = useState({ round: 1, isWork: true, isBetween: false, secondsLeft: 40, done: false });
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [pageVisible, setPageVisible] = useState(true);
  const prevTabRef = useRef(tab);
  const [templates, setTemplates] = useState(() => { try { return JSON.parse(localStorage.getItem(TEMPLATES_KEY)) || []; } catch { return []; } });
  const [showConfetti, setShowConfetti] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(() => localStorage.getItem("dat-notif") === "true");
  const confettiRef = useRef(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("dat-dark") !== "light");

  // Sleep tracker
  const [sleepData, setSleepData] = useState(() => { try { return JSON.parse(localStorage.getItem("dat-sleep") || "{}"); } catch { return {}; } });
  function getSleepToday() { return sleepData[getLocalDateStr()] || { hours: "", quality: 0 }; }
  function saveSleep(field, val) {
    const today = getLocalDateStr();
    const updated = { ...sleepData, [today]: { ...getSleepToday(), [field]: val } };
    setSleepData(updated);
    localStorage.setItem("dat-sleep", JSON.stringify(updated));
  }

  // Cycle tracker
  const [cycleEnabled, setCycleEnabled] = useState(() => localStorage.getItem("dat-cycle-enabled") === "true");
  const [cycleData, setCycleData] = useState(() => { try { return JSON.parse(localStorage.getItem("dat-cycle") || "{}"); } catch { return {}; } });
  // cycleData shape: { periodDates: ["2026-03-01", ...], symptoms: { "2026-03-01": ["cramps","bloating",...] } }
  function saveCycleData(updated) { setCycleData(updated); localStorage.setItem("dat-cycle", JSON.stringify(updated)); }
  function togglePeriodDay(dateStr) {
    const dates = cycleData.periodDates || [];
    const updated = dates.includes(dateStr) ? dates.filter(d => d !== dateStr) : [...dates, dateStr].sort();
    saveCycleData({ ...cycleData, periodDates: updated });
  }
  function toggleSymptom(dateStr, symptom) {
    const symptoms = { ...(cycleData.symptoms || {}) };
    const daySx = symptoms[dateStr] || [];
    symptoms[dateStr] = daySx.includes(symptom) ? daySx.filter(s => s !== symptom) : [...daySx, symptom];
    saveCycleData({ ...cycleData, symptoms });
  }
  function getCycleDay(dateStr) {
    const dates = (cycleData.periodDates || []).filter(d => d <= dateStr).sort();
    if (!dates.length) return null;
    // Find last period start (gap > 1 day = new cycle)
    let lastStart = dates[0];
    for (let i = 1; i < dates.length; i++) {
      const diff = getDaysBetween(dates[i-1], dates[i]);
      if (diff > 2) lastStart = dates[i];
    }
    return getDaysBetween(lastStart, dateStr) + 1;
  }
  const CYCLE_SYMPTOMS = ["Cramps","Bloating","Headache","Fatigue","Spotting","Mood swings","Cravings","Backache"];
  const [milestone, setMilestone] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPulling, setIsPulling] = useState(false);
  const [monthViewOpen, setMonthViewOpen] = useState(false);
  const pageRef = useRef(null);
  const [bfGoal, setBfGoal] = useState(() => parseFloat(localStorage.getItem("dat-bf-goal")) || 20);
  const [showSparks, setShowSparks] = useState(false);
  const sparkContainerRef = useRef(null);
  const prevStreakRef = useRef(null);

  function triggerSparks() {
    setShowSparks(true);
    setTimeout(() => setShowSparks(false), 700);
  }

  function repeatYesterday() {
    const yesterday = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return getLocalDateStr(d); })();
    const yLog = logs.find(l => l.date === yesterday);
    if (!yLog) return;
    setForm(f => ({ ...f, calories: yLog.calories || "", protein: yLog.protein || "" }));
    haptic("light");
  }

  // Rest timer state
  const [restTimerActive, setRestTimerActive] = useState(false);
  const [restTimerSecs, setRestTimerSecs] = useState(90);
  const [restTimerRemaining, setRestTimerRemaining] = useState(null);
  const [restTimerPreset, setRestTimerPreset] = useState(90);
  const restTimerRef = useRef(null);

  // Streak freeze state
  // Streak freeze removed — replaced with milestone countdown

  function startRestTimer(secs) {
    clearInterval(restTimerRef.current);
    setRestTimerRemaining(secs);
    setRestTimerActive(true);
    haptic("light");
    restTimerRef.current = setInterval(() => {
      setRestTimerRemaining(r => {
        if (r <= 1) {
          clearInterval(restTimerRef.current);
          setRestTimerActive(false);
          haptic("success");
          if (Notification.permission === "granted") new Notification("Rest over!", { body: "Time for your next set 💪" });
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  }

  function stopRestTimer() {
    clearInterval(restTimerRef.current);
    setRestTimerActive(false);
    setRestTimerRemaining(null);
  }

  useEffect(() => () => clearInterval(restTimerRef.current), []);

  function shareStats() {
    const lw = latestWeight ? latestWeight.weight : "?";
    const lost = lostSoFar > 0 ? lostSoFar : 0;
    const streak = getLoggingStreak(logs);
    const todayScore = today ? calcScore(today) : 0;
    const text = `📊 Daily Accountability Tracker\n⚖️ Weight: ${lw} lb (${lost} lb lost)\n🔥 Streak: ${streak} days\n✅ Today: ${todayScore}/4\n🎯 Goal: 160 lb by Aug 23`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text);
      haptic("success");
    }
  }

  useEffect(() => { localStorage.setItem("dat-bf-goal", bfGoal); }, [bfGoal]);

  // Trigger sparks when streak increases
  useEffect(() => {
    const streak = getLoggingStreak(logs);
    if (prevStreakRef.current !== null && streak > prevStreakRef.current && streak > 0) {
      triggerSparks();
      haptic("light");
    }
    prevStreakRef.current = streak;
  }, [logs]);

  // Dismiss loading skeletons after mount
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 600); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const p = new URLSearchParams(window.location.search); const s = p.get("steps"); const w = p.get("workout"); const c = p.get("calories"); if(s || w || c) { const rounded = s ? Math.round(parseFloat(s)).toString() : null; setForm(f => ({ ...f, ...(rounded && {steps:rounded}), ...(w && {training:w}), ...(c && {calories:c}) })); if (rounded) { const today = getLocalDateStr(); setLogs(ls => { const existing = ls.find(l => l.date === today); if (existing) { return ls.map(l => l.date === today ? { ...l, steps: rounded } : l); } return [...ls, { date: today, steps: rounded }]; }); } setTimeout(() => window.history.replaceState({}, "", window.location.pathname), 500); } } catch(e) {} }, []);
  useEffect(() => {
    if (!circuitRunning || circuitState.done) return;
    const t = setTimeout(() => {
      setCircuitState(s => {
        if (s.secondsLeft > 1) return { ...s, secondsLeft: s.secondsLeft - 1 };
        haptic("medium");
        try { const AudioCtx = window.AudioContext || window.webkitAudioContext; if (AudioCtx) { const ctx = new AudioCtx(); ctx.resume().then(() => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = s.isWork ? 880 : 440; o.type = "sine"; g.gain.setValueAtTime(0.5, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5); o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.5); }); } } catch(e) {}
        try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = s.isWork ? 440 : 880; g.gain.setValueAtTime(0.3, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3); o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.3); } catch(e) {}
        try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = s.isWork ? 440 : 880; g.gain.setValueAtTime(0.3, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3); o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.3); } catch(e) {}
        if (s.isBetween) return { ...s, isBetween: false, isWork: true, secondsLeft: circuitConfig.work };
        if (s.isWork) return { ...s, isWork: false, secondsLeft: circuitConfig.rest };
        if (s.round >= circuitConfig.rounds) return { ...s, done: true };
        if (circuitConfig.restBetween > 0) return { ...s, round: s.round + 1, isBetween: true, secondsLeft: circuitConfig.restBetween };
        return { ...s, round: s.round + 1, isWork: true, secondsLeft: circuitConfig.work };
      });
    }, 1000);
    return () => clearTimeout(t);
  }, [circuitRunning, circuitState, circuitConfig]);
  // Persist dark mode
  useEffect(() => { localStorage.setItem("dat-dark", darkMode ? "dark" : "light"); }, [darkMode]);

  // Swipe navigation
  const swipeHandlers = useSwipe(
    () => { const i = TABS.indexOf(tab); if (i < TABS.length - 1) navigateTo(TABS[i + 1]); },
    () => { const i = TABS.indexOf(tab); if (i > 0) navigateTo(TABS[i - 1]); }
  );

  // Pull-to-refresh
  const pullStartY = useRef(null);
  function handleTouchStartPull(e) { pullStartY.current = e.touches[0].clientY; }
  function handleTouchMovePull(e) {
    if (pullStartY.current === null) return;
    if (window.scrollY === 0 && e.touches[0].clientY - pullStartY.current > 60) setIsPulling(true);
  }
  function handleTouchEndPull() {
    if (isPulling) { setIsLoading(true); setTimeout(() => setIsLoading(false), 600); haptic("light"); }
    setIsPulling(false); pullStartY.current = null;
  }

  // Check milestones on log change
  useEffect(() => {
    const lastW = [...logs].reverse().find(l => l.weight && parseFloat(l.weight) > 0);
    if (!lastW) return;
    const lost = START_WEIGHT - parseFloat(lastW.weight);
    const hit = MILESTONES.filter(m => lost >= m).pop();
    const seen = JSON.parse(localStorage.getItem("dat-milestones") || "[]");
    if (hit && !seen.includes(hit)) {
      setMilestone(hit);
      localStorage.setItem("dat-milestones", JSON.stringify([...seen, hit]));
      setShowConfetti(true);
      haptic("milestone");
    }
  }, [logs]);

  // Persist templates
  useEffect(() => { localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates)); }, [templates]);

  // Persist notification preference
  useEffect(() => { localStorage.setItem("dat-notif", notifEnabled); }, [notifEnabled]);

  // Schedule daily 8pm reminder
  useEffect(() => {
    if (!notifEnabled || Notification.permission !== "granted") return;
    const checkAndNotify = () => {
      const now = new Date();
      if (now.getHours() === 20 && now.getMinutes() === 0) {
        const todayStr = getLocalDateStr();
        const todayLog = logs.find(l => l.date === todayStr);
        if (!todayLog || calcScore(todayLog) < 4) {
          new Notification("Daily Accountability Tracker", { body: "Don't forget to log today! 💪", icon: "/favicon.ico" });
        }
      }
    };
    const interval = setInterval(checkAndNotify, 60000);
    return () => clearInterval(interval);
  }, [notifEnabled, logs]);

  // Confetti effect
  useEffect(() => {
    if (!showConfetti) return;
    const canvas = confettiRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width, y: -10,
      w: Math.random() * 8 + 4, h: Math.random() * 12 + 6,
      color: ["#10b981","#34d399","#fbbf24","#a78bfa","#f472b6"][Math.floor(Math.random()*5)],
      vx: (Math.random()-0.5)*4, vy: Math.random()*4+2,
      rot: Math.random()*360, rotV: (Math.random()-0.5)*8,
    }));
    let frame;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pieces.forEach(p => {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle = p.color; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore();
        p.x += p.vx; p.y += p.vy; p.rot += p.rotV; p.vy += 0.08;
      });
      if (pieces.some(p => p.y < canvas.height)) frame = requestAnimationFrame(draw);
      else setShowConfetti(false);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [showConfetti]);

  function saveTemplate() {
    if (!workoutForm.exercises.some(e => e.name.trim())) return;
    const name = workoutForm.name.trim() || "Untitled Template";
    const tmpl = { id: Date.now(), name, exercises: workoutForm.exercises.map(e => ({ ...e, sets: e.sets.map(s => ({ reps: s.reps, weight: "" })) })) };
    setTemplates(t => [...t, tmpl]);
    haptic("success");
  }

  function loadTemplate(tmpl) {
    setWorkoutForm(f => ({ ...f, name: tmpl.name, exercises: tmpl.exercises.map(e => ({ ...e, id: Date.now() + Math.random(), sets: e.sets.map(s => ({ reps: s.reps, weight: "" })) })) }));
    haptic("light");
  }

  function deleteTemplate(id) { setTemplates(t => t.filter(x => x.id !== id)); }

  function navigateTo(newTab) {
    if (newTab === tab) return;
    haptic("light");
    setPageVisible(false);
    setTimeout(() => {
      prevTabRef.current = tab;
      setTab(newTab);
      setPageVisible(true);
    }, 120);
  }

  async function handleScaleUpload(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);
        const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.9);
        const base64 = jpegDataUrl.split(",")[1];
        setScaleUpload(jpegDataUrl);
        setScaleParsing(true);
        setScaleError(null);
        setScaleResult(null);
        try {
          const result = await parseScaleScreenshot(base64);
          setScaleResult(result);
          if (result.weight) setForm(f => ({ ...f, weight: String(result.weight), bodyFat: result.bodyFat ? String(result.bodyFat) : f.bodyFat, muscleMass: result.muscleMass ? String(result.muscleMass) : f.muscleMass, visceralFat: result.visceralFat ? String(result.visceralFat) : f.visceralFat }));
        } catch(err) {
          setScaleError(`Error: ${err.message || "Unknown error"}. Check console for details.`);
          console.error("Scale parse error:", err);
        } finally {
          setScaleParsing(false);
        }
      };
      img.onerror = () => setScaleError("Could not load image. Try another photo.");
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  async function handleMealUpload(file, mealType) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);
        const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.9);
        const base64 = jpegDataUrl.split(",")[1];
        setMealUploads(m => ({ ...m, [mealType]: jpegDataUrl }));
        setMealParsing(m => ({ ...m, [mealType]: true }));
        setMealError(m => ({ ...m, [mealType]: null }));
        setMealResults(m => ({ ...m, [mealType]: null }));
        try {
          const result = await parseMealScreenshot(base64, mealType, "image/jpeg");
          setMealResults(m => ({ ...m, [mealType]: result }));
          setForm(f => ({ ...f, [mealType]: result.mealName || "" }));
        } catch(err) {
          setMealError(m => ({ ...m, [mealType]: "Error: " + (err.message || "Could not parse screenshot. Try again.") }));
        } finally {
          setMealParsing(m => ({ ...m, [mealType]: false }));
        }
      };
      img.onerror = () => setMealError(m => ({ ...m, [mealType]: "Could not load image. Try again." }));
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressEntries));
  }, [progressEntries]);

  useEffect(() => {
    localStorage.setItem(TRAINING_KEY, JSON.stringify(workouts));
  }, [workouts]);

  function saveWorkout() {
    const filled = workoutForm.exercises.filter(e => e.name.trim());
    if (!filled.length) return;
    const entry = { ...workoutForm, exercises: filled, id: workoutForm.id || Date.now() };
    const idx = workouts.findIndex(w => w.id === entry.id);
    const updated = idx >= 0 ? workouts.map((w,i) => i === idx ? entry : w) : [...workouts, entry].sort((a,b) => a.date.localeCompare(b.date));
    // Check for any PRs in this session
    const hasPR = filled.some(ex => {
      const maxW = Math.max(...ex.sets.map(s => parseFloat(s.weight) || 0));
      return maxW > 0 && maxW > getPRForExercise(ex.name);
    });
    setWorkouts(updated);
    const workoutSummary = filled.map(e => e.name).join(", ");
    const wDate = entry.date || getLocalDateStr();
    setLogs(prev => {
      const ex = prev.find(l => l.date === wDate);
      if (ex) {
        return prev.map(l => l.date === wDate ? { ...l, training: workoutSummary } : l);
      } else {
        return [...prev, { date: wDate, calories: "", protein: "", steps: "", training: workoutSummary, weight: "", bodyFat: "", muscleMass: "", visceralFat: "" }];
      }
    });
    setWorkoutSaved(true);
    haptic(hasPR ? "pr" : "success");
    setTimeout(() => setWorkoutSaved(false), 2000);
    setWorkoutForm({ date: getLocalDateStr(), name: "", exercises: [{ id: Date.now(), name: "", sets: [{ reps: "", weight: "" }] }] });
  }

  function addExercise() {
    setWorkoutForm(f => ({ ...f, exercises: [...f.exercises, { id: Date.now(), name: "", sets: [{ reps: "", weight: "" }] }] }));
  }

  function removeExercise(id) {
    setWorkoutForm(f => ({ ...f, exercises: f.exercises.filter(e => e.id !== id) }));
  }

  function updateExerciseName(id, name) {
    setWorkoutForm(f => ({ ...f, exercises: f.exercises.map(e => e.id === id ? { ...e, name } : e) }));
  }

  function addSet(exId) {
    setWorkoutForm(f => ({ ...f, exercises: f.exercises.map(e => e.id === exId ? { ...e, sets: [...e.sets, { reps: "", weight: "" }] } : e) }));
  }

  function removeSet(exId, setIdx) {
    setWorkoutForm(f => ({ ...f, exercises: f.exercises.map(e => e.id === exId ? { ...e, sets: e.sets.filter((_,i) => i !== setIdx) } : e) }));
  }

  function updateSet(exId, setIdx, field, val) {
    setWorkoutForm(f => ({ ...f, exercises: f.exercises.map(e => e.id === exId ? { ...e, sets: e.sets.map((s,i) => i === setIdx ? { ...s, [field]: val } : s) } : e) }));
  }

  function toggleSuperset(exId) {
    // supersetWith = id of next exercise means "I am grouped with the one after me"
    setWorkoutForm(f => {
      const idx = f.exercises.findIndex(e => e.id === exId);
      if (idx === -1 || idx >= f.exercises.length - 1) return f;
      const ex = f.exercises[idx];
      const updated = f.exercises.map((e, i) =>
        i === idx ? { ...e, supersetWith: e.supersetWith ? null : f.exercises[idx + 1].id } : e
      );
      return { ...f, exercises: updated };
    });
  }

  function getPRForExercise(exName) {
    let pr = 0;
    workouts.forEach(w => w.exercises.forEach(e => {
      if (e.name.toLowerCase() === exName.toLowerCase()) {
        e.sets.forEach(s => { if (parseFloat(s.weight) > pr) pr = parseFloat(s.weight); });
      }
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
    const newEntry = { ...progressForm };
    const newEntries = idx >= 0
      ? progressEntries.map((e, i) => i === idx ? newEntry : e)
      : [...progressEntries, newEntry].sort((a, b) => a.date.localeCompare(b.date));
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

  // Auto-open report on Sunday
  useEffect(() => {
    if (isSunday()) {
      const prevWeek = getPreviousWeekStart();
      const prevLogs = getWeekLogs(logs, prevWeek);
      if (prevLogs.length > 0) setTab("Weekly Report");
    }
  }, []);

  function saveLog() {
    const idx = logs.findIndex(l => l.date === form.date);
    const newLog = { ...form, score: calcScore(form) };
    const newLogs = idx >= 0
      ? logs.map((l, i) => i === idx ? newLog : l)
      : [...logs, newLog].sort((a, b) => a.date.localeCompare(b.date));
    setLogs(newLogs);
    setSaved(true);
    if (newLog.score === 4) {
      haptic("perfect");
      setShowConfetti(true);
    } else {
      haptic("success");
    }
    setTimeout(() => setSaved(false), 2000);
  }

  function downloadReport(weekStart) {
    const weekLogs = getWeekLogs(logs, weekStart);
    const html = generateReportHTML(weekStart, weekLogs, logs);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `weekly-report-${weekStart}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const today = logs.find(l => l.date === viewedDate);
  const latestWeight = [...logs].reverse().find(l => l.weight && parseFloat(l.weight) > 0);
  const projected = getProjectedWeight(logs);
  const daysLeft = getDeadlineDays();
  const totalScore = logs.reduce((s, l) => s + (l.score || 0), 0);
  // Smart max with 2 rest days cap applied per week
  const maxScore = (() => {
    const byWeek = {};
    logs.forEach(l => {
      const wk = getWeekKey(l.date);
      if (!byWeek[wk]) byWeek[wk] = [];
      byWeek[wk].push(l);
    });
    return Object.values(byWeek).reduce((total, wl) => {
      let rc = 0;
      return total + wl.reduce((s, l) => {
        const trained = l.training && l.training.trim() !== "";
        const isRest = !trained && rc < 2;
        if (!trained) rc++;
        return s + (isRest ? 3 : 4);
      }, 0);
    }, 0);
  })();
  const compliance = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const weighIns = logs.filter(l => l.weight && parseFloat(l.weight) > 0);
  const lostSoFar = weighIns.length > 0 ? (START_WEIGHT - parseFloat(weighIns[weighIns.length - 1].weight)).toFixed(1) : 0;

  // All unique week starts that have logs
  const allWeekStarts = [...new Set(logs.map(l => getWeekKey(l.date)))].sort().reverse();

  // Animated counter values — must be at component level (rules of hooks)
  const cWeight = useCountUp(latestWeight ? latestWeight.weight : 0, 700);
  const cLost = useCountUp(lostSoFar > 0 ? lostSoFar : 0, 700);
  const cDays = useCountUp(daysLeft <= 30 ? daysLeft : Math.ceil(daysLeft / 7), 700);
  const _goalRem = latestWeight ? (parseFloat(latestWeight.weight) - GOAL_WEIGHT).toFixed(1) : 0;
  const cRem = useCountUp(_goalRem, 700);
  const _pct = latestWeight ? Math.round(((START_WEIGHT - parseFloat(latestWeight.weight)) / (START_WEIGHT - GOAL_WEIGHT)) * 100) : 0;
  const ARC_R = 48, ARC_CIRC = 2 * Math.PI * ARC_R;
  const arcDash = (_pct / 100) * ARC_CIRC;

  return (
    <div style={{ minHeight: "100vh", background: darkMode ? "#07080d" : "#f1f5f9", color: darkMode ? "#e2e8f0" : "#0f172a", fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13, display: "flex" }}
      {...swipeHandlers}
      onTouchStart={handleTouchStartPull}
      onTouchMove={handleTouchMovePull}
      onTouchEnd={handleTouchEndPull}>
      {showConfetti && <canvas ref={confettiRef} style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }} />}

      {/* Milestone overlay */}
      {milestone && (
        <div className="milestone-overlay" onClick={() => setMilestone(null)}>
          <div className="milestone-card">
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏅</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 48, color: "#10b981", lineHeight: 1 }}>{milestone} LB</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "#34d399", letterSpacing: 2, marginBottom: 8 }}>MILESTONE!</div>
            <div style={{ color: "#475569", fontSize: 13, marginBottom: 20 }}>You've lost {milestone} lbs since starting. Keep going — you're unstoppable. 💪</div>
            <button onClick={() => setMilestone(null)} style={{ background: "linear-gradient(135deg,#059669,#10b981)", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Let's Go!</button>
          </div>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; } ::-webkit-scrollbar-track { background: #0d0f18; } ::-webkit-scrollbar-thumb { background: #1e2535; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #2a3448; }
        .sidebar { width: 220px; min-height: 100vh; background: #0b0d15; border-right: 1px solid #131929; display: flex; flex-direction: column; flex-shrink: 0; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
        .sidebar-logo { padding: 24px 20px 20px; border-bottom: 1px solid #131929; }
        .sidebar-logo span { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 3px; background: linear-gradient(135deg, #10b981, #34d399); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .sidebar-logo div { font-size: 10px; color: #334155; letter-spacing: 1px; margin-top: 3px; font-family: 'DM Mono', monospace; }
        .sidebar-nav { padding: 12px 10px; flex: 1; }
        .nav-section { font-size: 9px; letter-spacing: 2px; color: #1e2d40; text-transform: uppercase; padding: 16px 10px 6px; font-weight: 600; }
        .nav-btn { display: flex; align-items: center; gap: 10px; width: 100%; background: none; border: 1px solid transparent; color: #475569; padding: 9px 12px; border-radius: 10px; font-size: 12px; font-weight: 500; text-align: left; transition: all 0.18s cubic-bezier(0.4,0,0.2,1); cursor: pointer; margin-bottom: 2px; font-family: 'Inter', sans-serif; }
        .nav-btn:hover { background: #0f1623; color: #94a3b8; }
        .nav-btn.active { background: linear-gradient(135deg, #052e1c, #0a3d26); color: #34d399; border-color: #065f3a33; }
        .nav-btn.active svg { color: #10b981; }
        .nav-icon { width: 18px; height: 18px; flex-shrink: 0; }
        .main-content { flex: 1; min-width: 0; display: flex; flex-direction: column; }

        /* Glassmorphism topbar */
        .topbar { border-bottom: 1px solid #13192966; padding: 14px 28px; display: flex; align-items: center; justify-content: space-between; background: rgba(8,9,15,0.75); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); position: sticky; top: 0; z-index: 50; }
        .topbar-title { font-size: 11px; font-weight: 500; color: #475569; letter-spacing: 0.3px; line-height: 1.4; }
        .topbar-title span { color: #e2e8f0; font-weight: 700; font-size: 15px; display: block; margin-top: 1px; }
        .status-pill { display: flex; align-items: center; gap: 6px; background: rgba(15,22,35,0.8); border: 1px solid #1e2d40; border-radius: 20px; padding: 4px 12px; font-size: 11px; color: #64748b; font-family: 'DM Mono', monospace; backdrop-filter: blur(8px); }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; box-shadow: 0 0 6px #10b98188; animation: glow 2s infinite; flex-shrink: 0; }
        @keyframes glow { 0%,100% { box-shadow: 0 0 4px #10b98188; } 50% { box-shadow: 0 0 12px #10b981cc; } }

        /* Cards */
        .stat-card { background: #0c0e18; border: 1px solid #131929; border-radius: 12px; padding: 20px; transition: all 0.22s cubic-bezier(0.4,0,0.2,1); position: relative; overflow: hidden; }
        .stat-card::before { content: ''; position: absolute; inset: 0; border-radius: 12px; background: linear-gradient(135deg, #10b98106 0%, transparent 60%); pointer-events: none; }
        .stat-card:hover { border-color: #1e2d40; box-shadow: 0 8px 32px #00000055, 0 0 0 1px #10b98112; transform: translateY(-2px); }
        .stat-card-glow { border-color: #065f3a55 !important; border-left: 3px solid #10b981 !important; box-shadow: 0 0 0 1px #10b98122, 0 4px 32px #10b98112 !important; }

        /* Typography */
        .big-num { font-family: 'Bebas Neue', sans-serif; font-size: 48px; color: #10b981; line-height: 1; letter-spacing: 1px; }
        .label { color: #334155; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; font-weight: 600; font-family: 'DM Mono', monospace; }
        .section-title { font-size: 10px; font-weight: 700; letter-spacing: 3px; color: #10b981; margin-bottom: 18px; text-transform: uppercase; font-family: 'DM Mono', monospace; display: flex; align-items: center; gap: 8px; }
        .section-title::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, #10b98122, transparent); }
        .field-label { color: #475569; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; font-weight: 600; font-family: 'DM Mono', monospace; }

        /* Inputs */
        input, textarea, select { background: #0f1623; border: 1px solid #1e2d40; color: #e2e8f0; font-family: 'Inter', sans-serif; font-size: 13px; border-radius: 10px; padding: 9px 12px; width: 100%; outline: none; transition: all 0.15s; }
        input:focus, textarea:focus, select:focus { border-color: #10b981; box-shadow: 0 0 0 3px #10b98115; }
        input::placeholder, textarea::placeholder { color: #1e2d40; }
        button { cursor: pointer; font-family: 'Inter', sans-serif; }

        /* Save button with ripple */
        .save-btn { background: linear-gradient(135deg, #059669, #10b981); color: #fff; border: none; padding: 10px 24px; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; border-radius: 10px; transition: all 0.2s; box-shadow: 0 2px 12px #10b98130; position: relative; overflow: hidden; }
        .save-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 24px #10b98145; }
        .save-btn:active { transform: scale(0.97); }
        .save-btn::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, #ffffff30 0%, transparent 70%); opacity: 0; transition: opacity 0.3s; }
        .save-btn:active::after { opacity: 1; }
        .save-btn.saved-state { background: linear-gradient(135deg, #065f3a, #059669); box-shadow: 0 0 20px #10b98140; }

        .dl-btn { background: transparent; border: 1px solid #10b98155; color: #10b981; padding: 8px 20px; font-size: 12px; font-weight: 600; border-radius: 10px; transition: all 0.2s; letter-spacing: 0.5px; }
        .dl-btn:hover { background: #10b98115; border-color: #10b981; box-shadow: 0 0 16px #10b98120; }

        /* Bars */
        .bar-bg { height: 5px; background: #131929; border-radius: 3px; margin-top: 8px; overflow: hidden; }
        .bar-fill { height: 5px; border-radius: 3px; transition: width 0.8s cubic-bezier(0.34,1.56,0.64,1); }

        /* Status dots */
        .status-indicator { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
        .si-green { background: #10b981; box-shadow: 0 0 6px #10b98166; }
        .si-red { background: #f87171; box-shadow: 0 0 6px #f8717166; }
        .si-yellow { background: #fbbf24; box-shadow: 0 0 6px #fbbf2466; }
        .si-gray { background: #1e2d40; }

        /* Tables */
        .row-even { background: #0b0d15; } .row-odd { background: #0c0e18; }
        table { border-collapse: collapse; width: 100%; }
        th { color: #334155; font-weight: 600; letter-spacing: 1.5px; font-size: 9px; text-transform: uppercase; padding: 8px 12px; text-align: left; border-bottom: 1px solid #131929; font-family: 'DM Mono', monospace; }
        td { padding: 9px 12px; border-bottom: 1px solid #0f1623; font-size: 12px; font-variant-numeric: tabular-nums; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #0f1623 !important; transition: background 0.12s; }

        /* Chips */
        .chip { display: inline-flex; align-items: center; background: #0f1623; border: 1px solid #1e2d40; border-radius: 5px; padding: 2px 8px; font-size: 10px; color: #64748b; margin: 2px; font-family: 'DM Mono', monospace; }

        /* Grids */
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }

        /* Misc */
        .inject-badge { background: #130a2e; border: 1px solid #7c3aed44; color: #a78bfa; font-size: 10px; padding: 3px 10px; border-radius: 5px; letter-spacing: 1px; font-family: 'DM Mono', monospace; }
        .report-sunday-banner { background: linear-gradient(135deg, #052e1c, #073d26); border: 1px solid #065f3a44; border-radius: 12px; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .projected-good { color: #34d399; } .projected-bad { color: #f87171; } .projected-ok { color: #fbbf24; }
        .stat-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .stat-bar-label { color: #475569; font-size: 10px; width: 80px; flex-shrink: 0; font-family: 'DM Mono', monospace; }
        .stat-bar-track { flex: 1; height: 4px; background: #131929; border-radius: 2px; overflow: hidden; }
        .stat-bar-val { color: #94a3b8; font-size: 11px; width: 50px; text-align: right; font-family: 'DM Mono', monospace; font-variant-numeric: tabular-nums; }

        /* Page transitions */
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
        .page-enter { animation: slideIn 0.18s cubic-bezier(0.4,0,0.2,1) both; }
        .page-exit { opacity: 0; transform: translateX(-8px); transition: all 0.12s ease; }
        .fade-up { animation: fadeUp 0.35s ease both; }
        .fade-up-1 { animation: fadeUp 0.35s 0.05s ease both; }
        .fade-up-2 { animation: fadeUp 0.35s 0.1s ease both; }
        .fade-up-3 { animation: fadeUp 0.35s 0.15s ease both; }
        .fade-up-4 { animation: fadeUp 0.35s 0.2s ease both; }

        /* Heatmap */
        .heatmap-cell { border-radius: 3px; transition: all 0.15s; }
        .heatmap-cell:hover { transform: scale(1.5); z-index: 2; position: relative; }

        /* Empty state */
        .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 36px 20px; gap: 10px; color: #1e2d40; text-align: center; }
        .empty-state svg { opacity: 0.3; }
        .empty-state p { font-size: 13px; color: #334155; }
        .empty-state button { background: none; border: 1px solid #1e2d40; color: #475569; padding: 7px 16px; border-radius: 8px; font-size: 12px; font-weight: 500; transition: all 0.15s; }
        .empty-state button:hover { border-color: #10b981; color: #10b981; }

        /* Score ring in topbar */
        .score-ring-topbar { flex-shrink: 0; }

        /* Reactive card glow based on score */
        .card-glow-4 { border-color: #10b98155 !important; box-shadow: 0 0 0 1px #10b98122, 0 4px 24px #10b98118 !important; }
        .card-glow-3 { border-color: #34d39944 !important; box-shadow: 0 0 0 1px #34d39918 !important; }
        .card-glow-2 { border-color: #fbbf2444 !important; box-shadow: 0 0 0 1px #fbbf2414 !important; }
        .card-glow-1 { border-color: #f8717133 !important; }

        /* Weight journey timeline */
        .timeline-node { transition: all 0.2s; cursor: default; }
        .timeline-node:hover { transform: scale(1.15); }

        /* Streak spark particle */
        @keyframes spark { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(var(--tx),var(--ty)) scale(0); opacity: 0; } }
        .spark { position: absolute; width: 5px; height: 5px; border-radius: 50%; pointer-events: none; animation: spark 0.6s ease-out forwards; }

        /* Training frequency heatmap */
        .train-heat-cell { border-radius: 3px; transition: all 0.15s; cursor: default; }
        .train-heat-cell:hover { transform: scale(1.4); z-index: 2; position: relative; }

        /* Macro history stacked bars */
        .macro-bar-seg { transition: height 0.6s cubic-bezier(0.34,1.56,0.64,1); }

        /* BF goal arc */
        .bf-arc { transition: stroke-dasharray 1s cubic-bezier(0.34,1.56,0.64,1); }

        /* Sticky section headers */
        .sticky-header { position: sticky; top: 60px; z-index: 20; background: rgba(7,8,13,0.92); backdrop-filter: blur(12px); padding: 8px 0 6px; margin-bottom: 10px; border-bottom: 1px solid #13192966; }

        /* Score pulse on hit */
        @keyframes scorePop { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        .score-pop { animation: scorePop 0.3s ease; }

        /* Skeleton shimmer */
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Milestone overlay */
        .milestone-overlay { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); animation: fadeIn 0.3s ease; }
        .milestone-card { background: linear-gradient(135deg, #052e1c, #0a3d26); border: 1px solid #10b98155; border-radius: 20px; padding: 40px; text-align: center; max-width: 300px; animation: fadeUp 0.4s ease; box-shadow: 0 0 60px #10b98130; }

        /* Pull to refresh */
        .pull-indicator { text-align: center; padding: 12px; color: #334155; font-size: 11px; font-family: 'DM Mono', monospace; animation: fadeIn 0.2s ease; }

        /* Light mode */
        .light { --bg: #f8fafc; --bg2: #ffffff; --bg3: #f1f5f9; --border: #e2e8f0; --text: #0f172a; --text2: #475569; --text3: #94a3b8; --green: #059669; --card-bg: #ffffff; }
        .light body, .light .main-content { background: var(--bg); color: var(--text); }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .bottom-nav { display: flex !important; }
          .topbar { padding: 10px 14px; padding-top: max(10px, env(safe-area-inset-top)); }
          .topbar-status { display: none; }
          .grid2, .grid3 { grid-template-columns: 1fr 1fr !important; }
          .kpi-grid { grid-template-columns: 1fr 1fr !important; }
          .today-grid { grid-template-columns: 1fr 1fr !important; }
          .big-num { font-size: 34px; }
          .page-pad { padding: 16px 10px 90px !important; }
        }
        @media (min-width: 769px) {
          .bottom-nav { display: none !important; }
        }
      `}</style>

      {/* Sidebar — desktop only */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <span>DAT</span>
          <div>ACCOUNTABILITY</div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section">Overview</div>
          {[{ id: "Home", Icon: LayoutDashboard, label: "Home" }].map(({ id, Icon, label }) => (
            <button key={id} className={`nav-btn${tab === id ? " active" : ""}`} onClick={() => navigateTo(id)}>
              <Icon size={16} className="nav-icon" /><span>{label}</span>
            </button>
          ))}
          <div className="nav-section">Tracking</div>
          {[
            { id: "Nutrition", Icon: Utensils, label: "Nutrition" },
            { id: "Training", Icon: Dumbbell, label: "Training" },
            { id: "Weight Tracker", Icon: Scale, label: "Weight" },
          ].map(({ id, Icon, label }) => (
            <button key={id} className={`nav-btn${tab === id ? " active" : ""}`} onClick={() => navigateTo(id)}>
              <Icon size={16} className="nav-icon" /><span>{label}</span>
            </button>
          ))}
          <div className="nav-section">Reports</div>
          {[
            { id: "Weekly Report", Icon: BarChart2, label: "Summary" },
            { id: "Progress Photos", Icon: Camera, label: "Progress" },
          ].map(({ id, Icon, label }) => (
            <button key={id} className={`nav-btn${tab === id ? " active" : ""}`} onClick={() => navigateTo(id)}>
              <Icon size={16} className="nav-icon" /><span>{label}</span>
            </button>
          ))}
          <div className="nav-section">Account</div>
          {[{ id: "Settings", Icon: Settings2, label: "Settings" }].map(({ id, Icon, label }) => (
            <button key={id} className={`nav-btn${tab === id ? " active" : ""}`} onClick={() => navigateTo(id)}>
              <Icon size={16} className="nav-icon" /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding: "16px 20px", borderTop: "1px solid #131929" }}>
          <div style={{ fontSize: 9, color: "#1e2d40", letterSpacing: 1, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>TARGETS</div>
          <div style={{ fontSize: 10, lineHeight: 1.8, fontFamily: "'DM Mono', monospace" }}><div style={{color:"#334155"}}>{S_CALORIES_MIN}–{S_CALORIES_MAX} kcal</div><div style={{color:"#10b981"}}>≥{S_PROTEIN_MIN}g protein</div><div style={{color:"#60a5fa"}}>≥{S_STEPS_MIN.toLocaleString()} steps</div></div>
        </div>
      </div>

      {/* Main */}
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-title">Daily Accountability Tracker<span>{tab}</span></div>
          <div className="topbar-status" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Score ring — always visible */}
            {(() => {
              const score = today ? calcScore(today) : 0;
              const R = 10, CIRC = 2 * Math.PI * R;
              const dash = (score / 4) * CIRC;
              const col = score === 4 ? "#10b981" : score === 3 ? "#34d399" : score === 2 ? "#fbbf24" : score === 1 ? "#f97316" : "#1e2d40";
              return (
                <div title={`Today's score: ${score}/4`} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <svg width={28} height={28} className="score-ring-topbar">
                    <circle cx="14" cy="14" r={R} fill="none" stroke="#131929" strokeWidth="3" />
                    <circle cx="14" cy="14" r={R} fill="none" stroke={col} strokeWidth="3"
                      strokeDasharray={`${dash} ${CIRC}`} transform="rotate(-90 14 14)"
                      strokeLinecap="round" style={{ transition: "stroke-dasharray 0.5s ease, stroke 0.3s ease" }} />
                    <text x="14" y="14" textAnchor="middle" dominantBaseline="central" fill={col} fontSize="7" fontFamily="'DM Mono',monospace" fontWeight="600">{score}/4</text>
                  </svg>
                </div>
              );
            })()}
            <button onClick={() => setDarkMode(d => !d)} style={{ background: "none", border: "1px solid #1e2d40", borderRadius: 8, padding: "4px 8px", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
              {darkMode ? <Sun size={13} /> : <Moon size={13} />}
            </button>
            {isSunday() && <div className="status-pill" style={{ borderColor: "#065f3a55", color: "#34d399" }}><span>📊</span>Report Day</div>}
            <div style={{ position: "relative" }}>
              <div style={{ background: "#0f1623", border: "1px solid #1e2d40", borderRadius: 20, padding: "3px 10px", display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }} onClick={() => document.getElementById('hdr-date').focus()}>
                <span className="status-dot" style={{ background: viewedDate === getLocalDateStr() ? "#10b981" : "#fbbf24", flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: viewedDate === getLocalDateStr() ? "#e2e8f0" : "#fbbf24", fontFamily: "'DM Mono',monospace", whiteSpace: "nowrap" }}>{viewedDate}</span>
              </div>
              <input id="hdr-date" type="date" value={viewedDate} max={getLocalDateStr()} onChange={e => e.target.value && setViewedDate(e.target.value)}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer", fontSize: 0 }} />
            </div>
          </div>
        </div>
        {isPulling && <div className="pull-indicator"><RefreshCw size={14} style={{ display: "inline", marginRight: 6, animation: "spin 1s linear infinite" }} />Release to refresh</div>}

      {/* Bottom nav — mobile only */}
      <div className="bottom-nav" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "rgba(11,13,21,0.92)", backdropFilter: "blur(20px)", borderTop: "1px solid #131929", display: "none", justifyContent: "space-around", padding: "6px 0 max(6px, env(safe-area-inset-bottom))" }}>
        {[
          { id: "Home", Icon: LayoutDashboard, label: "Home" },
          { id: "Nutrition", Icon: Utensils, label: "Nutrition" },
          { id: "Training", Icon: Dumbbell, label: "Train" },
          { id: "Weight Tracker", Icon: Scale, label: "Weight" },
          { id: "Weekly Report", Icon: BarChart2, label: "Summary" },
          { id: "Progress Photos", Icon: Camera, label: "Progress" },
        ].map(({ id, Icon, label }) => (
          <button key={id} onClick={() => navigateTo(id)} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 6px", color: tab === id ? (id === "Training" ? "#60a5fa" : id === "Weight Tracker" ? "#34d399" : id === "Progress Photos" ? "#a855f7" : "#10b981") : "#334155", transition: "color 0.15s" }}>
            <Icon size={18} />
            <span style={{ fontSize: 9, letterSpacing: 0.3, fontFamily: "'DM Mono',monospace" }}>{label}</span>
          </button>
        ))}
      </div>

      <div className="page-pad" style={{ padding: "28px", maxWidth: 960 }}>
        <div className={pageVisible ? "page-enter" : "page-exit"} key={tab}>

        {/* DASHBOARD */}
        {tab === "Home" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Shortcut Setup Modal */}
              {showShortcutModal && (
                <div style={{ position: "fixed", inset: 0, background: "#07080dee", zIndex: 1001, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                  <div style={{ background: "#0f1623", border: "1px solid #1e2d40", borderRadius: 16, width: "100%", maxWidth: 380, padding: 24, position: "relative" }}>
                    <button onClick={() => setShowShortcutModal(false)} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "#475569", fontSize: 20, cursor: "pointer" }}>✕</button>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 4, letterSpacing: 2, fontFamily: "'DM Mono',monospace" }}>⚡ SYNC STEPS</div>
                    <div style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 16 }}>Auto-fill today's steps from Apple Watch, Fitness, or Health app</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                      {[
                        { num: "1", text: "Tap Install Shortcut and add it to your Shortcuts app — keep the name as-is" },
                        { num: "2", text: "When prompted, tap Allow Access to Health" },
                        { num: "3", text: "Set up an automation in Shortcuts to run it automatically each day — or run it manually from the Shortcuts app" },
                      ].map(({ num, text }) => (
                        <div key={num} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <div style={{ background: "#1e2d40", color: "#60a5fa", fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{num}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono',monospace", lineHeight: 1.6 }}>{text}</div>
                        </div>
                      ))}
                    </div>
                    <a href="https://www.icloud.com/shortcuts/570d154538e648c3bbccac6f7fc3328a"
                      style={{ display: "block", background: "linear-gradient(135deg,#1e3a5f,#3b82f6)", border: "1px solid #60a5fa44", color: "#60a5fa", padding: "12px", borderRadius: 10, fontSize: 12, fontWeight: 700, textAlign: "center", textDecoration: "none", letterSpacing: 1, marginBottom: 10 }}>
                      📲 INSTALL SHORTCUT
                    </a>
                    <div style={{ fontSize: 10, color: "#334155", fontFamily: "'DM Mono',monospace", textAlign: "center" }}>Works with Apple Watch, Fitness app, and Health app</div>
                  </div>
                </div>
              )}
            {(() => { const d = getDaysSinceLastProgress(progressEntries); return (d === null || d >= PROGRESS_INTERVAL_DAYS) ? (
              <div className="fade-up" style={{ background: "#14120a", border: "1px solid #ca8a0433", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
                <span style={{ color: "#eab308", fontSize: 11, fontWeight: 500 }}>📸 {d === null ? "First progress check-in due" : `Progress due · ${d}d ago`}</span>
                <button className="save-btn" style={{ fontSize: 11, padding: "4px 12px", background: "linear-gradient(135deg,#92400e,#ca8a04)" }} onClick={() => setTab("Progress Photos")}>Log Now</button>
              </div>
            ) : null; })()}
            {isSunday() && getWeekLogs(logs, getPreviousWeekStart()).length > 0 && (
              <div className="report-sunday-banner fade-up" style={{ padding: "10px 16px", marginBottom: 0 }}>
                <span style={{ color: "#34d399", fontSize: 11, fontWeight: 500 }}>📊 Weekly report ready</span>
                <button className="save-btn" style={{ fontSize: 11, padding: "4px 12px" }} onClick={() => setTab("Weekly Report")}>View</button>
              </div>
            )}

            {/* Top KPI row */}
            {isLoading ? (
              <div className="kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {[0,1,2,3].map(i => <div key={i} className="stat-card" style={{ padding: "12px 14px" }}><Skeleton h={10} w="60%" /><div style={{marginTop:8}}><Skeleton h={32} w="80%" /></div><div style={{marginTop:6}}><Skeleton h={8} w="40%" /></div></div>)}
              </div>
            ) : (
            <div className="kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
              <div className="stat-card stat-card-glow fade-up" style={{ padding: "12px 14px", borderLeft: "3px solid #10b981" }}>
                <div className="label" style={{ fontSize: 9, marginBottom: 3 }}>Current Weight</div>
                <div className="big-num" style={{ fontSize: 26, color: "#34d399" }}>{latestWeight ? cWeight : "—"}<span style={{ fontSize: 14, color: "#34d399", fontFamily: "'DM Mono',monospace", marginLeft: 4 }}>lbs</span></div>
                {weighIns.length >= 2 && (() => { const curr = weighIns[weighIns.length-1]; const totalLost = (START_WEIGHT - parseFloat(curr.weight)).toFixed(1); const isDown = parseFloat(totalLost) > 0; return <div style={{fontSize:10,color:isDown?"#34d399":"#f87171",marginTop:3,fontFamily:"'DM Mono',monospace"}}>{isDown?"↓":"+"} {Math.abs(totalLost)} lbs lost</div>; })()}
                {lostSoFar > 0 && parseFloat(lostSoFar) >= 5 && <div style={{fontSize:8,color:"#475569",fontFamily:"'DM Mono',monospace",letterSpacing:1,marginTop:32}}>COLLECTION</div>}
                {lostSoFar > 0 && (() => { const earned = [5,10,15,20,25,30,35,40,45,50].filter(m => parseFloat(lostSoFar) >= m); return earned.length ? (<div style={{display:"flex",flexWrap:"wrap",gap:3,marginTop:5}}>{earned.map(m => (<span key={m}>🏅<span style={{fontSize:8,fontWeight:700,verticalAlign:"middle"}}>{m}</span></span>))}</div>) : null; })()}
              </div>
              <div className="stat-card fade-up-2" style={{ padding: "12px 14px", borderLeft: `3px solid ${_pct >= 50 ? "#34d399" : _pct >= 25 ? "#fbbf24" : "#f87171"}`, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="label" style={{ fontSize: 9, marginBottom: 3, alignSelf: "flex-start" }}>Progress</div>
                {latestWeight ? (
                  <>
                    <svg width={100} height={100} style={{ margin: "8px auto 2px", overflow: "visible" }}>
                      <circle cx="50" cy="50" r={ARC_R} fill="none" stroke="#131929" strokeWidth="5" />
                      <circle cx="50" cy="50" r={ARC_R} fill="none"
                        stroke={_pct >= 50 ? "#34d399" : _pct >= 25 ? "#fbbf24" : "#f87171"}
                        strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={`${arcDash} ${ARC_CIRC}`}
                        transform="rotate(-90 50 50)"
                        style={{ transition: "stroke-dasharray 1s cubic-bezier(0.34,1.56,0.64,1)" }} />
                      <text x="50" y="46" textAnchor="middle" dominantBaseline="central" fill={darkMode ? "#e2e8f0" : "#0f172a"} fontSize="14" fontFamily="'Bebas Neue',sans-serif">{cRem}</text>
                      <text x="50" y="60" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="'DM Mono',monospace">lbs left</text>
                    </svg>
                    <div style={{ color: "#334155", fontSize: 9, fontFamily: "'DM Mono',monospace", marginTop: 2 }}>{_pct}% complete</div>
                  </>
                ) : <div style={{ color: "#1e2d40", fontSize: 10, marginTop: 8 }}>—</div>}
              </div>
            </div>
            )}

            {/* Weekly Compliance + Next Milestone + Share */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }} className="kpi-grid">
              {/* Weekly compliance ring */}
              <div className="stat-card fade-up-3" style={{ padding: "12px 14px 40px 14px", borderLeft: "3px solid #fbbf24" }}>
                <div className="label" style={{ fontSize: 9, marginBottom: 6 }}>This Week</div>
                {(() => {
                  const weekLogs = getWeekLogs(logs, getCurrentWeekStart());
                  // Smart max with max 2 rest days: first 2 non-training days score /3, extras score /4
                  let restDaysUsed = 0;
                  const { hitGoals, totalGoals } = weekLogs.reduce((acc, l) => {
                    const trained = l.training && l.training.trim() !== "";
                    const isRest = !trained && restDaysUsed < 2;
                    if (!trained) restDaysUsed++;
                    const possible = isRest ? 3 : 4;
                    return { hitGoals: acc.hitGoals + calcScore(l), totalGoals: acc.totalGoals + possible };
                  }, { hitGoals: 0, totalGoals: 0 });
                  const pct = totalGoals > 0 ? Math.round((hitGoals / totalGoals) * 100) : 0;
                  const R = 42, CIRC = 2 * Math.PI * R;
                  const dash = (pct / 100) * CIRC;
                  const col = pct >= 80 ? "#34d399" : pct >= 50 ? "#fbbf24" : "#f87171";
                  return (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: 0, height: "100%", minHeight: 160 }}>
                      <svg width={120} height={120} viewBox="0 0 100 100" style={{ overflow: "visible" }}>
                        <circle cx="50" cy="50" r={R} fill="none" stroke="#131929" strokeWidth="4" />
                        <circle cx="50" cy="50" r={R} fill="none" stroke={col}
                          strokeWidth="4" strokeLinecap="round"
                          strokeDasharray={`${dash} ${CIRC}`}
                          transform="rotate(-90 50 50)"
                          style={{ transition: "stroke-dasharray 0.7s cubic-bezier(0.34,1.56,0.64,1)" }} />
                        <text x="50" y="43" textAnchor="middle" dominantBaseline="central"
                          fill={darkMode ? "#e2e8f0" : "#0f172a"} fontSize="10" fontFamily="'Bebas Neue',sans-serif">{pct}%</text>
                        <text x="50" y="55" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="'DM Mono',monospace">goals hit</text>
                      </svg>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 10, color: col, fontWeight: 600 }}>
                          {pct >= 80 ? "🔥 Crushing it" : pct >= 50 ? "💪 On track" : weekLogs.length === 0 ? "Start logging!" : "⚠ Push harder"}
                        </div>
                        <div style={{ fontSize: 9, color: "#334155", fontFamily: "'DM Mono',monospace", marginTop: 2 }}>{hitGoals}/{totalGoals} pts</div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div className="stat-card fade-up-2" style={{ padding: "12px 14px", borderLeft: "3px solid #a855f7", paddingBottom: "18px", minHeight: 200 }}>
                <div className="label" style={{ fontSize: 9, marginBottom: 3 }}>Streak</div>
                {(() => {
                  const streak = getLoggingStreak(logs);
                  // Weekly streak ring — goal: 5/7 days at any score
                  const weekStart = getCurrentWeekStart();
                  const thisWeekLogs = getWeekLogs(logs, weekStart);
                  const weekHits = thisWeekLogs.filter(l => calcScore(l) >= 1).length;
                  const WEEK_GOAL = 7;
                  const ringPct = weekHits / WEEK_GOAL;
                  const R = 42, CIRC = 2 * Math.PI * R;
                  const dash = ringPct * CIRC;
                  return <>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="big-num" style={{ fontSize: 26, color: "#a855f7" }}>
                        {streak}<span style={{ fontSize: 14, color: "#1e2d40", fontFamily: "'Inter',sans-serif", fontWeight: 400 }}> days</span>
                      </div>
                      {/* Weekly ring */}
                      <svg width={100} height={100} style={{ flexShrink: 0, overflow: "visible" }}>
                        <circle cx="50" cy="50" r={R} fill="none" stroke="#131929" strokeWidth="4" />
                        <circle cx="50" cy="50" r={R} fill="none"
                          stroke="#a855f7"
                          strokeWidth="4" strokeLinecap="round"
                          strokeDasharray={`${dash} ${CIRC}`}
                          transform="rotate(-90 50 50)"
                          style={{ transition: "stroke-dasharray 0.6s cubic-bezier(0.34,1.56,0.64,1)" }} />
                        <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fill="#e2e8f0" fontSize="11" fontFamily="'DM Mono',monospace" fontWeight="600">{weekHits}/7</text>
                      </svg>
                    </div>
                    <div style={{ color: "#475569", fontSize: 10, marginTop: 4 }}>
                      {streak === 0 ? "Log today!" : streak >= 7 ? "🔥 On fire!" : streak >= 3 ? "Keep it up!" : "Building momentum"}
                    </div>
                    <div style={{ color: "#334155", fontSize: 9, marginTop: 2, fontFamily: "'DM Mono',monospace" }}>This week: {weekHits}/7 days logged</div>
                    {logs.length > 0 && (() => {
                      const cells = Array.from({ length: 28 }, (_, i) => {
                        const d = new Date(); d.setDate(d.getDate() - (27 - i));
                        const ds = getLocalDateStr(d);
                        const l = logs.find(x => x.date === ds);
                        const score = l ? calcScore(l) : -1;
                        return { ds, score };
                      });
                      const color = (s) => s < 0 ? "#0f1623" : s === 0 ? "#131929" : s === 1 ? "#3b1f6b" : s === 2 ? "#5b2d8e" : s === 3 ? "#8b3fc8" : "#a855f7";
                      return (
                        <div style={{ marginTop: 10 }}>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(14, 1fr)", gap: 2 }}>
                            {cells.map(({ ds, score }) => (
                              <div key={ds} className="heatmap-cell" title={`${ds}: ${score < 0 ? "—" : `${score}/4`}`}
                                style={{ height: 8, background: color(score), borderRadius: 2 }} />
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </>;
                })()}
              </div>
            </div>



            {(() => {
              const score = today ? calcScore(today) : 0;
              const glowClass = score === 4 ? "card-glow-4" : score === 3 ? "card-glow-3" : score === 2 ? "card-glow-2" : score === 1 ? "card-glow-1" : "";
              return (
            <div className={`stat-card fade-up-3 ${glowClass}`} style={{ padding: "12px 14px", position: "relative" }}>
              {/* Spark container */}
              {showSparks && (
                <div ref={sparkContainerRef} style={{ position: "absolute", top: 0, left: "50%", pointerEvents: "none", zIndex: 10 }}>
                  {Array.from({ length: 10 }, (_, i) => {
                    const angle = (i / 10) * 2 * Math.PI;
                    const dist = 40 + Math.random() * 30;
                    return (
                      <div key={i} className="spark" style={{
                        background: ["#10b981","#34d399","#fbbf24","#a78bfa"][i % 4],
                        "--tx": `${Math.cos(angle) * dist}px`,
                        "--ty": `${Math.sin(angle) * dist}px`,
                        animationDelay: `${i * 0.04}s`,
                      }} />
                    );
                  })}
                </div>
              )}
              <div className="section-title" style={{ marginBottom: 10, fontSize: 9 }}>Today's Log</div>
              {today ? (
                <>
                  <div className="today-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                    {[
                      { label: "Cal", val: today.calories, check: v => parseInt(v) >= CALORIES_MIN && parseInt(v) <= CALORIES_MAX, unit: "kcal" },
                      { label: "Protein", val: today.protein, check: v => parseInt(v) >= PROTEIN_MIN, unit: "g" },
                      { label: "Steps", val: today.steps, check: v => parseInt(v) >= STEPS_MIN, unit: "steps" },
                      { label: "Training", val: today.training || (workouts.find(w => w.date === viewedDate) ? (workouts.find(w => w.date === viewedDate).name || workouts.find(w => w.date === viewedDate).activityType || "Trained") : null), check: v => v && v.trim() !== "", unit: "" },
                    ].map(({ label, val, check, unit }) => {
                      const hit = val ? check(val) : null;
                      const isSteps = label === "Steps";
                      return (
                        <div key={label} onClick={() => isSteps && !val && setShowManualSteps(v => !v)}
                          style={{ background: "#0f1623", borderRadius: 8, padding: "10px 8px", textAlign: "center", border: `1px solid ${hit === true ? "#10b98122" : hit === false ? "#f8717122" : "#131929"}`, cursor: isSteps && !val ? "pointer" : "default", position: "relative" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 5 }}>
                            <span className={`status-indicator ${hit === true ? "si-green" : hit === false ? "si-red" : "si-gray"}`} style={{ width: 6, height: 6 }} />
                            <span className="label" style={{ marginBottom: 0, fontSize: 8 }}>{label}</span>
                            {isSteps && val && <span onClick={e => { e.stopPropagation(); setShowManualSteps(v => !v); }} style={{ fontSize: 7, color: "#334155", cursor: "pointer", marginLeft: 2 }}>✏️</span>}
                          </div>
                          <div style={{ fontSize: 22, fontFamily: "'Bebas Neue', sans-serif", color: hit === true ? "#34d399" : hit === false ? "#f87171" : "#1e2d40", lineHeight: 1 }}>{val || (isSteps ? <span style={{ fontSize: 11, color: "#334155" }}>tap</span> : "—")}</div>
                          {unit && val && <div style={{ color: "#334155", fontSize: 9, marginTop: 2, fontFamily: "'DM Mono',monospace" }}>{unit}</div>}
                        </div>
                      );
                    })}
                  </div>
                  {showManualSteps && (
                    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                      <input type="number" placeholder="Enter steps..." value={manualStepsInput} onChange={e => setManualStepsInput(e.target.value)}
                        style={{ flex: 1, fontSize: 13, padding: "6px 10px" }} />
                      <button onClick={() => {
                        if (!manualStepsInput) return;
                        const tod = viewedDate;
                        setLogs(ls => { const existing = ls.find(l => l.date === tod); if (existing) { return ls.map(l => l.date === tod ? { ...l, steps: manualStepsInput } : l); } return [...ls, { date: tod, steps: manualStepsInput, calories: "", protein: "", training: "", weight: "", bodyFat: "", muscleMass: "", visceralFat: "" }]; });
                        setManualStepsInput(""); setShowManualSteps(false); haptic("light");
                      }} style={{ background: "linear-gradient(135deg,#1e3a5f,#3b82f6)", border: "1px solid #60a5fa44", color: "#60a5fa", fontSize: 11, fontWeight: 700, padding: "6px 14px", borderRadius: 6, cursor: "pointer" }}>SAVE</button>
                    </div>
                  )}
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#334155", fontSize: 10, fontFamily: "'DM Mono',monospace" }}>Score</span>
                      {Array.from({ length: 4 }, (_, i) => (
                        <div key={i} style={{ width: 16, height: 16, borderRadius: 3, background: i < calcScore(today) ? "linear-gradient(135deg,#059669,#10b981)" : "#131929", border: `1px solid ${i < calcScore(today) ? "#10b98155" : "#1e2d40"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {i < calcScore(today) && <span style={{ color: "#fff", fontSize: 8 }}>✓</span>}
                        </div>
                      ))}
                      <span style={{ color: "#475569", fontSize: 10, fontFamily: "'DM Mono',monospace" }}>{calcScore(today)}/4</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {!today.steps && <button onClick={() => setShowShortcutModal(true)} style={{ background: "none", border: "none", color: "#60a5fa", fontSize: 10, display: "flex", alignItems: "center", gap: 3, cursor: "pointer" }}>⚡ Sync Steps</button>}
                      <button onClick={() => navigateTo("Nutrition")} style={{ background: "none", border: "none", color: "#10b981", fontSize: 10, fontWeight: 500, display: "flex", alignItems: "center", gap: 2 }}>Update <ChevronRight size={11} /></button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <Zap size={28} />
                  <p>No log for today yet</p>
                  <button onClick={() => navigateTo("Nutrition")}>Start logging <ChevronRight size={12} style={{ display: "inline" }} /></button>
                </div>
              )}
            </div>
            );})()}
            {/* 7-Day Averages */}
            {(() => {
              const last7 = logs.filter(l => { const d = getDaysBetween(l.date, getLocalDateStr()); return d >= 0 && d < 7; });
              const withCal = last7.filter(l => l.calories && parseInt(l.calories) > 0);
              const withPro = last7.filter(l => l.protein && parseInt(l.protein) > 0);
              const withSteps = last7.filter(l => l.steps && parseInt(l.steps) > 0);
              const avgCal = withCal.length ? Math.round(withCal.reduce((s,l) => s + parseInt(l.calories), 0) / withCal.length) : null;
              const avgPro = withPro.length ? Math.round(withPro.reduce((s,l) => s + parseInt(l.protein), 0) / withPro.length) : null;
              const avgSteps = withSteps.length ? Math.round(withSteps.reduce((s,l) => s + parseInt(l.steps), 0) / withSteps.length) : null;
              if(!avgCal && !avgPro && !avgSteps) return null;
              return (
                <div className="stat-card fade-up-3" style={{ padding: "12px 14px" }}>
                  <div className="label" style={{ fontSize: 9, marginBottom: 10 }}>7-DAY AVERAGES</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    <div><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: avgCal && avgCal >= CALORIES_MIN && avgCal <= CALORIES_MAX ? "#34d399" : avgCal ? "#fbbf24" : "#334155", lineHeight: 1 }}>{avgCal || "—"}</div><div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", marginTop: 2 }}>kcal/day</div></div>
                    <div><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: avgPro && avgPro >= PROTEIN_MIN ? "#34d399" : avgPro ? "#fbbf24" : "#334155", lineHeight: 1 }}>{avgPro ? avgPro + "g" : "—"}</div><div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", marginTop: 2 }}>protein/day</div></div>
                    <div><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "#60a5fa", lineHeight: 1 }}>{avgSteps ? avgSteps.toLocaleString() : "—"}</div><div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", marginTop: 2 }}>steps/day</div></div>
                  </div>
                </div>
              );
            })()}



            {/* Cycle Tracker */}
            {cycleEnabled && (() => {
              const today = getLocalDateStr();
              const periodDates = cycleData.periodDates || [];
              const todaySymptoms = (cycleData.symptoms || {})[today] || [];
              const cycleDay = getCycleDay(today);
              const onPeriod = periodDates.includes(today);
              return (
                <div className="stat-card fade-up-4" style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 16 }}>🌙</span>
                    <div style={{ fontSize: 13, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#0f172a" }}>Cycle</div>
                    {cycleDay && <span style={{ marginLeft: "auto", fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>Day {cycleDay}</span>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <button onClick={() => { togglePeriodDay(today); haptic("light"); }}
                      style={{ padding: "10px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${onPeriod ? "#f4355088" : "#1e2d40"}`, background: onPeriod ? "#f4355022" : "#0f1623", color: onPeriod ? "#f43550" : "#475569", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      🩸 {onPeriod ? "Period today ✓" : "Log period day"}
                    </button>
                    <div>
                      <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 6, letterSpacing: 1 }}>SYMPTOMS TODAY</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {CYCLE_SYMPTOMS.map(s => {
                          const active = todaySymptoms.includes(s);
                          return (
                            <button key={s} onClick={() => { toggleSymptom(today, s); haptic("light"); }}
                              style={{ padding: "5px 9px", borderRadius: 20, fontSize: 10, cursor: "pointer", border: `1px solid ${active ? "#a855f7" : "#1e2d40"}`, background: active ? "#a855f722" : "#0f1623", color: active ? "#c084fc" : "#334155", fontFamily: "'DM Mono',monospace" }}>
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {periodDates.length > 0 && (() => {
                      // Show last few period days as mini calendar strip
                      const recent = periodDates.slice(-7);
                      return (
                        <div style={{ borderTop: "1px solid #131929", paddingTop: 10 }}>
                          <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 6, letterSpacing: 1 }}>RECENT PERIOD DAYS</div>
                          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                            {recent.map(d => <span key={d} style={{ fontSize: 10, color: "#f43550", fontFamily: "'DM Mono',monospace", background: "#f4355011", border: "1px solid #f4355033", borderRadius: 6, padding: "2px 7px" }}>{d.slice(5)}</span>)}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              );
            })()}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div className="stat-card fade-up-4" style={{ padding: "10px 12px" }}>
                <div className="label" style={{ fontSize: 9, marginBottom: 6 }}>Share</div>
                <button onClick={shareStats} style={{ background: "linear-gradient(135deg,#052e1c,#0a3d26)", border: "1px solid #065f3a44", color: "#34d399", padding: "6px 8px", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>📤 Share</button>
              </div>
              <div className="stat-card fade-up-4" style={{ padding: "10px 12px" }}>
                <div className="label" style={{ fontSize: 9, marginBottom: 6 }}>Reminders</div>
                <button onClick={async () => { if (!notifEnabled) { const p = await Notification.requestPermission(); if (p === "granted") { setNotifEnabled(true); haptic("success"); } } else { setNotifEnabled(false); } }} style={{ background: notifEnabled ? "linear-gradient(135deg,#059669,#10b981)" : "#0f1623", border: `1px solid ${notifEnabled ? "#10b98155" : "#1e2d40"}`, color: notifEnabled ? "#fff" : "#475569", padding: "6px 8px", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer", width: "100%", transition: "all 0.2s" }}>{notifEnabled ? "On ✓" : "Enable"}</button>
              </div>
            </div>

            {/* Settings & Targets */}
            <div className="stat-card fade-up-4" style={{ padding: "10px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Settings2 size={14} style={{ color: "#475569" }} />
                  <div>
                    <div className="label" style={{ fontSize: 9, marginBottom: 4 }}>Settings & Targets</div>
                    <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>
                      <div style={{display:"flex",gap:10,marginTop:4}}><div style={{textAlign:"center"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"#34d399",lineHeight:1}}>{S_CALORIES_MIN}–{S_CALORIES_MAX}</div><div style={{fontSize:8,color:"#94a3b8",fontFamily:"'DM Mono',monospace"}}>kcal</div></div><div style={{textAlign:"center"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"#60a5fa",lineHeight:1}}>≥{S_PROTEIN_MIN}g</div><div style={{fontSize:8,color:"#94a3b8",fontFamily:"'DM Mono',monospace"}}>protein</div></div><div style={{textAlign:"center"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"#a855f7",lineHeight:1}}>≥{S_STEPS_MIN.toLocaleString()}</div><div style={{fontSize:8,color:"#94a3b8",fontFamily:"'DM Mono',monospace"}}>steps</div></div></div>
                    </div>
                  </div>
                </div>
                <button onClick={() => navigateTo("Settings")}
                  style={{ background: "linear-gradient(135deg,#0f1623,#1e2d40)", border: "1px solid #1e2d4066", color: "#94a3b8", padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                  Edit <ChevronRight size={11} />
                </button>
              </div>
            </div>

          </div>
        )}


        {/* WEIGHT TRACKER */}
        {tab === "Weight Tracker" && (() => {
          const isWeighInDay = [2,4,6].includes(new Date().getDay());
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="section-title">WEIGHT TRACKER</div>

              {isWeighInDay && (
                <div style={{ background: "#071910", border: "1px solid #10b98133", borderRadius: 10, padding: "10px 16px", color: "#34d399", fontSize: 11 }}>
                  ⚖️ Today is a weigh-in day — log your weight below
                </div>
              )}

              {/* Date + Body Metrics combined */}
              <div className="stat-card" style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div className="field-label" style={{ marginBottom: 0, whiteSpace: "nowrap" }}>Date</div>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={{ width: "auto" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <div>
                    <div className="field-label" style={{ marginBottom: 4, fontSize: 9 }}>WEIGHT (LBS)</div>
                    <input type="number" placeholder="205.0" step="0.1" value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} style={{ padding: "6px 8px", fontSize: 13 }} />
                  </div>
                  <div>
                    <div className="field-label" style={{ marginBottom: 4, fontSize: 9 }}>BODY FAT %</div>
                    <input type="number" placeholder="44.5" step="0.1" value={form.bodyFat} onChange={e => setForm(f => ({ ...f, bodyFat: e.target.value }))} style={{ padding: "6px 8px", fontSize: 13 }} />
                  </div>
                  <div>
                    <div className="field-label" style={{ marginBottom: 4, fontSize: 9 }}>MUSCLE (LBS)</div>
                    <input type="number" placeholder="107.2" step="0.1" value={form.muscleMass} onChange={e => setForm(f => ({ ...f, muscleMass: e.target.value }))} style={{ padding: "6px 8px", fontSize: 13 }} />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                  <button className={`save-btn${saved ? " saved-state" : ""}`} onClick={saveLog} style={{ fontSize: 12, padding: "7px 16px" }}>{saved ? "✓ Saved" : "Save Weigh-in"}</button>
                </div>

              </div>
              {/* Biometric trend chart */}
              {weighIns.length >= 2 && (() => {
                const pts = weighIns.slice(-12);
                const W = 280, H = 80;
                const wVals = pts.map(p => parseFloat(p.weight));
                const wMin = Math.min(...wVals), wMax = Math.max(...wVals);
                const x = i => (i / (pts.length - 1)) * W;
                const yW = v => H - 10 - ((v - wMin) / (wMax - wMin || 1)) * (H - 20);
                const weightPath = pts.map((p,i) => `${i===0?"M":"L"}${x(i).toFixed(1)},${yW(parseFloat(p.weight)).toFixed(1)}`).join(" ");
                // Trend prediction line
                const days = getDaysBetween(pts[0].date, pts[pts.length-1].date);
                const rate = days > 0 ? (wVals[0] - wVals[wVals.length-1]) / days : 0;
                const daysToDeadline = getDaysBetween(pts[pts.length-1].date, DEADLINE);
                const predWeight = parseFloat(pts[pts.length-1].weight) - rate * daysToDeadline;
                const goalY = yW(GOAL_WEIGHT < wMin ? wMin : GOAL_WEIGHT > wMax ? wMax : GOAL_WEIGHT);
                // Body fat line if available
                const bfPts = pts.filter(p => p.bodyFat);
                const bfVals = bfPts.map(p => parseFloat(p.bodyFat));
                const bfMin = Math.min(...bfVals), bfMax = Math.max(...bfVals);
                const yBF = v => H - 10 - ((v - bfMin) / (bfMax - bfMin || 1)) * (H - 20);
                const bfPath = bfPts.length >= 2 ? bfPts.map((p,i) => {
                  const xi = pts.findIndex(pt => pt.date === p.date);
                  return `${i===0?"M":"L"}${x(xi).toFixed(1)},${yBF(parseFloat(p.bodyFat)).toFixed(1)}`;
                }).join(" ") : null;
                return (
                  <div className="stat-card">
                    <div className="section-title" style={{ fontSize: 14 }}>TREND CHART</div>
                    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible", display: "block" }}>
                      <defs>
                        <linearGradient id="wg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#059669"/><stop offset="100%" stopColor="#34d399"/></linearGradient>
                      </defs>
                      {/* Goal line */}
                      {GOAL_WEIGHT >= wMin && GOAL_WEIGHT <= wMax && <line x1="0" y1={goalY} x2={W} y2={goalY} stroke="#fbbf2444" strokeWidth="1" strokeDasharray="4 3" />}
                      {/* Prediction dotted extension */}
                      {rate > 0 && <line x1={x(pts.length-1)} y1={yW(parseFloat(pts[pts.length-1].weight))} x2={W + 20} y2={yW(Math.max(predWeight, wMin - 2))} stroke="#10b98166" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" />}
                      {/* Body fat line */}
                      {bfPath && <path d={bfPath} fill="none" stroke="#a78bfa99" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
                      {/* Weight line */}
                      <path d={weightPath} fill="none" stroke="url(#wg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      {pts.map((p,i) => <circle key={i} cx={x(i)} cy={yW(parseFloat(p.weight))} r="2.5" fill="#10b981" />)}
                    </svg>
                    <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 16, height: 2, background: "linear-gradient(to right,#059669,#34d399)", borderRadius: 1 }} /><span style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}>Weight</span></div>
                      {bfPath && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 16, height: 2, background: "#a78bfa", borderRadius: 1 }} /><span style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}>Body Fat %</span></div>}
                    </div>
                  </div>
                );
              })()}

              {/* Animated weight journey timeline */}
              {weighIns.length > 0 && (
                <div className="stat-card">
                  <div className="section-title" style={{ fontSize: 14 }}>WEIGHT JOURNEY</div>
                  {/* Weight loss progress arc */}
                  {weighIns.length > 0 && (() => {
                    const startW = parseFloat(START_WEIGHT);
                    const goalW = parseFloat(GOAL_WEIGHT);
                    const currentW = parseFloat([...weighIns].sort((a,b) => b.date.localeCompare(a.date))[0]?.weight || startW);
                    const totalToLose = startW - goalW;
                    const lost = startW - currentW;
                    const pct = Math.max(0, Math.min(1, lost / totalToLose));
                    const R = 30, CIRC = 2 * Math.PI * R;
                    const dash = pct * CIRC;
                    const col = pct >= 1 ? "#34d399" : pct >= 0.5 ? "#fbbf24" : "#60a5fa";
                    return (
                      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #131929" }}>
                        <svg width={74} height={74}>
                          <circle cx="37" cy="37" r={R} fill="none" stroke="#131929" strokeWidth="5" />
                          <circle cx="37" cy="37" r={R} fill="none" stroke={col} strokeWidth="5"
                            strokeDasharray={`${dash} ${CIRC}`} transform="rotate(-90 37 37)"
                            strokeLinecap="round" />
                          <text x="37" y="33" textAnchor="middle" dominantBaseline="central" fill={darkMode ? "#e2e8f0" : "#0f172a"} fontSize="13" fontFamily="'Bebas Neue',sans-serif">{Math.round(pct*100)}%</text>
                          <text x="37" y="47" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="'DM Mono',monospace">to goal</text>
                        </svg>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 4 }}>WEIGHT LOSS PROGRESS</div>
                          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: col, lineHeight: 1 }}>{lost > 0 ? lost.toFixed(1) : 0}<span style={{ fontSize: 12, color: "#475569" }}> lbs lost</span></div>
                          <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginTop: 4 }}>{Math.max(0, (currentW - goalW).toFixed(1))} lbs to goal ({goalW} lbs)</div>
                          <div className="bar-bg" style={{ marginTop: 6 }}><div className="bar-fill" style={{ width: `${Math.round(pct*100)}%`, background: col }} /></div>
                        </div>
                      </div>
                    );
                  })()}
                  {/* Vertical timeline */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {[...weighIns].reverse().map((w, i) => {
                      const prev = i < weighIns.length - 1 ? [...weighIns].reverse()[i + 1] : null;
                      const delta = prev ? (parseFloat(w.weight) - parseFloat(prev.weight)).toFixed(1) : null;
                      const isFirst = i === 0;
                      const deltaColor = delta === null ? "#10b981" : parseFloat(delta) < 0 ? "#34d399" : parseFloat(delta) > 0 ? "#f87171" : "#475569";
                      return (
                        <div key={w.date} className="timeline-node" style={{ display: "flex", alignItems: "center", gap: 8, background: isFirst ? "#0f1623" : "transparent", borderRadius: 8, padding: isFirst ? "8px 12px" : "4px 8px", border: isFirst ? "1px solid #1e2d40" : "1px solid transparent", animation: `fadeUp 0.3s ${i * 0.04}s ease both` }}>
                          <div style={{ width: 4, height: isFirst ? 36 : 24, borderRadius: 2, background: isFirst ? "linear-gradient(to bottom,#059669,#34d399)" : "#1e2d40", flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: isFirst ? 24 : 16, color: isFirst ? "#10b981" : "#94a3b8", lineHeight: 1 }}>{w.weight}</span>
                                <span style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>lb</span>
                                {delta !== null && (
                                  <span style={{ fontSize: 10, fontFamily: "'Bebas Neue',sans-serif", color: deltaColor }}>
                                    {parseFloat(delta) > 0 ? "+" : ""}{delta}
                                  </span>
                                )}
                              </div>
                              <span style={{ fontSize: 10, color: "#334155", fontFamily: "'DM Mono',monospace" }}>{w.date}</span>
                            </div>
                            {(w.bodyFat || w.muscleMass) && (
                              <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                                {w.bodyFat && <span style={{ fontSize: 8, color: "#a78bfa", fontFamily: "'DM Mono',monospace" }}>BF {w.bodyFat}%</span>}
                                {w.muscleMass && <span style={{ fontSize: 8, color: "#34d399", fontFamily: "'DM Mono',monospace" }}>Muscle {w.muscleMass}lb</span>}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* MEALS */}
        {tab === "Nutrition" && (() => {
          const dayTotals = getAllDayTotals();
          const totalCals = dayTotals.calories;
          const totalPro = dayTotals.protein;
          const calRemaining = CALORIES_MAX - totalCals;
          const calPct = Math.min(100, Math.round((totalCals / CALORIES_MAX) * 100));
          const proPct = Math.min(100, Math.round((totalPro / PROTEIN_MIN) * 100));
          const calColor = totalCals >= CALORIES_MIN && totalCals <= CALORIES_MAX ? "#34d399" : totalCals > CALORIES_MAX ? "#f87171" : "#fbbf24";
          const proColor = totalPro >= PROTEIN_MIN ? "#34d399" : "#fbbf24";
          const totalCarbs = Math.round(MEAL_SLOTS.reduce((s, slot) => s + (mealFoods[slot] || []).reduce((ms, f) => ms + (f.carbs || 0), 0), 0));
          const totalFat = Math.round(MEAL_SLOTS.reduce((s, slot) => s + (mealFoods[slot] || []).reduce((ms, f) => ms + (f.fat || 0), 0), 0));
          const recentFoods = getRecentFoods();
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Header row — date nav + copy yesterday */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => { const d = new Date(nutritionDate + "T12:00:00"); d.setDate(d.getDate()-1); navigateNutritionDate(getLocalDateStr(d)); }} style={{ background: "none", border: "1px solid #1e2d40", color: "#475569", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 14 }}>‹</button>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#94a3b8", minWidth: 90, textAlign: "center" }}>
                    {nutritionDate === getLocalDateStr() ? "Today" : nutritionDate === (() => { const d = new Date(); d.setDate(d.getDate()+1); return getLocalDateStr(d); })() ? "Tomorrow" : nutritionDate}
                  </div>
                  <button onClick={() => { const d = new Date(nutritionDate + "T12:00:00"); d.setDate(d.getDate()+1); navigateNutritionDate(getLocalDateStr(d)); }} style={{ background: "none", border: "1px solid #1e2d40", color: "#475569", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 14 }}>›</button>
                </div>
                <button onClick={() => { if (!copyYesterdayMeals()) alert("No meals logged yesterday"); }} style={{ background: "none", border: "1px solid #1e2d40", color: "#475569", padding: "5px 12px", borderRadius: 8, fontSize: 10, fontFamily: "'DM Mono',monospace", cursor: "pointer" }}>↑ Copy Yesterday</button>
              </div>

              {/* Daily goal ring */}
              <div className="stat-card" style={{ borderColor: "#046c4e22" }}>
                {/* Top row: calories | ring | protein (highlighted) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, color: darkMode ? "#e2e8f0" : "#0f172a", lineHeight: 1 }}>{totalCals.toLocaleString()}</div>
                    <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}>CALORIES</div>
                  </div>
                  {/* Center ring */}
                  {(() => {
                    const R = 42, CIRC = 2 * Math.PI * R;
                    const dash = (calPct / 100) * CIRC;
                    return (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <svg width={90} height={90}>
                          <circle cx="45" cy="45" r={R} fill="none" stroke="#131929" strokeWidth="7" />
                          <circle cx="45" cy="45" r={R} fill="none" stroke={calColor} strokeWidth="7"
                            strokeDasharray={`${dash} ${CIRC}`} transform="rotate(-90 45 45)"
                            strokeLinecap="round" style={{ transition: "stroke-dasharray 0.6s cubic-bezier(0.34,1.56,0.64,1)" }} />
                          <text x="45" y="40" textAnchor="middle" dominantBaseline="central" fill={calColor} fontSize="16" fontFamily="'Bebas Neue',sans-serif">{calRemaining > 0 ? calRemaining.toLocaleString() : "0"}</text>
                          <text x="45" y="56" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="'DM Mono',monospace">{calRemaining > 0 ? "remaining" : "over"}</text>
                        </svg>
                        <div style={{ fontSize: 9, color: "#334155", fontFamily: "'DM Mono',monospace" }}>BUDGET {CALORIES_MAX}</div>
                      </div>
                    );
                  })()}
                  {/* Protein — highlighted */}
                  <div style={{ textAlign: "center", background: "#0a2118", borderRadius: 10, padding: "10px 6px", border: `1px solid ${proColor}33` }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: proColor, lineHeight: 1 }}>{Math.round(totalPro)}g</div>
                    <div style={{ fontSize: 9, color: proColor, fontFamily: "'DM Mono',monospace", fontWeight: 600 }}>PROTEIN</div>
                    <div style={{ fontSize: 9, color: "#334155", fontFamily: "'DM Mono',monospace", marginTop: 2 }}>goal {PROTEIN_MIN}g</div>
                  </div>
                </div>

                {/* Carbs + Fat row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12, paddingTop: 12, borderTop: "1px solid #131929" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "#fbbf24", lineHeight: 1 }}>{totalCarbs}g</div>
                    <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}>CARBS</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "#f97316", lineHeight: 1 }}>{totalFat}g</div>
                    <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}>FAT</div>
                  </div>
                </div>

                {/* Protein + cal bars */}
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", width: 50 }}>PROTEIN</span>
                    <div className="bar-bg" style={{ flex: 1 }}><div className="bar-fill" style={{ width: `${proPct}%`, background: proColor }} /></div>
                    <span style={{ fontSize: 9, color: proColor, fontFamily: "'DM Mono',monospace", width: 40, textAlign: "right" }}>{Math.round(totalPro)}/{PROTEIN_MIN}g</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", width: 50 }}>CALORIES</span>
                    <div className="bar-bg" style={{ flex: 1 }}><div className="bar-fill" style={{ width: `${calPct}%`, background: calColor }} /></div>
                    <span style={{ fontSize: 9, color: calColor, fontFamily: "'DM Mono',monospace", width: 60, textAlign: "right" }}>{totalCals}/{CALORIES_MAX}</span>
                  </div>
                </div>
                <div style={{ marginTop: 4, fontSize: 10, color: "#334155", fontFamily: "'DM Mono',monospace", textAlign: "right" }}>✓ Auto-saved</div>
              </div>

            {/* Water + Sleep side by side */}
            <div style={{ display: "flex", gap: 8 }}>
              {/* Water Tracker */}
              <div className="stat-card fade-up-4" style={{ padding: "12px 12px", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <Droplets size={14} style={{ color: "#60a5fa" }} />
                  <div style={{ fontSize: 12, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#0f172a" }}>Water</div>
                </div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, color: waterDisplayVal() >= waterGoalDisplay() ? "#34d399" : "#60a5fa", lineHeight: 1, marginBottom: 6 }}>
                  {waterDisplayVal()}<span style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono',monospace" }}> / {waterGoalDisplay()}{WATER_UNITS.find(u => u.id === waterUnit)?.label}</span>
                </div>
                <div className="bar-bg" style={{ marginBottom: 8 }}>
                  <div className="bar-fill" style={{ width: `${Math.min(100, Math.round((waterDisplayVal() / waterGoalDisplay()) * 100))}%`, background: waterDisplayVal() >= waterGoalDisplay() ? "#34d399" : "#3b82f6" }} />
                </div>
                <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                  {WATER_UNITS.map(u => (
                    <button key={u.id} onClick={() => { setWaterUnit(u.id); localStorage.setItem("dat-water-unit", u.id); }}
                      style={{ flex: 1, background: waterUnit === u.id ? "#1d4ed8" : "#0f1623", border: `1px solid ${waterUnit === u.id ? "#3b82f6" : "#1e2d40"}`, color: waterUnit === u.id ? "#fff" : "#475569", padding: "3px 2px", borderRadius: 6, fontSize: 10, fontWeight: waterUnit === u.id ? 700 : 400, cursor: "pointer", fontFamily: "'DM Mono',monospace" }}>
                      {u.label}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                  <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", letterSpacing: 1 }}>GOAL:</div>
                  {WATER_UNITS.map(u => (
                    <button key={u.id} onClick={() => saveWaterGoalMl(waterGoalMlState - u.ml)}
                      style={{ display: waterUnit === u.id ? "flex" : "none", background: "#0f1623", border: "1px solid #1e2d40", color: "#475569", width: 20, height: 20, borderRadius: 5, cursor: "pointer", fontSize: 12, alignItems: "center", justifyContent: "center" }}>{"-"}</button>
                  ))}
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: "#60a5fa", minWidth: 28, textAlign: "center" }}>
                    {waterGoalDisplay()}<span style={{ fontSize: 9, color: "#334155" }}>{WATER_UNITS.find(u => u.id === waterUnit)?.label}</span>
                  </div>
                  {WATER_UNITS.map(u => (
                    <button key={u.id} onClick={() => saveWaterGoalMl(waterGoalMlState + u.ml)}
                      style={{ display: waterUnit === u.id ? "flex" : "none", background: "#0f1623", border: "1px solid #1e2d40", color: "#475569", width: 20, height: 20, borderRadius: 5, cursor: "pointer", fontSize: 12, alignItems: "center", justifyContent: "center" }}>{"+"}</button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={removeWater} style={{ flex: 1, background: "#0f1623", border: "1px solid #1e2d40", color: "#60a5fa", padding: "6px", borderRadius: 7, cursor: "pointer", fontSize: 16 }}>−</button>
                  <button onClick={addWater} style={{ flex: 1, background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", border: "none", color: "#fff", padding: "6px", borderRadius: 7, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
                    +{WATER_UNITS.find(u => u.id === waterUnit)?.label}
                  </button>
                </div>
              </div>

              {/* Sleep Tracker */}
              {(() => {
                const sleep = getSleepToday();
                const qualityLabels = ["","😴 Poor","😕 Fair","😊 Okay","😌 Good","🌟 Great"];
                const qualityColors = ["","#f87171","#fb923c","#fbbf24","#34d399","#10b981"];
                return (
                  <div className="stat-card fade-up-4" style={{ padding: "12px 12px", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                      <span style={{ fontSize: 14 }}>😴</span>
                      <div style={{ fontSize: 12, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#0f172a" }}>Sleep</div>
                      {sleep.hours && <span style={{ marginLeft: "auto", fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: "#60a5fa" }}>{sleep.hours}h</span>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <div>
                        <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 4, letterSpacing: 1 }}>HOURS SLEPT</div>
                        <select value={sleep.hours || ""} onChange={e => { saveSleep("hours", e.target.value ? parseFloat(e.target.value) : ""); haptic("light"); }}
                          style={{ width: "100%", background: "#0f1623", border: "1px solid #1e2d40", borderRadius: 7, color: sleep.hours ? "#60a5fa" : "#475569", fontSize: 12, fontFamily: "'DM Mono',monospace", padding: "5px 8px", cursor: "pointer", outline: "none" }}>
                          <option value="">-- hrs</option>
                          {[4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10].map(h => (
                            <option key={h} value={h}>{h}h</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 4, letterSpacing: 1 }}>QUALITY</div>
                        <select value={sleep.quality || ""} onChange={e => { saveSleep("quality", e.target.value ? parseInt(e.target.value) : 0); haptic("light"); }}
                          style={{ width: "100%", background: "#0f1623", border: `1px solid ${sleep.quality ? qualityColors[sleep.quality] : "#1e2d40"}`, borderRadius: 7, color: sleep.quality ? qualityColors[sleep.quality] : "#475569", fontSize: 12, fontFamily: "'DM Mono',monospace", padding: "5px 8px", cursor: "pointer", outline: "none" }}>
                          <option value="">-- quality</option>
                          <option value="1">😴 Poor</option>
                          <option value="2">😕 Fair</option>
                          <option value="3">😊 Okay</option>
                          <option value="4">😌 Good</option>
                          <option value="5">🌟 Great</option>
                        </select>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 4, letterSpacing: 1 }}>NOTES</div>
                        <textarea value={sleep.note || ""} onChange={e => saveSleep("note", e.target.value)}
                          placeholder="Any notes..."
                          style={{ width: "100%", boxSizing: "border-box", background: "#0f1623", border: "1px solid #1e2d40", borderRadius: 7, color: "#e2e8f0", fontSize: 10, fontFamily: "'DM Mono',monospace", padding: "6px 8px", resize: "none", minHeight: 48, outline: "none" }} />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
              <div className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", cursor: "pointer" }} onClick={() => setShowManualMacros(v => !v)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14 }}>✏️</span>
                    <div style={{ fontSize: 13, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#0f172a" }}>Manual Macro Entry</div>
                    {Object.keys(getManualToday()).length > 0 && <span style={{ fontSize: 10, color: "#34d399", fontFamily: "'DM Mono',monospace" }}>✓ Entered</span>}
                  </div>
                  <span style={{ color: "#475569", fontSize: 14, transition: "transform 0.2s", display: "inline-block", transform: showManualMacros ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
                </div>
                {showManualMacros && (
                  <div style={{ padding: "0 16px 16px", borderTop: "1px solid #131929" }}>
                    <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", margin: "12px 0 10px", letterSpacing: 1 }}>ENTER YOUR TOTALS FOR TODAY</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {[
                        { key: "calories", label: "Calories", unit: "kcal", color: "#fbbf24" },
                        { key: "protein",  label: "Protein",  unit: "g",    color: "#34d399" },
                        { key: "carbs",    label: "Carbs",    unit: "g",    color: "#60a5fa" },
                        { key: "fat",      label: "Fat",      unit: "g",    color: "#f87171" },
                        { key: "fiber",    label: "Fiber",    unit: "g",    color: "#a78bfa" },
                        { key: "sugar",    label: "Sugar",    unit: "g",    color: "#fb923c" },
                      ].map(({ key, label, unit, color }) => {
                        const manual = getManualToday();
                        return (
                          <div key={key}>
                            <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 4 }}>{label} <span style={{ color }}>{unit}</span></div>
                            <input type="number" placeholder="0" value={manual[key] || ""}
                              onChange={e => saveManualMacro(key, e.target.value)}
                              style={{ width: "100%", boxSizing: "border-box" }} />
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ marginTop: 12, fontSize: 10, color: "#334155", fontFamily: "'DM Mono',monospace" }}>
                      These totals will be added to your tracked foods for the day.
                    </div>
                  </div>
                )}
              </div>

              {/* Meal slots */}
              {MEAL_SLOTS.map(slot => {
                const foods = mealFoods[slot] || [];
                const totals = getMealTotals(slot);
                const isOpen = activeMealSlot === slot;
                return (
                  <div key={slot} className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
                    {/* Meal header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: foods.length > 0 || isOpen ? "1px solid #131929" : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{MEAL_ICONS[slot]}</span>
                        <div>
                          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 1, color: darkMode ? "#e2e8f0" : "#0f172a" }}>{slot}</div>
                          {totals.calories > 0 && <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>{totals.calories} kcal · {Math.round(totals.protein)}g protein</div>}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {foods.length > 0 && (
                          <button onClick={() => { setSaveMealSlot(slot); setSaveMealName(""); }} style={{ background: "none", border: "1px solid #1e2d40", color: "#475569", padding: "4px 10px", borderRadius: 7, fontSize: 10, cursor: "pointer" }}>💾 Save</button>
                        )}
                        <button onClick={() => { setActiveMealSlot(isOpen ? null : slot); setFoodResults(null); setFoodSearch(""); setFoodError(null); setMacroTab("search"); }}
                          style={{ background: isOpen ? "linear-gradient(135deg,#059669,#10b981)" : "#0f1623", border: `1px solid ${isOpen ? "transparent" : "#1e2d40"}`, color: isOpen ? "#fff" : "#10b981", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                          {isOpen ? "✕ Close" : "+ Add Food"}
                        </button>
                        <button onClick={() => { if (!copyYesterdaySlot(slot)) haptic("error"); }}
                          style={{ background: "none", border: "1px solid #1e2d40", color: "#475569", padding: "4px 10px", borderRadius: 7, fontSize: 10, cursor: "pointer", fontFamily: "'DM Mono',monospace" }}
                          title={`Copy yesterday's ${slot}`}>↑ Yesterday</button>
                      </div>
                    </div>

                    {/* Save meal prompt */}
                    {saveMealSlot === slot && (
                      <div style={{ padding: "10px 16px", background: "#0c0e18", borderBottom: "1px solid #131929", display: "flex", gap: 8 }}>
                        <input type="text" placeholder="Name this meal (e.g. High Protein Lunch)..." value={saveMealName} onChange={e => setSaveMealName(e.target.value)} onKeyDown={e => e.key === "Enter" && saveMeal(slot)} style={{ flex: 1, fontSize: 11 }} />
                        <button onClick={() => saveMeal(slot)} style={{ background: "linear-gradient(135deg,#059669,#10b981)", border: "none", color: "#fff", padding: "6px 12px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Save</button>
                        <button onClick={() => setSaveMealSlot(null)} style={{ background: "none", border: "1px solid #1e2d40", color: "#475569", padding: "6px 10px", borderRadius: 7, fontSize: 11, cursor: "pointer" }}>✕</button>
                      </div>
                    )}

                    {/* Food items */}
                    {foods.length > 0 && (
                      <div style={{ padding: "8px 16px" }}>
                        {foods.map(f => {
                          const isEditing = editingFood?.slot === slot && editingFood?.id === f.id;
                          return (
                            <div key={f.id} style={{ borderBottom: "1px solid #0f162388" }}>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0" }}>
                                <div style={{ flex: 1, minWidth: 0 }} onClick={() => setEditingFood(isEditing ? null : { slot, id: f.id, grams: f.grams || 100 })} >
                                  <div style={{ fontSize: 12, color: darkMode ? "#e2e8f0" : "#0f172a", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                                  <div style={{ fontSize: 10, color: "#334155", fontFamily: "'DM Mono',monospace" }}>{f.servingSize || "1 serving"} · <span style={{ color: "#10b981" }}>tap to edit</span></div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                                  <div style={{ textAlign: "right" }}>
                                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: "#10b981", lineHeight: 1 }}>{f.calories}</div>
                                    <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}>{Math.round(f.protein)}g pro</div>
                                  </div>
                                  <button onClick={() => removeFoodFromMeal(slot, f.id)} style={{ background: "none", border: "none", color: "#334155", fontSize: 16, cursor: "pointer", padding: "0 2px" }}>✕</button>
                                </div>
                              </div>
                              {/* Inline edit panel */}
                              {isEditing && (
                                <div style={{ background: "#0c0e18", borderRadius: 8, padding: "10px 12px", marginBottom: 8, border: "1px solid #1e2d40" }}>
                                  <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 8 }}>ADJUST QUANTITY</div>
                                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                                    <button onClick={() => setEditingFood(e => ({ ...e, grams: Math.max(5, (e.grams || 100) - 25) }))}
                                      style={{ background: "#131929", border: "1px solid #1e2d40", color: "#e2e8f0", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16, fontWeight: 600 }}>−</button>
                                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
                                      <input type="number" value={editingFood.grams}
                                        onChange={e => setEditingFood(ef => ({ ...ef, grams: Math.max(1, parseInt(e.target.value) || 0) }))}
                                        style={{ flex: 1, textAlign: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: 20 }} />
                                      <span style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono',monospace" }}>g</span>
                                    </div>
                                    <button onClick={() => setEditingFood(e => ({ ...e, grams: (e.grams || 100) + 25 }))}
                                      style={{ background: "#131929", border: "1px solid #1e2d40", color: "#e2e8f0", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16, fontWeight: 600 }}>+</button>
                                  </div>
                                  {/* Preview recalculated macros */}
                                  {(() => {
                                    const base = f.basePer100g || { calories: f.calories, protein: f.protein };
                                    const mult = editingFood.grams / 100;
                                    return (
                                      <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
                                        <div><span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, color: "#10b981" }}>{Math.round(base.calories * mult)}</span><span style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}> kcal</span></div>
                                        <div><span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, color: "#34d399" }}>{Math.round(base.protein * mult * 10)/10}g</span><span style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}> protein</span></div>
                                      </div>
                                    );
                                  })()}
                                  <div style={{ display: "flex", gap: 8 }}>
                                    <button onClick={() => { updateFoodInMeal(slot, f.id, editingFood.grams); setEditingFood(null); haptic("success"); }}
                                      style={{ flex: 1, background: "linear-gradient(135deg,#059669,#10b981)", border: "none", color: "#fff", padding: "8px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                                      ✓ Update
                                    </button>
                                    <button onClick={() => setEditingFood(null)}
                                      style={{ background: "none", border: "1px solid #1e2d40", color: "#475569", padding: "8px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Add Food panel */}
                    {isOpen && (
                      <div style={{ padding: "12px 16px", background: "#0b0d15" }}>

                        {/* Saved meals for this slot */}
                        {savedMeals.length > 0 && (
                          <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 9, color: "#334155", fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 6 }}>SAVED MEALS</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                              {savedMeals.map(m => (
                                <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0f1623", borderRadius: 8, padding: "8px 12px", border: "1px solid #1e2d40" }}>
                                  <div>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>📋 {m.name}</div>
                                    <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>{m.calories} kcal · {Math.round(m.protein)}g protein</div>
                                  </div>
                                  <div style={{ display: "flex", gap: 6 }}>
                                    <button onClick={() => { confirmLoadMeal(m, slot); haptic("success"); }}
                                      style={{ background: "linear-gradient(135deg,#052e1c,#0a3d26)", border: "1px solid #065f3a44", color: "#34d399", padding: "5px 12px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>+ Add</button>
                                    <button onClick={() => setSavedMeals(ms => ms.filter(x => x.id !== m.id))}
                                      style={{ background: "none", border: "1px solid #1e2d40", color: "#475569", padding: "5px 8px", borderRadius: 7, cursor: "pointer" }}><Trash2 size={11} /></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div style={{ height: 1, background: "#131929", margin: "12px 0" }} />
                          </div>
                        )}

                        {/* Tab bar */}
                        <div style={{ display: "flex", gap: 3, marginBottom: 12, background: "#0f1623", borderRadius: 10, padding: 4 }}>
                          {[["search","🔍 Search"],["barcode","📷 Barcode"],["favorites","⭐ Saved"],["manual","✏️ Manual"]].map(([id, label]) => (
                            <button key={id} onClick={() => { setMacroTab(id); setFoodResults(null); setFoodError(null); setBarcodeError(null); setShowManualEntry(false); }}
                              style={{ flex: 1, background: macroTab === id ? "linear-gradient(135deg,#059669,#10b981)" : "none", border: "none", color: macroTab === id ? "#fff" : "#475569", padding: "6px 4px", borderRadius: 7, fontSize: 10, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                              {label}
                            </button>
                          ))}
                        </div>

                        {/* SEARCH TAB */}
                        {macroTab === "search" && (
                          <div>
                            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                              <input type="text" placeholder="e.g. siggi's yogurt, chicken breast..." value={foodSearch}
                                onChange={e => setFoodSearch(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && searchFood(foodSearch)}
                                style={{ flex: 1 }} />
                              <button onClick={() => searchFood(foodSearch)} disabled={foodSearching}
                                style={{ background: foodSearching ? "#0f1623" : "linear-gradient(135deg,#059669,#10b981)", border: "none", color: foodSearching ? "#10b981" : "#fff", padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: foodSearching ? "default" : "pointer", minWidth: 52, transition: "all 0.2s" }}>
                                {foodSearching ? "⟳" : "Go"}
                              </button>
                            </div>
                            {/* Loading state */}
                            {foodSearching && (
                              <div style={{ marginBottom: 8 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse 1s infinite" }} />
                                  <span style={{ fontSize: 11, color: "#10b981", fontFamily: "'DM Mono',monospace" }}>
                                    {foodSearchPhase === "db" ? "Searching database..." : "Not in database — estimating with AI..."}
                                  </span>
                                </div>
                                {/* Skeleton cards */}
                                {[1,2,3].map(i => (
                                  <div key={i} style={{ background: "#0f1623", borderRadius: 10, padding: "10px 12px", marginBottom: 6, border: "1px solid #1e2d40", opacity: 1 - i * 0.2 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                      <div style={{ flex: 1 }}>
                                        <div style={{ height: 10, background: "linear-gradient(90deg,#1e2d40 25%,#263548 50%,#1e2d40 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", borderRadius: 4, marginBottom: 6, width: `${60 + i * 10}%` }} />
                                        <div style={{ height: 8, background: "linear-gradient(90deg,#1e2d40 25%,#263548 50%,#1e2d40 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", borderRadius: 4, width: "40%" }} />
                                      </div>
                                      <div style={{ display: "flex", gap: 10, marginLeft: 12 }}>
                                        <div style={{ height: 20, width: 32, background: "linear-gradient(90deg,#1e2d40 25%,#263548 50%,#1e2d40 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", borderRadius: 4 }} />
                                        <div style={{ height: 20, width: 32, background: "linear-gradient(90deg,#1e2d40 25%,#263548 50%,#1e2d40 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", borderRadius: 4 }} />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            {foodError && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 8 }}>{foodError}</div>}
                            {foodResults && (
                              <div style={{ marginBottom: 8 }}>
                                {foodResults.multiple ? (
                                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    <div style={{ fontSize: 9, color: "#334155", fontFamily: "'DM Mono',monospace", letterSpacing: 1 }}>SELECT A PRODUCT</div>
                                    {foodResults.products.map((p, i) => (
                                      <div key={i} style={{ background: "#0f1623", borderRadius: 10, padding: "10px 12px", border: "1px solid #1e2d40" }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                                          <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                                            {p.brand && <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}>{p.brand} · {p.servingSize}</div>}
                                          </div>
                                          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                                            <div style={{ textAlign: "center" }}>
                                              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: "#10b981", lineHeight: 1 }}>{p.calories}</div>
                                              <div style={{ fontSize: 8, color: "#475569", fontFamily: "'DM Mono',monospace" }}>kcal</div>
                                            </div>
                                            <div style={{ textAlign: "center" }}>
                                              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: "#34d399", lineHeight: 1 }}>{p.protein}g</div>
                                              <div style={{ fontSize: 8, color: "#475569", fontFamily: "'DM Mono',monospace" }}>pro</div>
                                            </div>
                                            <div style={{ display: "flex", gap: 4 }}>
                                              <button onClick={() => { const scaled = { ...p, basePer100g: { calories: p.calories, protein: p.protein, carbs: p.carbs, fat: p.fat }, grams: 100, servingSize: "100g" }; addFoodToMeal(slot, scaled); setFoodResults(null); setFoodSearch(""); setPendingGrams(100); }}
                                                style={{ background: "linear-gradient(135deg,#059669,#10b981)", border: "none", color: "#fff", padding: "5px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>+ Add</button>
                                              <button onClick={() => { saveFavorite(p); savePersonalFood(p); }}
                                                style={{ background: "none", border: "1px solid #1e2d40", color: "#fbbf24", padding: "5px 8px", borderRadius: 6, fontSize: 10, cursor: "pointer" }}>☆</button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                    <button onClick={() => setFoodResults(null)} style={{ background: "none", border: "none", color: "#475569", fontSize: 10, cursor: "pointer", textAlign: "left" }}>✕ Clear</button>
                                  </div>
                                ) : (
                                  <div style={{ background: "#0f1623", borderRadius: 10, padding: 12 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 8 }}>
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 13 }}>{foodResults.name}</div>
                                        {foodResults.brand && <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>{foodResults.brand}</div>}
                                        <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>{foodResults.servingSize}</div>
                                        {foodResults.estimated && <div style={{ fontSize: 9, color: "#fbbf24", marginTop: 2 }}>⚠ AI estimate</div>}
                                      </div>
                                      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                                        <div style={{ textAlign: "center" }}>
                                          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "#10b981", lineHeight: 1 }}>{Math.round(foodResults.calories * pendingGrams / 100)}</div>
                                          <div style={{ fontSize: 8, color: "#475569", fontFamily: "'DM Mono',monospace" }}>kcal</div>
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "#34d399", lineHeight: 1 }}>{Math.round(foodResults.protein * pendingGrams / 100 * 10)/10}g</div>
                                          <div style={{ fontSize: 8, color: "#475569", fontFamily: "'DM Mono',monospace" }}>protein</div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* Quantity adjuster */}
                                    {(() => {
                                      const UNITS = [
                                        { id: "g",    label: "g",    toG: v => v,           step: 25 },
                                        { id: "ml",   label: "ml",   toG: v => v,           step: 25 },
                                        { id: "cup",  label: "cup",  toG: v => v * 240,     step: 0.25 },
                                        { id: "tbsp", label: "tbsp", toG: v => v * 15,      step: 1 },
                                        { id: "tsp",  label: "tsp",  toG: v => v * 5,       step: 0.5 },
                                      ];
                                      const [qtyUnit, setQtyUnit] = window.__qtyUnitState || [UNITS[0], u => window.__qtyUnitState = [u, window.__qtyUnitState?.[1]]];
                                      const unit = UNITS.find(u => u.id === (qtyUnit?.id || "g")) || UNITS[0];
                                      const displayVal = parseFloat((pendingGrams / unit.toG(1)).toFixed(2));
                                      return (
                                        <>
                                          <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                                            {UNITS.map(u => (
                                              <button key={u.id} onClick={() => { window.__qtyUnitState = [u, null]; setPendingGrams(g => Math.round(g)); }}
                                                style={{ flex: 1, background: (qtyUnit?.id || "g") === u.id ? "#10b981" : "#131929", border: "none", color: (qtyUnit?.id || "g") === u.id ? "#000" : "#475569", padding: "3px 2px", borderRadius: 5, fontSize: 9, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Mono',monospace" }}>
                                                {u.label}
                                              </button>
                                            ))}
                                          </div>
                                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, background: "#131929", borderRadius: 8, padding: "6px 10px" }}>
                                            <button onClick={() => setPendingGrams(g => Math.max(1, Math.round((g / unit.toG(1) - unit.step) * unit.toG(1))))} style={{ background: "none", border: "none", color: "#e2e8f0", fontSize: 18, cursor: "pointer", width: 28, lineHeight: 1 }}>−</button>
                                            <input type="number" value={displayVal} onChange={e => setPendingGrams(Math.max(1, Math.round(parseFloat(e.target.value || 0) * unit.toG(1))))}
                                              style={{ flex: 1, textAlign: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, background: "none", border: "none", color: "#10b981" }} />
                                            <span style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>{unit.label}</span>
                                            <button onClick={() => setPendingGrams(g => Math.round((g / unit.toG(1) + unit.step) * unit.toG(1)))} style={{ background: "none", border: "none", color: "#e2e8f0", fontSize: 18, cursor: "pointer", width: 28, lineHeight: 1 }}>+</button>
                                          </div>
                                        </>
                                      );
                                    })()}
                                    <div style={{ display: "flex", gap: 8 }}>
                                      <button onClick={() => {
                                        const scaled = { ...foodResults, basePer100g: { calories: foodResults.calories, protein: foodResults.protein, carbs: foodResults.carbs, fat: foodResults.fat }, grams: pendingGrams, calories: Math.round(foodResults.calories * pendingGrams / 100), protein: Math.round(foodResults.protein * pendingGrams / 100 * 10)/10, servingSize: `${pendingGrams}g` };
                                        addFoodToMeal(slot, scaled); setFoodResults(null); setFoodSearch(""); setPendingGrams(100);
                                      }} style={{ flex: 1, background: "linear-gradient(135deg,#059669,#10b981)", border: "none", color: "#fff", padding: "8px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add to {slot}</button>
                                      <button onClick={() => { saveFavorite(foodResults); savePersonalFood(foodResults); }}
                                        style={{ background: "none", border: "1px solid #1e2d40", color: "#fbbf24", padding: "8px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
                                        {favorites.some(f => f.name === foodResults.name) ? "★" : "☆"}
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            {/* Recent foods — below search results */}
                            {!foodResults && !foodSearching && recentFoods.length > 0 && (
                              <div style={{ marginTop: 10 }}>
                                <div style={{ fontSize: 9, color: "#334155", fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 6 }}>RECENT</div>
                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                  {recentFoods.map((f, i) => (
                                    <button key={i} onClick={() => addFoodToMeal(slot, f)}
                                      style={{ background: "#0f1623", border: "1px solid #1e2d40", color: "#94a3b8", padding: "4px 10px", borderRadius: 16, fontSize: 10, cursor: "pointer", fontFamily: "'DM Mono',monospace" }}>
                                      {f.name.length > 20 ? f.name.slice(0,20)+"…" : f.name}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* BARCODE TAB */}
                        {macroTab === "barcode" && (
                          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px dashed #1e2d40", borderRadius: 10, padding: "20px 16px", cursor: "pointer", gap: 6 }}>
                              <span style={{ fontSize: 28 }}>📷</span>
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>Tap to scan barcode</span>
                              <span style={{ fontSize: 10, color: "#334155", fontFamily: "'DM Mono',monospace" }}>Opens camera — works on all devices</span>
                              <input type="file" accept="image/*" capture="environment" style={{ display: "none" }}
                                onChange={e => { if (e.target.files[0]) scanBarcodeFromPhoto(e.target.files[0]); }} />
                            </label>
                            {foodSearching && (
                              <div style={{ background: "#0f1623", borderRadius: 10, padding: 14, textAlign: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse 1s infinite" }} />
                                  <span style={{ color: "#10b981", fontSize: 12, fontFamily: "'DM Mono',monospace" }}>
                                    {foodSearchPhase === "db" ? "Looking up in database..." : "Estimating with AI..."}
                                  </span>
                                </div>
                                <div style={{ height: 8, background: "linear-gradient(90deg,#1e2d40 25%,#263548 50%,#1e2d40 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", borderRadius: 4, width: "60%", margin: "0 auto" }} />
                              </div>
                            )}
                            {barcodeError && <div style={{ color: "#f87171", fontSize: 11, background: "#1a0a0a", borderRadius: 8, padding: "10px 12px" }}>{barcodeError}</div>}
                            {foodResults && !foodResults.multiple && (
                              <div style={{ background: "#0f1623", borderRadius: 10, padding: 14 }}>
                                <div style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 13, marginBottom: 4 }}>{foodResults.name}</div>
                                <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
                                  <div style={{ textAlign: "center" }}><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "#10b981" }}>{Math.round(foodResults.calories * pendingGrams / 100)}</div><div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}>kcal</div></div>
                                  <div style={{ textAlign: "center" }}><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "#34d399" }}>{Math.round(foodResults.protein * pendingGrams / 100 * 10)/10}g</div><div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}>protein</div></div>
                                  <div style={{ fontSize: 10, color: "#475569", alignSelf: "center", fontFamily: "'DM Mono',monospace" }}>{foodResults.servingSize}</div>
                                </div>
                                {foodResults.estimated && <div style={{ fontSize: 9, color: "#fbbf24", marginBottom: 8 }}>⚠ AI estimate</div>}
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, background: "#131929", borderRadius: 8, padding: "6px 10px" }}>
                                  <button onClick={() => setPendingGrams(g => Math.max(5, g - 25))} style={{ background: "none", border: "none", color: "#e2e8f0", fontSize: 18, cursor: "pointer", width: 28 }}>−</button>
                                  <input type="number" value={pendingGrams} onChange={e => setPendingGrams(Math.max(1, parseInt(e.target.value) || 1))}
                                    style={{ flex: 1, textAlign: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, background: "none", border: "none", color: "#10b981" }} />
                                  <span style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>g</span>
                                  <button onClick={() => setPendingGrams(g => g + 25)} style={{ background: "none", border: "none", color: "#e2e8f0", fontSize: 18, cursor: "pointer", width: 28 }}>+</button>
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                  <button onClick={() => {
                                    const scaled = { ...foodResults, basePer100g: { calories: foodResults.calories, protein: foodResults.protein, carbs: foodResults.carbs, fat: foodResults.fat }, grams: pendingGrams, calories: Math.round(foodResults.calories * pendingGrams / 100), protein: Math.round(foodResults.protein * pendingGrams / 100 * 10)/10, servingSize: `${pendingGrams}g` };
                                    addFoodToMeal(slot, scaled); setFoodResults(null); setBarcodeError(null); setPendingGrams(100);
                                  }} style={{ flex: 1, background: "linear-gradient(135deg,#059669,#10b981)", border: "none", color: "#fff", padding: "10px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add to {slot}</button>
                                  <button onClick={() => { saveFavorite(foodResults); savePersonalFood(foodResults); }}
                                    style={{ background: "none", border: "1px solid #1e2d40", color: "#fbbf24", padding: "10px 12px", borderRadius: 8, cursor: "pointer" }}>☆</button>
                                </div>
                              </div>
                            )}
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ flex: 1, height: 1, background: "#1e2d40" }} />
                              <span style={{ fontSize: 9, color: "#334155", fontFamily: "'DM Mono',monospace" }}>OR ENTER BARCODE</span>
                              <div style={{ flex: 1, height: 1, background: "#1e2d40" }} />
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <input type="text" placeholder="e.g. 0123456789012" id="barcode-manual-input"
                                onKeyDown={e => e.key === "Enter" && lookupBarcodeManual(e.target.value)}
                                style={{ flex: 1 }} />
                              <button onClick={() => lookupBarcodeManual(document.getElementById("barcode-manual-input").value)}
                                style={{ background: "#0f1623", border: "1px solid #1e2d40", color: "#475569", padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Look up</button>
                            </div>
                          </div>
                        )}

                        {/* FAVORITES / PERSONAL DB TAB */}
                        {macroTab === "favorites" && (
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {[...favorites, ...personalFoods.filter(pf => !favorites.some(f => f.name === pf.name))].length === 0 ? (
                              <div style={{ color: "#334155", fontSize: 11, fontFamily: "'DM Mono',monospace", textAlign: "center", padding: "16px 0" }}>No saved foods yet — star a food to save it</div>
                            ) : [...favorites, ...personalFoods.filter(pf => !favorites.some(f => f.name === pf.name))].map(f => (
                              <div key={f.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0f1623", borderRadius: 10, padding: "10px 12px", border: "1px solid #1e2d40" }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                                  <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>{f.calories} kcal · {f.protein}g pro · {f.servingSize}</div>
                                </div>
                                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                  <button onClick={() => addFoodToMeal(slot, f)}
                                    style={{ background: "linear-gradient(135deg,#052e1c,#0a3d26)", border: "1px solid #065f3a44", color: "#34d399", padding: "5px 10px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>+ Add</button>
                                  <button onClick={() => { setFavorites(fs => fs.filter(x => x.id !== f.id)); setPersonalFoods(ps => ps.filter(x => x.id !== f.id)); }}
                                    style={{ background: "none", border: "1px solid #1e2d40", color: "#475569", padding: "5px 8px", borderRadius: 7, cursor: "pointer" }}><Trash2 size={11} /></button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* MANUAL ENTRY TAB */}
                        {macroTab === "manual" && (
                          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>Enter nutrition manually — saves to your personal database</div>
                            <input type="text" placeholder="Food name (e.g. Siggi's High Protein Yogurt)" value={manualFoodForm.name} onChange={e => setManualFoodForm(f => ({ ...f, name: e.target.value }))} />
                            <div>
                              <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 4 }}>SERVING SIZE</div>
                              <input type="text" placeholder="e.g. 1 container (150g)" value={manualFoodForm.servingSize} onChange={e => setManualFoodForm(f => ({ ...f, servingSize: e.target.value }))} />
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                              {[
                                { key: "calories", label: "CALORIES", placeholder: "e.g. 150", color: "#10b981" },
                                { key: "protein", label: "PROTEIN (g)", placeholder: "e.g. 17", color: "#34d399" },
                                { key: "carbs", label: "CARBS (g)", placeholder: "e.g. 12", color: "#fbbf24" },
                                { key: "fat", label: "FAT (g)", placeholder: "e.g. 5", color: "#f97316" },
                                { key: "fiber", label: "FIBER (g)", placeholder: "e.g. 2", color: "#a78bfa" },
                                { key: "sugar", label: "SUGAR (g)", placeholder: "e.g. 8", color: "#f472b6" },
                              ].map(({ key, label, placeholder, color }) => (
                                <div key={key}>
                                  <div style={{ fontSize: 10, color, fontFamily: "'DM Mono',monospace", marginBottom: 4 }}>{label}</div>
                                  <input type="number" placeholder={placeholder} value={manualFoodForm[key]} onChange={e => setManualFoodForm(f => ({ ...f, [key]: e.target.value }))} />
                                </div>
                              ))}
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button onClick={() => {
                                if (!manualFoodForm.name || !manualFoodForm.calories) return;
                                const food = {
                                  name: manualFoodForm.name,
                                  calories: parseInt(manualFoodForm.calories) || 0,
                                  protein: parseInt(manualFoodForm.protein) || 0,
                                  carbs: parseFloat(manualFoodForm.carbs) || 0,
                                  fat: parseFloat(manualFoodForm.fat) || 0,
                                  fiber: parseFloat(manualFoodForm.fiber) || 0,
                                  sugar: parseFloat(manualFoodForm.sugar) || 0,
                                  servingSize: manualFoodForm.servingSize || "1 serving",
                                  basePer100g: { calories: parseInt(manualFoodForm.calories) || 0, protein: parseInt(manualFoodForm.protein) || 0, carbs: parseFloat(manualFoodForm.carbs) || 0, fat: parseFloat(manualFoodForm.fat) || 0 },
                                };
                                addFoodToMeal(slot, food);
                                savePersonalFood(food);
                                saveFavorite(food);
                                setManualFoodForm({ name: "", calories: "", protein: "", carbs: "", fat: "", fiber: "", sugar: "", servingSize: "1 serving" });
                              }} style={{ flex: 1, background: "linear-gradient(135deg,#059669,#10b981)", border: "none", color: "#fff", padding: "10px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                                + Add & Save to Database
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Macro history + daily summary */}
              {(() => {
                const last7 = Array.from({ length: 7 }, (_, i) => {
                  const d = new Date(); d.setDate(d.getDate() - (13 - i));
                  const ds = getLocalDateStr(d);
                  let cal = 0, pro = 0;
                  try {
                    const mf = JSON.parse(localStorage.getItem(`dat-meal-foods-${ds}`) || "{}");
                    const foods = Object.values(mf).flat();
                    if (foods.length > 0) {
                      cal = foods.reduce((s, f) => s + (f.calories || 0), 0);
                      pro = foods.reduce((s, f) => s + (f.protein || 0), 0);
                    }
                  } catch {}
                  if (cal === 0 && pro === 0) {
                    const log = logs.find(l => l.date === ds);
                    if (log) { cal = parseInt(log.calories) || 0; pro = parseInt(log.protein) || 0; }
                  }
                  return { date: ds, cal, pro };
                }).reverse(); // most recent first

                const today = last7[0];
                const hasAnyData = last7.some(d => d.cal > 0 || d.pro > 0);

                return (
                  <div className="stat-card">
                    <div className="section-title" style={{ marginBottom: 12, fontSize: 14 }}>7-DAY HISTORY</div>

                    {/* Today's summary */}
                    {(today.cal > 0 || today.pro > 0) && (() => {
                      const todayCarbs = Math.round(MEAL_SLOTS.reduce((s, slot) => s + (mealFoods[slot] || []).reduce((ms, f) => ms + (f.carbs || 0), 0), 0));
                      const todayFat = Math.round(MEAL_SLOTS.reduce((s, slot) => s + (mealFoods[slot] || []).reduce((ms, f) => ms + (f.fat || 0), 0), 0));
                      return (
                        <div style={{ background: "#0a2118", border: "1px solid #10b98133", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
                          <div style={{ fontSize: 9, color: "#10b981", fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 8 }}>TODAY'S SUMMARY</div>
                          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                            {[
                              { label: "Calories", val: `${today.cal}`, color: today.cal >= CALORIES_MIN && today.cal <= CALORIES_MAX ? "#34d399" : today.cal > CALORIES_MAX ? "#f87171" : "#fbbf24" },
                              { label: "Protein", val: `${Math.round(today.pro)}g`, color: today.pro >= PROTEIN_MIN ? "#34d399" : "#fbbf24" },
                              { label: "Carbs", val: `${todayCarbs}g`, color: "#fbbf24" },
                              { label: "Fat", val: `${todayFat}g`, color: "#f97316" },
                            ].map(({ label, val, color }) => (
                              <div key={label}>
                                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color, lineHeight: 1 }}>{val}</div>
                                <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}>{label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Table */}
                    {hasAnyData ? (
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                          <thead>
                            <tr style={{ borderBottom: "1px solid #131929" }}>
                              {["Date", "Calories", "Protein"].map(h => (
                                <th key={h} style={{ padding: "6px 10px", color: "#475569", fontWeight: 400, letterSpacing: 1, fontSize: 9, textTransform: "uppercase", textAlign: h === "Date" ? "left" : "center", fontFamily: "'DM Mono',monospace" }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {last7.filter(r => r.cal > 0 || r.pro > 0).map((row, i) => {
                              const isToday = row.date === getLocalDateStr();
                              const calHit = row.cal >= CALORIES_MIN && row.cal <= CALORIES_MAX;
                              const calOver = row.cal > CALORIES_MAX;
                              const proHit = row.pro >= PROTEIN_MIN;
                              const dayStr = new Date(row.date + "T12:00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
                              return (
                                <tr key={row.date} style={{ borderBottom: "1px solid #0f162388", background: isToday ? "#0a2118" : i % 2 === 0 ? "#0b0d15" : "#0c0e18" }}
                                  onClick={() => navigateNutritionDate(row.date)} className="cursor-pointer">
                                  <td style={{ padding: "9px 10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                      {isToday && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981", flexShrink: 0 }} />}
                                      <span style={{ color: isToday ? "#10b981" : "#94a3b8", fontWeight: isToday ? 600 : 400, fontFamily: "'DM Mono',monospace", fontSize: 11 }}>{isToday ? "Today" : dayStr}</span>
                                    </div>
                                  </td>
                                  <td style={{ padding: "9px 10px", textAlign: "center" }}>
                                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, color: calHit ? "#34d399" : calOver ? "#f87171" : "#fbbf24", lineHeight: 1 }}>{row.cal}</span>
                                    <span style={{ fontSize: 9, color: "#334155", marginLeft: 3 }}>{calHit ? "✓" : calOver ? "↑" : "↓"}</span>
                                  </td>
                                  <td style={{ padding: "9px 10px", textAlign: "center" }}>
                                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, color: proHit ? "#34d399" : "#fbbf24", lineHeight: 1 }}>{Math.round(row.pro)}g</span>
                                    <span style={{ fontSize: 9, color: "#334155", marginLeft: 3 }}>{proHit ? "✓" : "↓"}</span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div style={{ color: "#334155", fontSize: 11, fontFamily: "'DM Mono',monospace", textAlign: "center", padding: "16px 0" }}>
                        No nutrition history yet — start logging meals above
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          );
        })()}



        {/* TRAINING */}
        {tab === "Training" && (() => {
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="sticky-header">
                <div className="section-title" style={{ marginBottom: 0, color: "#60a5fa" }}>TRAINING LOG</div>
              </div>

              {/* Floating Rest Timer */}
              {(restTimerActive || restTimerRemaining !== null) && (
                <div style={{ position: "fixed", bottom: 100, right: 16, zIndex: 200, background: "rgba(11,13,21,0.95)", backdropFilter: "blur(16px)", border: `1px solid ${restTimerRemaining === 0 ? "#34d399" : "#10b98155"}`, borderRadius: 16, padding: "14px 20px", minWidth: 160, boxShadow: "0 8px 32px #00000066", animation: "fadeUp 0.2s ease" }}>
                  <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 4 }}>REST TIMER</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 48, color: restTimerRemaining === 0 ? "#34d399" : restTimerRemaining <= 10 ? "#f87171" : "#60a5fa", lineHeight: 1, textAlign: "center" }}>
                    {restTimerRemaining === 0 ? "GO!" : `${Math.floor(restTimerRemaining / 60)}:${String(restTimerRemaining % 60).padStart(2,"0")}`}
                  </div>
                  {restTimerRemaining > 0 && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ height: 3, background: "#131929", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", background: restTimerRemaining <= 10 ? "#f87171" : "#60a5fa", width: `${(restTimerRemaining / restTimerPreset) * 100}%`, transition: "width 1s linear", borderRadius: 2 }} />
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 6, marginTop: 10, justifyContent: "center" }}>
                    {restTimerRemaining === 0 ? (
                      <button onClick={stopRestTimer} style={{ background: "linear-gradient(135deg,#1e3a5f,#60a5fa)", color: "#fff", border: "none", padding: "6px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Done</button>
                    ) : (
                      <>
                        <button onClick={() => startRestTimer(restTimerPreset)} style={{ background: "none", border: "1px solid #1e2d40", color: "#475569", padding: "4px 10px", borderRadius: 6, fontSize: 10, cursor: "pointer" }}>↺</button>
                        <button onClick={stopRestTimer} style={{ background: "none", border: "1px solid #f8717133", color: "#f87171", padding: "4px 10px", borderRadius: 6, fontSize: 10, cursor: "pointer" }}>✕</button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Circuit Timer button */}

              <div style={{ display: "flex" }}>
                <button onClick={() => setShowCircuitTimer(true)} style={{ background: "linear-gradient(135deg,#1e3a5f,#3b82f6)", border: "1px solid #60a5fa44", color: "#60a5fa", padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: 1, display: "flex", alignItems: "center", gap: 8 }}>⏱ CIRCUIT TIMER</button>
              </div>

              {/* Circuit Timer */}
              {showCircuitTimer && (
                <div style={{ position: "fixed", inset: 0, background: "#07080dee", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
                  <div style={{ background: "#0f1623", border: "1px solid #1e2d40", borderRadius: 16, width: "100%", maxWidth: 400, padding: 24, position: "relative" }}>
                    <button onClick={() => { setShowCircuitTimer(false); setCircuitRunning(false); setCircuitPhase("build"); }} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "#475569", fontSize: 20, cursor: "pointer" }}>✕</button>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 16, letterSpacing: 2, fontFamily: "'DM Mono',monospace" }}>⏱ CIRCUIT TIMER</div>

                    {circuitPhase === "build" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <div style={{ display: "flex", gap: 10 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 4, letterSpacing: 1 }}>WORK (sec)</div>
                            <input type="number" value={circuitConfig.work} onChange={e => setCircuitConfig(c => ({ ...c, work: parseInt(e.target.value) || 0 }))}
                              style={{ width: "100%", boxSizing: "border-box", background: "#131929", border: "1px solid #1e2d40", borderRadius: 8, color: "#34d399", fontSize: 22, fontFamily: "'Bebas Neue',sans-serif", padding: "8px 12px", outline: "none", textAlign: "center" }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 4, letterSpacing: 1 }}>REST (sec)</div>
                            <input type="number" value={circuitConfig.rest} onChange={e => setCircuitConfig(c => ({ ...c, rest: parseInt(e.target.value) || 0 }))}
                              style={{ width: "100%", boxSizing: "border-box", background: "#131929", border: "1px solid #1e2d40", borderRadius: 8, color: "#f87171", fontSize: 22, fontFamily: "'Bebas Neue',sans-serif", padding: "8px 12px", outline: "none", textAlign: "center" }} />
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 4, letterSpacing: 1 }}>ROUNDS</div>
                            <input type="number" value={circuitConfig.rounds} onChange={e => setCircuitConfig(c => ({ ...c, rounds: parseInt(e.target.value) || 0 }))}
                              style={{ width: "100%", boxSizing: "border-box", background: "#131929", border: "1px solid #1e2d40", borderRadius: 8, color: "#e2e8f0", fontSize: 22, fontFamily: "'Bebas Neue',sans-serif", padding: "8px 12px", outline: "none", textAlign: "center" }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 4, letterSpacing: 1 }}>REST BETWEEN (sec)</div>
                            <input type="number" value={circuitConfig.restBetween} onChange={e => setCircuitConfig(c => ({ ...c, restBetween: parseInt(e.target.value) || 0 }))}
                              style={{ width: "100%", boxSizing: "border-box", background: "#131929", border: "1px solid #1e2d40", borderRadius: 8, color: "#fbbf24", fontSize: 22, fontFamily: "'Bebas Neue',sans-serif", padding: "8px 12px", outline: "none", textAlign: "center" }} />
                          </div>
                        </div>
                        <div style={{ fontSize: 10, color: "#334155", fontFamily: "'DM Mono',monospace", textAlign: "center" }}>
                          Total: ~{Math.round(((circuitConfig.work + circuitConfig.rest) * circuitConfig.rounds + circuitConfig.restBetween * Math.max(0, circuitConfig.rounds - 1)) / 60 * 10) / 10} min
                        </div>
                        <button onClick={() => {
                          setCircuitState({ round: 1, isWork: true, secondsLeft: circuitConfig.work });
                          setCircuitPhase("run");
                          setCircuitRunning(true);
                        }} style={{ background: "linear-gradient(135deg,#1e3a5f,#60a5fa)", border: "none", color: "#fff", padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
                          START
                        </button>
                      </div>
                    )}

                    {circuitPhase === "run" && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                        {circuitState.done ? (
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
                            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: "#60a5fa", letterSpacing: 2 }}>DONE!</div>
                            <div style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono',monospace", marginTop: 4 }}>{circuitConfig.rounds} rounds complete</div>
                            <button onClick={() => { setCircuitPhase("build"); setCircuitRunning(false); }} style={{ marginTop: 16, background: "#131929", border: "1px solid #1e2d40", color: "#e2e8f0", padding: "10px 24px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>Edit Timer</button>
                          </div>
                        ) : (
                          <>
                            <div style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono',monospace", letterSpacing: 2 }}>
                              {circuitState.isBetween ? "REST BETWEEN ROUNDS" : circuitState.isWork ? "WORK" : "REST"} · ROUND {circuitState.round}/{circuitConfig.rounds}
                            </div>
                            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 96, lineHeight: 1, color: circuitState.isBetween ? "#fbbf24" : circuitState.isWork ? "#34d399" : "#f87171" }}>
                              {circuitState.secondsLeft}
                            </div>
                            <div style={{ display: "flex", gap: 10, width: "100%" }}>
                              <button onClick={() => setCircuitRunning(r => !r)}
                                style={{ flex: 1, background: circuitRunning ? "#131929" : "linear-gradient(135deg,#1e3a5f,#60a5fa)", border: "1px solid #1e2d40", color: "#e2e8f0", padding: "12px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                                {circuitRunning ? "PAUSE" : "RESUME"}
                              </button>
                              <button onClick={() => { setCircuitPhase("build"); setCircuitRunning(false); setCircuitState({ round: 1, isWork: true, secondsLeft: circuitConfig.work }); }}
                                style={{ background: "#131929", border: "1px solid #1e2d40", color: "#475569", padding: "12px 16px", borderRadius: 10, fontSize: 13, cursor: "pointer" }}>
                                RESET
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}


              {/* New workout form */}
              <div className="stat-card">
                <div className="section-title" style={{ fontSize: 16, color: "#60a5fa" }}>LOG WORKOUT</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-end" }}>
                  <div style={{ flex: "0 0 auto" }}>
                    <div className="field-label" style={{ marginBottom: 4, fontSize: 9 }}>DATE</div>
                    <input type="date" value={workoutForm.date} onChange={e => setWorkoutForm(f => ({ ...f, date: e.target.value }))} style={{ width: "auto", fontSize: 12, padding: "5px 8px" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="field-label" style={{ marginBottom: 4, fontSize: 9 }}>SESSION NAME</div>
                    <input type="text" placeholder="e.g. Push Day" value={workoutForm.name} onChange={e => setWorkoutForm(f => ({ ...f, name: e.target.value }))} style={{ fontSize: 12, padding: "5px 8px" }} />
                  </div>
                  <div style={{ flex: "0 0 auto" }}>
                    <div className="field-label" style={{ marginBottom: 4, fontSize: 9 }}>TYPE</div>
                    <select value={workoutForm.activityType || "strength"} onChange={e => setWorkoutForm(f => ({ ...f, activityType: e.target.value }))}
                      style={{ background: "#0f1623", border: "1px solid #1e2d40", borderRadius: 7, color: "#e2e8f0", fontSize: 12, padding: "5px 8px", cursor: "pointer", outline: "none" }}>
                      <option value="strength">🏋️ Strength</option>
                      <option value="run">🏃 Run</option>
                      <option value="cycle">🚴 Cycle</option>
                      <option value="hike">🥾 Hike</option>
                      <option value="swim">🏊 Swim</option>
                      <option value="yoga">🧘 Yoga</option>
                      <option value="other">⚡ Other</option>
                    </select>
                  </div>
                </div>
                {(workoutForm.activityType || "strength") === "strength" ? (
                  <>

                <div style={{ marginLeft: 20 }}>
                {workoutForm.exercises.map((ex, exIdx) => {
                  const lastSession = getLastSessionForExercise(ex.name, workoutForm.date);
                  const pr = ex.name ? getPRForExercise(ex.name) : 0;
                  const isInSuperset = ex.supersetWith || (exIdx > 0 && workoutForm.exercises[exIdx - 1]?.supersetWith === ex.id);
                  const isSupStart = !!ex.supersetWith;
                  const isSupEnd = exIdx > 0 && workoutForm.exercises[exIdx - 1]?.supersetWith === ex.id;
                  const canSuperset = exIdx < workoutForm.exercises.length - 1;
                  const ssLetter = (() => {
                    // assign superset group letters A, B, C...
                    let letter = null, groupIdx = 0;
                    for (let i = 0; i < workoutForm.exercises.length; i++) {
                      if (workoutForm.exercises[i].supersetWith) {
                        if (workoutForm.exercises[i].id === ex.id || workoutForm.exercises[i].supersetWith === ex.id) {
                          letter = String.fromCharCode(65 + groupIdx);
                          break;
                        }
                        groupIdx++;
                      }
                    }
                    return letter;
                  })();

                  return (
                    <div key={ex.id} style={{ position: "relative" }}>
                      {/* Superset bracket */}
                      {isInSuperset && (
                        <div style={{
                          position: "absolute", left: -18, top: isSupStart ? 16 : 0,
                          bottom: isSupEnd ? 16 : 0,
                          width: 12,
                          borderLeft: "2px solid #60a5fa",
                          borderTop: isSupStart ? "2px solid #60a5fa" : "none",
                          borderBottom: isSupEnd ? "2px solid #60a5fa" : "none",
                          borderRadius: isSupStart ? "4px 0 0 0" : isSupEnd ? "0 0 0 4px" : "0",
                        }} />
                      )}
                      {isSupStart && (
                        <div style={{ position: "absolute", left: -52, top: "50%", transform: "translateY(-50%)", background: "#60a5fa", color: "#000", fontSize: 9, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1, padding: "2px 5px", borderRadius: 3 }}>
                          SS{ssLetter}
                        </div>
                      )}

                      <div style={{ background: isInSuperset ? "#0d1520" : "#0f1623", border: `1px solid ${isInSuperset ? "#046c4e33" : "#131929"}`, borderRadius: 6, padding: 14, marginBottom: isSupStart ? 2 : 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                          {isInSuperset && ssLetter && (
                            <span style={{ background: "#046c4e22", color: "#60a5fa", fontSize: 10, fontFamily: "'Bebas Neue', sans-serif", padding: "2px 7px", borderRadius: 3, letterSpacing: 1, flexShrink: 0 }}>
                              {ssLetter}{isSupStart ? "1" : "2"}
                            </span>
                          )}
                          <input
                            type="text"
                            placeholder="Exercise name (e.g. Bench Press)"
                            value={ex.name}
                            onChange={e => updateExerciseName(ex.id, e.target.value)}
                            style={{ flex: 1, fontWeight: 500 }}
                          />
                            {ex.name.length > 1 && (() => { const opts = [...new Set(workouts.flatMap(w => w.exercises.map(e => e.name.trim())).filter(n => n && n.toLowerCase().includes(ex.name.toLowerCase()) && n.toLowerCase() !== ex.name.toLowerCase()))].slice(0,4); return opts.length > 0 ? <div style={{ background: "#131929", border: "1px solid #1e2d40", borderRadius: 6, marginTop: 2, overflow: "hidden" }}>{opts.map(n => <div key={n} onClick={() => updateExerciseName(ex.id, n)} style={{ padding: "5px 10px", fontSize: 11, color: "#e2e8f0", cursor: "pointer", borderBottom: "1px solid #1e2d4033" }}>{n}</div>)}</div> : null; })()}
                          {canSuperset && (
                            <button
                              onClick={() => toggleSuperset(ex.id)}
                              title={ex.supersetWith ? "Ungroup superset" : "Group with next exercise as superset"}
                              style={{
                                background: ex.supersetWith ? "#046c4e22" : "none",
                                border: `1px solid ${ex.supersetWith ? "#60a5fa" : "#131929"}`,
                                color: ex.supersetWith ? "#60a5fa" : "#475569",
                                fontSize: 9, padding: "3px 7px", borderRadius: 3, letterSpacing: 1, cursor: "pointer", flexShrink: 0
                              }}
                            >
                              {ex.supersetWith ? "SS ✓" : "SS"}
                            </button>
                          )}
                          <button onClick={() => removeExercise(ex.id)} style={{ background: "none", border: "none", color: "#f87171", fontSize: 16, padding: "0 4px" }}>✕</button>
                        </div>

                        {ex.name && pr > 0 && (
                          <div style={{ color: "#fbbf24", fontSize: 10, letterSpacing: 1, marginBottom: 8 }}>
                            🏆 PR: {pr} lb
                            {lastSession && <span style={{ color: "#475569", marginLeft: 12 }}>Last: {lastSession.sets.map(s => `${s.reps}×${s.weight}lb`).join(", ")}</span>}
                          </div>
                        )}
                        {ex.name && !pr && lastSession && (
                          <div style={{ color: "#475569", fontSize: 10, marginBottom: 8 }}>Last: {lastSession.sets.map(s => `${s.reps}×${s.weight}lb`).join(", ")}</div>
                        )}

                        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr auto", gap: 6, alignItems: "center", marginBottom: 6 }}>
                          <div style={{ color: "#475569", fontSize: 10, letterSpacing: 1 }}>SET</div>
                          <div style={{ color: "#475569", fontSize: 10, letterSpacing: 1 }}>REPS</div>
                          <div style={{ color: "#475569", fontSize: 10, letterSpacing: 1 }}>WEIGHT (lb)</div>
                          <div style={{ color: "#475569", fontSize: 10, letterSpacing: 1 }}>NOTES</div>
                          <div />
                        </div>

                        {ex.sets.map((set, sIdx) => {
                          const isPR = ex.name && parseFloat(set.weight) > 0 && parseFloat(set.weight) >= getPRForExercise(ex.name) && parseFloat(set.weight) > pr;
                          return (
                            <div key={sIdx} style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr auto", gap: 6, alignItems: "center", marginBottom: 4 }}>
                              <div style={{ color: "#475569", fontSize: 11, width: 24, textAlign: "center" }}>{sIdx + 1}</div>
                              <input type="number" placeholder="12" value={set.reps} onChange={e => updateSet(ex.id, sIdx, "reps", e.target.value)} style={{ textAlign: "center" }} />
                              <div style={{ position: "relative" }}>
                                <input type="number" placeholder="135" value={set.weight} onChange={e => updateSet(ex.id, sIdx, "weight", e.target.value)} style={{ textAlign: "center", borderColor: isPR ? "#fbbf24" : undefined, paddingRight: 20 }} />
                                <button onClick={() => { setPlateWeight(set.weight || ""); setShowPlateCalc(true); }} style={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#334155", fontSize: 10, cursor: "pointer", padding: 0, lineHeight: 1 }}>🏋️</button>
                                {isPR && <span style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", fontSize: 9, color: "#fbbf24" }}>PR!</span>}
                              </div>
                              <input type="text" placeholder="easy / pain..." value={set.notes || ""} onChange={e => updateSet(ex.id, sIdx, "notes", e.target.value)} style={{ fontSize: 10, padding: "6px 8px", color: "#64748b" }} />
                              <button onClick={() => removeSet(ex.id, sIdx)} style={{ background: "none", border: "none", color: "#334155", fontSize: 13, padding: "0 4px" }}>✕</button>
                            </div>
                          );
                        })}

                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                          <button onClick={() => addSet(ex.id)} style={{ background: "none", border: "1px solid #131929", color: "#475569", fontSize: 10, padding: "4px 12px", borderRadius: 3, letterSpacing: 1 }}>
                            + ADD SET
                          </button>
                          <div style={{ marginLeft: "auto", display: "flex", gap: 4, alignItems: "center" }}>
                            <span style={{ fontSize: 9, color: "#334155", fontFamily: "'DM Mono',monospace" }}>REST</span>
                            {[60, 90, 120].map(s => (
                              <button key={s} onClick={() => { setRestTimerPreset(s); startRestTimer(s); }}
                                style={{ background: restTimerActive && restTimerPreset === s ? "#10b98122" : "none", border: `1px solid ${restTimerActive && restTimerPreset === s ? "#10b98155" : "#131929"}`, color: restTimerActive && restTimerPreset === s ? "#60a5fa" : "#475569", fontSize: 9, padding: "3px 7px", borderRadius: 4, cursor: "pointer", fontFamily: "'DM Mono',monospace", transition: "all 0.15s" }}>
                                {s}s
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                </div>
                <div style={{ marginBottom: 10 }}>
                  <div className="field-label" style={{ marginBottom: 4, fontSize: 9 }}>SESSION NOTES (OPTIONAL)</div>
                  <textarea placeholder="How did the session feel?" value={workoutForm.sessionNotes || ""} onChange={e => setWorkoutForm(f => ({ ...f, sessionNotes: e.target.value }))} style={{ width: "100%", boxSizing: "border-box", background: "#0f1623", border: "1px solid #1e2d40", borderRadius: 7, color: "#e2e8f0", fontSize: 11, fontFamily: "'DM Mono',monospace", padding: "6px 8px", resize: "none", minHeight: 48, outline: "none" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, flexWrap: "wrap", gap: 8 }}>
                  <button onClick={addExercise} style={{ background: "none", border: "1px solid #1e3a5f", color: "#60a5fa", fontSize: 11, padding: "8px 16px", borderRadius: 8, letterSpacing: 1 }}>
                    + Add Exercise
                  </button>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={saveTemplate} style={{ background: "transparent", border: "1px solid #60a5fa55", color: "#60a5fa", padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                      <BookTemplate size={13} /> Save Template
                    </button>
                    <button style={{ background: "linear-gradient(135deg,#1e3a5f,#3b82f6)", border: "1px solid #60a5fa44", color: "#60a5fa", padding: "8px 20px", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13 }} onClick={saveWorkout}>{workoutSaved ? "✓ Saved" : "Save Workout"}</button>
                  </div>
                </div>
                  </>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <div>
                        <div className="field-label" style={{ marginBottom: 4, fontSize: 9 }}>DURATION</div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <input type="number" placeholder="45" value={workoutForm.duration || ""} onChange={e => setWorkoutForm(f => ({ ...f, duration: e.target.value }))}
                            style={{ flex: 1, fontSize: 13, padding: "6px 8px" }} />
                          <select value={workoutForm.durationUnit || "min"} onChange={e => setWorkoutForm(f => ({ ...f, durationUnit: e.target.value }))}
                            style={{ background: "#0f1623", border: "1px solid #1e2d40", borderRadius: 7, color: "#e2e8f0", fontSize: 11, padding: "6px 6px", outline: "none" }}>
                            <option value="min">min</option>
                            <option value="hr">hr</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <div className="field-label" style={{ marginBottom: 4, fontSize: 9 }}>INTENSITY</div>
                        <select value={workoutForm.intensity || ""} onChange={e => setWorkoutForm(f => ({ ...f, intensity: e.target.value }))}
                          style={{ width: "100%", background: "#0f1623", border: "1px solid #1e2d40", borderRadius: 7, color: workoutForm.intensity ? "#e2e8f0" : "#475569", fontSize: 12, padding: "6px 8px", outline: "none", cursor: "pointer" }}>
                          <option value="">-- select</option>
                          <option value="easy">😌 Easy</option>
                          <option value="moderate">💪 Moderate</option>
                          <option value="hard">🔥 Hard</option>
                          <option value="max">⚡ Max Effort</option>
                        </select>
                      </div>
                    </div>
                    {["run","cycle","hike","swim"].includes(workoutForm.activityType) && (<div>
                      <div className="field-label" style={{ marginBottom: 4, fontSize: 9 }}>DISTANCE (OPTIONAL)</div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <input type="number" placeholder="5.0" step="0.1" value={workoutForm.distance || ""} onChange={e => setWorkoutForm(f => ({ ...f, distance: e.target.value }))}
                          style={{ flex: 1, fontSize: 13, padding: "6px 8px" }} />
                        <select value={workoutForm.distanceUnit || "km"} onChange={e => setWorkoutForm(f => ({ ...f, distanceUnit: e.target.value }))}
                          style={{ background: "#0f1623", border: "1px solid #1e2d40", borderRadius: 7, color: "#e2e8f0", fontSize: 11, padding: "6px 6px", outline: "none" }}>
                          <option value="km">km</option>
                          <option value="mi">mi</option>
                          <option value="m">m</option>
                        </select>
                      </div>
                    </div>)}
                    <div>
                      <div className="field-label" style={{ marginBottom: 4, fontSize: 9 }}>NOTES (OPTIONAL)</div>
                      <textarea placeholder="How did it feel? Any details..." value={workoutForm.cardioNotes || ""} onChange={e => setWorkoutForm(f => ({ ...f, cardioNotes: e.target.value }))}
                        style={{ width: "100%", boxSizing: "border-box", background: "#0f1623", border: "1px solid #1e2d40", borderRadius: 7, color: "#e2e8f0", fontSize: 11, fontFamily: "'DM Mono',monospace", padding: "8px 10px", resize: "none", minHeight: 60, outline: "none" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <button style={{ background: "linear-gradient(135deg,#1e3a5f,#3b82f6)", border: "1px solid #60a5fa44", color: "#60a5fa", padding: "8px 20px", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13 }} onClick={saveWorkout}>{workoutSaved ? "✓ Saved" : "Save Workout"}</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Workout Templates */}
              <div className="stat-card">
                <div className="section-title" style={{ fontSize: 16, color: "#60a5fa" }}>TEMPLATES</div>
                {templates.length === 0 ? (
                  <div style={{ color: "#334155", fontSize: 11, fontFamily: "'DM Mono',monospace" }}>No templates yet — save a workout below to reuse it.</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {templates.map(t => (
                      <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0f1623", borderRadius: 8, padding: "10px 14px", border: "1px solid #1e2d40" }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{t.name}</div>
                          <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginTop: 2 }}>{t.exercises.length} exercise{t.exercises.length !== 1 ? "s" : ""}</div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => loadTemplate(t)} style={{ background: "linear-gradient(135deg,#1e3a5f,#3b82f6)", border: "1px solid #065f3a44", color: "#60a5fa", padding: "5px 12px", borderRadius: 7, fontSize: 11, fontWeight: 600 }}>Load</button>
                          <button onClick={() => deleteTemplate(t.id)} style={{ background: "none", border: "1px solid #1e2d40", color: "#475569", padding: "5px 8px", borderRadius: 7, fontSize: 11, display: "flex", alignItems: "center" }}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* New workout form */}
              {/* Training frequency heatmap */}
              {workouts.length > 0 && (() => {
                const cells = Array.from({ length: 56 }, (_, i) => {
                  const d = new Date(); d.setDate(d.getDate() - (55 - i));
                  const ds = getLocalDateStr(d);
                  const w = workouts.find(x => x.date === ds);
                  const vol = w ? w.exercises.reduce((t, ex) => t + ex.sets.reduce((s, set) => s + (parseFloat(set.reps)||0)*(parseFloat(set.weight)||0), 0), 0) : 0;
                  return { ds, vol, trained: !!w };
                });
                const maxVol = Math.max(...cells.map(c => c.vol), 1);
                const heatColor = (vol, trained) => {
                  if (!trained) return "#0f1623";
                  const intensity = vol / maxVol;
                  if (intensity > 0.7) return "#60a5fa";
                  if (intensity > 0.4) return "#1e3a5f";
                  if (intensity > 0) return "#1e3a5f";
                  return "#064e35";
                };
                return (
                  <div className="stat-card">
                    <div className="section-title" style={{ fontSize: 14, color: "#60a5fa" }}>TRAINING FREQUENCY</div>
                    <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 8 }}>56-day volume heatmap — brighter = more weight lifted</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(14, 1fr)", gap: 3 }}>
                      {cells.map(({ ds, vol, trained }) => (
                        <div key={ds} className="train-heat-cell" title={`${ds}${trained ? ` · ${vol.toLocaleString()}lb` : " · rest"}`}
                          style={{ height: 12, background: heatColor(vol, trained), borderRadius: 3 }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 8, alignItems: "center" }}>
                      {[["#0f1623","Rest"],["#064e35","Light"],["#1e3a5f","Medium"],["#60a5fa","Heavy"]].map(([c,l]) => (
                        <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                          <span style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace" }}>{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}


              {/* Workout history */}
              {workouts.length > 0 && (
                <div className="stat-card">
                  <div className="section-title" style={{ fontSize: 16, color: "#60a5fa" }}>HISTORY</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[...workouts].reverse().map((w, i) => (
                      <div key={w.id || i} style={{ borderBottom: i < workouts.length - 1 ? "1px solid #131929" : "none", paddingBottom: i < workouts.length - 1 ? 12 : 0 }}>
                        <div
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", paddingBottom: 6 }}
                          onClick={() => setSelectedWorkout(selectedWorkout === (w.id || i) ? null : (w.id || i))}
                        >
                          <div>
                            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#60a5fa", letterSpacing: 2 }}>
                              {w.name || "Workout"} <span style={{ fontSize: 13, color: "#475569", fontFamily: "inherit" }}>· {w.date}</span>
                            </div>
                            <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>
                              {w.activityType && w.activityType !== "strength" ? `${w.activityType}${w.duration ? " 00b7 " + w.duration + (w.durationUnit || "min") : ""}${w.intensity ? " 00b7 " + w.intensity : ""}` : `${w.exercises.length} exercise${w.exercises.length !== 1 ? "s" : ""} 00b7 ${w.exercises.reduce((s, e) => s + e.sets.length, 0)} sets`}
                            </div>
                          </div>
                          <span style={{ color: "#334155", fontSize: 14 }}>{selectedWorkout === (w.id || i) ? "▲" : "▼"}</span>
                        </div>

                        {selectedWorkout === (w.id || i) && (
                          <div style={{ marginTop: 8 }}>
                            {w.watchPhoto && (
                              <div style={{ marginBottom: 12 }}>
                                <div style={{ color: "#475569", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>⌚ Apple Watch</div>
                                <img src={w.watchPhoto} alt="Apple Watch" style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 6, border: "1px solid #046c4e33" }} />
                              </div>
                            )}
                            {w.exercises.map((ex, ei) => {
                              const currentPR = getPRForExercise(ex.name);
                              const maxWeight = Math.max(...ex.sets.map(s => parseFloat(s.weight) || 0));
                              const isNewPR = maxWeight > 0 && maxWeight >= currentPR;
                              return (
                                <div key={ei} style={{ background: "#07080d", borderRadius: 4, padding: 10, marginBottom: 8 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                    <span style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 500 }}>{ex.name}</span>
                                    {isNewPR && <span style={{ background: "#1a1400", border: "1px solid #fbbf24", color: "#fbbf24", fontSize: 9, padding: "1px 6px", borderRadius: 3, letterSpacing: 1 }}>🏆 PR</span>}
                                  </div>
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                                    {ex.supersetWith && <span style={{ background: "#046c4e22", color: "#60a5fa", fontSize: 9, padding: "1px 6px", borderRadius: 3, letterSpacing: 1 }}>SS</span>}
                                    {ex.sets.map((s, si) => (
                                      <span key={si} className="chip" style={{ color: "#e2e8f0" }}>
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
                </div>
              )}


              {/* PR Board */}
              {workouts.length > 0 && (() => {
                const allExerciseNames = [...new Set(workouts.flatMap(w => w.exercises.map(e => e.name.trim().toLowerCase())).filter(Boolean))];
                return allExerciseNames.length > 0 ? (
                  <div className="stat-card">
                    <div className="section-title" style={{ fontSize: 16, color: "#60a5fa" }}>🏆 PR BOARD</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                      {allExerciseNames.map(name => {
                        const pr = getPRForExercise(name);
                        const allSessions = workouts.filter(w => w.exercises.some(e => e.name.toLowerCase() === name));
                        return pr > 0 ? (
                          <div key={name} style={{ background: "#0f1623", border: "1px solid #131929", borderRadius: 6, padding: 8 }}>
                            <div style={{ color: "#64748b", fontSize: 8, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4, height: 24, overflow: "hidden", lineHeight: 1.3 }}>{name}</div>
                            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fbbf24", lineHeight: 1 }}>{pr}<span style={{ fontSize: 11, color: "#475569" }}> lb</span></div>
                            <div style={{ color: "#334155", fontSize: 10, marginTop: 3 }}>{allSessions.length} session{allSessions.length !== 1 ? "s" : ""}</div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          );
        })()}

        {/* PROGRESS */}
        {tab === "Progress Photos" && (() => {
          const daysSinceLast = getDaysSinceLastProgress(progressEntries);
          const isDue = daysSinceLast === null || daysSinceLast >= PROGRESS_INTERVAL_DAYS;
          const lastEntry = progressEntries.length > 0 ? progressEntries[progressEntries.length - 1] : null;
          const compareEntry = compareIdx !== null ? progressEntries[compareIdx] : (progressEntries.length >= 2 ? progressEntries[progressEntries.length - 2] : null);

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div className="section-title" style={{ marginBottom: 0 }}>PROGRESS PHOTOS</div>
                <div style={{ color: "#475569", fontSize: 11 }}>Monthly · Front / Side / Back / Video</div>
              </div>

              {/* Reminder banner */}
              {isDue && (
                <div style={{ background: "#071910", border: "1px solid #4ade8033", borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ color: "#34d399", fontSize: 12, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>
                      {daysSinceLast === null ? "📸 TIME FOR YOUR FIRST PROGRESS CHECK-IN" : `📸 PROGRESS CHECK-IN DUE · ${daysSinceLast} DAYS SINCE LAST`}
                    </div>
                    <div style={{ color: "#475569", fontSize: 10, marginTop: 2 }}>Log front, side, back, and video below</div>
                  </div>
                </div>
              )}
              {!isDue && daysSinceLast !== null && (
                <div style={{ background: "#07080d", border: "1px solid #131929", borderRadius: 6, padding: "10px 16px", color: "#475569", fontSize: 11 }}>
                  Next check-in in <span style={{ color: "#10b981" }}>{PROGRESS_INTERVAL_DAYS - daysSinceLast} days</span> · Last logged {lastEntry?.date}
                </div>
              )}

              {/* Upload form */}
              <div className="stat-card">
                <div className="section-title" style={{ fontSize: 16 }}>NEW CHECK-IN</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div className="field-label" style={{ marginBottom: 0 }}>Date</div>
                  <input type="date" value={progressForm.date} onChange={e => setProgressForm(f => ({ ...f, date: e.target.value }))} style={{ width: "auto" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                  {["front", "side", "side_flexed", "back"].map(angle => (
                    <div key={angle}>
                      <div className="field-label" style={{ marginBottom: 4, fontSize: 9 }}>{angle.replace("_", " ").toUpperCase()} PHOTO</div>
                      {!progressForm[angle] ? (
                        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px dashed #131929", borderRadius: 6, padding: "10px 6px", cursor: "pointer", color: "#334155", fontSize: 10, gap: 4 }}>
                          <span style={{ fontSize: 16 }}>📷</span>
                          <span>Upload {angle.replace("_", " ")}</span>
                          <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleProgressMedia(e.target.files[0], angle)} />
                        </label>
                      ) : (
                        <div style={{ position: "relative" }}>
                          <img src={progressForm[angle]} alt={angle} style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 6, display: "block" }} />
                          <label style={{ position: "absolute", bottom: 4, right: 4, background: "#00000088", color: "#e2e8f0", fontSize: 9, padding: "2px 6px", borderRadius: 3, cursor: "pointer", letterSpacing: 1 }}>
                            REPLACE
                            <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleProgressMedia(e.target.files[0], angle)} />
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <textarea rows={2} placeholder="How are you feeling? Any visible changes?" value={progressForm.notes} onChange={e => setProgressForm(f => ({ ...f, notes: e.target.value }))} style={{ resize: "vertical", width: "100%", boxSizing: "border-box" }} />
                </div>
                <button className="save-btn" onClick={saveProgressEntry} disabled={!ANGLES.some(a => progressForm[a])}>
                  {progressSaved ? "✓ Saved" : "Save Check-in"}
                </button>
              </div>

              {/* Side-by-side comparison */}
              {progressEntries.length >= 1 && (
                <div className="stat-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                    <div className="section-title" style={{ fontSize: 16, marginBottom: 0 }}>SIDE-BY-SIDE COMPARISON</div>
                    {progressEntries.length >= 2 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: "#475569", fontSize: 10 }}>Compare with:</span>
                        <select value={compareIdx ?? ""} onChange={e => setCompareIdx(e.target.value === "" ? null : parseInt(e.target.value))} style={{ width: "auto", fontSize: 11 }}>
                          {progressEntries.slice(0, -1).map((e, i) => (
                            <option key={i} value={i}>{e.date}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {["front", "side", "side_flexed", "back"].map(angle => {
                    const latestImg = lastEntry?.[angle];
                    const compareImg = compareEntry?.[angle];
                    if (!latestImg && !compareImg) return null;
                    return (
                      <div key={angle} style={{ marginBottom: 20 }}>
                        <div style={{ color: "#64748b", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{angle.replace("_", " ")}</div>
                        <div style={{ display: "grid", gridTemplateColumns: compareImg ? "1fr 1fr" : "1fr", gap: 8 }}>
                          {compareImg && (
                            <div>
                              <div style={{ color: "#475569", fontSize: 9, letterSpacing: 1, marginBottom: 4 }}>BEFORE · {compareEntry.date}</div>
                              <img src={compareImg} alt={`before ${angle}`} style={{ width: "100%", borderRadius: 6, objectFit: "cover", maxHeight: 280 }} />
                            </div>
                          )}
                          {latestImg && (
                            <div>
                              <div style={{ color: "#10b981", fontSize: 9, letterSpacing: 1, marginBottom: 4 }}>LATEST · {lastEntry.date}</div>
                              <img src={latestImg} alt={`latest ${angle}`} style={{ width: "100%", borderRadius: 6, objectFit: "cover", maxHeight: 280 }} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Video comparison */}
                  {(lastEntry?.video || compareEntry?.video) && (
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ color: "#64748b", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>VIDEO</div>
                      <div style={{ display: "grid", gridTemplateColumns: compareEntry?.video && lastEntry?.video ? "1fr 1fr" : "1fr", gap: 8 }}>
                        {compareEntry?.video && (
                          <div>
                            <div style={{ color: "#475569", fontSize: 9, letterSpacing: 1, marginBottom: 4 }}>BEFORE · {compareEntry.date}</div>
                            <video src={compareEntry.video} style={{ width: "100%", borderRadius: 6 }} controls />
                          </div>
                        )}
                        {lastEntry?.video && (
                          <div>
                            <div style={{ color: "#10b981", fontSize: 9, letterSpacing: 1, marginBottom: 4 }}>LATEST · {lastEntry.date}</div>
                            <video src={lastEntry.video} style={{ width: "100%", borderRadius: 6 }} controls />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* All check-ins timeline */}
              {progressEntries.length > 0 && (
                <div className="stat-card">
                  <div className="section-title" style={{ fontSize: 16 }}>ALL CHECK-INS</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[...progressEntries].reverse().map((entry, i) => (
                      <div key={entry.date} style={{ borderBottom: i < progressEntries.length - 1 ? "1px solid #131929" : "none", paddingBottom: i < progressEntries.length - 1 ? 16 : 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#10b981", letterSpacing: 2 }}>{entry.date}</div>
                          {(() => {
                            const log = logs.find(l => l.date === entry.date);
                            return log?.weight ? <div style={{ color: "#475569", fontSize: 11 }}>{log.weight} lb{log.bodyFat ? ` · ${log.bodyFat}% fat` : ""}</div> : null;
                          })()}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: entry.video ? 8 : 0 }}>
                          {["front", "side", "side_flexed", "back"].map(angle => entry[angle] ? (
                            <div key={angle}>
                              <div style={{ color: "#475569", fontSize: 9, letterSpacing: 1, marginBottom: 3 }}>{angle.replace("_"," ").toUpperCase()}</div>
                              <img src={entry[angle]} alt={angle} style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 4 }} />
                            </div>
                          ) : null)}
                        </div>
                        {entry.video && (
                          <div style={{ marginTop: 6 }}>
                            <div style={{ color: "#475569", fontSize: 9, letterSpacing: 1, marginBottom: 3 }}>VIDEO</div>
                            <video src={entry.video} style={{ width: "100%", maxHeight: 200, borderRadius: 4 }} controls />
                          </div>
                        )}
                        {entry.notes && <div style={{ color: "#64748b", fontSize: 11, marginTop: 8, fontStyle: "italic" }}>"{entry.notes}"</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* WEEKLY REPORT */}
        {tab === "Weekly Report" && (() => {
          const days = summaryPeriod === "all" ? 3650 : parseInt(summaryPeriod);
          const periodLogs = logs.filter(l => {
            const d = getDaysBetween(l.date, getLocalDateStr());
            return d >= 0 && d < days;
          }).sort((a,b) => a.date.localeCompare(b.date));
          const periodWeights = weighIns.filter(w => {
            const d = getDaysBetween(w.date, getLocalDateStr());
            return d >= 0 && d < days;
          }).sort((a,b) => a.date.localeCompare(b.date));
          const periodWorkouts = workouts.filter(w => {
            const d = getDaysBetween(w.date, getLocalDateStr());
            return d >= 0 && d < days;
          });
          const periodSleep = Object.entries(sleepData).filter(([date]) => {
            const d = getDaysBetween(date, getLocalDateStr());
            return d >= 0 && d < days;
          });

          // KPIs
          const daysWithData = periodLogs.length;
          const goalsHit = periodLogs.filter(l => calcScore(l) === 4).length;
          const goalHitRate = daysWithData > 0 ? Math.round(goalsHit / daysWithData * 100) : 0;
          const sleepEntries = periodSleep.filter(([,s]) => s.hours);
          const avgSleep = sleepEntries.length > 0 ? (sleepEntries.reduce((sum,[,s]) => sum + parseFloat(s.hours), 0) / sleepEntries.length).toFixed(1) : null;
          const avgSleepQuality = sleepEntries.length > 0 ? Math.round(sleepEntries.reduce((sum,[,s]) => sum + (s.quality||0), 0) / sleepEntries.length) : 0;
          const qualityLabels = ["","😴","😕","😊","😌","🌟"];
          const weightTrend = (() => {
            if (periodWeights.length < 2) return null;
            const first = parseFloat(periodWeights[0].weight);
            const last = parseFloat(periodWeights[periodWeights.length-1].weight);
            const diff = last - first;
            if (diff < -0.5) return { label: "↓ Losing", color: "#34d399" };
            if (diff > 0.5) return { label: "↑ Gaining", color: "#f87171" };
            return { label: "→ Maintaining", color: "#fbbf24" };
          })();
          const daysTrained = periodWorkouts.length;

          // Bar chart helper
        const SummaryBar = ({ data, color, unit, goal }) => {
          const [activeIdx, setActiveIdx] = useState(null);
          if (!data || !data.length) return <div style={{ color: "#334155", fontSize: 11, fontFamily: "'DM Mono',monospace", padding: "12px 0" }}>No data for this period</div>;
          const max = Math.max(...data.map(d => d.val || 0), goal || 1);
          return (
            <div style={{ position: "relative" }}>
              {activeIdx !== null && data[activeIdx] && (
                <div style={{ position: "absolute", top: -28, left: `${(activeIdx / data.length) * 100}%`, transform: "translateX(-50%)", background: "#1e2d40", color: "#e2e8f0", fontSize: 10, fontFamily: "'DM Mono',monospace", padding: "3px 8px", borderRadius: 5, whiteSpace: "nowrap", zIndex: 10, border: "1px solid #334155" }}>
                  {data[activeIdx].label}: {data[activeIdx].val ? `${data[activeIdx].val.toLocaleString()}${unit}` : "No data"}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 80, marginTop: 8 }}>
                {data.map((d, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
                    onTouchStart={() => setActiveIdx(i)} onTouchEnd={() => setTimeout(() => setActiveIdx(null), 1500)}
                    onMouseEnter={() => setActiveIdx(i)} onMouseLeave={() => setActiveIdx(null)}>
                    <div style={{ width: "100%", background: d.val ? (activeIdx === i ? "#fff" : color) : "#131929", borderRadius: "3px 3px 0 0", height: d.val ? `${Math.max(4, Math.round((d.val/max)*72))}px` : "4px", transition: "all 0.15s" }} />
                    {data.length <= 14 && <div style={{ fontSize: 7, color: activeIdx === i ? "#e2e8f0" : "#334155", fontFamily: "'DM Mono',monospace" }}>{d.label}</div>}
                  </div>
                ))}
              </div>
            </div>
          );
        };

          // Build chart data
          const allDays = Array.from({ length: days }, (_, i) => {
            const d = new Date(); d.setDate(d.getDate() - (days - 1 - i));
            const ds = getLocalDateStr(d);
            const label = `${d.getMonth()+1}/${d.getDate()}`;
            const log = periodLogs.find(l => l.date === ds);
            const weight = periodWeights.find(w => w.date === ds);
            return { ds, label, log, weight };
          });

          const stepsData = allDays.map(d => ({ label: d.label, val: d.log?.steps ? parseInt(d.log.steps) : 0 }));
          const calData = allDays.map(d => ({ label: d.label, val: d.log?.calories ? parseInt(d.log.calories) : 0 }));
          const proData = allDays.map(d => ({ label: d.label, val: d.log?.protein ? parseInt(d.log.protein) : 0 }));
          const weightData = allDays.map(d => ({ label: d.label, val: d.weight?.weight ? parseFloat(d.weight.weight) : 0 }));

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Period selector */}
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                {[["7","7D"],["14","14D"],["30","30D"],["all","All"]].map(([val, label]) => (
                  <button key={val} onClick={() => setSummaryPeriod(val)}
                    style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Mono',monospace", letterSpacing: 1, border: `1px solid ${summaryPeriod === val ? "#60a5fa" : "#1e2d40"}`, background: summaryPeriod === val ? "#1e3a5f" : "#0f1623", color: summaryPeriod === val ? "#60a5fa" : "#475569" }}>
                    {label}
                  </button>
                ))}
              </div>

              {/* KPI row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                <div className="stat-card" style={{ padding: "12px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 4 }}>GOAL HIT RATE</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: goalHitRate >= 80 ? "#34d399" : goalHitRate >= 50 ? "#fbbf24" : "#f87171", lineHeight: 1 }}>{goalHitRate}%</div>
                  <div style={{ fontSize: 9, color: "#334155", fontFamily: "'DM Mono',monospace", marginTop: 2 }}>{goalsHit}/{daysWithData} days</div>
                </div>
                <div className="stat-card" style={{ padding: "12px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 4 }}>AVG SLEEP</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: "#a855f7", lineHeight: 1 }}>{avgSleep || "—"}<span style={{ fontSize: 14 }}>{avgSleep ? "h" : ""}</span></div>
                  <div style={{ fontSize: 9, color: "#334155", fontFamily: "'DM Mono',monospace", marginTop: 2 }}>{avgSleepQuality > 0 ? qualityLabels[avgSleepQuality] : "no data"}</div>
                </div>
                <div className="stat-card" style={{ padding: "12px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 4 }}>WEIGHT TREND</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: weightTrend?.color || "#334155", lineHeight: 1, marginTop: 6 }}>{weightTrend?.label || "—"}</div>
                  <div style={{ fontSize: 9, color: "#334155", fontFamily: "'DM Mono',monospace", marginTop: 2 }}>{periodWeights.length} weigh-ins</div>
                </div>
              </div>

              {/* Training */}
              <div className="stat-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div className="section-title" style={{ fontSize: 14, margin: 0, color: "#60a5fa" }}>TRAINING</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: "#60a5fa" }}>{daysTrained}<span style={{ fontSize: 12, color: "#475569" }}>/{days} days</span></div>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${Math.round(daysTrained/days*100)}%`, background: "#60a5fa" }} />
                </div>
                <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginTop: 4 }}>{Math.round(daysTrained/days*100)}% training frequency</div>
              </div>

              {/* Steps */}
              <div className="stat-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="section-title" style={{ fontSize: 14, margin: 0, color: "#60a5fa" }}>STEPS</div>
                  <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>goal {STEPS_MIN.toLocaleString()}</div>
                </div>
                <SummaryBar data={stepsData} color="#60a5fa" unit="" goal={STEPS_MIN} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>avg {stepsData.filter(d=>d.val).length ? Math.round(stepsData.filter(d=>d.val).reduce((s,d)=>s+d.val,0)/stepsData.filter(d=>d.val).length).toLocaleString() : "—"}</div>
                  <div style={{ fontSize: 10, color: "#60a5fa", fontFamily: "'DM Mono',monospace" }}>{stepsData.filter(d=>d.val>=STEPS_MIN).length} days hit goal</div>
                </div>
              </div>

              {/* Calories */}
              <div className="stat-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="section-title" style={{ fontSize: 14, margin: 0 }}>CALORIES</div>
                  <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>target {CALORIES_MIN}–{CALORIES_MAX}</div>
                </div>
                <SummaryBar data={calData} color="#fbbf24" unit="kcal" goal={CALORIES_MIN} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>avg {calData.filter(d=>d.val).length ? Math.round(calData.filter(d=>d.val).reduce((s,d)=>s+d.val,0)/calData.filter(d=>d.val).length) : "—"} kcal</div>
                  <div style={{ fontSize: 10, color: "#fbbf24", fontFamily: "'DM Mono',monospace" }}>{calData.filter(d=>d.val>=CALORIES_MIN&&d.val<=CALORIES_MAX).length} days on target</div>
                </div>
              </div>

              {/* Protein */}
              <div className="stat-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="section-title" style={{ fontSize: 14, margin: 0 }}>PROTEIN</div>
                  <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>goal ≥{PROTEIN_MIN}g</div>
                </div>
                <SummaryBar data={proData} color="#10b981" unit="g" goal={PROTEIN_MIN} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace" }}>avg {proData.filter(d=>d.val).length ? Math.round(proData.filter(d=>d.val).reduce((s,d)=>s+d.val,0)/proData.filter(d=>d.val).length) : "—"}g</div>
                  <div style={{ fontSize: 10, color: "#10b981", fontFamily: "'DM Mono',monospace" }}>{proData.filter(d=>d.val>=PROTEIN_MIN).length} days hit goal</div>
                </div>
              </div>

            </div>
          );
        })()}

        {/* ── SETTINGS TAB ── */}
        {tab === "Settings" && (() => {
          const fields = [
            { section: "PROFILE", items: [
              { key: "userName", label: "Your Name", type: "text", placeholder: "Ellen" },
            ]},
            { section: "GOAL", items: [
              { key: "startWeight", label: "Start Weight (lbs)", type: "number", placeholder: "210" },
              { key: "goalWeight", label: "Goal Weight (lbs)", type: "number", placeholder: "160" },
              { key: "deadline", label: "Target Date", type: "date", placeholder: "" },
            ]},
            { section: "DAILY TARGETS", items: [
              { key: "caloriesMin", label: "Min Calories", type: "number", placeholder: "1400" },
              { key: "caloriesMax", label: "Max Calories", type: "number", placeholder: "1800" },
              { key: "proteinMin", label: "Protein Goal (g)", type: "number", placeholder: "120" },
              { key: "stepsMin", label: "Steps Goal", type: "number", placeholder: "8000" },
              { key: "waterGoal", label: "Water Goal (cups)", type: "number", placeholder: "8" },
            ]},
          ];
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
              <div className="section-title">SETTINGS</div>

              {fields.map(({ section, items }) => (
                <div key={section} className="stat-card">
                  <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 16 }}>{section}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {items.map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginBottom: 5 }}>{label}</div>
                        <input type={type} placeholder={placeholder} value={localSettings[key] ?? ""}
                          onChange={e => setLocalSettings(s => ({ ...s, [key]: e.target.value }))}
                          style={{ width: "100%", boxSizing: "border-box" }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button onClick={() => {
                const cleaned = {};
                Object.entries(localSettings).forEach(([k, v]) => {
                  cleaned[k] = (typeof v === "string" && !isNaN(v) && v !== "") ? Number(v) : v;
                });
                saveSettings(cleaned);
                haptic("success");
                alert("Settings saved! Some changes take effect on next page load.");
              }} style={{ background: "linear-gradient(135deg,#059669,#10b981)", border: "none", color: "#fff", padding: "14px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                ✓ Save Settings
              </button>

              {/* App Features */}
              <div className="stat-card">
                <div style={{ fontSize: 9, color: "#475569", fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 16 }}>APP FEATURES</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: darkMode ? "#e2e8f0" : "#0f172a" }}>🌙 Cycle Tracker</div>
                    <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", marginTop: 2 }}>Show cycle & period tracking on Dashboard</div>
                  </div>
                  <button onClick={() => { const next = !cycleEnabled; setCycleEnabled(next); localStorage.setItem("dat-cycle-enabled", next); haptic("light"); }}
                    style={{ background: cycleEnabled ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "#0f1623", border: `1px solid ${cycleEnabled ? "#a855f755" : "#1e2d40"}`, color: cycleEnabled ? "#fff" : "#475569", padding: "6px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                    {cycleEnabled ? "On ✓" : "Off"}
                  </button>
                </div>
              </div>

              {/* Danger zone */}
              <div className="stat-card" style={{ borderColor: "#7f1d1d33" }}>
                <div style={{ fontSize: 9, color: "#f87171", fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 12 }}>DANGER ZONE</div>
                <button onClick={() => {
                  if (window.confirm("Reset onboarding? This will show the setup wizard again on next load.")) {
                    localStorage.removeItem("dat-onboarded");
                    alert("Reload the page to see the onboarding wizard.");
                  }
                }} style={{ background: "none", border: "1px solid #7f1d1d55", color: "#f87171", padding: "8px 16px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "'DM Mono',monospace" }}>
                  Reset Onboarding
                </button>
              </div>

              {/* PWA install hint */}
              <div className="stat-card" style={{ borderColor: "#1e3a5f33" }}>
                <div style={{ fontSize: 9, color: "#60a5fa", fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 8 }}>INSTALL AS APP</div>
                <div style={{ fontSize: 11, color: "#475569", lineHeight: 1.7, marginBottom: 10 }}>
                  Add this to your home screen for a full app experience with no browser chrome:
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.8 }}>
                  <strong style={{ color: "#60a5fa" }}>iPhone:</strong> Tap the Share button → "Add to Home Screen"<br/>
                  <strong style={{ color: "#60a5fa" }}>Android:</strong> Tap menu → "Add to Home Screen" or "Install App"<br/>
                  <strong style={{ color: "#60a5fa" }}>Desktop:</strong> Click the install icon in your browser's address bar
                </div>
              </div>

              <div style={{ fontSize: 10, color: "#1e2d40", textAlign: "center", fontFamily: "'DM Mono',monospace", paddingBottom: 8 }}>
                Daily Accountability Tracker · Built for Ellen
              </div>
            </div>
          );
        })()}

        </div>
      </div>
      </div>
      {/* ── ONBOARDING OVERLAY ── */}
      {showOnboarding && (() => {
        const steps = [
          { title: "Welcome! 👋", sub: "Let's set up your tracker in 2 minutes", fields: [{ key: "userName", label: "Your name", placeholder: "Ellen", type: "text" }] },
          { title: "Your Goal ⚖️", sub: "Where are you starting and where do you want to be?", fields: [{ key: "startWeight", label: "Current weight (lbs)", placeholder: "210", type: "number" }, { key: "goalWeight", label: "Goal weight (lbs)", placeholder: "160", type: "number" }, { key: "deadline", label: "Target date", placeholder: "2025-08-23", type: "date" }] },
          { title: "Daily Targets 🎯", sub: "These guide your score each day — you can change them anytime", fields: [{ key: "caloriesMin", label: "Min calories", placeholder: "1400", type: "number" }, { key: "caloriesMax", label: "Max calories", placeholder: "1800", type: "number" }, { key: "proteinMin", label: "Protein goal (g)", placeholder: "120", type: "number" }, { key: "stepsMin", label: "Steps goal", placeholder: "8000", type: "number" }] },
        ];
        const step = steps[onboardStep];
        const isLast = onboardStep === steps.length - 1;
        return (
          <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(7,9,15,0.97)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ background: "#0c0e18", border: "1px solid #1e2d40", borderRadius: 20, padding: 28, maxWidth: 400, width: "100%" }}>
              {/* Progress dots */}
              <div style={{ display: "flex", gap: 6, marginBottom: 24, justifyContent: "center" }}>
                {steps.map((_, i) => <div key={i} style={{ width: i === onboardStep ? 20 : 6, height: 6, borderRadius: 3, background: i === onboardStep ? "#10b981" : i < onboardStep ? "#059669" : "#1e2d40", transition: "all 0.3s" }} />)}
              </div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: "#e2e8f0", marginBottom: 4 }}>{step.title}</div>
              <div style={{ fontSize: 12, color: "#475569", marginBottom: 24, fontFamily: "'DM Mono',monospace" }}>{step.sub}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                {step.fields.map(f => (
                  <div key={f.key}>
                    <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 6 }}>{f.label.toUpperCase()}</div>
                    <input type={f.type} placeholder={f.placeholder} value={onboardData[f.key] || ""} onChange={e => setOnboardData(d => ({ ...d, [f.key]: e.target.value }))} style={{ width: "100%", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {onboardStep > 0 && <button onClick={() => setOnboardStep(s => s - 1)} style={{ background: "none", border: "1px solid #1e2d40", color: "#475569", padding: "10px 16px", borderRadius: 10, cursor: "pointer", fontSize: 13 }}>← Back</button>}
                <button onClick={() => {
                  if (isLast) {
                    const merged = {};
                    Object.entries(onboardData).forEach(([k, v]) => { if (v) merged[k] = isNaN(v) ? v : Number(v); });
                    saveSettings(merged);
                    localStorage.setItem("dat-onboarded", "1");
                    setShowOnboarding(false);
                  } else { setOnboardStep(s => s + 1); }
                }} style={{ flex: 1, background: "linear-gradient(135deg,#059669,#10b981)", border: "none", color: "#fff", padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                  {isLast ? "🚀 Start Tracking!" : "Next →"}
                </button>
              </div>
              <button onClick={() => { localStorage.setItem("dat-onboarded", "1"); setShowOnboarding(false); }} style={{ display: "block", margin: "12px auto 0", background: "none", border: "none", color: "#334155", fontSize: 11, cursor: "pointer", fontFamily: "'DM Mono',monospace" }}>skip setup</button>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
