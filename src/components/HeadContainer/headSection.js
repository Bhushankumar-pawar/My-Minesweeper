import React from "react";
import PropTypes from "prop-types";
import "./headSection.css"

const HeadContainer = props => {
  let minutes = Math.floor(props.time / 60);
  let formattedSeconds = props.time - minutes * 60 || 0;

  formattedSeconds =
    formattedSeconds < 10 ? `0${formattedSeconds}` : formattedSeconds;
  let time = `${minutes}:${formattedSeconds}`;
  let status =
    props.status === "running" || props.status === "waiting" ? (
      <div className="happy" />
    ) : (
      <div className="sad" />
    );
  return (
    <div className="head-section">
      <div className="flag-count">{props.flagsUsed}</div>
      <button className="reset" onClick={props.reset}>
        {status}
      </button>
      <div className="timer">{time}</div>
    </div>
  );
};

HeadContainer.propTypes = {
  time: PropTypes.number.isRequired,
  flagsUsed: PropTypes.number.isRequired
};

export default HeadContainer;
