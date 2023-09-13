import { CSSProperties, ReactNode, useEffect, useState } from "react";
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
const WIDTH = 800;
const Panel = ({
  name,
  width,
  height,
  children,
  filled,
  scale,
}: {
  scale: number;
  name: string;
  width: number;
  height: number;
  children: ReactNode;
  filled?: boolean;
}) => {
  const opening = useInputValue(name) as Opening | undefined;
  const colorOutside = useInputValue("color-outside");
  const color = colors[colorOutside as keyof typeof colors] || colorOutside || "white";

  return (
    <div
      style={{
        border: `6px solid ${color}`,
        background: filled ? color : undefined,
        width: width * scale,
        height: height * scale,
        position: "relative",
        transitionDuration: "1s",
      }}
    >
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
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const delayedSetValue = (val: number) => {
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => setValue(val), 500));
  };

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
        onChange={(e) => delayedSetValue(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </label>
  );
};

const useScale = (heights: number[], widths: number[]) => {
  const [maxWidth, setMaxWidth] = useState(Math.min(window.innerWidth - 200, WIDTH));
  useEffect(() => {
    const resize = () => setMaxWidth(Math.min(window.innerWidth - 200, WIDTH));
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const height = heights.reduce((a, b) => a + b, 0);
  const width = widths.reduce((a, b) => a + b, 0);
  return Math.min(HEIGHT / height, maxWidth / width);
};

export const UheOsaline = ({ w = 1000, h = 1000 }: { w?: number; h?: number }) => {
  const [width, setWidth] = useState(w);
  const [height, setHeight] = useState(h);
  const scale = useScale([height], [width]);

  return (
    <div style={{}}>
      <Panel name="window-opening" width={width} height={height} scale={scale}>
        <Input name="width" value={width} label="Laius" setValue={setWidth} style={{ top: -32, left: "50%" }} />
        <Input name="height" value={height} label="Korgus" setValue={setHeight} style={{ right: -120, top: "50%" }} />
      </Panel>
    </div>
  );
};

export const KaheOsaline = () => {
  const [widthLeft, setWidthLeft] = useState(1000);
  const [widthRight, setWidth2] = useState(1000);
  const [height, setHeight] = useState(1000);
  const scale = useScale([height], [widthLeft, widthRight]);

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Panel name="opening-left" width={widthLeft} height={height} scale={scale}>
        <Input name="width-left" value={widthLeft} label="Laius" setValue={setWidthLeft} style={{ top: -32, left: "50%" }} />
      </Panel>
      <Panel name="opening-right" width={widthRight} height={height} scale={scale}>
        <Input name="width-right" value={widthRight} label="Laius" setValue={setWidth2} style={{ top: -32, left: "50%" }} />
        <Input name="height" value={height} label="Korgus" setValue={setHeight} style={{ right: -120, top: "50%" }} />
      </Panel>
    </div>
  );
};

export const KolmeOsaline = () => {
  const [widthLeft, setWidthLeft] = useState(500);
  const [widthCenter, setWidthCenter] = useState(1000);
  const [widthRight, setWidthRight] = useState(500);
  const [height, setHeight] = useState(1000);
  const scale = useScale([height], [widthLeft, widthCenter, widthRight]);

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Panel name="opening-left" width={widthLeft} height={height} scale={scale}>
        <Input name="width-left" value={widthLeft} label="Laius" setValue={setWidthLeft} style={{ top: -32, left: "50%" }} />
      </Panel>
      <Panel name="opening-center" width={widthCenter} height={height} scale={scale}>
        <Input name="width-center" value={widthCenter} label="Laius" setValue={setWidthCenter} style={{ top: -32, left: "50%" }} />
      </Panel>
      <Panel name="opening-right" width={widthRight} height={height} scale={scale}>
        <Input name="width-right" value={widthRight} label="Laius" setValue={setWidthRight} style={{ top: -32, left: "50%" }} />
        <Input name="height" value={height} label="Korgus" setValue={setHeight} style={{ right: -120, top: "50%" }} />
      </Panel>
    </div>
  );
};

