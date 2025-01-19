// src/pages/ItemList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../actions/itemActions";
import { Link } from "react-router-dom";
import { Button, Table, Container, Row, Col } from "react-bootstrap";

const ItemList = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.item.items);

    const [formData, SetformData] = useState({});

    useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h2 className="text-center">Item List</h2>
                    <div className="d-flex justify-content-end mb-3">
                        <Link
                            to="/add"
                            state={formData}
                            className="btn btn-primary"
                        >
                            Add New Item
                        </Link>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items &&
                                items.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <Link
                                                to={`/view/${item.id}`}
                                                className="btn btn-info btn-sm mx-1"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                to={`/update/${item.id}`}
                                                className="btn btn-warning btn-sm mx-1"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                to={`/delete/${item.id}`}
                                                className="btn btn-danger btn-sm mx-1"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ItemList;
