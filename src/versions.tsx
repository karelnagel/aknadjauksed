import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useInputValue, HEIGHT } from "./store";

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
  // Russian
  Белый: "white",
  Коричневый: "#a5802a",
  "Красное дерево": "#C04000",
  Орех: "#a68b6e",
  "Темный дуб": "#855e42",
  "Золотой дуб": "#8B4513",
  "Светлый дуб": "#deb887",
  Бергкифер: "#DEB887",
  "Серый-РАЛ 7038": "#B4B8B0",
  "Серый-РАЛ 7016": "#373F43",
  "Серый-РАЛ 7035": "#CBD0CC",
  "Серый-РАЛ 7001": "#8F999F",
  "Красный-РАЛ 3005": "#5E2028",
  "Красный-РАЛ 3004": "#701F29",
  "Красный-РАЛ 3003": "#8D1D2C",
  "Красный-РАЛ 3000": "#AB2524",
  "Зеленый-РАЛ 6004": "#0E4243",
  "Зеленый-РАЛ 6009": "#26392F",
  "Зеленый-РАЛ 6005": "#0F4336",
  "Зеленый-РАЛ 6001": "#28713E",
  "Синий-РАЛ 5013": "#232D53",
  "Синий-РАЛ 5011": "#232C3F",
  "Синий-РАЛ 5007": "#41678D",
  "Синий-РАЛ 5005": "#154889",
  "Желтый-РАЛ 1018": "#F3E03B",
  "Белый-РАЛ 9001": "#EFEBDC",
  "Белый-РАЛ 9010": "#F7F9EF",
  "Белый-РАЛ 9018": "#CFD3CD",
};
const WIDTH = 800;

const Opening = ({ openingInputName }: { openingInputName: string }) => {
  const opening = useInputValue(openingInputName);
  return (
    <>
      <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">
        {(opening?.toLocaleLowerCase().includes("paremalt") || opening?.toLocaleLowerCase().includes("справа")) && (
          <path fill="none" stroke="black" strokeWidth="1" d="M100,0 L0,50 L100,100" />
        )}
        {(opening?.toLocaleLowerCase().includes("vasakult") || opening?.toLocaleLowerCase().includes("слева")) && (
          <path fill="none" stroke="black" strokeWidth="1" d="M0,0 L100,50 L0,100" />
        )}
        {(opening?.toLocaleLowerCase().includes("ülevalt") || opening?.toLocaleLowerCase().includes("сверху")) && (
          <path fill="none" stroke="black" strokeWidth="1" d="M0,100 L50,0 L100,100" />
        )}
        {(opening?.toLocaleLowerCase().includes("mitteavatav") || opening?.toLocaleLowerCase().includes("Неоткрываемое".toLowerCase())) && (
          <g stroke="black" strokeWidth="1">
            <line x1="25" y1="25" x2="75" y2="75" />
            <line x1="75" y1="25" x2="25" y2="75" />
          </g>
        )}
      </svg>
    </>
  );
};

const BORDER_WIDTH = 22;
const POSITION = `calc(100% + 7px)`;
const P50 = "50%";
const Panel = ({
  openingInputName,
  width,
  height,
  children,
  filled,
  scale,
}: {
  scale: number;
  openingInputName?: string;
  width: number;
  height: number;
  children: ReactNode;
  filled?: boolean;
}) => {
  const colorOutside = useInputValue("color-outside");
  const color = colors[colorOutside as keyof typeof colors] || colorOutside || "white";

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          border: `${BORDER_WIDTH}px solid ${color}`,
          background: filled ? color : "#adecff",
          width: width > 0 ? width * scale : 0,
          height: height > 0 ? height * scale : 0,
          textAlign: "center",
          transitionDuration: "1s",
        }}
      >
        {openingInputName && <Opening openingInputName={openingInputName} />}
      </div>
      {children}
    </div>
  );
};

