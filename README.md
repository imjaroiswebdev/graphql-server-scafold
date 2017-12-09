[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flt-square)](https://standardjs.com)

# graphql-server-scafold | GraphQL server for starting projects


Working GraphQL Server with complete data CRUD and subscriptions for using as scaffolding for basic to medium projects

This server is made on top raw graphql-js and has a connection to MongoDB for data CRUD persistency.

#### To start it...
```bash
$ export MONGODB_URI="mongodb://your-database-uri/port" && yarn start-dev
# OR JUST...
$ yarn start-dev
# SAME BUT WITH NPM...
$ npm run start-dev
```

### process.env Variables declared:
* __HOST__: For domain or ip of the server
* __PORT__: Self descriptive
* __MONGODB_URI__: url of database
* __NODE_ENV__: To control if Graphiql should be available


> Feel free to use it
