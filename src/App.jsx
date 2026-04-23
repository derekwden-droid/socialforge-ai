// ─── SocialForge AI — App.jsx ───────────────────────────────────────────────
// Unified Audience Engagement Graph Platform
// 13 AI Subsystems for Autonomous Social Growth
// Platforms: X, YouTube, Instagram, Facebook, TikTok
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
} from "recharts";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T = {
  bg: "#0a0a0f",
  surface: "#12121a",
  card: "#1a1a26",
  border: "#2a2a3e",
  accent: "#7c3aed",
  accentHover: "#6d28d9",
  accentGlow: "rgba(124,58,237,0.3)",
  cyan: "#06b6d4",
  green: "#10b981",
  amber: "#f59e0b",
  red: "#ef4444",
  pink: "#ec4899",
  text: "#e2e8f0",
  muted: "#64748b",
  white: "#ffffff",
};

const PLATFORM_COLORS = {
  X: "#1da1f2",
  YouTube: "#ff0000",
  Instagram: "#e1306c",
  Facebook: "#1877f2",
  TikTok: "#69c9d0",
};

// ─── PATENT CLAIMS ────────────────────────────────────────────────────────────
const PATENT_CLAIMS = {
  CPFE: { claim: "Claim 4", title: "Cross-Platform Identity Fusion", desc: "Siamese neural network resolution across X, YouTube, Instagram, Facebook, TikTok." },
  PVE: { claim: "Claim 1", title: "Predictive Virality Engine", desc: "Transformer-based engagement decay modeling with platform-specific curves." },
  IACE: { claim: "Claim 2", title: "Interactive AR Content Engine", desc: "AR filters, polls, stickers with bidirectional telemetry." },
  SSDFE: { claim: "Claim 3", title: "Audience Pulse & Sentiment", desc: "72-hour virality forecasting across 5 platforms." },
  CSOE: { claim: "Claim 5", title: "Content Supply Chain Orchestration", desc: "Multi-horizon optimization of posting cadence and collabs." },
  UCIG: { claim: "Claim 1", title: "Unified Audience Engagement Graph", desc: "Temporal heterogeneous graph with 8 social node types." },
  AGENTIC: { claim: "Claim 13", title: "Agentic Growth Agents", desc: "Autonomous agents for replies, collab scouting, A/B testing." },
  MEMORY: { claim: "Claim 14", title: "Audience Memory Layer", desc: "Remembers super-engagers and recurring themes." },
  VOICE: { claim: "Claim 15", title: "Voice-First Social", desc: "Analyzes voice notes, Reels audio sentiment." },
  SUSTAIN: { claim: "Claim 16", title: "Community Authenticity", desc: "Detects bots vs real interactive followers." },
  IOT: { claim: "Claim 17", title: "Live Event & IRL Fusion", desc: "Live streams + pop-ups to social conversion." },
  PRIVACY: { claim: "Claim 18", title: "Privacy-First Growth Console", desc: "Transparent data controls and trust signals." },
  MULTIMODAL: { claim: "Claim 19", title: "Multimodal Content Intelligence", desc: "Analyzes images, video, captions, trends together." },
};

// ─── SOCIAL DATA GENERATORS ───────────────────────────────────────────────────
const genPlatformData = () => [
  { platform: "X", followers: 124800, engagement: 8.4, comments: 3420, dmRate: 4.2, share: 0.41 },
  { platform: "YouTube", followers: 89000, engagement: 6.7, comments: 1890, dmRate: 2.8, share: 0.33 },
  { platform: "Instagram", followers: 156400, engagement: 11.2, comments: 6740, dmRate: 5.9, share: 0.48 },
  { platform: "Facebook", followers: 67400, engagement: 5.1, comments: 980, dmRate: 1.8, share: 0.22 },
  { platform: "TikTok", followers: 231000, engagement: 14.8, comments: 12840, dmRate: 3.4, share: 0.56 },
];

const genInteractiveFollowers = () => [
  { id: 1, name: "@yoursuperfan42", platform: "Instagram", score: 94, lastComment: "This changed my life 🔥", predictedNext: "High" },
  { id: 2, name: "@viralvibes", platform: "TikTok", score: 89, lastComment: "Part 2 when??", predictedNext: "High" },
  { id: 3, name: "@brandloyalist", platform: "YouTube", score: 87, lastComment: "Best breakdown ever", predictedNext: "Medium" },
  { id: 4, name: "@threadking", platform: "X", score: 82, lastComment: "This is gold", predictedNext: "High" },
];

