const Product = require('./Product')

Product.deleteMany()
  .then(() => {
  console.log('Wiped products!')
})
  .catch((error) => {
  console.log('Unable to delete products!', error)
})

Store.deleteMany()
  .then(() => {
  console.log('Wiped stores!')
})
  .catch((error) => {
  console.log('Unable to delete stores!', error)
})
