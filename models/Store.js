const mongoose = require('./init');

const Store = mongoose.model('Store', {
  storeName: String,
  location: String
});

module.exports = Store;
