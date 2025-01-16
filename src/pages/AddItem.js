// src/pages/AddItem.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, addItem, clearFormData } from "../actions/itemActions";
import { useFormAction, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const AddItem = () => {
    const [formData, setFormData] = useState({ name: "", description: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const userformData = useSelector(
        (state) => state.form?.userformData || null
    );

    useEffect(() => {
        if (userformData) {
            setFormData(userformData); // Populate only if userformData is not empty
        }
    }, []);

    const handlePreview = (e) => {
        e.preventDefault();
        dispatch(addFormData(formData));
        navigate("/add/preview");
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center my-4">Add New Item</h2>
                    <Form onSubmit={handlePreview}>
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
                                onClick={() => {
                                    dispatch(clearFormData());
                                    navigate("/");
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary">
                                Preview
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddItem;
