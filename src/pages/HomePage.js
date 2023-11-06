import React, { useState, useEffect } from "react";
import axios from "axios";
import Cart from "./../components/Cart";
import styles from "./../style/home.module.css";
import { BiStore, BiCart, BiSolidCartAdd } from "react-icons/bi";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Navbar,
  NavbarBrand,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Container,
  Row,
} from "reactstrap";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const titulo = "Selecciona tus productos  ";

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addToCart = (product) => {
    alert('Producto agregado al carrito');
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    alert('Producto eliminado del carrito');
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <main className={styles.main}>
      <Navbar color="dark" dark className={styles.navbar}>
        <NavbarBrand href="/" className={styles.contLogo}>
          <BiStore size={60} />
          <h1 className={styles.titNav}>Tu Tiendita</h1>
        </NavbarBrand>
        <Button color="primary" onClick={toggle}>
          <BiCart size={40} />
        </Button>
      </Navbar>
      <div className={styles.container}>
        <div>
          <h1 className={styles.tituloMain}>{titulo}</h1>
        </div>
        <Container className={styles.contProduc}>
          <Row>
            {products.map((product) => (
              <Card
                className={styles.card}
                key={product.id}
                body
                color="light"
                style={{
                  width: "14em",
                  margin: "20px",
                }}
              >
                <img src={product.image} alt={product.name} />
                <CardBody>
                  <CardTitle tag="h5">{product.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    ${product.price}
                  </CardSubtitle>

                  <Button
                    color="success"
                    outline
                    onClick={() => addToCart(product)}
                  >
                    <BiSolidCartAdd size={30} />
                  </Button>
                </CardBody>
              </Card>
            ))}
          </Row>
        </Container>
        <Button
          href="/Admin"
          color="info"
          outline
          className={styles.botonAdmin}
        >
          Pulsa aqui si eres admin
        </Button>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Carrito de Compras</ModalHeader>
        <ModalBody>
          <Cart cart={cart} removeFromCart={removeFromCart} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Regresar
          </Button>
        </ModalFooter>
      </Modal>
    </main>
  );
}