export const AknadMolemalPool = () => {
  const [widthLeft, setWidthLeft] = useState(1000);
  const [doorWidth, setDoorWidth] = useState(1000);
  const [widthRight, setWidthRight] = useState(1000);
  const [heightLeft, setHeightLeft] = useState(1000);
  const [heightDoor, setHeightDoor] = useState(2000);
  const [heightRight, setHeightRight] = useState(1000);
  const scale = useScale([Math.max(heightDoor, heightLeft, heightRight)], [widthLeft, doorWidth, widthRight]);

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Panel name="opening-left" width={widthLeft} height={heightLeft} scale={scale}>
        <Input name="width-left" value={widthLeft} label="Laius" setValue={setWidthLeft} style={{ top: -32, left: "50%" }} />
        <Input name="height-left" max={heightDoor} value={heightLeft} label="Korgus" setValue={setHeightLeft} style={{ left: -50, top: "50%" }} />
      </Panel>
      <Panel name="opening-door" width={doorWidth} height={heightDoor} scale={scale}>
        <Input name="door-width" value={doorWidth} label="Laius" setValue={setDoorWidth} style={{ top: -32, left: "50%" }} />
        <Input name="door-height" value={heightDoor} label="Height" setValue={setHeightDoor} style={{ top: "50%", left: 50 }} />
      </Panel>
      <Panel name="opening-right" width={widthRight} height={heightRight} scale={scale}>
        <Input name="width-right" value={widthRight} label="Laius" setValue={setWidthRight} style={{ top: -32, left: "50%" }} />
        <Input
          name="height-right"
          max={heightDoor}
          value={heightRight}
          label="Korgus"
          setValue={setHeightRight}
          style={{ right: -120, top: "50%" }}
        />
      </Panel>
    </div>
  );
};

export const RoduPoolKlaas = () => {
  const [width, setWidth] = useState(1000);
  const [heightTop, setHeightTop] = useState(1000);
  const [heightBottom, setHeightBottom] = useState(1000);
  const scale = useScale([heightTop, heightBottom], [width]);
  return (
    <div style={{ position: "relative" }}>
      <Panel name="window-opening" width={width} height={heightTop} scale={scale}>
        <Input name="width" value={width} label="Laius" setValue={setWidth} style={{ top: -32, left: "50%" }} />
        <Input name="height-top" value={heightTop} label="Korgus" setValue={setHeightTop} style={{ right: -120, top: "50%" }} />
      </Panel>
      <Panel filled name="" width={width} height={heightBottom} scale={scale}>
        <Input name="height-bottom" value={heightBottom} label="Korgus" setValue={setHeightBottom} style={{ right: -120, top: "50%" }} />
      </Panel>
    </div>
  );
};

export const Rodu = () => {
  return <UheOsaline h={2000} />;
};

export const UksPlussKaks = () => {
  const [heightTop, setHeightTop] = useState(400);
  const [heightBottom, setHeightBottom] = useState(2000);
  const [widthLeft, setWidthLeft] = useState(1000);
  const [widthRight, setWidthRight] = useState(1000);
  const scale = useScale([heightTop, heightBottom], [widthLeft, widthRight]);
  return (
    <div style={{}}>
      <Panel name="opening-top" width={widthLeft + widthRight} height={heightTop} scale={scale}>
        <Input name="height-top" value={heightTop} label="Korgus" setValue={setHeightTop} style={{ right: -120, top: "50%" }} />
      </Panel>
      <div style={{ display: "flex" }}>
        <Panel name="opening-left" width={widthLeft} height={heightBottom} scale={scale}>
          <Input name="width-left" value={widthLeft} label="Laius" setValue={setWidthLeft} style={{ bottom: -110, left: "50%" }} />
        </Panel>
        <Panel name="opening-right" width={widthRight} height={heightBottom} scale={scale}>
          <Input name="width-right" value={widthRight} label="Laius" setValue={setWidthRight} style={{ bottom: -110, left: "50%" }} />
          <Input name="height-bottom" value={heightBottom} label="Korgus" setValue={setHeightBottom} style={{ right: -120, top: "50%" }} />
        </Panel>
      </div>
    </div>
  );
};

