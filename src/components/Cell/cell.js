import React from "react";
import "./cell.css"

const Cell = props => {
  let cell = () => {
    if (props.data.cellClicked) {
      if (props.data.minePresent) {
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              // don't load that nasty context menu, flag it up instead :^)
              e.preventDefault();
            }}
            onClick={() => props.onCellClicked(props.data)}
          >
            <span><i className="mine"></i></span>
          </div>
        );
      } else if (props.data.count === 0) {
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              // don't load that nasty context menu, flag it up instead :^)
              e.preventDefault();
              props.enableDiableFlag(props.data);
            }}
            onClick={() => props.onCellClicked(props.data)}
          />
        );
      } else {
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              // don't load that nasty context menu, flag it up instead :^)
              e.preventDefault();
            }}
            onClick={() => props.onCellClicked(props.data)}
          >
            {props.data.count}
          </div>
        );
      }
    } else if (props.data.flagMarked) {
      return (
        <div
          className="cell"
          onContextMenu={e => {
            // don't load that nasty context menu, flag it up instead :^)
            e.preventDefault();
            props.enableDiableFlag(props.data);
          }}
          onClick={() => props.onCellClicked(props.data)}
        >
          <span><i className="flag"></i></span>
        </div>
      );
    } else {
      return (
        <div
          className="cell"
          onContextMenu={e => {
            // don't load that nasty context menu, flag it up instead :^)
            e.preventDefault();
            props.enableDiableFlag(props.data);
          }}
          onClick={() => props.onCellClicked(props.data)}
        />
      );
    }
  };
  return cell();
};

export default Cell;
