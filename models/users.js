const Datastore = require('nedb');
const path = require('path');

const db = new Datastore({ filename: path.join(__dirname, '../data/users.db'), autoload: true });

db.ensureIndex({ fieldName: 'email', unique: true }, function (err) {
  if (err) console.error('Index creation failed:', err);
});

module.exports = db;