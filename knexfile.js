module.exports = {

  development: {
    client: 'pg',
    connection: 'postgress://localhost/jetfuel',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    }
  }

};