const numberToString = (value: number) => (value ? value.toFixed(0) : "");
const Input = ({
  value,
  setValue,
  name,
  style,
  min = 0,
  max = 10000,
  yellow,
}: {
  value: number;
  setValue: (n: number) => void;
  name: string;
  style: CSSProperties;
  min?: number;
  max?: number;
  yellow?: boolean;
}) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [val, setVal] = useState(numberToString(value));
  const delayedSetValue = (val: number) => {
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        setValue(val);
      }, 1000)
    );
  };
  useEffect(() => {
    setVal(numberToString(value));
  }, [value]);

  return (
    <input
      name={name}
      min={min}
      max={max}
      type="number"
      value={val}
      onChange={(e) => {
        setVal(e.target.value);
        delayedSetValue(Number(e.target.value));
      }}
      style={{
        background: yellow ? "#fff87a" : undefined,
        position: "absolute",
        width: 80,
        padding: `0 5px`,
        margin: 0,
        transform: `translate(${style.left === P50 || style.right === P50 ? "-50%" : "0"}, ${
          style.top === P50 || style.bottom === P50 ? "-50%" : "0"
        })`,
        ...style,
      }}
    />
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

const useMultipleValues = (initialValues: number[]) => {
  const [values, setValues] = useState(initialValues);
  const [lastEdit, setLastEdit] = useState<Record<number, Date>>(Object.fromEntries(initialValues.map((_, i) => [i, new Date()])));

  const set = (newValue: number, index: number) => {
    let oldestEditId: number | null = null;
    Object.entries(lastEdit)
      .filter(([id]) => Number(id) !== index)
      .forEach(([id, date]) => {
        if (oldestEditId === null || date < lastEdit[oldestEditId]) oldestEditId = Number(id);
      });

    const diff = newValue - values[index];
    const newOldestValue = values[oldestEditId!] - diff;

    setValues(
      values.map((val, i) => {
        if (i === oldestEditId) return newOldestValue;
        if (i === index) return newValue;
        return val;
      })
    );
    setLastEdit({ ...lastEdit, [index]: new Date() });
  };
  const setTotal = (newTotal: number) => {
    const getPercentage = (width: number) => (width && total ? width / total : 1 / values.length);
    const newValues = values.map((value) => getPercentage(value) * newTotal);
    setValues(newValues);
  };
  const total = values.reduce((a, b) => a + b, 0);

  return { values, set, total, setTotal };
};

export const UheOsaline = ({ w = 1000, h = 1000, opening = "window-opening" }: { w?: number; h?: number; opening?: string }) => {
  const [width, setWidth] = useState(w);
  const [height, setHeight] = useState(h);
  const scale = useScale([height], [width]);

  return (
    <Panel openingInputName={opening} width={width} height={height} scale={scale}>
      <Input name="width" value={width} yellow setValue={setWidth} style={{ bottom: POSITION, left: P50 }} />
      <Input name="height" value={height} yellow setValue={setHeight} style={{ left: POSITION, top: P50 }} />
    </Panel>
  );
};

export const KaheOsaline = () => {
  const {
    values: [widthLeft, widthRight],
    set,
    setTotal,
    total: width,
  } = useMultipleValues([1000, 1000]);
  const [height, setHeight] = useState(1000);
  const scale = useScale([height], [width]);

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Panel openingInputName="opening-left" width={widthLeft} height={height} scale={scale}>
        <Input name="width-left" value={widthLeft} setValue={(v) => set(v, 0)} style={{ bottom: POSITION, left: P50 }} />
      </Panel>
      <Panel openingInputName="opening-right" width={widthRight} height={height} scale={scale}>
        <Input name="width-right" value={widthRight} setValue={(v) => set(v, 1)} style={{ bottom: POSITION, left: P50 }} />
        <Input name="height" yellow value={height} setValue={setHeight} style={{ left: POSITION, top: P50 }} />
      </Panel>
      <Input name="width" yellow value={width} setValue={setTotal} style={{ top: POSITION, left: P50 }} />
    </div>
  );
};

export const KolmeOsaline = () => {
  const {
    values: [widthLeft, widthCenter, widthRight],
    set,
    setTotal,
    total,
  } = useMultipleValues([1000, 1000, 1000]);
  const [height, setHeight] = useState(1000);

  const scale = useScale([height], [total]);

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Panel openingInputName="opening-left" width={widthLeft} height={height} scale={scale}>
        <Input name="width-left" value={widthLeft} setValue={(value) => set(value, 0)} style={{ bottom: POSITION, left: P50 }} />
      </Panel>
      <Panel openingInputName="opening-center" width={widthCenter} height={height} scale={scale}>
        <Input name="width-center" value={widthCenter} setValue={(value) => set(value, 1)} style={{ bottom: POSITION, left: P50 }} />
      </Panel>
      <Panel openingInputName="opening-right" width={widthRight} height={height} scale={scale}>
        <Input name="width-right" value={widthRight} setValue={(value) => set(value, 2)} style={{ bottom: POSITION, left: P50 }} />
        <Input name="height" yellow value={height} setValue={setHeight} style={{ left: POSITION, top: P50 }} />
      </Panel>
      <Input name="width" yellow value={total} setValue={(newWidth) => setTotal(newWidth)} style={{ top: POSITION, left: P50 }} />
    </div>
  );
};

