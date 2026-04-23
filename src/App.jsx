// ─── SocialForge AI — LIVE DEMO BUILD ────────────────────────────────────────
// All 13 subsystems fully simulated — no API keys required
// Auto-refreshing data every 8s per view, 30s global
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ScatterChart,
  Scatter, ZAxis, Cell,
} from "recharts";

// ─── UTILS ────────────────────────────────────────────────────────────────────
const rnd  = (min, max) => Math.round(min + Math.random() * (max - min));
const rndF = (min, max, dp = 1) => parseFloat((min + Math.random() * (max - min)).toFixed(dp));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const drift = (val, pct = 0.08) => parseFloat((val * (1 + (Math.random() - 0.5) * pct)).toFixed(2));
const fmt   = (n) => n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg: "#0a0a0f", surface: "#12121a", card: "#1a1a26", border: "#2a2a3e",
  accent: "#7c3aed", accentHover: "#6d28d9", accentGlow: "rgba(124,58,237,0.3)",
  cyan: "#06b6d4", green: "#10b981", amber: "#f59e0b", red: "#ef4444",
  pink: "#ec4899", text: "#e2e8f0", muted: "#64748b", white: "#ffffff",
};

const PC = { X: "#1da1f2", YouTube: "#ff0000", Instagram: "#e1306c", Facebook: "#1877f2", TikTok: "#69c9d0" };
const PLATFORMS = ["X", "YouTube", "Instagram", "Facebook", "TikTok"];

// ─── PATENT CLAIMS ────────────────────────────────────────────────────────────
const CLAIMS = {
  UCIG:      { claim: "Claim 1",  title: "Unified Audience Engagement Graph",  desc: "Temporal heterogeneous graph with 8 social node types — live drag interaction." },
  PVE:       { claim: "Claim 2",  title: "Predictive Virality Engine",          desc: "Transformer-based engagement decay modeling with platform-specific curves." },
  CPFE:      { claim: "Claim 4",  title: "Cross-Platform Identity Fusion",      desc: "Siamese neural network resolution across all 5 platforms." },
  SSDFE:     { claim: "Claim 3",  title: "Audience Pulse & Sentiment",          desc: "Real-time 72-hour sentiment + virality forecasting." },
  CSOE:      { claim: "Claim 5",  title: "Content Supply Chain Orchestration",  desc: "Multi-horizon optimization of posting cadence and collabs." },
  AGENTIC:   { claim: "Claim 13", title: "Agentic Growth Agents",               desc: "Autonomous agents for replies, collab scouting, A/B testing." },
  MEMORY:    { claim: "Claim 14", title: "Audience Memory Layer",               desc: "Remembers super-engagers, recurring themes, loyalty arcs." },
  VOICE:     { claim: "Claim 15", title: "Voice-First Social",                  desc: "Audio sentiment analysis across Reels, Shorts, and voice notes." },
  SUSTAIN:   { claim: "Claim 16", title: "Community Authenticity Guard",        desc: "Real-time bot detection vs genuine interactive followers." },
  IOT:       { claim: "Claim 17", title: "Live Event & IRL Fusion",             desc: "Live streams + pop-up events to social conversion pipeline." },
  PRIVACY:   { claim: "Claim 18", title: "Privacy-First Growth Console",        desc: "Transparent data controls, consent signals, and trust scoring." },
  MULTIMODAL:{ claim: "Claim 19", title: "Multimodal Content Intelligence",     desc: "Analyzes images, video, captions, and trends simultaneously." },
  IACE:      { claim: "Claim 2",  title: "Interactive AR Content Engine",       desc: "AR filters, polls, stickers with bidirectional engagement telemetry." },
  AI:        { claim: "Demo",     title: "AI Growth Plays Engine",              desc: "Simulated Claude-powered 24-hour growth strategy generation." },
};

// ─── SIMULATED DATA GENERATORS ────────────────────────────────────────────────

const genPlatformData = () => PLATFORMS.map(p => ({
  platform: p,
  followers: { X: rnd(120000,130000), YouTube: rnd(87000,92000), Instagram: rnd(152000,160000), Facebook: rnd(65000,70000), TikTok: rnd(225000,238000) }[p],
  engagement: { X: rndF(7.8,9.2), YouTube: rndF(6.1,7.4), Instagram: rndF(10.5,12.1), Facebook: rndF(4.7,5.6), TikTok: rndF(13.9,15.8) }[p],
  comments:   { X: rnd(3200,3700), YouTube: rnd(1700,2100), Instagram: rnd(6400,7100), Facebook: rnd(880,1100), TikTok: rnd(12000,13800) }[p],
  dmRate:     { X: rndF(3.8,4.6), YouTube: rndF(2.4,3.2), Instagram: rndF(5.4,6.4), Facebook: rndF(1.5,2.1), TikTok: rndF(3.0,3.9) }[p],
  share:      { X: rndF(0.38,0.44), YouTube: rndF(0.30,0.37), Instagram: rndF(0.44,0.52), Facebook: rndF(0.19,0.25), TikTok: rndF(0.52,0.61) }[p],
}));

const genViralityTrend = () =>
  Array.from({ length: 14 }, (_, i) => ({
    day: `D-${13 - i}`,
    X: rnd(38, 92), YouTube: rnd(28, 78), Instagram: rnd(48, 98),
    Facebook: rnd(18, 58), TikTok: rnd(58, 100),
  }));

