import React, { Component } from "react";
import HeadContainer from "./components/HeadContainer/headSection";
import Table from "./components/Table/table";

class App extends Component {
  constructor() {
    super();

    this.state = {
      gameStatus: "waiting", // can be running, waiting, or ended
      time: 0, // in seconds, will format later
      flagCount: 10,
      numberofCellsClicked: 0,
      mines: 10,
      rows: 10,
      columns: 10
    };

    this.baseState = this.state;
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.gameStatus === "running") {
      this.checkForWinner();
    }
  }
  

  checkForWinner = () => {
    if (this.state.mines + this.state.numberofCellsClicked >= this.state.rows * this.state.columns) {
      this.setState({
        gameStatus: "winner"
      }, alert("you won!"))
    }
  }

  componentWillMount() {
    this.intervals = [];
  }

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  };

  reset = () => {
    this.intervals.map(clearInterval);
    this.setState(Object.assign({}, this.baseState), () => {
      this.intervals = [];
    });
  };

  tick = () => {
    if (this.state.numberofCellsClicked > 0 && this.state.gameStatus === "running") {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  };

  endGame = () => {
    this.setState({
      gameStatus: "ended"
    });
  };

  changeFlagAmount = amount => {
    this.setState({ flagCount: this.state.flagCount + amount });
  };

  handleCellClick = () => {
    if (this.state.numberofCellsClicked === 0 && this.state.gameStatus !== "running") {
      this.setState(
        {
          gameStatus: "running"
        },
        this.setInterval(this.tick, 1000)
      );
    }
    this.setState(prevState => {
      return { numberofCellsClicked: prevState.numberofCellsClicked + 1 };
    });
  };

  render() {
    return (
      <div className="minesweeper">
        <h1>My minesweeper.</h1>
        <HeadContainer
          time={this.state.time}
          flagsUsed={this.state.flagCount}
          reset={this.reset}
          status={this.state.gameStatus}
        />
        <Table
          numberofCellsClicked={this.state.numberofCellsClicked}
          mines={this.state.mines}
          rows={this.state.rows}
          columns={this.state.columns}
          endGame={this.endGame}
          status={this.state.gameStatus}
          onCellClick={this.handleCellClick}
          changeFlagAmount={this.changeFlagAmount}
        />
      </div>
    );
  }
}

export default App;
