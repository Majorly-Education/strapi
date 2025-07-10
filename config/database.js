const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const sharedPool = {
    min: env.int('DATABASE_POOL_MIN', 1),    // drop to 1 in low-connection envs
    max: env.int('DATABASE_POOL_MAX', 3),    // raise only if your DB can handle it
  };

  const baseConfig = {
    acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 30000), // 30s
    pool: sharedPool,
  };

  const connections = {
    mysql: {
      connection: {
        host:     env('DATABASE_HOST', 'localhost'),
        port:     env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user:     env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl:      env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
          // key, cert, ca, etc. as before
        },
      },
    },

    postgres: {
      connection: env('DATABASE_URL') ?         // prefer DATABASE_URL
        env('DATABASE_URL') :
        {
          host:     env('DATABASE_HOST', 'localhost'),
          port:     env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'strapi'),
          user:     env('DATABASE_USERNAME', 'strapi'),
          password: env('DATABASE_PASSWORD', 'strapi'),
          ssl:      env.bool('DATABASE_SSL', false) && {
            rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
            // key, cert, ca, etc. as before
          },
          schema:   env('DATABASE_SCHEMA', 'public'),
        },
    },

    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      ...baseConfig,
    },
  };
};