const genViralityTrend = () =>
  Array.from({ length: 14 }, (_, i) => ({
    day: `D-${13 - i}`,
    X: Math.round(40 + Math.random() * 60),
    YouTube: Math.round(30 + Math.random() * 50),
    Instagram: Math.round(50 + Math.random() * 70),
    Facebook: Math.round(20 + Math.random() * 40),
    TikTok: Math.round(60 + Math.random() * 90),
  }));

const genEngagementRadar = () => [
  { metric: "Comments", X: 72, YouTube: 58, Instagram: 88, Facebook: 44, TikTok: 95 },
  { metric: "Shares", X: 65, YouTube: 50, Instagram: 78, Facebook: 38, TikTok: 90 },
  { metric: "DMs", X: 55, YouTube: 40, Instagram: 82, Facebook: 30, TikTok: 70 },
  { metric: "Saves", X: 48, YouTube: 62, Instagram: 91, Facebook: 35, TikTok: 85 },
  { metric: "Live Views", X: 42, YouTube: 75, Instagram: 66, Facebook: 50, TikTok: 88 },
];

const genUCIGNodes = () => {
  const nodeTypes = ["AudienceSegment", "ContentType", "InteractionSignal", "PlatformNode", "ViralityFactor", "Collaborator", "TrendSignal", "BrandVoice"];
  const typeColors = {
    AudienceSegment: T.cyan, ContentType: T.accent, InteractionSignal: T.green,
    PlatformNode: T.amber, ViralityFactor: T.red, Collaborator: T.pink,
    TrendSignal: "#a78bfa", BrandVoice: "#34d399",
  };
  const nodes = nodeTypes.flatMap((type, ti) =>
    Array.from({ length: 3 + Math.floor(Math.random() * 3) }, (_, i) => ({
      id: `${type}-${i}`,
      type,
      label: `${type.replace(/([A-Z])/g, ' $1').trim()} ${i + 1}`,
      color: typeColors[type],
      r: 8 + Math.random() * 14,
    }))
  );
  const links = [];
  for (let i = 0; i < nodes.length; i++) {
    const targets = Math.floor(1 + Math.random() * 3);
    for (let t = 0; t < targets; t++) {
      const j = Math.floor(Math.random() * nodes.length);
      if (j !== i) links.push({ source: nodes[i].id, target: nodes[j].id });
    }
  }
  return { nodes, links };
};