const genEngagementRadar = () => [
  { metric: "Comments",  X: rnd(65,80), YouTube: rnd(50,65), Instagram: rnd(82,95), Facebook: rnd(38,52), TikTok: rnd(88,100) },
  { metric: "Shares",    X: rnd(60,74), YouTube: rnd(45,60), Instagram: rnd(74,88), Facebook: rnd(32,46), TikTok: rnd(84,98) },
  { metric: "DMs",       X: rnd(50,64), YouTube: rnd(36,50), Instagram: rnd(78,92), Facebook: rnd(26,40), TikTok: rnd(64,78) },
  { metric: "Saves",     X: rnd(44,58), YouTube: rnd(58,72), Instagram: rnd(86,99), Facebook: rnd(30,44), TikTok: rnd(80,94) },
  { metric: "Live",      X: rnd(38,52), YouTube: rnd(70,84), Instagram: rnd(60,74), Facebook: rnd(46,60), TikTok: rnd(82,96) },
];

const HANDLES = ["@nova_creates","@threadmaster","@viralvault","@contentwave","@hypelab","@deepdivecrew","@trendstrike","@socialedge","@momentmaker","@pulsefeed"];
const COMMENTS = ["This literally blew my mind 🤯","Part 2 NOW","Saved this immediately","Sharing with my whole team","The algorithm loves you rn","Can't stop watching","This is so underrated fr","Best one you've done","Screenshotted for life","Need a full series on this"];

const genSuperEngagers = () =>
  Array.from({ length: 6 }, (_, i) => ({
    id: i, name: HANDLES[i], platform: pick(PLATFORMS),
    score: rnd(78, 99), streak: rnd(3, 28),
    lastComment: COMMENTS[i], predictedNext: pick(["High","High","Medium"]),
    totalInteractions: rnd(40, 340),
  }));

const TOPICS = ["AI tools","Morning routines","Creator economy","Side hustles","Productivity hacks","Remote work","Personal brand","Content batching","Viral hooks","Audience growth"];
const genMemoryThemes = () =>
  TOPICS.slice(0, 6).map(t => ({
    theme: t, recurrence: rnd(8, 48), avgEngagement: rndF(6, 14),
    platforms: PLATFORMS.filter(() => Math.random() > 0.4),
    momentum: pick(["Rising","Stable","Cooling"]),
  }));

const genAgentActivity = () => {
  const types = [
    { type: "Reply Sent",     icon: "💬", platform: pick(PLATFORMS), detail: `Replied to ${pick(HANDLES)} — predicted ${rnd(40,90)}% re-engage` },
    { type: "Collab Scouted", icon: "🤝", platform: pick(PLATFORMS), detail: `${pick(HANDLES)} — ${fmt(rnd(50000,500000))} followers, ${rndF(7,14)}% overlap` },
    { type: "A/B Test",       icon: "🧪", platform: pick(PLATFORMS), detail: `Hook variant B +${rnd(12,44)}% CTR vs control` },
    { type: "DM Campaign",    icon: "📨", platform: pick(PLATFORMS), detail: `${rnd(12,60)} warm DMs sent — ${rndF(18,42)}% open rate` },
    { type: "Trend Alert",    icon: "📈", platform: pick(PLATFORMS), detail: `"${pick(TOPICS)}" trending — post window: ${rnd(1,4)}h` },
    { type: "Bot Purge",      icon: "🛡️", platform: pick(PLATFORMS), detail: `${rnd(3,24)} low-quality accounts flagged` },
  ];
  return Array.from({ length: 8 }, (_, i) => ({
    id: i, ...pick(types),
    time: `${rnd(1,59)}m ago`, status: pick(["Complete","Running","Queued"]),
  }));
};

const AUDIO_CLIPS = ["Morning motivation reel","Trending audio #42","Viral sound remix","Behind-the-scenes voice note","Live Q&A highlight","Story reply audio","Collab intro clip","Product review voiceover"];
const genVoiceData = () =>
  AUDIO_CLIPS.map(clip => ({
    clip, sentiment: rndF(0.4, 0.97), energy: rndF(0.3, 0.99),
    platform: pick(PLATFORMS), reach: rnd(800, 28000),
    emotion: pick(["Excited","Curious","Inspired","Amused","Motivated"]),
  }));

const genBotData = () => PLATFORMS.map(p => ({
  platform: p,
  real: rnd(78, 95), bot: rnd(2, 12), inactive: rnd(3, 12),
  authScore: rndF(72, 97),
  flagged: rnd(0, 40),
}));

const genLiveEvents = () => [
  { event: "YouTube Live — Creator Q&A",     platform: "YouTube",   viewers: rnd(800,4200),  conversions: rnd(40,280),  revenue: rnd(200,2400) },
  { event: "TikTok LIVE — Day in my life",   platform: "TikTok",    viewers: rnd(2000,9800), conversions: rnd(120,620), revenue: rnd(400,3800) },
  { event: "Instagram Live — Product Drop",  platform: "Instagram", viewers: rnd(600,3100),  conversions: rnd(80,440),  revenue: rnd(600,4200) },
  { event: "X Space — Industry Roundtable",  platform: "X",         viewers: rnd(200,1800),  conversions: rnd(20,180),  revenue: rnd(100,1200) },
  { event: "Facebook Live — Webinar",        platform: "Facebook",  viewers: rnd(300,2200),  conversions: rnd(30,240),  revenue: rnd(150,1600) },
];

const CONTENT_TYPES = ["Short-form video","Long-form video","Carousel post","Story / Reel","Text thread","Podcast clip","Infographic","Live stream"];
const genMultimodalAnalysis = () =>
  CONTENT_TYPES.map(type => ({
    type,
    visualScore:   rnd(50, 99),
    captionScore:  rnd(50, 99),
    audioScore:    rnd(40, 99),
    trendAlign:    rnd(40, 99),
    predicted:     rndF(5, 18),
    recommendation: pick(["Post Now","Schedule 6pm","Add CTA","Trim to 30s","Boost audio","Use trending sound","Add subtitles","A/B test hook"]),
  }));

