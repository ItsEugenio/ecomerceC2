import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Navbar,
  NavbarBrand,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Container,
  Row,
  FormGroup,
  Input,
  Label,
  Form,
} from "reactstrap";
import { BiStore } from "react-icons/bi";
import styles from "./../style/admin.module.css";
function AdminHome() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    image: "",
  });

  useEffect(() => {
    // Obtener la lista de productos del servidor cuando el componente se monta
    axios
      .get("http://localhost:3001/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleSaveClick = (updatedProduct) => {
    // Enviar solicitud PUT para actualizar el producto
    axios
      .put(
        `http://localhost:3001/products/${updatedProduct.id}`,
        updatedProduct
      )
      .then((response) => {
        const updatedProducts = products.map((product) =>
          product.id === response.data.id ? response.data : product
        );
        setProducts(updatedProducts);
      })
      .catch((error) => console.error(error));

    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price > 0 && newProduct.image) {
      console.log("paso el if");
      axios
        .post("http://localhost:3001/products", newProduct)
        .then((response) => {
          setProducts([...products, response.data]);
          setNewProduct({ name: "", price: 0, image: "" });
        })
        .catch((error) => console.error(error));
    } else {
      console.error(
        "Completa todos los campos antes de agregar un nuevo producto."
      );
      console.log("falto el id segun");
    }
  };

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`http://localhost:3001/products/`)
      .then((response) => {
        const updatedProducts = products.filter(
          (product) => product.id !== productId
        );
        setProducts(updatedProducts);
      })
      .catch((error) => console.error(error));
  };

  return (
    <main>
      <Navbar color="dark" dark className={styles.navbar}>
        <NavbarBrand href="/" className={styles.contLogo}>
          <BiStore size={60} />
          <h1 className={styles.titNav}>Administra Tu Tiendita</h1>
        </NavbarBrand>
        <Button color="primary" outline href="/">
          Vista Usuarios
        </Button>
      </Navbar>
      <Container className={styles.container}>
        <Row>
          {products.map((product) => (
            <>
              {editingProduct && editingProduct.id === product.id ? (
                <div className={styles.contEditar}>
                  <h1>Estas editando : {product.name}</h1>
                  <FormGroup floating>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Nombre"
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      }
                    />
                    <Label for="exampleEmail">Nombre</Label>
                  </FormGroup>

                  <FormGroup floating>
                    <Input
                      id="price"
                      name="price"
                      placeholder="precio"
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: parseFloat(e.target.value),
                        })
                      }
                    />
                    <Label for="exampleEmail">Precio</Label>
                  </FormGroup>

                  <Button
                    color="success"
                    outline
                    onClick={() => handleSaveClick(editingProduct)}
                  >
                    Guardar
                  </Button>
                </div>
              ) : (
                <Card
                  className={styles.card}
                  key={product.id}
                  body
                  color="light"
                  style={{
                    width: "15em",
                    margin: "15px",
                  }}
                >
                  <img src={product.image} alt={product.name} />
                  <CardBody>
                    <CardTitle tag="h5">{product.name}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      ${product.price}
                    </CardSubtitle>

                    <Button
                      style={{
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                      color="success"
                      outline
                      onClick={() => handleEditClick(product)}
                    >
                      Editar
                    </Button>
                    <Button
                      color="danger"
                      outline
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Eliminar
                    </Button>
                  </CardBody>
                </Card>
              )}
            </>
          ))}
        </Row>
        <Form className={styles.form}>
          <h1>Agregar Productos</h1>
          <FormGroup floating>
            <Input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Label for="exampleEmail">Nombre</Label>
          </FormGroup>

          <FormGroup floating>
            <Input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value),
                })
              }
            />
            <Label for="examplePassword">Precio</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Label for="examplePassword">Url de la Imagen</Label>
          </FormGroup>

          <Button color="success" outline onClick={handleAddProduct}>
            Agregar Productos
          </Button>
        </Form>
      </Container>
    </main>
  );
}

export default AdminHome;
