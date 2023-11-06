const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Datos de productos (simulados)
let products = [
  {
    id: 1,
    name: 'Sony WH-XB910N',
    price: 3499.99,
    image: 'https://m.media-amazon.com/images/I/51RWvYZ--aL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: 2,
    name: 'Sony WH-CH520',
    price: 972,
    image: 'https://m.media-amazon.com/images/I/41ETuD2aZRL._AC_UF894,1000_QL80_.jpg'
  },
  {
    id: 3,
    name: 'Sony WH-CH720N',
    price: 2399.99,
    image: 'https://m.media-amazon.com/images/I/41fOL0-2SpL._AC_UF1000,1000_QL80_.jpg'
  },



  
];

// Rutas
app.get('/products', (req, res) => {
  res.json(products);
});

app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  products = products.map(product => (product.id === productId ? updatedProduct : product));
  res.json(updatedProduct);
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
