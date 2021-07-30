import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useMutation } from "@apollo/client";
import { getAuthors } from "../graphql-client/queries";
import { addSingleAuthor } from "../graphql-client/mutations";

const AuthorForm = () => {
  //state
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    age: "",
  });

  //Graphql operations

  const [addAuthor, dataMutation] = useMutation(addSingleAuthor);

  const { name, age } = newAuthor;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewAuthor({
      ...newAuthor,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAuthor({
      variables: {
        name,
        age: parseInt(age),
      },
      refetchQueries: [{ query: getAuthors }],
    });
    setNewAuthor({ name: "", age: "" });
  };


  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="invisible">
          <Form.Control />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Author name"
            name="name"
            onChange={handleChange}
            value={name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            placeholder="Author age"
            name="age"
            onChange={handleChange}
            value={age}
          />
        </Form.Group>
        <Button className="float-right" variant="info" type="submit">
          Add Author
        </Button>
      </Form>
    </>
  );
};

export default AuthorForm;
