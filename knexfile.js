module.exports = {

  development: {
    client: 'pg',
    connection: 'postgress://localhost/jetfuel',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    }
  },

  production: {
  client: 'pg',
  connection: process.env.DATABASE_URL + `?ssl=true`,
  migrations: {
    directory: './db/migrations'
  },
  useNullAsDefault: true
}

};
