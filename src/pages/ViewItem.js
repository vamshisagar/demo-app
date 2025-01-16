// src/pages/ViewItem.js
import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";

const ViewItem = () => {
    const { id } = useParams();
    const items = useSelector((state) => state.item.items);
    const item = items.find((item) => item.id === parseInt(id));

    if (!item) {
        return <p>Item not found!</p>;
    }

    return (
        <Container>
            <Card className="my-4">
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Link to="/" className="btn btn-primary">
                        Back to List
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ViewItem;
