const { ApolloServer } = require('apollo-server');


const server = new ApolloServer({

  context: () => ({
  
  })
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(` Server ready ${url}`);
}); 