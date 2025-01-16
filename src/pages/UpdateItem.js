// src/pages/UpdateItem.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItem, getItems } from "../actions/itemActions";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const UpdateItem = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector((state) => state.item.items);
    const [formData, setFormData] = useState({ name: "", description: "" });

    useEffect(() => {
        dispatch(getItems());
        const itemToEdit = items.find((item) => item.id === parseInt(id));
        if (itemToEdit) {
            setFormData(itemToEdit);
        }
    }, [dispatch, id, items]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateItem(formData));
        navigate("/");
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center my-4">Edit Item</h2>
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
                            <Button type="submit" variant="success">
                                Update Item
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateItem;
