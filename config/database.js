module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5656),
        database: env("DATABASE_NAME", "example_project_2_db"),
        username: env("DATABASE_USERNAME", "postgres"),
        password: env("DATABASE_PASSWORD", "zxcvbnasdfgh"),
        schema: env("DATABASE_SCHEMA", "public"), // Not Required
        ssl: false
      },
      options: {}
    }
  }
});
