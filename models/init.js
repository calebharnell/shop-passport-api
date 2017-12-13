const mongoose = require('mongoose')

// Use the promise functionality built into Node
mongoose.Promise = global.Promise

mongoose.connect(`mongodb://process.ENV.DB_USER:process.ENV.DB_PASSWORD@ds161443.mlab.com:61443/shop-passport`, { useMongoClient: true })
  .then(() => {
    console.log('Succesfully connected to database')
  })
  .catch((error) => {
    // Something went wrong
    console.log('Error connecting to MongoDB database', error)
  })

module.exports = mongoose;
