import React from "react";
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
class TranTable extends React.Component {
  render() {
    const columns = [
      { name: "Name", field: "username" },
      { name: "Units", field: "Units" },
      { name: "Billed", field: "Billed" },
      { name: "Green", field: "Green" },
      { name: "Yellow", field: "Yellow" },
      { name: "Red", field: "Red" },
      
      { name: "BGYR", field: "BGYR" },
      { name: "$Billed", field: "pBilled" },
      { name: "$Green", field: "pGreen" },
      { name: "$Yellow", field: "pYellow" },
      { name: "$Red", field: "pRed" },
    ];

  

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      rowsPerPage:10,
      selectableRows: false,
      showSelectedRowsToolbar:false
    };

    return (
      <MaterialDatatable
        title={"Sales"}
        data={this.props.data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default TranTable;
