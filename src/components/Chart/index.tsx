import React from "react";
import { useSelector } from "react-redux";

import { selectAverageData } from "store/selectors";
import { Dragon } from "store/types";
import "./Chart.css";

const step = 10;

const initIndent = 80;
const initX = 2 * step;
const initY = 4 * step;

const toGraf = (
  ctx: CanvasRenderingContext2D,
  array: number[],
  height: number
) => {
  ctx.beginPath();
  ctx.moveTo(initIndent, height - initIndent);

  array.reduce((accumulator, currentValue) => {
    ctx.lineTo(accumulator, height - initIndent - currentValue);
    return (accumulator = accumulator + step);
  }, initIndent);

  ctx.stroke();
  ctx.closePath();
};

const Chart = () => {
  const [heightChart, setHeightChart] = React.useState(0);
  const [widthChart, setWidthChart] = React.useState(0);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const averageDatas = useSelector(selectAverageData);

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

    // начало рисования осей
    ctx.fillStyle = "black";
    ctx.lineWidth = 5.0;
    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.lineTo(0, heightChart);
    ctx.moveTo(0, heightChart);
    ctx.lineTo(widthChart, heightChart);
    ctx.stroke();
    ctx.closePath();
    //конец осей
    toGraf(
      ctx,
      averageDatas.map((e) => e.ds),
      heightChart
    );
    Y.map((e) => ctx.fillText(e.text, e.x, e.y));

    // стилизуем надпись
    ctx.fillStyle = "#666666";
    ctx.font = 'normal 24px "Roboto Mono"';
    ctx.fillText("CLIENTS", initX, initY);
  }, [averageDatas, heightChart, widthChart]);

  // определяем размер канваса по размеру контейнера
  React.useEffect(() => {
    const { current } = containerRef;

    if (current == null) {
      return;
    }

    const intViewportWidth = window.innerWidth;
    const intViewportHeight = window.innerHeight;
    console.log("intViewportWidth", intViewportWidth);
    console.log("intViewportHeight", intViewportHeight);
    const { height, width } = current.getBoundingClientRect();
    setHeightChart(height);
    setWidthChart(width);
  }, [containerRef]);

  return (
    <div className="chart" ref={containerRef}>
      <canvas ref={canvasRef} width={widthChart} height={heightChart} />
    </div>
  );
};

export default Chart;