const AR_FILTERS = ["Purple haze overlay","Neon ring frame","Sparkle trail","Retro grain","AI face mesh","Glitch pulse","Brand logo warp","Depth bokeh"];
const genARData = () =>
  AR_FILTERS.map(f => ({
    filter: f,
    uses: rnd(800, 28000), shares: rnd(200, 8000),
    completionRate: rndF(42, 91),
    platform: pick(["Instagram","TikTok","Snapchat"]),
    sentiment: rndF(0.6, 0.98),
  }));

const POSTING_HOURS = Array.from({ length: 24 }, (_, h) => {
  const peak = [7,8,12,17,18,19,20,21];
  return { hour: `${h}:00`, engagement: peak.includes(h) ? rnd(60,99) : rnd(10,45) };
});
const genCadence = () => PLATFORMS.map(p => ({
  platform: p,
  bestTime: pick(["7:00 AM","12:30 PM","6:00 PM","8:00 PM","9:30 PM"]),
  frequency: pick(["2x/day","1x/day","3x/week","5x/week"]),
  nextPost: `in ${rnd(1,5)}h ${rnd(0,59)}m`,
  queuedPosts: rnd(2, 12),
  avgReach: rnd(8000, 120000),
}));

const genPrivacyData = () => PLATFORMS.map(p => ({
  platform: p,
  consentRate: rndF(82, 99),
  dataPointsShared: rnd(4, 18),
  trustScore: rnd(72, 98),
  lastAudit: `${rnd(1, 14)}d ago`,
  optOutRate: rndF(0.4, 3.1),
}));

const genSentimentStream = () =>
  Array.from({ length: 20 }, (_, i) => ({
    t: i, positive: rnd(50, 85), neutral: rnd(10, 30), negative: rnd(2, 18),
  }));

const genAIPlays = () => [
  { title: "Ride the TikTok Trend Window", platform: "TikTok",     action: `Post a 28s Reel using "${pick(TOPICS)}" hook — trend peaks in ${rnd(1,3)}h. Use trending audio.`, impact: `+${rnd(18,44)}% reach`, confidence: `${rnd(78,94)}%` },
  { title: "Re-engage Your Super Fans",    platform: "Instagram",  action: `DM your top ${rnd(8,20)} super-engagers a behind-the-scenes clip. Personal outreach → story reshares.`, impact: `+${rnd(12,28)}% saves`, confidence: `${rnd(72,89)}%` },
  { title: "Thread Drop on X",             platform: "X",          action: `Publish a ${rnd(5,9)}-tweet thread on "${pick(TOPICS)}" between 7–9 PM. Lead with a bold stat.`, impact: `+${rnd(14,36)}% replies`, confidence: `${rnd(68,86)}%` },
  { title: "YouTube Shorts Repurpose",     platform: "YouTube",    action: `Cut your last long-form into a ${rnd(28,58)}s Short. Add captions + CTA at second ${rnd(10,18)}.`, impact: `+${rnd(20,52)}% new subs`, confidence: `${rnd(74,92)}%` },
];

const genUCIGNodes = () => {
  const nodeTypes = { AudienceSegment: T.cyan, ContentType: T.accent, InteractionSignal: T.green, PlatformNode: T.amber, ViralityFactor: T.red, Collaborator: T.pink, TrendSignal: "#a78bfa", BrandVoice: "#34d399" };
  const nodes = Object.entries(nodeTypes).flatMap(([type, color]) =>
    Array.from({ length: rnd(3, 5) }, (_, i) => ({
      id: `${type}-${i}`, type, color,
      label: `${type.replace(/([A-Z])/g, ' $1').trim()} ${i + 1}`,
      r: rnd(8, 20),
    }))
  );
  const links = nodes.flatMap(n =>
    Array.from({ length: rnd(1, 3) }, () => {
      const t = nodes[rnd(0, nodes.length - 1)];
      return t.id !== n.id ? { source: n.id, target: t.id } : null;
    }).filter(Boolean)
  );
  return { nodes, links };
};

// ─── ERROR BOUNDARY ───────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(e) { return { hasError: true, error: e }; }
  render() {
    if (this.state.hasError)
      return (
        <div style={{ padding: 24, color: T.red, background: T.card, borderRadius: 12, border: `1px solid ${T.red}` }}>
          <strong>View Error:</strong> {this.state.error?.message}
          <br /><button onClick={() => this.setState({ hasError: false })} style={{ marginTop: 12, padding: "6px 14px", background: T.accent, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>Retry</button>
        </div>
      );
    return this.props.children;
  }
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const SectionHeader = ({ claimKey }) => {
  const c = CLAIMS[claimKey];
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ background: T.accent + "33", color: T.accent, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{c.claim}</span>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: T.white }}>{c.title}</h2>
        <span style={{ marginLeft: "auto", fontSize: 10, color: T.green, background: T.green + "22", padding: "2px 8px", borderRadius: 20, border: `1px solid ${T.green}44` }}>● LIVE DEMO</span>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: T.muted }}>{c.desc}</p>
    </div>
  );
};

const Card = ({ title, children, style = {} }) => (
  <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20, marginBottom: 16, ...style }}>
    {title && <div style={{ fontSize: 13, fontWeight: 600, color: T.muted, marginBottom: 14 }}>{title}</div>}
    {children}
  </div>
);

const StatRow = ({ label, value, color = T.white, sub }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
    <span style={{ fontSize: 13, color: T.muted }}>{label}</span>
    <div style={{ textAlign: "right" }}>
      <span style={{ fontSize: 14, fontWeight: 700, color }}>{value}</span>
      {sub && <div style={{ fontSize: 11, color: T.muted }}>{sub}</div>}
    </div>
  </div>
);

const Badge = ({ label, color = T.accent }) => (
  <span style={{ background: color + "22", color, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, border: `1px solid ${color}44` }}>{label}</span>
);

