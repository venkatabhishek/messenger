const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const database = mongoose
  .connect(process.env.DATABASE_URL, options)
  .then(() => console.log('Connected to database.'))
  .catch(() => console.error('Error connecting to database'));

module.exports = database;
