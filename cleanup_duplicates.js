
const Datastore = require('nedb');
const usersDB = new Datastore({ filename: './data/users.db', autoload: true });

usersDB.find({}).sort({ createdAt: 1 }).exec((err, users) => {
  if (err) return console.error('Failed to load users:', err);

  const seen = {};
  const toRemove = [];

  users.forEach(user => {
    if (seen[user.email]) {
      toRemove.push(user._id);
    } else {
      seen[user.email] = true;
    }
  });

  if (toRemove.length > 0) {
    usersDB.remove({ _id: { $in: toRemove } }, { multi: true }, (err, count) => {
      if (err) return console.error('Failed to remove duplicates:', err);
      console.log(`✅ Removed ${count} duplicate users.`);
    });
  } else {
    console.log('🎉 No duplicate users found.');
  }
});
