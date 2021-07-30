const { books, authors } = require("../data/static");

const resolves = {
  //QUERY
  Query: {
    books: async (parent, args, { dataSource }) =>
      await dataSource.getAllBooks(),
    book: async (parent, { id }, { dataSource }) =>
      await dataSource.getBookById(id),
    authors: async (parent, args, { dataSource }) =>
      await dataSource.getAllAuthors(),
    author: async (parent, { id }, { dataSource }) =>
      await dataSource.getAuthorById(id),
  },
  Book: {
    author: async ({ authorId }, args, { dataSource }) =>
      await dataSource.getAuthorById(authorId),
  },
  Author: {
    books: async ({ id }, args, { dataSource }) =>
      await dataSource.getAllBooks({ authorId: id }),
  },

  //MUTATION
  Mutation: {
    createAuthor: async (parent, args, { dataSource }) =>
      await dataSource.createAuthor(args),
    createBook: async (parent, args, { dataSource }) =>
      await dataSource.createBook(args),
  },
};

module.exports = resolves;
