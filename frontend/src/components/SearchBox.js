import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          name="Search"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search..."
          className="form-control me-sm-2 "
        ></Form.Control>
        <Button
          type="submit"
          variant="outline-info"
          className="btn-sm btn-secondary "
        >
          Search
        </Button>
      </Form>
    </>
  );
};

export default SearchBox;
