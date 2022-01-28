import React from "react";
import { Table, Button, InputGroup } from "react-bootstrap";

import { URL_API } from "../../../helper";

class TableCl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table responsive>
        {/* {Object.keys(...this.props.data).map((judul) => (
          <thead>
            <tr>
              <th>{judul}</th>
            </tr>
          </thead>
        ))} */}
        <tbody>
          {this.props.data.map((value) => (
            <tr>
              <td>
                <img src={URL_API + value.URL} height={90} width={90} />
              </td>
              <td>{value.ITEM}</td>
              {/* <td>{value.QTY}</td> */}
              <td>
                <InputGroup className="mb-3">
                  <Button variant="outline-secondary" id="button-addon1">
                    -
                  </Button>
                  <input placeholder={value.QTY} />
                  <Button variant="outline-secondary" id="button-addon1">
                    +
                  </Button>
                </InputGroup>
              </td>
              <td>{value.PRICE}$</td>
              <td>{value.TOTAL}$</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default TableCl;
