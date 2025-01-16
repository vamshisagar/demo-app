// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemList from "./pages/ItemList";
import AddItem from "./pages/AddItem";
import AddPreview from "./pages/AddPreview";
import UpdateItem from "./pages/UpdateItem";
import ViewItem from "./pages/ViewItem";
import DeleteItem from "./pages/DeleteItem";
import { Container, Navbar, Nav } from "react-bootstrap";

const App = () => {
    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="/">CRUD App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/add">Add Item</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Routes>
                    <Route path="/" element={<ItemList />} />
                    <Route path="/add" element={<AddItem />} />
                    <Route path="/add/preview" element={<AddPreview />} />
                    <Route path="/update/:id" element={<UpdateItem />} />
                    <Route path="/view/:id" element={<ViewItem />} />
                    <Route path="/delete/:id" element={<DeleteItem />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
