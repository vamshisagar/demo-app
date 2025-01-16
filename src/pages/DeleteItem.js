// src/pages/DeleteItem.js
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteItem } from "../actions/itemActions";
import { Container, Button } from "react-bootstrap";

const DeleteItem = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch(deleteItem(id));
        navigate("/");
    };

    return (
        <Container className="text-center my-4">
            <h2>Delete Item</h2>
            <p>Are you sure you want to delete this item?</p>
            <Button variant="danger" onClick={handleDelete} className="mx-2">
                Yes, Delete
            </Button>
            <Button
                variant="secondary"
                onClick={() => navigate("/")}
                className="mx-2"
            >
                Cancel
            </Button>
        </Container>
    );
};

export default DeleteItem;
