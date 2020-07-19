import React from "react";
import Cell from "../Cell/cell";

const Row = props => {
  let cellsData = props.cellsData.map((data, index) => (
    <Cell data={data} enableDiableFlag={props.enableDiableFlag} key={index} onCellClicked={props.onCellClicked}  />
  ));
  return <div className="row">{cellsData}</div>;
};

export default Row;
