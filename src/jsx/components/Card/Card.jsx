import React from "react";
import { Card } from "react-bootstrap";

class CardCl extends React.Component {
  render() {
    return [
      //   "Primary",
      //   "Secondary",
      //   "Success",
      //   "Danger",
      //   "Warning",
      //   "Info",
      //   "Light",
      "Dark",
    ].map((variant, idx) => (
      <Card
        bg={variant.toLowerCase()}
        key={idx}
        text={variant.toLowerCase() === "light" ? "dark" : "white"}
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>{variant} Card Title </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Deleniti neque accusamus voluptates optio qui
            aliquam facere nobis! Quia accusamus ratione laborum culpa esse
            earum quod modi, soluta temporibus, aliquid delectus.
          </Card.Text>
        </Card.Body>
      </Card>
    ));
  }
}

export default CardCl;
