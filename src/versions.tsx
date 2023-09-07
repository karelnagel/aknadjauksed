import { useState } from "react";
import { useInputValue, useStore, HEIGHT } from "./store";

type Opening = "Vali" | "Mitteavatav" | "Vasakult" | "Paremalt" | "Ülevalt" | "Vasakult ja ülevalt" | "Paremalt ja ülevalt";

const Panel = ({ name, width, height }: { name: string; width: number; height: number }) => {
  const color = useStore((state) => state.color);
  const opening = useInputValue(name) as Opening | undefined;
  return (
    <div style={{ border: `6px solid ${color}`, width, height }}>
      <svg viewBox="0 0 100 50" width="100%" height="100%" preserveAspectRatio="none">
        {opening?.toLocaleLowerCase().includes("paremalt") && <path fill="none" stroke="black" strokeWidth="1" d="M100,0 L0,25 L100,50" />}
        {opening?.toLocaleLowerCase().includes("vasakult") && <path fill="none" stroke="black" strokeWidth="1" d="M0,0 L100,25 L0,50" />}
        {opening?.toLocaleLowerCase().includes("ülevalt") && <path fill="none" stroke="black" strokeWidth="1" d="M0,50 L50,0 L100,50" />}
      </svg>
    </div>
  );
};

export const UheOsaline = () => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const scale = HEIGHT / height;

  return (
    <div style={{ position: "relative" }}>
      <Panel name="window-opening" width={width * scale} height={HEIGHT} />
      <input
        name="width"
        placeholder="Laius"
        type="number"
        defaultValue={width}
        onBlur={(e) => setWidth(parseInt(e.currentTarget.value))}
        style={{ position: "absolute", width: 60, top: -20, left: "50%", transform: "translate(-50%, -50%)" }}
      />
      <input
        name="height"
        placeholder="Korgus"
        type="number"
        defaultValue={height}
        onBlur={(e) => setHeight(parseInt(e.currentTarget.value))}
        style={{ position: "absolute", width: 60, right: -120, top: "50%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
};

export const KaheOsaline = () => {
  return <div></div>;
};
export const KolmeOsaline = () => {
  return <div></div>;
};

export const AknadMolemalPool = () => {
  return <div></div>;
};
export const RoduPoolKlaas = () => {
  return <div></div>;
};
export const Rodu = () => {
  return <div></div>;
};

export const UksPlussKaks = () => {
  return <div></div>;
};
export const VasakulAknaga = () => {
  return <div></div>;
};
export const ParemalAknaga = () => {
  return <div></div>;
};
