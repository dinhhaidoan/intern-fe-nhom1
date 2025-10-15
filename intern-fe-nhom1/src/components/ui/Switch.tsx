import React from "react";

export default function Switch({ checked, onChange, label }: { checked: boolean; onChange: (val: boolean) => void; label?: string }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <span className={`switch ${checked ? "on" : ""}`} onClick={() => onChange(!checked)}>
        <span className="dot" />
      </span>
      {label && <span className="text-sm">{label}</span>}
      <input type="checkbox" className="hidden" checked={checked} onChange={e => onChange(e.target.checked)} />
    </label>
  );
}
