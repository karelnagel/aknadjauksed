import { CSSProperties, ReactNode, useState } from "react";
import { useInputValue, HEIGHT } from "./store";

type Opening = "Vali" | "Mitteavatav" | "Vasakult" | "Paremalt" | "Ülevalt" | "Vasakult ja ülevalt" | "Paremalt ja ülevalt";
const colors = {
  Valge: "white",
  Pruun: "#a5802a",
  Mahagon: "#C04000",
  Pähkel: "#a68b6e",
  "Tume tamm": "#855e42",
  "Kuldne tamm": "#8B4513",
  "Hele tamm": "#deb887",
  Bergkiefer: "#DEB887",
  "Hall-RAL 7038": "#B4B8B0",
  "Hall-RAL 7016": "#373F43",
  "Hall-RAL 7035": "#CBD0CC",
  "Hall-RAL 7001": "#8F999F",
  "Punane-RAL 3005": "#5E2028",
  "Punane-RAL 3004": "#701F29",
  "Punane-RAL 3003": "#8D1D2C",
  "Punane-RAL 3000": "#AB2524",
  "Roheline-RAL 6004": "#0E4243",
  "Roheline-RAL 6009": "#26392F",
  "Roheline-RAL 6005": "#0F4336",
  "Roheline-RAL 6001": "#28713E",
  "Sinine-RAL 5013": "#232D53",
  "Sinine-RAL 5011": "#232C3F",
  "Sinine-RAL 5007": "#41678D",
  "Sinine-RAL 5005": "#154889",
  "Kollane-RAL 1018": "#F3E03B",
  "Valge-RAL 9001": "#EFEBDC",
  "Valge-RAL 9010": "#F7F9EF",
  "Valge-RAL 9018": "#CFD3CD",
};
const Panel = ({ name, width, height, children, filled }: { name: string; width: number; height: number; children: ReactNode; filled?: boolean }) => {
  const opening = useInputValue(name) as Opening | undefined;
  const colorOutside = useInputValue("color-outside");
  const color = colors[colorOutside as keyof typeof colors] || colorOutside || "white";

  return (
    <div style={{ border: `6px solid ${color}`, background: filled ? color : undefined, width, height, position: "relative" }}>
      <svg viewBox="0 0 100 50" width="100%" height="100%" preserveAspectRatio="none">
        {opening?.toLocaleLowerCase().includes("paremalt") && <path fill="none" stroke="black" strokeWidth="1" d="M100,0 L0,25 L100,50" />}
        {opening?.toLocaleLowerCase().includes("vasakult") && <path fill="none" stroke="black" strokeWidth="1" d="M0,0 L100,25 L0,50" />}
        {opening?.toLocaleLowerCase().includes("ülevalt") && <path fill="none" stroke="black" strokeWidth="1" d="M0,50 L50,0 L100,50" />}
      </svg>
      {children}
    </div>
  );
};

const Input = ({
  value,
  setValue,
  label,
  name,
  style,
  min = 0,
  max = 10000,
}: {
  value: number;
  setValue: (n: number) => void;
  label: string;
  name: string;
  style: CSSProperties;
  min?: number;
  max?: number;
}) => {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        width: 60,
        transform: `translate(${style.left || style.right ? "-50%" : "0"}, ${style.top || style.bottom ? "-50%" : "0"})`,
        gap: 3,
        ...style,
      }}
    >
      {/* <span>{label}</span> */}
      <input
        name={name}
        min={min}
        max={max}
        type="number"
        defaultValue={value}
        onChange={(e) => setValue(Math.max(min || 0, Math.min(max || Infinity, Number(e.target.value))))}
        style={{ width: "100%" }}
      />
    </label>
  );
};

export const UheOsaline = () => {
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(1000);
  const scale = HEIGHT / height;

  return (
    <div style={{}}>
      <Panel name="window-opening" width={width * scale} height={HEIGHT}>
        <Input name="width" value={width} label="Laius" setValue={setWidth} style={{ top: -32, left: "50%" }} />
        <Input name="height" value={height} label="Korgus" setValue={setHeight} style={{ right: -120, top: "50%" }} />
      </Panel>
    </div>
  );
};