export const NeljaOsaline = () => {
  const {
    values: [widthFirst, widthSecond, widthThird, widthFourth],
    set,
    setTotal,
    total: width,
  } = useMultipleValues([500, 500, 500, 500]);
  const [height, setHeight] = useState(500);
  const scale = useScale([height], [width]);

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Panel openingInputName="opening-first" width={widthFirst} height={height} scale={scale}>
        <Input name="width-first" value={widthFirst} setValue={(v) => set(v, 0)} style={{ bottom: POSITION, left: P50 }} />
      </Panel>
      <Panel openingInputName="opening-second" width={widthSecond} height={height} scale={scale}>
        <Input name="width-second" value={widthSecond} setValue={(v) => set(v, 1)} style={{ bottom: POSITION, left: P50 }} />
      </Panel>
      <Panel openingInputName="opening-third" width={widthThird} height={height} scale={scale}>
        <Input name="width-third" value={widthThird} setValue={(v) => set(v, 2)} style={{ bottom: POSITION, left: P50 }} />
      </Panel>
      <Panel openingInputName="opening-fourth" width={widthFourth} height={height} scale={scale}>
        <Input name="width-fourth" value={widthFourth} setValue={(v) => set(v, 3)} style={{ bottom: POSITION, left: P50 }} />
        <Input name="height" yellow value={height} setValue={setHeight} style={{ left: POSITION, top: P50 }} />
      </Panel>
      <Input name="width" yellow value={width} setValue={setTotal} style={{ top: POSITION, left: P50 }} />
    </div>
  );
};

// export const AknadMolemalPool = () => {
//   const [widthLeft, setWidthLeft] = useState(1000);
//   const [doorWidth, setDoorWidth] = useState(1000);
//   const [widthRight, setWidthRight] = useState(1000);
//   const [heightLeft, setHeightLeft] = useState(1000);
//   const [heightDoor, setHeightDoor] = useState(2000);
//   const [heightRight, setHeightRight] = useState(1000);
//   const scale = useScale([Math.max(heightDoor, heightLeft, heightRight)], [widthLeft, doorWidth, widthRight]);

//   return (
//     <div style={{ position: "relative", display: "flex", alignItems: "start" }}>
//       <Panel openingInputName="opening-left" width={widthLeft} height={heightLeft} scale={scale}>
//         <Input name="width-left" value={widthLeft}  setValue={setWidthLeft} style={{ bottom: POSITION, left: P50 }} />
//         <Input name="height-left" max={heightDoor} value={heightLeft}  setValue={setHeightLeft} style={{ right: POSITION, top: P50 }} />
//       </Panel>
//       <Panel openingInputName="opening-door" width={doorWidth} height={heightDoor} scale={scale}>
//         <Input name="door-width" value={doorWidth}  setValue={setDoorWidth} style={{ bottom: POSITION, left: P50 }} />
//         <Input name="door-height" value={heightDoor}  setValue={setHeightDoor} style={{ bottom: POSITION, left: P50 }} />
//       </Panel>
//       <Panel openingInputName="opening-right" width={widthRight} height={heightRight} scale={scale}>
//         <Input name="width-right" value={widthRight}  setValue={setWidthRight} style={{ bottom: POSITION, left: P50 }} />
//         <Input
//           name="height-right"
//           max={heightDoor}
//           value={heightRight}
//
//           setValue={setHeightRight}
//           style={{ left: POSITION, top: P50 }}
//         />
//       </Panel>
//     </div>
//   );
// };

export const RoduPoolKlaas = () => {
  const {
    values: [heightTop, heightBottom],
    set,
    setTotal,
    total: height,
  } = useMultipleValues([1000, 1000]);
  const [width, setWidth] = useState(1000);
  const scale = useScale([height], [width]);
  return (
    <div style={{ position: "relative" }}>
      <Panel width={width} height={heightTop} scale={scale}>
        <Input name="width" yellow value={width} setValue={setWidth} style={{ bottom: POSITION, left: P50 }} />
        <Input name="height-top" value={heightTop} setValue={(v) => set(v, 0)} style={{ left: POSITION, top: P50 }} />
      </Panel>
      <Panel filled width={width} height={heightBottom} scale={scale}>
        <Input name="height-bottom" value={heightBottom} setValue={(v) => set(v, 1)} style={{ left: POSITION, top: P50 }} />
      </Panel>
      <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
        <Opening openingInputName="window-opening" />
      </div>
      <Input name="height" yellow value={height} setValue={setTotal} style={{ right: POSITION, top: P50 }} />
    </div>
  );
};