const PlatformDot = ({ platform }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: PC[platform] }}>
    <span style={{ width: 7, height: 7, borderRadius: "50%", background: PC[platform], display: "inline-block" }} />{platform}
  </span>
);

const StatusBadge = ({ status }) => {
  const colors = { Complete: T.green, Running: T.amber, Queued: T.muted };
  return <Badge label={status} color={colors[status] || T.muted} />;
};

// ─── UCIG VIEW ────────────────────────────────────────────────────────────────
const UCIGView = ({ graphData, platformData }) => {
  const svgRef = useRef(null);
  useEffect(() => {
    if (!graphData || !svgRef.current) return;
    const w = 700, h = 420;
    d3.select(svgRef.current).selectAll("*").remove();
    const svg = d3.select(svgRef.current).attr("viewBox", `0 0 ${w} ${h}`);
    const sim = d3.forceSimulation(graphData.nodes)
      .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(70))
      .force("charge", d3.forceManyBody().strength(-180))
      .force("center", d3.forceCenter(w / 2, h / 2))
      .force("collision", d3.forceCollide(d => d.r + 4));
    const link = svg.append("g").selectAll("line").data(graphData.links).join("line")
      .attr("stroke", T.border).attr("stroke-width", 1.2);
    const node = svg.append("g").selectAll("g").data(graphData.nodes).join("g")
      .call(d3.drag()
        .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));
    node.append("circle").attr("r", d => d.r).attr("fill", d => d.color + "33").attr("stroke", d => d.color).attr("stroke-width", 1.5);
    node.append("text").text(d => d.label.split(" ").slice(0, 2).join(" ")).attr("text-anchor", "middle").attr("dy", "0.35em").attr("font-size", 8).attr("fill", T.text).attr("pointer-events", "none");
    sim.on("tick", () => {
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
    return () => sim.stop();
  }, [graphData]);

  return (
    <div>
      <SectionHeader claimKey="UCIG" />
      <svg ref={svgRef} style={{ width: "100%", height: 420, background: T.surface, borderRadius: 12, border: `1px solid ${T.border}` }} />
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 10 }}>
        {Object.entries({ AudienceSegment: T.cyan, ContentType: T.accent, InteractionSignal: T.green, PlatformNode: T.amber, ViralityFactor: T.red, Collaborator: T.pink, TrendSignal: "#a78bfa", BrandVoice: "#34d399" }).map(([type, color]) => (
          <div key={type} style={{ background: T.card, border: `1px solid ${color}33`, borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: T.text }}>{type.replace(/([A-Z])/g, ' $1').trim()}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
        {platformData.map(p => (
          <div key={p.platform} style={{ background: T.card, border: `1px solid ${PC[p.platform]}33`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: PC[p.platform], fontWeight: 700 }}>{p.platform}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: T.white, marginTop: 4 }}>{fmt(p.followers)}</div>
            <div style={{ fontSize: 10, color: T.green }}>↑ {p.engagement}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PVE VIEW ─────────────────────────────────────────────────────────────────
const PVEView = ({ viralityTrend }) => {
  const topPost = { title: pick(TOPICS), platform: pick(PLATFORMS), score: rnd(82, 99), decayHours: rnd(6, 36) };
  return (
    <div>
      <SectionHeader claimKey="PVE" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
        {[["Peak Virality Score", `${topPost.score}/100`, T.green],["Platform Leader", topPost.platform, PC[topPost.platform]],["Decay Window", `${topPost.decayHours}h`, T.amber]].map(([label, val, color]) => (
          <div key={label} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color }}>{val}</div>
          </div>
        ))}
      </div>
      <Card title="14-Day Virality Score by Platform">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={viralityTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
            <XAxis dataKey="day" stroke={T.muted} tick={{ fontSize: 10 }} />
            <YAxis stroke={T.muted} tick={{ fontSize: 10 }} domain={[0, 100]} />
            <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} />
            <Legend />
            {PLATFORMS.map(p => <Area key={p} type="monotone" dataKey={p} stroke={PC[p]} fill={PC[p] + "22"} strokeWidth={2} />)}
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Top Trending Posts Right Now">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 18, width: 30, textAlign: "center" }}>🔥</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: T.white, fontWeight: 600 }}>"{pick(TOPICS)}" on <PlatformDot platform={pick(PLATFORMS)} /></div>
              <div style={{ fontSize: 11, color: T.muted }}>Decay in {rnd(2, 18)}h · {fmt(rnd(2000, 48000))} engagements</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.green }}>{rnd(72, 98)}</div>
          </div>
        ))}
      </Card>
    </div>
  );
};

