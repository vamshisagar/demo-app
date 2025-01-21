// src/pages/ItemList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../actions/itemActions";
import { Link } from "react-router-dom";
import { Button, Table, Container, Row, Col, Badge } from "react-bootstrap";

const ItemList = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.item.items);

    useEffect(() => {
        dispatch(setItems());
    }, [dispatch]);

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h2 className="text-center">Item List</h2>
                    <div className="d-flex justify-content-end mb-3">
                        <Link
                            to="/add"
                            //state={formData}
                            className="btn btn-primary"
                        >
                            Add New Item
                        </Link>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>item</th>
                                <th>Status</th>
                                <th>Service</th>
                                <th>Start Time</th>
                                <th>Next Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items &&
                                items.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.lsi}</td>
                                        <td className="align-middle">
                                            {item.status ===
                                                "Investigating" && (
                                                <Badge pill bg="danger">
                                                    Investigating
                                                </Badge>
                                            )}
                                            {item.status === "Mitigated" && (
                                                <Badge pill bg="success">
                                                    Mitigated
                                                </Badge>
                                            )}
                                            {item.status === "Mitigating" && (
                                                <Badge
                                                    pill
                                                    bg="warning"
                                                    text="dark"
                                                >
                                                    Mitigating
                                                </Badge>
                                            )}
                                        </td>
                                        <td>
                                            {item.team
                                                .map((item) => item.label)
                                                .join(",")}
                                        </td>
                                        <td>{item.startTime}</td>
                                        <td>
                                            {item.status === "Mitigated"
                                                ? ""
                                                : item.nextUpdate}
                                        </td>
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
