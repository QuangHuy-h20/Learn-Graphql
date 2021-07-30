const express = require("express");

const { ApolloServer } = require("apollo-server-express");

const mongoose = require("mongoose");

//Load schema & resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

//Load db methods
const dataSource = require("./data/db");

//Connect to mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nikolai:12345@cluster0.7exed.mongodb.net/graphql?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ dataSource }),
  });
  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

  return { server, app };
}

startApolloServer();
