import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useQuery, useMutation } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { addSingleBook } from "../graphql-client/mutations";

const BookForm = () => {
  //state
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  //Graphql operations
  const { loading, error, data } = useQuery(getAuthors);

  const [addBook, dataMutation] = useMutation(addSingleBook);

  const { name, genre, authorId } = newBook;
  
  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooks }],
    });
    setNewBook({ name: "", genre: "", authorId: "" });
  };

    // console.log(dataMutation);

  return (
    <Fragment>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Book name"
          name="name"
          onChange={handleChange}
          value={newBook.name}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Book genre"
          name="genre"
          onChange={handleChange}
          value={newBook.genre}
        />
      </Form.Group>
      <Form.Group>
        {loading ? (
          <p>Loading authors...</p>
        ) : (
          <>
            <Form.Control
              as="select"
              name="authorId"
              onChange={handleChange}
              value={newBook.authorId}
            >
              <option value="" disabled>
                Select author
              </option>
              {data.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </Form.Control>
          </>
        )}
      </Form.Group>
      <Button className="float-right" variant="info" type="submit">
        Add Book
      </Button>
    </Form>
    </Fragment>
  );
};

export default BookForm;