// ─── CPFE VIEW ────────────────────────────────────────────────────────────────
const CPFEView = ({ platformData }) => (
  <div>
    <SectionHeader claimKey="CPFE" />
    <Card title="Unified Follower Counts by Platform">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={platformData}>
          <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
          <XAxis dataKey="platform" stroke={T.muted} tick={{ fontSize: 11 }} />
          <YAxis stroke={T.muted} tick={{ fontSize: 10 }} tickFormatter={fmt} />
          <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} formatter={v => v.toLocaleString()} />
          <Bar dataKey="followers" radius={[6,6,0,0]}>
            {platformData.map(e => <Cell key={e.platform} fill={PC[e.platform]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
    <Card title="Cross-Platform Identity Fusion — Resolved Profiles">
      {Array.from({ length: 5 }, (_, i) => {
        const platforms = PLATFORMS.filter(() => Math.random() > 0.3);
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.accent + "33", border: `2px solid ${T.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: T.accent, fontSize: 14, flexShrink: 0 }}>
              {HANDLES[i][1].toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.white }}>{HANDLES[i]}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                {platforms.map(p => <PlatformDot key={p} platform={p} />)}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: T.green, fontWeight: 700 }}>{rndF(82, 99)}% match</div>
              <div style={{ fontSize: 11, color: T.muted }}>{rnd(12, 84)} shared signals</div>
            </div>
          </div>
        );
      })}
    </Card>
  </div>
);

// ─── SSDFE VIEW ───────────────────────────────────────────────────────────────
const SSDFEView = ({ engagementRadar, sentimentStream }) => (
  <div>
    <SectionHeader claimKey="SSDFE" />
    <Card title="Engagement Signal Radar (All Platforms)">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={engagementRadar}>
          <PolarGrid stroke={T.border} />
          <PolarAngleAxis dataKey="metric" tick={{ fill: T.muted, fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0,100]} tick={{ fill: T.muted, fontSize: 9 }} />
          {PLATFORMS.map(p => <Radar key={p} name={p} dataKey={p} stroke={PC[p]} fill={PC[p]} fillOpacity={0.12} strokeWidth={2} />)}
          <Legend /><Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
    <Card title="Real-Time Sentiment Stream (Last 20 Pulses)">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={sentimentStream}>
          <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
          <XAxis dataKey="t" stroke={T.muted} tick={{ fontSize: 9 }} />
          <YAxis stroke={T.muted} tick={{ fontSize: 9 }} />
          <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} />
          <Area type="monotone" dataKey="positive" stroke={T.green}  fill={T.green + "22"}  strokeWidth={2} name="Positive" />
          <Area type="monotone" dataKey="neutral"  stroke={T.amber}  fill={T.amber + "22"}  strokeWidth={2} name="Neutral" />
          <Area type="monotone" dataKey="negative" stroke={T.red}    fill={T.red + "22"}    strokeWidth={2} name="Negative" />
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  </div>
);

// ─── CSOE VIEW ────────────────────────────────────────────────────────────────
const CSOEView = ({ cadence }) => (
  <div>
    <SectionHeader claimKey="CSOE" />
    <Card title="Optimal Posting Windows by Platform">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={POSTING_HOURS.filter((_, i) => i % 2 === 0)}>
          <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
          <XAxis dataKey="hour" stroke={T.muted} tick={{ fontSize: 9 }} />
          <YAxis stroke={T.muted} tick={{ fontSize: 9 }} />
          <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} />
          <Bar dataKey="engagement" name="Engagement Index" fill={T.accent} radius={[4,4,0,0]}>
            {POSTING_HOURS.filter((_, i) => i % 2 === 0).map((e, i) => <Cell key={i} fill={e.engagement > 60 ? T.green : T.accent} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
    <Card title="Content Queue Status">
      {cadence.map(p => (
        <div key={p.platform} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
          <PlatformDot platform={p.platform} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: T.muted }}>Best: {p.bestTime} · {p.frequency}</div>
          </div>
          <div style={{ fontSize: 12, color: T.amber }}>Next: {p.nextPost}</div>
          <Badge label={`${p.queuedPosts} queued`} color={T.cyan} />
        </div>
      ))}
    </Card>
  </div>
);

// ─── AGENTIC VIEW ─────────────────────────────────────────────────────────────
const AgenticView = ({ agentActivity }) => (
  <div>
    <SectionHeader claimKey="AGENTIC" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
      {[["Active Agents", "13", T.green],["Actions Today", fmt(rnd(280,640)), T.cyan],["Conversions", fmt(rnd(40,120)), T.amber]].map(([l,v,c]) => (
        <div key={l} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: T.muted }}>{l}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: c, marginTop: 4 }}>{v}</div>
        </div>
      ))}
    </div>
    <Card title="Live Agent Activity Feed">
      {agentActivity.map(a => (
        <div key={a.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 20, width: 32, textAlign: "center", flexShrink: 0 }}>{a.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.white }}>{a.type}</span>
              <PlatformDot platform={a.platform} />
            </div>
            <div style={{ fontSize: 12, color: T.muted }}>{a.detail}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <StatusBadge status={a.status} />
            <div style={{ fontSize: 10, color: T.muted, marginTop: 4 }}>{a.time}</div>
          </div>
        </div>
      ))}
    </Card>
  </div>
);

// ─── MEMORY VIEW ──────────────────────────────────────────────────────────────
const MemoryView = ({ superEngagers, memoryThemes }) => (
  <div>
    <SectionHeader claimKey="MEMORY" />
    <Card title="Super-Engager Leaderboard">
      {superEngagers.map((f, i) => (
        <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ width: 28, fontWeight: 800, color: [T.amber, T.muted, T.accent][i] || T.muted, fontSize: 14, textAlign: "center" }}>#{i+1}</div>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: PC[f.platform] + "33", border: `2px solid ${PC[f.platform]}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: PC[f.platform], flexShrink: 0 }}>{f.name[1].toUpperCase()}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.white }}>{f.name} <PlatformDot platform={f.platform} /></div>
            <div style={{ fontSize: 11, color: T.muted }}>"{f.lastComment}" · {f.streak}d streak · {f.totalInteractions} total</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.accent }}>{f.score}</div>
            <div style={{ fontSize: 10, color: f.predictedNext === "High" ? T.green : T.amber }}>Next: {f.predictedNext}</div>
          </div>
        </div>
      ))}
    </Card>
    <Card title="Recurring Theme Memory">
      {memoryThemes.map(t => (
        <div key={t.theme} style={{ padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.white }}>{t.theme}</div>
            <Badge label={t.momentum} color={t.momentum === "Rising" ? T.green : t.momentum === "Cooling" ? T.red : T.amber} />
          </div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>
            Appeared {t.recurrence}x · Avg {t.avgEngagement}% engagement · {t.platforms.map(p => <PlatformDot key={p} platform={p} />)}
          </div>
        </div>
      ))}
    </Card>
  </div>
);

