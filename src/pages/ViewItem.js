// src/pages/ViewItem.js
import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Button, Row, Col } from "react-bootstrap";

const ViewItem = () => {
    const { id } = useParams();
    const items = useSelector((state) => state.item.items);
    const lsiData = items.find((item) => item.id === parseInt(id));

    if (!lsiData) {
        return <p>Item not found!</p>;
    }

    return (
        <Container className="shadow p-3 mb-5 bg-white rounded mt-3">
            <Row>
                <Col md={10}>
                    <div>
                        <h5>Subject: {lsiData.subject}</h5>
                        <div
                            className="table-container mt-2"
                            dangerouslySetInnerHTML={{
                                __html: lsiData.lsiHtml,
                            }}
                        />
                        <Link to={"/"} className="btn btn-primary">
                            Close{" "}
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ViewItem;
