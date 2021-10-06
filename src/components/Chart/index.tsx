import React from "react";
import { useSelector } from "react-redux";

import { selectAverageData } from "store/selectors";
import { Dragon } from "store/types";
import "./Chart.css";

const STEP = 10;
const INDENT = 4 * STEP;
const DAYS = 31;
const axisY = ["20", "10", "0"];

const Chart = () => {
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [steps, setSteps] = React.useState({ x: 0, y: 0 });

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const dragons = useSelector(selectAverageData);

  const x = dragons.reduce(
    (accumulator, currentValue) => accumulator.add(String(currentValue.month)),
    new Set() as Set<string>
  );

  const axisX = Array.from(x);

  const toGraf = React.useCallback(
    (ctx: CanvasRenderingContext2D, array: Dragon[], height: number) => {
      const dayStep = steps.x / DAYS;
      const axisXpos = height - INDENT;

      ctx.beginPath();

      array.reduce((accumulator, currentValue) => {
        ctx.lineTo(accumulator, axisXpos - (currentValue.ds * steps.y) / STEP);
        return (accumulator += dayStep);
      }, INDENT + array[0].day * dayStep);

      ctx.stroke();
      ctx.closePath();
    },
    [steps]
  );

  React.useEffect(() => {
    const { current } = canvasRef;
    const ctx = current && current.getContext("2d");

    if (ctx == null) {
      return;
    }

    const Y = [
      { text: "20", x: 40, y: 1 * 80 + 60 },
      { text: "10", x: 40, y: 2 * 80 + 60 },
      { text: "0", x: 40, y: 3 * 80 + 60 },
    ];

    ctx.fillStyle = "black";
    ctx.lineWidth = 5.0;
    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    ctx.moveTo(0, height);
    ctx.lineTo(width, height);
    ctx.stroke();
    ctx.closePath();
    //конец осей
    toGraf(ctx, dragons, height);
    Y.map((e) => ctx.fillText(e.text, e.x, e.y));

    // стилизуем надпись
    ctx.fillStyle = "#666666";
    ctx.font = 'normal 24px "Roboto Mono"';
    ctx.fillText("CLIENTS", INDENT, INDENT);
  }, [dragons, height, width]);

  React.useEffect(() => {
    const { current } = containerRef;

    if (current == null) {
      return;
    }

    const { height, width } = current.getBoundingClientRect();

    setHeight(height);
    setWidth(width);

    const X = (width - INDENT) / 4;
    const Y = (height - INDENT) / 3;

    setSteps({ x: X, y: Y });
  }, [containerRef]);

  return (
    <div className="chart" ref={containerRef}>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default Chart;
