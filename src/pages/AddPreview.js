// src/pages/AddItem.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearFormData } from "../actions/itemActions";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";

const AddPreview = () => {
    const [formData, setFormData] = useState({ name: "", description: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userformData = useSelector((state) => state.form?.userformData || {});
 

    useEffect(() => {
        setFormData(userformData);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addItem(formData));
        dispatch(clearFormData());
        navigate("/");
    };

    return (
        <Container>
            <h2 className="text-center my-5">Preview Page</h2>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{formData.name}</td>
                                <td>{formData.description}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between">
                        <Button
                            variant="secondary"
                            onClick={() => navigate("/add")}
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={handleSubmit}
                        >
                            Add
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AddPreview;
