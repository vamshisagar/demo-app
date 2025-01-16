// src/pages/AddItem.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../actions/itemActions";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const AddItem = (prop) => {
    console.log(prop);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addItem(formData));
        navigate("/");
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center my-4">Add New Item</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter item name"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="formDescription"
                            className="mb-3"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter item description"
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Button
                                variant="secondary"
                                onClick={() => navigate("/")}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary">
                                Add Item
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddItem;
