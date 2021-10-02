import React from "react";
import { useSelector } from "react-redux";

import { lastDatas, monthlyData } from "store/selectors";
import Widget from "components/Widget";
import Chart from "components/Chart";
import "./Content.css";

const toNormalize = (value: string) => {
  return parseFloat(value).toFixed(2);
};

const toAverage = (data: string[]) => {
  const { length } = data;
  const sum = data.reduce((acc, value) => acc + parseFloat(value), 0);
  const average = (sum / length).toFixed(2);

  return average;
};

const Content = () => {
  const lastData = useSelector(lastDatas);
  const lastMonthlyData = useSelector(monthlyData);

  if (!lastData) {
    return null;
  }

  const widgets = [
    {
      name: "dragons, nou",
      data: toNormalize(lastData.ds),
      average: toAverage(lastMonthlyData.map((e) => e.ds)),
    },
    {
      name: "dungeons, un",
      data: toNormalize(lastData.ans),
      average: toAverage(lastMonthlyData.map((e) => e.ans)),
    },
    {
      name: "wizards, %",
      data: toNormalize(lastData.wtl),
      average: toAverage(lastMonthlyData.map((e) => e.wtl)),
    },
  ];

  return (
    <div className={"content_container"}>
      {widgets.map((widget) => (
        <Widget
          key={widget.name}
          name={widget.name}
          data={widget.data}
          average={widget.average}
        />
      ))}
      <Chart />
    </div>
  );
};

export default Content;
