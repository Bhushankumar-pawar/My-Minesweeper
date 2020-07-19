import React, { Component } from "react";
import Row from "../Row/row";
import "./table.css"
import "../../styles/base.css"

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: this.createGrid(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.numberofCellsClicked > nextProps.numberofCellsClicked ||
      this.props.columns !== nextProps.columns
    ) {
      this.setState({
        tableData: this.createGrid(nextProps)
      });
    }
  }

  createGrid = props => {
    // create 2d grid for our table based off the number of columns and rows passed in from props
    let table = [];
    for (let i = 0; i < props.rows; i++) {
      table.push([]);
      for (let j = 0; j < props.columns; j++) {
        table[i].push({
          row_Index: i,
          col_Index: j,
          cellClicked: false,
          minePresent: false,
          flagMarked: false,
          count: 0
        });
      }
    }
    // after we create the table we gotta add our mines randomly!
    for (let k = 0; k < props.mines; k++) {
      let randomRowIndex = Math.floor(Math.random() * props.rows);
      let randomColIndex = Math.floor(Math.random() * props.columns);

      let cell = table[randomRowIndex][randomColIndex];

      if (cell.minePresent) {
        // if it already has a mine send it back one in the loop and go to another random cell
        k--;
      } else {
        cell.minePresent = true;
      }
    }
    return table;
  };
 

  onCellClicked = cell => {
    if (this.props.status === "ended") {
      return;
    }
    // first we need to find mines around it asynchronously. this is IMPORTANT, because we need to make sure we calculate the mines before anything else runs!!!
    let asyncCountMines = new Promise(resolve => {
      let mines = this.findMines(cell);
      resolve(mines);
    });

    asyncCountMines.then(numberOfMines => {
      let tableData = this.state.tableData;

      let current = tableData[cell.row_Index][cell.col_Index];

      if (current.minePresent && this.props.numberofCellsClicked === 0) {
        console.log("mine was on first click");
        let newRows = this.createGrid(this.props);
        this.setState({ tableData: newRows }, () => {
          this.onCellClicked(cell);
        });
      } else {
        if (!cell.flagMarked && !current.cellClicked) {
          this.props.onCellClick();

          current.cellClicked = true;
          current.count = numberOfMines;

          this.setState({ tableData });
          // now that we know its not a flag and its not a BOMB we should try to onCellClicked cells around it!
          if (!current.minePresent && numberOfMines === 0) {
            this.openNearBy(cell);
          }

          if (current.minePresent && this.props.numberofCellsClicked !== 0) {
            this.props.endGame();
          }
        }
      }
    });
  };

  findMines = cell => {
    let minesInProximity = 0;
    // look for mines in a 1 cell block around the chosen cell
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (cell.row_Index + i >= 0 && cell.col_Index + j >= 0) {
          if (
            cell.row_Index + i < this.state.tableData.length &&
            cell.col_Index + j < this.state.tableData[0].length
          ) {
            if (
              this.state.tableData[cell.row_Index + i][cell.col_Index + j].minePresent &&
              !(i === 0 && j === 0)
            ) {
              minesInProximity++;
            }
          }
        }
      }
    }
    return minesInProximity;
  };

   // create function to turn on and off flags
   enableDiableFlag = cell => {
    if (this.props.status === "ended") {
      return;
    }
    let tableData = this.state.tableData;

    cell.flagMarked = !cell.flagMarked;
    this.setState({ tableData });
    this.props.changeFlagAmount(cell.flagMarked ? -1 : 1);
  };

  openNearBy = cell => {
    let tableData = this.state.tableData;

    // we're gonna loop through each cell and onCellClicked cells one by one in each i around it until we find one with a mine in it
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (cell.row_Index + i >= 0 && cell.col_Index + j >= 0) {
          if (
            cell.row_Index + i < this.state.tableData.length &&
            cell.col_Index + j < this.state.tableData[0].length
          ) {
            if (
              !this.state.tableData[cell.row_Index + i][cell.col_Index + j].minePresent &&
              !tableData[cell.row_Index + i][cell.col_Index + j].cellClicked
            ) {
              this.onCellClicked(tableData[cell.row_Index + i][cell.col_Index + j]);
            }
          }
        }
      }
    }
  };

  render() {
    let tableData = this.state.tableData.map((cellsData, index) => (
      <Row
        cellsData={cellsData}
        onCellClicked={this.onCellClicked}
        enableDiableFlag={this.enableDiableFlag}
        key={index}
      />
    ));
    return <div className="table">{tableData}</div>;
  }
}

 
