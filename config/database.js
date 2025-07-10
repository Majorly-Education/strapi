const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  const connections = {
    postgres: {
      connection: {
        // connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', '10.0.3.5'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'majorly'),
        user: env('DATABASE_USERNAME', 'majorly'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
          },
        schema: env('DATABASE_SCHEMA', 'content'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    }
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
