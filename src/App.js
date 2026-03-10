import { useState } from "react";

const operadores = [
  { symbol: "!", nombre: "NOT (negación)", color: "#ef4444", desc: "Invierte el valor booleano. Si era true pasa a false, y viceversa." },
  { symbol: "&&", nombre: "AND (y lógico)", color: "#3b82f6", desc: "El resultado es true SOLO si ambos lados son true." },
  { symbol: "||", nombre: "OR (o lógico)", color: "#10b981", desc: "El resultado es true si AL MENOS uno de los lados es true." },
];

export default function Alarma() {
  const [desactivada, setDesactivada] = useState(false);
  const [movimiento, setMovimiento] = useState(true);
  const [puerta, setPuerta] = useState(false);

  const noDesactivada = !desactivada;
  const condicionSecundaria = movimiento || puerta;
  const suena = noDesactivada && condicionSecundaria;

  const Toggle = ({ label, value, onChange, color }) => (
    <button
      onClick={() => onChange(!value)}
      style={{
        background: value ? color : "#1e293b",
        border: `2px solid ${color}`,
        color: value ? "#fff" : color,
        borderRadius: 8,
        padding: "8px 18px",
        cursor: "pointer",
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: 14,
        transition: "all 0.2s",
        minWidth: 160,
      }}
    >
      {label}: {value ? "true" : "false"}
    </button>
  );

  const Box = ({ label, value, color, desc }) => (
    <div style={{
      background: "#0f172a",
      border: `2px solid ${value ? color : "#334155"}`,
      borderRadius: 10,
      padding: "12px 16px",
      textAlign: "center",
      minWidth: 140,
      transition: "border-color 0.3s",
    }}>
      <div style={{ fontFamily: "monospace", fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: "monospace", fontWeight: "bold", fontSize: 20, color: value ? color : "#475569" }}>
        {value ? "true" : "false"}
      </div>
      {desc && <div style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>{desc}</div>}
    </div>
  );

  return (
    <div style={{ background: "#020617", minHeight: "100vh", padding: "32px 16px", fontFamily: "monospace", color: "#e2e8f0" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>

        <h1 style={{ textAlign: "center", fontSize: 22, color: "#f8fafc", marginBottom: 4 }}>🔔 Simulador de Alarma</h1>
        <p style={{ textAlign: "center", color: "#64748b", fontSize: 13, marginBottom: 32 }}>
          <span style={{ color: "#f1f5f9" }}>suenaAlarma</span> = <span style={{ color: "#ef4444" }}>!</span>alarmaDesactivada <span style={{ color: "#3b82f6" }}>&amp;&amp;</span> (hayMovimiento <span style={{ color: "#10b981" }}>||</span> puertaAbierta)
        </p>

        {/* Variables */}
        <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, marginBottom: 24, border: "1px solid #1e293b" }}>
          <h2 style={{ fontSize: 13, color: "#94a3b8", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>📦 Variables (haz clic para cambiar)</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Toggle label="alarmaDesactivada" value={desactivada} onChange={setDesactivada} color="#f59e0b" />
            <Toggle label="hayMovimiento" value={movimiento} onChange={setMovimiento} color="#10b981" />
            <Toggle label="puertaAbierta" value={puerta} onChange={setPuerta} color="#10b981" />
          </div>
        </div>

        {/* Evaluación paso a paso */}
        <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, marginBottom: 24, border: "1px solid #1e293b" }}>
          <h2 style={{ fontSize: 13, color: "#94a3b8", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>🧮 Evaluación paso a paso</h2>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: "#ef4444" }}>Paso 1 — NOT:</span> !alarmaDesactivada → !{desactivada ? "true" : "false"}
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Box label="alarmaDesactivada" value={desactivada} color="#f59e0b" />
              <span style={{ color: "#ef4444", fontSize: 24, fontWeight: "bold" }}>!</span>
              <Box label="!alarmaDesactivada" value={noDesactivada} color="#ef4444" desc="Se invierte el valor" />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: "#10b981" }}>Paso 2 — OR:</span> hayMovimiento || puertaAbierta → {movimiento ? "true" : "false"} || {puerta ? "true" : "false"}
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <Box label="hayMovimiento" value={movimiento} color="#10b981" />
              <span style={{ color: "#10b981", fontSize: 24, fontWeight: "bold" }}>||</span>
              <Box label="puertaAbierta" value={puerta} color="#10b981" />
              <span style={{ color: "#475569", fontSize: 20 }}>=</span>
              <Box label="resultado OR" value={condicionSecundaria} color="#10b981" desc="true si alguno es true" />
            </div>
          </div>

          <div>
            <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: "#3b82f6" }}>Paso 3 — AND:</span> !alarmaDesactivada && (mov || puerta) → {noDesactivada ? "true" : "false"} && {condicionSecundaria ? "true" : "false"}
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <Box label="!alarmaDesactivada" value={noDesactivada} color="#ef4444" />
              <span style={{ color: "#3b82f6", fontSize: 24, fontWeight: "bold" }}>&amp;&amp;</span>
              <Box label="mov || puerta" value={condicionSecundaria} color="#10b981" />
              <span style={{ color: "#475569", fontSize: 20 }}>=</span>
              <Box label="suenaAlarma" value={suena} color="#3b82f6" desc="true solo si AMBOS son true" />
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div style={{
          background: suena ? "#1a0a0a" : "#0a1a0a",
          border: `2px solid ${suena ? "#ef4444" : "#334155"}`,
          borderRadius: 16,
          padding: 24,
          textAlign: "center",
          transition: "all 0.3s",
        }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>{suena ? "🔔" : "🔕"}</div>
          <div style={{ fontSize: 18, fontWeight: "bold", color: suena ? "#ef4444" : "#64748b" }}>
            {suena ? "¡La alarma SUENA!" : "La alarma NO suena"}
          </div>
          <div style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>
            boolean suenaAlarma = <span style={{ color: suena ? "#ef4444" : "#64748b" }}>{suena ? "true" : "false"}</span>
          </div>
        </div>

        {/* Operadores */}
        <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, marginTop: 24, border: "1px solid #1e293b" }}>
          <h2 style={{ fontSize: 13, color: "#94a3b8", marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>📖 Operadores usados</h2>
          {operadores.map(op => (
            <div key={op.symbol} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 12 }}>
              <span style={{ color: op.color, fontWeight: "bold", fontSize: 18, minWidth: 36 }}>{op.symbol}</span>
              <div>
                <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: "bold" }}>{op.nombre}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{op.desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}