// ─── VOICE VIEW ───────────────────────────────────────────────────────────────
const VoiceView = ({ voiceData }) => (
  <div>
    <SectionHeader claimKey="VOICE" />
    <Card title="Audio Sentiment Analysis — Recent Clips">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={voiceData.slice(0, 6)} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke={T.border} horizontal={false} />
          <XAxis type="number" domain={[0,1]} stroke={T.muted} tick={{ fontSize: 9 }} />
          <YAxis dataKey="clip" type="category" stroke={T.muted} tick={{ fontSize: 10 }} width={160} />
          <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} formatter={v => (v * 100).toFixed(0) + "%"} />
          <Bar dataKey="sentiment" name="Sentiment Score" fill={T.green} radius={[0,6,6,0]} />
          <Bar dataKey="energy"    name="Energy Level"    fill={T.accent} radius={[0,6,6,0]} />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </Card>
    <Card title="Clip Emotion Tags">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
        {voiceData.map(v => (
          <div key={v.clip} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.white, marginBottom: 4 }}>{v.clip}</div>
            <PlatformDot platform={v.platform} />
            <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between" }}>
              <Badge label={v.emotion} color={T.pink} />
              <span style={{ fontSize: 11, color: T.muted }}>{fmt(v.reach)} reach</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ─── SUSTAIN VIEW ─────────────────────────────────────────────────────────────
const SustainView = ({ botData }) => (
  <div>
    <SectionHeader claimKey="SUSTAIN" />
    <Card title="Audience Authenticity Breakdown by Platform">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={botData}>
          <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
          <XAxis dataKey="platform" stroke={T.muted} tick={{ fontSize: 11 }} />
          <YAxis stroke={T.muted} tick={{ fontSize: 10 }} />
          <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} />
          <Bar dataKey="real"     name="Real Followers %" fill={T.green}  radius={[0,0,0,0]} stackId="a" />
          <Bar dataKey="inactive" name="Inactive %"       fill={T.amber}  radius={[0,0,0,0]} stackId="a" />
          <Bar dataKey="bot"      name="Bot %"            fill={T.red}    radius={[6,6,0,0]} stackId="a" />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </Card>
    <Card title="Trust Score & Flags">
      {botData.map(p => (
        <div key={p.platform} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
          <PlatformDot platform={p.platform} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 6, background: T.border, borderRadius: 3, marginTop: 4 }}>
              <div style={{ height: 6, background: T.green, borderRadius: 3, width: `${p.authScore}%` }} />
            </div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{p.authScore}%</div>
          {p.flagged > 0 && <Badge label={`${p.flagged} flagged`} color={T.red} />}
        </div>
      ))}
    </Card>
  </div>
);

// ─── IOT VIEW ─────────────────────────────────────────────────────────────────
const IOTView = ({ liveEvents }) => (
  <div>
    <SectionHeader claimKey="IOT" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
      {[
        ["Total Live Viewers", fmt(liveEvents.reduce((s,e)=>s+e.viewers,0)), T.cyan],
        ["Conversions Today",  liveEvents.reduce((s,e)=>s+e.conversions,0).toLocaleString(), T.green],
        ["Est. Revenue",       "$" + liveEvents.reduce((s,e)=>s+e.revenue,0).toLocaleString(), T.amber],
      ].map(([l,v,c]) => (
        <div key={l} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: T.muted }}>{l}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: c, marginTop: 4 }}>{v}</div>
        </div>
      ))}
    </div>
    <Card title="Active & Recent Live Events">
      {liveEvents.map(e => (
        <div key={e.event} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 24, flexShrink: 0 }}>🎙️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.white }}>{e.event}</div>
            <PlatformDot platform={e.platform} />
          </div>
          <StatRow label="" value="" />
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: T.cyan }}>{fmt(e.viewers)} viewers</div>
            <div style={{ fontSize: 11, color: T.green }}>{e.conversions} conversions · ${e.revenue.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </Card>
  </div>
);