export const KaheOsaline = () => {
  const [width, setWidth] = useState(1000);
  const [width2, setWidth2] = useState(1000);
  const [height, setHeight] = useState(1000);
  const scale = HEIGHT / height;

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Panel name="window-opening" width={width * scale} height={HEIGHT}>
        <Input name="width" value={width} label="Laius" setValue={setWidth} style={{ top: -32, left: "50%" }} />
      </Panel>
      <Panel name="window-opening2" width={width2 * scale} height={HEIGHT}>
        <Input name="width2" value={width2} label="Laius" setValue={setWidth2} style={{ top: -32, left: "50%" }} />
        <Input name="height" value={height} label="Korgus" setValue={setHeight} style={{ right: -120, top: "50%" }} />
      </Panel>
    </div>
  );
};

export const KolmeOsaline = () => {
  const [width, setWidth] = useState(1000);
  const [width2, setWidth2] = useState(1000);
  const [width3, setWidth3] = useState(1000);
  const [height, setHeight] = useState(1000);
  const scale = HEIGHT / height;

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Panel name="window-opening" width={width * scale} height={HEIGHT}>
        <Input name="width" value={width} label="Laius" setValue={setWidth} style={{ top: -32, left: "50%" }} />
      </Panel>
      <Panel name="window-opening2" width={width2 * scale} height={HEIGHT}>
        <Input name="width2" value={width2} label="Laius" setValue={setWidth2} style={{ top: -32, left: "50%" }} />
      </Panel>
      <Panel name="window-opening3" width={width3 * scale} height={HEIGHT}>
        <Input name="width2" value={width3} label="Laius" setValue={setWidth3} style={{ top: -32, left: "50%" }} />
        <Input name="height" value={height} label="Korgus" setValue={setHeight} style={{ right: -120, top: "50%" }} />
      </Panel>
    </div>
  );
};

export const AknadMolemalPool = () => {
  const [width1, setWidth1] = useState(1000);
  const [width2, setWidth2] = useState(1000);
  const [width3, setWidth3] = useState(1000);
  const [height1, setHeight1] = useState(400);
  const [height2, setHeight2] = useState(1000);
  const [height3, setHeight3] = useState(400);
  const scale = HEIGHT / height2;

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Panel name="window-opening" width={width1 * scale} height={height1 * scale}>
        <Input name="width" value={width1} label="Laius" setValue={setWidth1} style={{ top: -32, left: "50%" }} />
        <Input name="height" max={height2} value={height1} label="Korgus" setValue={setHeight1} style={{ left: -50, top: "50%" }} />
      </Panel>
      <Panel name="window-opening2" width={width2 * scale} height={HEIGHT}>
        <Input name="width2" value={width2} label="Laius" setValue={setWidth2} style={{ top: -32, left: "50%" }} />
        <Input name="width2" value={height2} label="Height" setValue={setHeight2} style={{ top: -32, left: "50%" }} />
      </Panel>
      <Panel name="window-opening3" width={width3 * scale} height={height3 * scale}>
        <Input name="width2" value={width3} label="Laius" setValue={setWidth3} style={{ top: -32, left: "50%" }} />
        <Input name="height3" max={height2} value={height3} label="Korgus" setValue={setHeight3} style={{ right: -120, top: "50%" }} />
      </Panel>
    </div>
  );
};

export const RoduPoolKlaas = () => {
  const [width, setWidth] = useState(1000);
  const [height1, setHeight1] = useState(1000);
  const [height2, setHeight2] = useState(1000);
  const scale = HEIGHT / (height1 + height2);
  return (
    <div style={{ position: "relative" }}>
      <Panel name="window-opening" width={width * scale} height={height1 * scale}>
        <Input name="width" value={width} label="Laius" setValue={setWidth} style={{ top: -32, left: "50%" }} />
        <Input name="height" value={height1} label="Korgus" setValue={setHeight1} style={{ right: -120, top: "50%" }} />
      </Panel>
      <Panel filled name="window-opening2" width={width * scale} height={height2 * scale}>
        <Input name="height2" value={height2} label="Korgus" setValue={setHeight2} style={{ right: -120, top: "50%" }} />
      </Panel>
    </div>
  );
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