export const Rodu = () => {
  return (
    <div style={{ position: "relative" }}>
      <UheOsaline h={2000} opening={"not needed"} />
      <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
        <Opening openingInputName="window-opening" />
      </div>
    </div>
  );
};

export const UksPlussKaks = () => {
  const [height, setHeight] = useState(2800);
  const [width, setWidth] = useState(2000);
  const [heightTop, setHeightTop] = useState(800);
  const [heightBottom, setHeightBottom] = useState(2000);
  const [widthLeft, setWidthLeft] = useState(1000);
  const [widthRight, setWidthRight] = useState(1000);
  const scale = useScale([height], [width]);
  const actualWidthLeft = (widthLeft / (widthLeft + widthRight)) * width;
  const actualWidthRight = (widthRight / (widthLeft + widthRight)) * width;
  const actualHeightTop = (heightTop / (heightTop + heightBottom)) * height;
  const actualHeightBottom = (heightBottom / (heightTop + heightBottom)) * height;
  return (
    <div style={{ position: "relative" }}>
      <Panel openingInputName="opening-top" width={width} height={actualHeightTop} scale={scale}>
        <Input name="height-top" value={heightTop} setValue={setHeightTop} style={{ left: POSITION, top: P50 }} />
      </Panel>
      <div style={{ display: "flex" }}>
        <Panel openingInputName="opening-left" width={actualWidthLeft} height={actualHeightBottom} scale={scale}>
          <Input name="width-left" value={widthLeft} setValue={setWidthLeft} style={{ top: POSITION, left: P50 }} />
        </Panel>
        <Panel openingInputName="opening-right" width={actualWidthRight} height={actualHeightBottom} scale={scale}>
          <Input name="width-right" value={widthRight} setValue={setWidthRight} style={{ top: POSITION, left: P50 }} />
          <Input name="height-bottom" value={heightBottom} setValue={setHeightBottom} style={{ left: POSITION, top: P50 }} />
        </Panel>
      </div>
      <Input name="height" yellow value={height} setValue={setHeight} style={{ right: POSITION, top: P50 }} />
      <Input name="width" yellow value={width} setValue={setWidth} style={{ bottom: POSITION, left: P50 }} />
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
//         <Input name="window-width" value={windowWidth}  setValue={setWindowWidth} style={{top: -49, left: P50 }} />
//         <Input
//           name="window-height"
//           max={doorHeight}
//           value={windowHeight}
//
//           setValue={setWindowHeight}
//           style={{ left: -50, top: P50 }}
//         />
//       </Panel>
//       <Panel name="window-right" width={doorWidth} height={doorHeight} scale={scale}>
//         <Input name="door-width" value={doorWidth}  setValue={setDoorWidth} style={{top: -49, left: P50 }} />
//         <Input name="door-height" value={doorHeight}  setValue={setDoorHeight} style={{ right: -110, top: P50 }} />
//       </Panel>
//     </div>
//   );
// };

export const ParemalAknaga = () => {
  const [width, setWidth] = useState(2000);
  const [doorWidth, setDoorWidth] = useState(1000);
  const [doorHeight, setDoorHeight] = useState(2000);
  const [windowWidth, setWindowWidth] = useState(1000);
  const [windowHeight, setWindowHeight] = useState(1000);
  const scale = useScale([doorHeight], [width]);

  const realWindowWidth = (windowWidth / (windowWidth + doorWidth)) * width;
  const realDoorWidth = (doorWidth / (windowWidth + doorWidth)) * width;
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "start" }}>
      <div style={{ position: "relative" }}>
        <Panel width={realDoorWidth} height={doorHeight} scale={scale}>
          <Input name="door-width" value={doorWidth} setValue={setDoorWidth} style={{ top: POSITION, left: P50 }} />
          <Input name="door-height" value={doorHeight} setValue={setDoorHeight} style={{ right: POSITION, top: P50 }} />
        </Panel>
        <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
          <Opening openingInputName="door-opening" />
        </div>
      </div>
      <Panel openingInputName="window-opening" width={realWindowWidth} height={windowHeight} scale={scale}>
        <Input name="window-width" value={windowWidth} setValue={setWindowWidth} style={{ top: POSITION, left: P50 }} />
        <Input name="window-height" max={doorHeight} value={windowHeight} setValue={setWindowHeight} style={{ left: POSITION, top: P50 }} />
      </Panel>
      <Input name="window" yellow value={width} setValue={setWidth} style={{ bottom: POSITION, left: P50 }} />
    </div>
  );
};