// ─── ERROR BOUNDARY ───────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, color: T.red, background: T.card, borderRadius: 12, border: `1px solid ${T.red}` }}>
          <strong>View Error:</strong> {this.state.error?.message || "Unknown error"}
          <br /><button onClick={() => this.setState({ hasError: false, error: null })}
            style={{ marginTop: 12, padding: "6px 14px", background: T.accent, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── UCIG D3 GRAPH ────────────────────────────────────────────────────────────
const UCIGGraph = ({ graphData }) => {
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
    svg.append("defs").append("marker")
      .attr("id", "arrow").attr("markerWidth", 6).attr("markerHeight", 6)
      .attr("refX", 10).attr("refY", 3).attr("orient", "auto")
      .append("path").attr("d", "M0,0 L0,6 L6,3 z").attr("fill", T.border);
    const link = svg.append("g").selectAll("line")
      .data(graphData.links).join("line")
      .attr("stroke", T.border).attr("stroke-width", 1.2).attr("marker-end", "url(#arrow)");
    const node = svg.append("g").selectAll("g")
      .data(graphData.nodes).join("g")
      .call(d3.drag()
        .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));
    node.append("circle")
      .attr("r", d => d.r).attr("fill", d => d.color + "33").attr("stroke", d => d.color).attr("stroke-width", 1.5);
    node.append("text")
      .text(d => d.label.split(" ").slice(0, 2).join(" "))
      .attr("text-anchor", "middle").attr("dy", "0.35em")
      .attr("font-size", 8).attr("fill", T.text).attr("pointer-events", "none");
    sim.on("tick", () => {
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
    return () => sim.stop();
  }, [graphData]);
  return <svg ref={svgRef} style={{ width: "100%", height: 420, background: T.surface, borderRadius: 12, border: `1px solid ${T.border}` }} />;
};

// ─── NAV GROUPS ───────────────────────────────────────────────────────────────
const navGroups = [
  {
    label: "Core Growth Engines",
    items: [
      { key: "UCIG", icon: "🕸️", label: "Engagement Graph" },
      { key: "PVE", icon: "🔮", label: "Virality Engine" },
      { key: "CPFE", icon: "🔗", label: "Identity Fusion" },
      { key: "SSDFE", icon: "📡", label: "Audience Pulse" },
      { key: "CSOE", icon: "🗓️", label: "Content Cadence" },
    ],
  },
  {
    label: "v2 Social Innovations",
    items: [
      { key: "AGENTIC", icon: "🤖", label: "Growth Agents" },
      { key: "MEMORY", icon: "🧠", label: "Audience Memory" },
      { key: "VOICE", icon: "🎙️", label: "Voice-First Social" },
      { key: "SUSTAIN", icon: "🛡️", label: "Authenticity Guard" },
      { key: "IOT", icon: "🎪", label: "IRL Fusion" },
      { key: "PRIVACY", icon: "🔐", label: "Privacy Console" },
      { key: "MULTIMODAL", icon: "🎨", label: "Content Intel" },
      { key: "IACE", icon: "✨", label: "AR Content Engine" },
    ],
  },
  {
    label: "AI Engine",
    items: [{ key: "AI", icon: "⚡", label: "Growth Plays (Claude)" }],
  },
];

// ─── VIEWS ────────────────────────────────────────────────────────────────────
const UCIGView = ({ graphData, platformData }) => (
  <div>
    <SectionHeader claim={PATENT_CLAIMS.UCIG} />
    <UCIGGraph graphData={graphData} />
    <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
      {Object.entries({ AudienceSegment: T.cyan, ContentType: T.accent, InteractionSignal: T.green, PlatformNode: T.amber, ViralityFactor: T.red, Collaborator: T.pink, TrendSignal: "#a78bfa", BrandVoice: "#34d399" }).map(([type, color]) => (
        <div key={type} style={{ background: T.card, border: `1px solid ${color}44`, borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: T.text }}>{type.replace(/([A-Z])/g, ' $1').trim()}</span>
        </div>
      ))}
    </div>
  </div>
);

const PVEView = ({ viralityTrend }) => (
  <div>
    <SectionHeader claim={PATENT_CLAIMS.PVE} />
    <ChartCard title="14-Day Virality Score by Platform">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={viralityTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
          <XAxis dataKey="day" stroke={T.muted} tick={{ fontSize: 11 }} />
          <YAxis stroke={T.muted} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} />
          <Legend />
          {Object.entries(PLATFORM_COLORS).map(([p, c]) => (
            <Area key={p} type="monotone" dataKey={p} stroke={c} fill={c + "22"} strokeWidth={2} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  </div>
);

const CPFEView = ({ platformData }) => (
  <div>
    <SectionHeader claim={PATENT_CLAIMS.CPFE} />
    <ChartCard title="Follower Count by Platform">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={platformData}>
          <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
          <XAxis dataKey="platform" stroke={T.muted} tick={{ fontSize: 11 }} />
          <YAxis stroke={T.muted} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} formatter={(v) => v.toLocaleString()} />
          <Bar dataKey="followers" radius={[6, 6, 0, 0]}>
            {platformData.map((entry) => (
              <rect key={entry.platform} fill={PLATFORM_COLORS[entry.platform]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
    <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 12 }}>
      {platformData.map(p => (
        <div key={p.platform} style={{ background: T.card, border: `1px solid ${PLATFORM_COLORS[p.platform]}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: PLATFORM_COLORS[p.platform] }}>{p.platform}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.white, marginTop: 4 }}>{p.followers.toLocaleString()}</div>
          <div style={{ fontSize: 11, color: T.muted }}>followers</div>
          <div style={{ marginTop: 8, fontSize: 12, color: T.green }}>↑ {p.engagement}% engagement</div>
        </div>
      ))}
    </div>
  </div>
);

const SSDFEView = ({ engagementRadar }) => (
  <div>
    <SectionHeader claim={PATENT_CLAIMS.SSDFE} />
    <ChartCard title="Engagement Signal Radar (All Platforms)">
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={engagementRadar}>
          <PolarGrid stroke={T.border} />
          <PolarAngleAxis dataKey="metric" tick={{ fill: T.muted, fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: T.muted, fontSize: 10 }} />
          {Object.entries(PLATFORM_COLORS).map(([p, c]) => (
            <Radar key={p} name={p} dataKey={p} stroke={c} fill={c} fillOpacity={0.15} strokeWidth={2} />
          ))}
          <Legend />
          <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  </div>
);

const CSOEView = ({ platformData }) => (
  <div>
    <SectionHeader claim={PATENT_CLAIMS.CSOE} />
    <ChartCard title="Optimal Posting Cadence & Engagement Rate">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={platformData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke={T.border} horizontal={false} />
          <XAxis type="number" stroke={T.muted} tick={{ fontSize: 11 }} />
          <YAxis dataKey="platform" type="category" stroke={T.muted} tick={{ fontSize: 12 }} width={80} />
          <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }} />
          <Bar dataKey="engagement" name="Engagement %" fill={T.accent} radius={[0, 6, 6, 0]} />
          <Bar dataKey="share" name="Share Rate" fill={T.cyan} radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  </div>
);

const InteractiveFollowersView = ({ followers }) => (
  <div>
    <SectionHeader claim={PATENT_CLAIMS.MEMORY} />
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {followers.map(f => (
        <div key={f.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: PLATFORM_COLORS[f.platform] + "33", border: `2px solid ${PLATFORM_COLORS[f.platform]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
            {f.name[1].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: T.white }}>{f.name}</div>
            <div style={{ fontSize: 12, color: T.muted }}>{f.platform} · Last: "{f.lastComment}"</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: T.accent }}>{f.score}</div>
            <div style={{ fontSize: 11, color: f.predictedNext === "High" ? T.green : T.amber }}>Next: {f.predictedNext}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GenericView = ({ claimKey }) => {
  const claim = PATENT_CLAIMS[claimKey];
  if (!claim) return null;
  return (
    <div>
      <SectionHeader claim={claim} />
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 28, textAlign: "center", color: T.muted }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🚧</div>
        <div style={{ fontSize: 16, color: T.text, marginBottom: 8 }}>{claim.title}</div>
        <div style={{ fontSize: 13 }}>{claim.desc}</div>
        <div style={{ marginTop: 16, fontSize: 12, color: T.accent }}>{claim.claim} — Full implementation in v1.1</div>
      </div>
    </div>
  );
};

const AIRecommendationView = ({ platformData }) => {
  const [plays, setPlays] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlays = useCallback(async () => {
    setLoading(true); setError(null); setPlays(null);
    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      const endpoint = apiKey ? "https://api.anthropic.com/v1/messages" : "/api/anthropic/v1/messages";
      const headers = {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        ...(apiKey ? { "x-api-key": apiKey } : {}),
      };
      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 900,
          messages: [{
            role: "user",
            content: `You are the Chief Growth Strategist for influencers and brands. Analyze the Unified Audience Engagement Graph across X, YouTube, Instagram, Facebook, and TikTok. Platform data: ${JSON.stringify(platformData)}. Give 4 specific, actionable next-24-hour growth plays that will increase interactive followers (comments, DMs, saves, shares). Output strict JSON only — no markdown, no explanation: {"plays":[{"title":"...","platform":"...","action":"...","predictedImpact":"...","confidence":"..."}]}`,
          }],
        }),
      });
      if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
      const data = await res.json();
      const raw = data.content[0].text.replace(/```json|```/g, "").trim();
      setPlays(JSON.parse(raw).plays);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [platformData]);

  return (
    <div>
      <SectionHeader claim={{ claim: "AI Engine", title: "Claude Growth Plays", desc: "4 next-24-hour actions to maximise interactive followers across all platforms." }} />
      <button onClick={fetchPlays} disabled={loading}
        style={{ padding: "12px 28px", background: loading ? T.border : T.accent, color: T.white, border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", marginBottom: 20, transition: "background 0.2s" }}>
        {loading ? "Generating plays…" : "⚡ Generate Growth Plays"}
      </button>
      {error && <div style={{ color: T.red, background: T.card, border: `1px solid ${T.red}`, borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13 }}>Error: {error}</div>}
      {plays && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {plays.map((play, i) => (
            <div key={i} style={{ background: T.card, border: `1px solid ${T.accent}44`, borderRadius: 12, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontWeight: 700, color: T.white, fontSize: 15 }}>{play.title}</div>
                <span style={{ background: PLATFORM_COLORS[play.platform] + "33", color: PLATFORM_COLORS[play.platform] || T.cyan, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{play.platform}</span>
              </div>
              <div style={{ fontSize: 13, color: T.text, marginBottom: 10 }}>{play.action}</div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ fontSize: 12, color: T.green }}>📈 {play.predictedImpact}</div>
                <div style={{ fontSize: 12, color: T.amber }}>🎯 {play.confidence}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const SectionHeader = ({ claim }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
      <span style={{ background: T.accent + "33", color: T.accent, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{claim.claim}</span>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: T.white }}>{claim.title}</h2>
    </div>
    <p style={{ margin: 0, fontSize: 13, color: T.muted }}>{claim.desc}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: T.muted, marginBottom: 14 }}>{title}</div>
    {children}
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function SocialForgeAI() {
  const [activeKey, setActiveKey] = useState("UCIG");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [platformData] = useState(genPlatformData);
  const [viralityTrend, setViralityTrend] = useState(genViralityTrend);
  const [engagementRadar] = useState(genEngagementRadar);
  const [graphData, setGraphData] = useState(genUCIGNodes);
  const [interactiveFollowers] = useState(genInteractiveFollowers);

  useEffect(() => {
    const id = setInterval(() => {
      setViralityTrend(genViralityTrend());
      setGraphData(genUCIGNodes());
    }, 30000);
    return () => clearInterval(id);
  }, []);

  const renderView = () => {
    switch (activeKey) {
      case "UCIG": return <UCIGView graphData={graphData} platformData={platformData} />;
      case "PVE": return <PVEView viralityTrend={viralityTrend} />;
      case "CPFE": return <CPFEView platformData={platformData} />;
      case "SSDFE": return <SSDFEView engagementRadar={engagementRadar} />;
      case "CSOE": return <CSOEView platformData={platformData} />;
      case "MEMORY": return <InteractiveFollowersView followers={interactiveFollowers} />;
      case "AI": return <AIRecommendationView platformData={platformData} />;
      default: return <GenericView claimKey={activeKey} />;
    }
  };

  const NavContent = () => (
    <nav style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {navGroups.map(group => (
        <div key={group.label}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 12px", marginBottom: 6 }}>{group.label}</div>
          {group.items.map(item => (
            <button key={item.key} onClick={() => { setActiveKey(item.key); setDrawerOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", background: activeKey === item.key ? T.accent + "22" : "transparent", border: activeKey === item.key ? `1px solid ${T.accent}55` : "1px solid transparent", borderRadius: 8, color: activeKey === item.key ? T.white : T.muted, fontWeight: activeKey === item.key ? 700 : 400, fontSize: 13, cursor: "pointer", transition: "all 0.15s", textAlign: "left" }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      ))}
    </nav>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setDrawerOpen(!drawerOpen)} style={{ background: "none", border: "none", color: T.text, cursor: "pointer", fontSize: 20, padding: 4, display: "block" }}>☰</button>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${T.accent}, ${T.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: T.white, lineHeight: 1 }}>SocialForge AI</div>
              <div style={{ fontSize: 10, color: T.muted, lineHeight: 1, marginTop: 2 }}>Unified Audience Engagement Graph</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {Object.entries(PLATFORM_COLORS).map(([p, c]) => (
            <div key={p} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} title={p} />
          ))}
        </div>
      </header>

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
        {/* Desktop Sidebar */}
        <aside style={{ width: 220, background: T.surface, borderRight: `1px solid ${T.border}`, padding: "20px 12px", flexShrink: 0, display: "none", position: "sticky", top: 60, height: "calc(100vh - 60px)", overflowY: "auto" }}
          className="desktop-sidebar">
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
        @media (min-width: 768px) {
          .desktop-sidebar { display: block !important; }
        }
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${T.surface}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
      `}</style>
    </div>
  );
}
