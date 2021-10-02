import React from "react";
import "./Widget.css";

export type Props = {
  name: string;
  data: string;
  average: string;
};

const Widget: React.FC<Props> = (props) => {
  const { name, data, average } = props;

  return (
    <div className={"widget"}>
      <span className={"name"}>{name}</span>
      <span className={"data"}>{data}</span>
      <span className={"average"}>
        <b className={"bolder"}>{average}</b>
        <small>% since last month</small>
      </span>
    </div>
  );
};

export default Widget;