// ─── PRIVACY VIEW ─────────────────────────────────────────────────────────────
const PrivacyView = ({ privacyData }) => (
  <div>
    <SectionHeader claimKey="PRIVACY" />
    <Card title="Data Trust Scores by Platform">
      {privacyData.map(p => (
        <div key={p.platform} style={{ padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <PlatformDot platform={p.platform} />
            <div style={{ display: "flex", gap: 8 }}>
              <Badge label={`Trust: ${p.trustScore}`} color={p.trustScore > 85 ? T.green : T.amber} />
              <Badge label={`Audit: ${p.lastAudit}`} color={T.muted} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ fontSize: 12, color: T.muted }}>Consent rate: <span style={{ color: T.green }}>{p.consentRate}%</span></span>
            <span style={{ fontSize: 12, color: T.muted }}>Data points: <span style={{ color: T.cyan }}>{p.dataPointsShared}</span></span>
            <span style={{ fontSize: 12, color: T.muted }}>Opt-out: <span style={{ color: T.amber }}>{p.optOutRate}%</span></span>
          </div>
          <div style={{ height: 5, background: T.border, borderRadius: 3, marginTop: 8 }}>
            <div style={{ height: 5, background: T.green, borderRadius: 3, width: `${p.trustScore}%`, transition: "width 0.6s ease" }} />
          </div>
        </div>
      ))}
    </Card>
    <Card title="Consent Signal Summary">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {[["Users Consented", `${rnd(91,99)}%`, T.green],["Data Minimized", `${rnd(14,28)} fields`, T.cyan],["Requests Processed", rnd(40,280), T.accent]].map(([l,v,c]) => (
          <div key={l} style={{ textAlign: "center", padding: 12 }}>
            <div style={{ fontSize: 11, color: T.muted }}>{l}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: c, marginTop: 4 }}>{v}</div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ─── MULTIMODAL VIEW ──────────────────────────────────────────────────────────
const MultimodalView = ({ multimodalData }) => (
  <div>
    <SectionHeader claimKey="MULTIMODAL" />
    <Card title="Content Intelligence Scores by Format">
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={multimodalData.slice(0,6)}>
          <PolarGrid stroke={T.border} />
          <PolarAngleAxis dataKey="type" tick={{ fill: T.muted, fontSize: 10 }} />
          <PolarRadiusAxis angle={90} domain={[0,100]} tick={{ fill: T.muted, fontSize: 9 }} />
          <Radar name="Visual" dataKey="visualScore" stroke={T.cyan}   fill={T.cyan}   fillOpacity={0.12} strokeWidth={2} />
          <Radar name="Caption" dataKey="captionScore" stroke={T.pink}  fill={T.pink}  fillOpacity={0.12} strokeWidth={2} />
          <Radar name="Audio"  dataKey="audioScore"   stroke={T.amber} fill={T.amber} fillOpacity={0.12} strokeWidth={2} />
          <Legend /><Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
    <Card title="AI Content Recommendations">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
        {multimodalData.map(m => (
          <div key={m.type} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.white }}>{m.type}</div>
            <div style={{ fontSize: 11, color: T.green, marginTop: 4 }}>Predicted: {m.predicted}% eng.</div>
            <div style={{ marginTop: 6 }}><Badge label={m.recommendation} color={T.accent} /></div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ─── IACE VIEW ────────────────────────────────────────────────────────────────
const IACEView = ({ arData }) => (
  <div>
    <SectionHeader claimKey="IACE" />
    <Card title="AR Filter Performance">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={arData}>
          <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
          <XAxis dataKey="filter" stroke={T.muted} tick={{ fontSize: 9 }} angle={-20} textAnchor="end" height={50} />
          <YAxis stroke={T.muted} tick={{ fontSize: 9 }} />
          <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} />
          <Bar dataKey="uses"   name="Uses"   fill={T.accent} radius={[4,4,0,0]} />
          <Bar dataKey="shares" name="Shares" fill={T.cyan}   radius={[4,4,0,0]} />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </Card>
    <Card title="Filter Engagement Details">
      {arData.slice(0,5).map(f => (
        <div key={f.filter} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 20 }}>✨</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.white }}>{f.filter}</div>
            <PlatformDot platform={f.platform} />
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: T.green }}>{f.completionRate}% completion</div>
            <div style={{ fontSize: 11, color: T.muted }}>{fmt(f.uses)} uses · {fmt(f.shares)} shares</div>
          </div>
        </div>
      ))}
    </Card>
  </div>
);

