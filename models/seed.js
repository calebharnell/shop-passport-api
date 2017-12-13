const Product = require('./Product')
const Store = require('./Store')

Product.create([
  { brandName: 'Coca Cola', name: '390ml Glass Bottle Coke' },
  { brandName: 'Coca Cola', name: '390ml Glass Bottle Fanta' },
  { brandName: 'Coca Cola', name: '390ml Glass Bottle Sprite' },
])
  .then((products) => {
  console.log('Created!', products)
})
  .catch((error) => {
  console.log('Unable to seed products!', error)
})

Store.create([
  { storeName: 'Brisbane CBD', location: 'Adelaide Street' },
  { storeName: 'Newstead', location: 'Skyring Terrace' },
  { storeName: 'Southbank', location: 'Grey Street' },
])
  .then((stores) => {
  console.log('Created!', stores)
})
  .catch((error) => {
  console.log('Unable to seed stores!', error)
})