// export const RoduPoolKlaasAknadMolemalPool = () => {
//   const [widthLeft, setWidthLeft] = useState(1000);
//   const [doorWidth, setDoorWidth] = useState(1000);
//   const [widthRight, setWidthRight] = useState(1000);
//   const [heightLeft, setHeightLeft] = useState(1000);
//   const [heightDoor, setHeightDoor] = useState(1000);
//   const [heightDoorBottom, setHeightDoorBottom] = useState(1000);
//   const [heightRight, setHeightRight] = useState(1000);
//   const scale = useScale([Math.max(heightDoor + heightDoorBottom, heightLeft, heightRight)], [widthLeft, doorWidth, widthRight]);

//   return (
//     <div style={{ position: "relative", display: "flex", alignItems: "start" }}>
//       <Panel openingInputName="opening-left" width={widthLeft} height={heightLeft} scale={scale}>
//         <Input name="width-left" value={widthLeft}  setValue={setWidthLeft} style={{ bottom: POSITION, left: P50 }} />
//         <Input name="height-left" max={heightDoor} value={heightLeft}  setValue={setHeightLeft} style={{ right: POSITION, top: P50 }} />
//       </Panel>
//       <div style={{ position: "relative" }}>
//         <Panel openingInputName="opening-door" width={doorWidth} height={heightDoor} scale={scale}>
//           <Input name="door-width" value={doorWidth}  setValue={setDoorWidth} style={{ bottom: POSITION, left: P50 }} />
//           <Input name="door-height" value={heightDoor}  setValue={setHeightDoor} style={{ right: POSITION, top: P50 }} />
//         </Panel>
//         <Panel width={doorWidth} height={heightDoorBottom} scale={scale} filled>
//           <Input
//             name="door-bottom-height"
//             value={heightDoorBottom}
//
//             setValue={setHeightDoorBottom}
//             style={{ right: POSITION, top: P50 }}
//           />
//         </Panel>
//       </div>
//       <Panel openingInputName="opening-right" width={widthRight} height={heightRight} scale={scale}>
//         <Input name="width-right" value={widthRight}  setValue={setWidthRight} style={{ bottom: POSITION, left: P50 }} />
//         <Input
//           name="height-right"
//           max={heightDoor}
//           value={heightRight}
//
//           setValue={setHeightRight}
//           style={{ left: POSITION, top: P50 }}
//         />
//       </Panel>
//     </div>
//   );
// };

export const RoduPoolKlaasAknaga = () => {
  const [width, setWidth] = useState(2000);
  const [doorWidth, setDoorWidth] = useState(1000);
  const [doorHeight, setDoorHeight] = useState(1000);
  const [heightDoorBottom, setHeightDoorBottom] = useState(1000);
  const [windowWidth, setWindowWidth] = useState(1000);
  const [windowHeight, setWindowHeight] = useState(1000);
  const scale = useScale([doorHeight, heightDoorBottom], [width]);
  const realWindowWidth = (windowWidth / (windowWidth + doorWidth)) * width;
  const realDoorWidth = (doorWidth / (windowWidth + doorWidth)) * width;

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "start" }}>
      <div style={{ position: "relative" }}>
        <Panel width={realDoorWidth} height={doorHeight} scale={scale}>
          <Input name="door-height" value={doorHeight} setValue={setDoorHeight} style={{ right: POSITION, top: P50 }} />
        </Panel>
        <Panel width={realDoorWidth} height={heightDoorBottom} scale={scale} filled>
          <Input name="door-bottom-height" value={heightDoorBottom} setValue={setHeightDoorBottom} style={{ right: POSITION, top: P50 }} />
        </Panel>
        <Input name="door-width" value={doorWidth} setValue={setDoorWidth} style={{ top: POSITION, left: P50 }} />
        <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
          <Opening openingInputName="door-opening" />
        </div>
      </div>
      <Panel openingInputName="window-opening" width={realWindowWidth} height={windowHeight} scale={scale}>
        <Input name="window-width" value={windowWidth} setValue={setWindowWidth} style={{ top: POSITION, left: P50 }} />
        <Input name="window-height" max={doorHeight} value={windowHeight} setValue={setWindowHeight} style={{ left: POSITION, top: P50 }} />
      </Panel>
      <Input name="width" yellow value={width} setValue={setWidth} style={{ bottom: POSITION, left: P50 }} />
    </div>
  );
};