// export const VasakulAknaga = () => {
//   const [windowWidth, setWindowWidth] = useState(1000);
//   const [windowHeight, setWindowHeight] = useState(1000);
//   const [doorWidth, setDoorWidth] = useState(1000);
//   const [doorHeight, setDoorHeight] = useState(2000);
//   const scale = useScale([doorHeight], [windowWidth, doorWidth]);

//   return (
//     <div style={{ position: "relative", display: "flex" }}>
//       <Panel name="window-left" width={windowWidth} height={windowHeight} scale={scale}>
//         <Input name="window-width" value={windowWidth} label="Laius" setValue={setWindowWidth} style={{ top: -32, left: "50%" }} />
//         <Input
//           name="window-height"
//           max={doorHeight}
//           value={windowHeight}
//           label="Korgus"
//           setValue={setWindowHeight}
//           style={{ left: -50, top: "50%" }}
//         />
//       </Panel>
//       <Panel name="window-right" width={doorWidth} height={doorHeight} scale={scale}>
//         <Input name="door-width" value={doorWidth} label="Laius" setValue={setDoorWidth} style={{ top: -32, left: "50%" }} />
//         <Input name="door-height" value={doorHeight} label="Height" setValue={setDoorHeight} style={{ right: -110, top: "50%" }} />
//       </Panel>
//     </div>
//   );
// };

export const ParemalAknaga = () => {
  const [doorWidth, setDoorWidth] = useState(1000);
  const [doorHeight, setDoorHeight] = useState(2000);
  const [windowWidth, setWindowWidth] = useState(1000);
  const [windowHeight, setWindowHeight] = useState(1000);
  const scale = useScale([doorHeight], [windowWidth, doorWidth]);

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Panel name="door-opening" width={doorWidth} height={doorHeight} scale={scale}>
        <Input name="door-width" value={doorWidth} label="Ukse laius" setValue={setDoorWidth} style={{ top: -32, left: "50%" }} />
        <Input name="door-height" value={doorHeight} label="Ukse pikkus" setValue={setDoorHeight} style={{ top: -32, left: "50%" }} />
      </Panel>
      <Panel name="window-opening" width={windowWidth} height={windowHeight} scale={scale}>
        <Input name="window-width" value={windowWidth} label="Akna laius" setValue={setWindowWidth} style={{ top: -32, left: "50%" }} />
        <Input
          name="window-height"
          max={doorHeight}
          value={windowHeight}
          label="Akna pikkus"
          setValue={setWindowHeight}
          style={{ right: -120, top: "50%" }}
        />
      </Panel>
    </div>
  );
};

export const NeljaOsaline = () => {
  const [widthFirst, setWidthFirst] = useState(500);
  const [widthSecond, setWidthSecond] = useState(500);
  const [widthThird, setWidthThird] = useState(500);
  const [widthFourth, setWidthFourth] = useState(500);
  const [height, setHeight] = useState(500);
  const scale = useScale([height], [widthFirst, widthSecond, widthThird, widthFourth]);

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Panel name="opening-first" width={widthFirst} height={height} scale={scale}>
        <Input name="width-first" value={widthFirst} label="Laius" setValue={setWidthFirst} style={{ top: -32, left: "50%" }} />
      </Panel>
      <Panel name="opening-second" width={widthSecond} height={height} scale={scale}>
        <Input name="width-second" value={widthSecond} label="Laius" setValue={setWidthSecond} style={{ top: -32, left: "50%" }} />
      </Panel>
      <Panel name="opening-third" width={widthThird} height={height} scale={scale}>
        <Input name="width-third" value={widthThird} label="Laius" setValue={setWidthThird} style={{ top: -32, left: "50%" }} />
      </Panel>
      <Panel name="opening-fourth" width={widthFourth} height={height} scale={scale}>
        <Input name="width-fourth" value={widthFourth} label="Laius" setValue={setWidthFourth} style={{ top: -32, left: "50%" }} />
        <Input name="height" value={height} label="Korgus" setValue={setHeight} style={{ right: -120, top: "50%" }} />
      </Panel>
    </div>
  );
};

