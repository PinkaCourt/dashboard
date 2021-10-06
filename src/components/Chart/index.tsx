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

  React.useEffect(() => {
    const { current } = canvasRef;
    const ctx = current && current.getContext("2d");

    if (ctx == null) {
      return;
    }

    ctx.fillStyle = "black";
    ctx.lineWidth = 4;
    ctx.textAlign = "end";

    toGraf(ctx, dragons, height);

    ctx.fillStyle = "#333";
    ctx.font = 'bold 24px "Roboto Mono"';

    axisY.map((e, i) => ctx.fillText(e, INDENT, steps.y * (i + 1)));
    axisX.map((e, i) =>
      ctx.fillText(e, steps.x * (i + 1), steps.y * axisY.length)
    );

    ctx.fillStyle = "#666666";
    ctx.font = 'normal 24px "Roboto Mono"';
    ctx.textAlign = "start";
    ctx.fillText("DRAGONS", INDENT, INDENT);
  }, [axisX, dragons, height, width, steps, toGraf]);

  return (
    <div className="chart" ref={containerRef}>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default Chart;
