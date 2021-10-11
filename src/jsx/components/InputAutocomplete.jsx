import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";

const InputAutocomplete = ({
  optionsProps = [],
  onChange = () => {},
  placeholder = "",
  handleSearch = () => {},
  label = "",
  isLoading = false,
  id = "",
  renderMenuItemChildren = (option, props) => <></>,
  labelKey = () => {},
  smLabel = "12",
  mdLabel = "3",
  lgLabel = "4",
  smAsync = "12",
  mdAsync = "6",
  lgAsync = "6",
}) => {
  // const handleChange = (selectedOptions) => {
  //   console.log("handleChange");
  //   console.log(selectedOptions);
  // };

  const filterBy = () => true;

  return (
    <>
      <Form.Group as={Row} className="mb-3">
        <Form.Label
          column
          sm={smLabel}
          md={mdLabel}
          lg={lgLabel}
          className="text-end"
        >
          {label}
        </Form.Label>
        <Col sm={smAsync} md={mdAsync} lg={lgAsync}>
          <AsyncTypeahead
            filterBy={filterBy}
            id={id}
            isLoading={isLoading}
            labelKey={labelKey}
            minLength={3}
            onSearch={handleSearch}
            options={optionsProps}
            onChange={onChange}
            placeholder={placeholder}
            renderMenuItemChildren={renderMenuItemChildren}
            // style={{ paddingLeft: "1%" }}
          />
        </Col>
      </Form.Group>
    </>
  );
};

export default InputAutocomplete;