export const RoduPoolKlaasAknadMolemalPool = () => {
  const [widthLeft, setWidthLeft] = useState(1000);
  const [doorWidth, setDoorWidth] = useState(1000);
  const [widthRight, setWidthRight] = useState(1000);
  const [heightLeft, setHeightLeft] = useState(1000);
  const [heightDoor, setHeightDoor] = useState(1000);
  const [heightDoorBottom, setHeightDoorBottom] = useState(1000);
  const [heightRight, setHeightRight] = useState(1000);
  const scale = useScale([Math.max(heightDoor + heightDoorBottom, heightLeft, heightRight)], [widthLeft, doorWidth, widthRight]);

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Panel name="opening-left" width={widthLeft} height={heightLeft} scale={scale}>
        <Input name="width-left" value={widthLeft} label="Laius" setValue={setWidthLeft} style={{ top: -32, left: "50%" }} />
        <Input name="height-left" max={heightDoor} value={heightLeft} label="Korgus" setValue={setHeightLeft} style={{ left: -50, top: "50%" }} />
      </Panel>
      <div style={{ position: "relative" }}>
        <Panel name="opening-door" width={doorWidth} height={heightDoor} scale={scale}>
          <Input name="door-width" value={doorWidth} label="Laius" setValue={setDoorWidth} style={{ top: -32, left: "50%" }} />
          <Input name="door-height" value={heightDoor} label="Height" setValue={setHeightDoor} style={{ top: "50%", left: 50 }} />
        </Panel>
        <Panel name="" width={doorWidth} height={heightDoorBottom} scale={scale} filled>
          <Input name="door-bottom-height" value={heightDoorBottom} label="Height" setValue={setHeightDoorBottom} style={{ top: "50%", left: 50 }} />
        </Panel>
      </div>
      <Panel name="opening-right" width={widthRight} height={heightRight} scale={scale}>
        <Input name="width-right" value={widthRight} label="Laius" setValue={setWidthRight} style={{ top: -32, left: "50%" }} />
        <Input
          name="height-right"
          max={heightDoor}
          value={heightRight}
          label="Korgus"
          setValue={setHeightRight}
          style={{ right: -120, top: "50%" }}
        />
      </Panel>
    </div>
  );
};

export const RoduPoolKlaasAknaga = () => {
  const [doorWidth, setDoorWidth] = useState(1000);
  const [doorHeight, setDoorHeight] = useState(1000);
  const [heightDoorBottom, setHeightDoorBottom] = useState(1000);
  const [windowWidth, setWindowWidth] = useState(1000);
  const [windowHeight, setWindowHeight] = useState(1000);
  const scale = useScale([doorHeight, heightDoorBottom], [windowWidth, doorWidth]);

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <div style={{ position: "relative" }}>
        <Panel name="door-opening" width={doorWidth} height={doorHeight} scale={scale}>
          <Input name="door-width" value={doorWidth} label="Ukse laius" setValue={setDoorWidth} style={{ top: -32, left: "50%" }} />
          <Input name="door-height" value={doorHeight} label="Ukse pikkus" setValue={setDoorHeight} style={{ top: "50%", left: 50 }} />
        </Panel>
        <Panel name="" width={doorWidth} height={heightDoorBottom} scale={scale} filled>
          <Input name="door-bottom-height" value={heightDoorBottom} label="Height" setValue={setHeightDoorBottom} style={{ top: "50%", left: 50 }} />
        </Panel>
      </div>
      <Panel name="window-opening" width={windowWidth} height={windowHeight} scale={scale}>
        <Input name="window-width" value={windowWidth} label="Akna laius" setValue={setWindowWidth} style={{ top: -32, left: "50%" }} />
        <Input
          name="window-height"
          max={doorHeight}
          value={windowHeight}
          label="Akna pikkus"
          setValue={setWindowHeight}
          style={{ right: -120, top: "50%" }}
        />
      </Panel>
    </div>
  );
};
