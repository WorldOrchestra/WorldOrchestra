var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'test'
    },
    port: 3000,
    db: 'mongodb://localhost/test-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'test'
    },
    port: 3000,
    db: 'mongodb://localhost/test-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'test'
    },
    port: 3000,
    db: 'mongodb://localhost/test-production'
  }
};

module.exports = config[env];
