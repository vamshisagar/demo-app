// src/pages/AddItem.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearFormData } from "../actions/itemActions";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Table } from "react-bootstrap";

const AddPreview = () => {
    const [formData, setFormData] = useState({
        team: [
            { label: "Application Insights", value: "Application-Insights" },
        ],
        status: "Investigating",
        lsi: "",
        startTime: "",
        endTime: "",
        impactType: "",
        locations: "",
        subject: "",
        description: "",
        customerImpact: "",
        nextUpdate: "1hr",
        driEngaged: "",
        azureCri: "",
        recipients: "",
        lsiHtml: "",
    });

    const lsiHtmlRef = useRef(null);
    const getStatusCellStyle = () => {
        if (formData.status === "Investigating") {
            return { backgroundColor: "red", color: "white" };
        }
        if (formData.status === "Mitigating") {
            return { backgroundColor: "yellow" };
        }
        if (formData.status === "Mitigated") {
            return { backgroundColor: "green", color: "white" };
        }
        return {};
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userformData = useSelector((state) => state.form?.userformData || {});

    useEffect(() => {
        setFormData(userformData);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newformData = {
            ...formData,
            lsiHtml: lsiHtmlRef.current.outerHTML,
        };
        dispatch(addItem(newformData));
        dispatch(clearFormData());
        navigate("/");
    };

    return (
        <Container className="my-4" style={{ width: "90%" }}>
            <Row className="shadow-lg justify-content-center rounded">
                <h2 className="text my-3">Preview Page</h2>
                <hr />
                <Col md={11}>
                    <div>
                        <p className="mt-1">Subject : {formData.subject}</p>
                        <table
                            ref={lsiHtmlRef}
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                marginBottom: "20px",
                                border: "1px solid #dee2e6",
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            width: "30%",
                                            backgroundColor: "#f9f9f9",
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        Status
                                    </td>
                                    <td
                                        style={{
                                            ...getStatusCellStyle(),
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {formData.status}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            width: "30%",
                                            backgroundColor: "#f9f9f9",
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        LSI Number
                                    </td>
                                    <td
                                        style={{
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {formData.lsi}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            width: "30%",
                                            backgroundColor: "#f9f9f9",
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        Team
                                    </td>
                                    <td
                                        style={{
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {formData.team
                                            .map((option) => option.label)
                                            .join(", ")}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            width: "30%",
                                            backgroundColor: "#f9f9f9",
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        Start Time
                                    </td>
                                    <td
                                        style={{
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {formData.startTime}
                                    </td>
                                </tr>
                                {formData.status === "Mitigated" && (
                                    <tr>
                                        <td
                                            style={{
                                                width: "30%",
                                                backgroundColor: "#f9f9f9",
                                                padding: "0.5rem 1.5rem",
                                                border: "1px solid #ddd",
                                            }}
                                        >
                                            End Time
                                        </td>
                                        <td
                                            style={{
                                                padding: "0.5rem 1.5rem",
                                                border: "1px solid #ddd",
                                            }}
                                        >
                                            {formData.endTime}
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td
                                        style={{
                                            width: "30%",
                                            backgroundColor: "#f9f9f9",
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        Impact Type
                                    </td>
                                    <td
                                        style={{
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {formData.impactType}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            width: "30%",
                                            backgroundColor: "#f9f9f9",
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        Locations
                                    </td>
                                    <td
                                        style={{
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {formData.locations}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            width: "30%",
                                            backgroundColor: "#f9f9f9",
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        Subject
                                    </td>
                                    <td
                                        style={{
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {formData.subject}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            width: "30%",
                                            backgroundColor: "#f9f9f9",
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        Description
                                    </td>
                                    {/* <td
                                style={{
                                    padding: "0.5rem 1.5rem",
                                    border: "1px solid #ddd",
                                }}
                            >
                                {formData.description}
                            </td> */}
                                    <td
                                        style={{
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: formData.description,
                                        }}
                                    ></td>
                                </tr>
                                {(formData.status === "Investigating" ||
                                    formData.status === "Mitigating") && (
                                    <tr>
                                        <td
                                            style={{
                                                width: "30%",
                                                backgroundColor: "#f9f9f9",
                                                padding: "0.5rem 1.5rem",
                                                border: "1px solid #ddd",
                                            }}
                                        >
                                            Next Update
                                        </td>
                                        <td
                                            style={{
                                                padding: "0.5rem 1.5rem",
                                                border: "1px solid #ddd",
                                            }}
                                        >
                                            {formData.nextUpdate}
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td
                                        style={{
                                            width: "30%",
                                            backgroundColor: "#f9f9f9",
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        DRI Engaged
                                    </td>
                                    <td
                                        style={{
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {formData.driEngaged}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            width: "30%",
                                            backgroundColor: "#f9f9f9",
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        Azure CRI
                                    </td>
                                    <td
                                        style={{
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {formData.azureCri}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            width: "30%",
                                            backgroundColor: "#f9f9f9",
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        Email Recipients
                                    </td>
                                    <td
                                        style={{
                                            padding: "0.5rem 1.5rem",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        {formData.recipients}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="my-4">
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
                            className="mx-3"
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