// ─── AI PLAYS VIEW ────────────────────────────────────────────────────────────
const AIView = ({ platformData }) => {
  const [plays, setPlays] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setPlays(genAIPlays());
      setLoading(false);
    }, 1400);
  }, []);

  return (
    <div>
      <SectionHeader claimKey="AI" />
      <div style={{ background: T.card, border: `1px solid ${T.accent}44`, borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 13, color: T.muted }}>
        ⚡ <strong style={{ color: T.white }}>Live Demo Mode</strong> — Growth plays are AI-simulated. Connect a real Anthropic API key in <code style={{ color: T.cyan }}>.env</code> to activate Claude.
      </div>
      <button onClick={generate} disabled={loading}
        style={{ padding: "12px 28px", background: loading ? T.border : T.accent, color: T.white, border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", marginBottom: 20, width: "100%" }}>
        {loading ? "Generating plays…" : "⚡ Generate 24-Hour Growth Plays"}
      </button>
      {plays && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {plays.map((p, i) => (
            <div key={i} style={{ background: T.card, border: `1px solid ${T.accent}44`, borderRadius: 12, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontWeight: 700, color: T.white, fontSize: 15 }}>{p.title}</div>
                <PlatformDot platform={p.platform} />
              </div>
              <div style={{ fontSize: 13, color: T.text, marginBottom: 10 }}>{p.action}</div>
              <div style={{ display: "flex", gap: 12 }}>
                <Badge label={`📈 ${p.impact}`} color={T.green} />
                <Badge label={`🎯 ${p.confidence} confidence`} color={T.amber} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── NAV GROUPS ───────────────────────────────────────────────────────────────
const NAV = [
  { label: "Core Growth Engines", items: [
    { key: "UCIG",  icon: "🕸️", label: "Engagement Graph"   },
    { key: "PVE",   icon: "🔮", label: "Virality Engine"     },
    { key: "CPFE",  icon: "🔗", label: "Identity Fusion"     },
    { key: "SSDFE", icon: "📡", label: "Audience Pulse"      },
    { key: "CSOE",  icon: "🗓️", label: "Content Cadence"    },
  ]},
  { label: "v2 Social Innovations", items: [
    { key: "AGENTIC",    icon: "🤖", label: "Growth Agents"     },
    { key: "MEMORY",     icon: "🧠", label: "Audience Memory"   },
    { key: "VOICE",      icon: "🎙️", label: "Voice-First Social"},
    { key: "SUSTAIN",    icon: "🛡️", label: "Authenticity Guard"},
    { key: "IOT",        icon: "🎪", label: "IRL Fusion"        },
    { key: "PRIVACY",    icon: "🔐", label: "Privacy Console"   },
    { key: "MULTIMODAL", icon: "🎨", label: "Content Intel"     },
    { key: "IACE",       icon: "✨", label: "AR Content Engine" },
  ]},
  { label: "AI Engine", items: [
    { key: "AI", icon: "⚡", label: "Growth Plays" },
  ]},
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function SocialForgeAI() {
  const [activeKey, setActiveKey] = useState("UCIG");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // All data states
  const [platformData,    setPlatformData]    = useState(genPlatformData);
  const [viralityTrend,   setViralityTrend]   = useState(genViralityTrend);
  const [engagementRadar, setEngagementRadar] = useState(genEngagementRadar);
  const [graphData,       setGraphData]       = useState(genUCIGNodes);
  const [superEngagers,   setSuperEngagers]   = useState(genSuperEngagers);
  const [memoryThemes,    setMemoryThemes]    = useState(genMemoryThemes);
  const [agentActivity,   setAgentActivity]   = useState(genAgentActivity);
  const [voiceData,       setVoiceData]       = useState(genVoiceData);
  const [botData,         setBotData]         = useState(genBotData);
  const [liveEvents,      setLiveEvents]      = useState(genLiveEvents);
  const [multimodalData,  setMultimodalData]  = useState(genMultimodalAnalysis);
  const [arData,          setArData]          = useState(genARData);
  const [cadence,         setCadence]         = useState(genCadence);
  const [privacyData,     setPrivacyData]     = useState(genPrivacyData);
  const [sentimentStream, setSentimentStream] = useState(genSentimentStream);
  const [tick,            setTick]            = useState(0);

  // Refresh all data every 8 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setPlatformData(genPlatformData());
      setViralityTrend(genViralityTrend());
      setEngagementRadar(genEngagementRadar());
      setGraphData(genUCIGNodes());
      setSuperEngagers(genSuperEngagers());
      setMemoryThemes(genMemoryThemes());
      setAgentActivity(genAgentActivity());
      setVoiceData(genVoiceData());
      setBotData(genBotData());
      setLiveEvents(genLiveEvents());
      setMultimodalData(genMultimodalAnalysis());
      setArData(genARData());
      setCadence(genCadence());
      setPrivacyData(genPrivacyData());
      setSentimentStream(genSentimentStream());
      setTick(t => t + 1);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const renderView = () => {
    switch (activeKey) {
      case "UCIG":       return <UCIGView       graphData={graphData}           platformData={platformData} />;
      case "PVE":        return <PVEView        viralityTrend={viralityTrend} />;
      case "CPFE":       return <CPFEView       platformData={platformData} />;
      case "SSDFE":      return <SSDFEView      engagementRadar={engagementRadar} sentimentStream={sentimentStream} />;
      case "CSOE":       return <CSOEView       cadence={cadence} />;
      case "AGENTIC":    return <AgenticView    agentActivity={agentActivity} />;
      case "MEMORY":     return <MemoryView     superEngagers={superEngagers} memoryThemes={memoryThemes} />;
      case "VOICE":      return <VoiceView      voiceData={voiceData} />;
      case "SUSTAIN":    return <SustainView    botData={botData} />;
      case "IOT":        return <IOTView        liveEvents={liveEvents} />;
      case "PRIVACY":    return <PrivacyView    privacyData={privacyData} />;
      case "MULTIMODAL": return <MultimodalView multimodalData={multimodalData} />;
      case "IACE":       return <IACEView       arData={arData} />;
      case "AI":         return <AIView         platformData={platformData} />;
      default:           return null;
    }
  };

  const NavContent = () => (
    <nav style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {NAV.map(group => (
        <div key={group.label}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 12px", marginBottom: 6 }}>{group.label}</div>
          {group.items.map(item => (
            <button key={item.key} onClick={() => { setActiveKey(item.key); setDrawerOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", background: activeKey === item.key ? T.accent + "22" : "transparent", border: activeKey === item.key ? `1px solid ${T.accent}55` : "1px solid transparent", borderRadius: 8, color: activeKey === item.key ? T.white : T.muted, fontWeight: activeKey === item.key ? 700 : 400, fontSize: 13, cursor: "pointer", transition: "all 0.15s", textAlign: "left" }}>
              <span>{item.icon}</span><span>{item.label}</span>
            </button>
          ))}
        </div>
      ))}
    </nav>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
      {/* Header */}
      <header style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setDrawerOpen(!drawerOpen)} style={{ background: "none", border: "none", color: T.text, cursor: "pointer", fontSize: 20, padding: 4 }}>☰</button>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${T.accent},${T.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: T.white, lineHeight: 1 }}>SocialForge AI</div>
              <div style={{ fontSize: 10, color: T.muted, lineHeight: 1, marginTop: 2 }}>Unified Audience Engagement Graph</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10, color: T.green, background: T.green + "22", padding: "3px 10px", borderRadius: 20, border: `1px solid ${T.green}44` }}>● LIVE DEMO</span>
          <span style={{ fontSize: 10, color: T.muted }}>Refresh #{tick}</span>
          {Object.entries(PC).map(([p, c]) => (
            <div key={p} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} title={p} />
          ))}
        </div>
      </header>

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
        {/* Desktop Sidebar */}
        <aside className="desktop-sidebar" style={{ width: 220, background: T.surface, borderRight: `1px solid ${T.border}`, padding: "20px 12px", flexShrink: 0, display: "none", position: "sticky", top: 60, height: "calc(100vh - 60px)", overflowY: "auto" }}>
          <NavContent />
        </aside>

        {/* Mobile Drawer */}
        {drawerOpen && (
          <>
            <div onClick={() => setDrawerOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200 }} />
            <aside style={{ position: "fixed", top: 60, left: 0, bottom: 0, width: 240, background: T.surface, borderRight: `1px solid ${T.border}`, padding: "20px 12px", zIndex: 201, overflowY: "auto" }}>
              <NavContent />
            </aside>
          </>
        )}

        {/* Main Content */}
        <main style={{ flex: 1, padding: "28px 24px", maxWidth: 900, margin: "0 auto", width: "100%" }}>
          <ErrorBoundary key={activeKey}>
            {renderView()}
          </ErrorBoundary>
        </main>
      </div>

      <style>{`
        @media (min-width: 768px) { .desktop-sidebar { display: block !important; } }
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${T.surface}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
      `}</style>
    </div>
  );
}
