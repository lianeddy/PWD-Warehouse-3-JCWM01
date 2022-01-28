import React from "react";
import { Table } from "react-bootstrap";

import { URL_API } from "../../../helper";

class TableCl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>NO</th>
            {Array.from({ length: 5 }).map((_, index) => (
              <th key={index}>s</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            {Array.from({ length: 5 }).map((_, index) => (
              <td key={index}>
                <img src={this.props.image} height={100} width={100} />
              </td>
            ))}
          </tr>
          <tr>
            <td>2</td>
            {Array.from({ length: 5 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            <td>3</td>
            {Array.from({ length: 5 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default TableCl;
