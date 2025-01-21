// src/pages/UpdateItem.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateItem,
    setItems,
    addFormData,
    clearFormData,
} from "../actions/itemActions";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import ReactQuill from "react-quill-new";
import "../../node_modules/react-quill-new/dist/quill.snow.css"; // import styles

const teamOptions = [
    { label: "Application Insights", value: "Application-Insights" },
    { label: "Log Analytics", value: "Log-Analytics" },
    { label: "Azure Monitoring", value: "Azure-Monitoring" },
    { label: "Azure Alerting", value: "Azure-Alerting" },
    { label: "Geneva Monitoring", value: "Geneva-Monitoring" },
    { label: "Azure Sentinel", value: "Azure-Sentinel" },
];

const UpdateItem = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector((state) => state.item.items);
    const userformData = useSelector(
        (state) => state.form?.userformData || null
    );

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

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(setItems());
        const itemToEdit = items.find((item) => item.id === parseInt(id));

        if (userformData) {
            setFormData(userformData);
        } else {
            setFormData(itemToEdit);
        }

        // if (itemToEdit) {
        //     setFormData(itemToEdit);
        // }
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDescriptionChange = (value) => {
        setFormData((prevState) => ({
            ...prevState,
            description: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.lsi) newErrors.lsi = "LSI# is required";
        if (!formData.startTime) newErrors.startTime = "Start time is required";
        if (!formData.description)
            newErrors.description = "Description is required";
        if (!formData.impactType)
            newErrors.impactType = "Impact Type is required";
        if (!formData.locations) newErrors.locations = "Locations are required";

        if (formData.status === "Mitigated" && !formData.endTime) {
            newErrors.endTime = "End time is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTeamChange = (selected) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            team: selected, // Update with the selected options array
        }));
    };

    const handlePreview = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(addFormData(formData));
            navigate(`/Edit/preview`);
        }
    };

    return (
        <Container className="my-4">
            <Row className="shadow-lg rounded justify-content-center">
                <h2 className="text my-3">Edit Item</h2>
                <hr />
                <Col md={11}>
                    <Form onSubmit={handlePreview}>
                        <Row>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Team</Form.Label>
                                    <MultiSelect
                                        options={teamOptions}
                                        value={formData.team}
                                        onChange={handleTeamChange}
                                        labelledBy="Select Team"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select a status
                                        </option>
                                        <option value="Investigating">
                                            Investigating
                                        </option>
                                        <option value="Mitigating">
                                            Mitigating
                                        </option>
                                        <option value="Mitigated">
                                            Mitigated
                                        </option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>LSI#</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lsi"
                                        value={formData.lsi || ""}
                                        onChange={handleChange}
                                    />
                                    {errors.lsi && (
                                        <span className="text-danger">
                                            {errors.lsi}
                                        </span>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="startTime"
                                        value={formData.startTime || ""}
                                        onChange={handleChange}
                                    />
                                    {errors.startTime && (
                                        <span className="text-danger">
                                            {errors.startTime}
                                        </span>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                {formData.status === "Mitigated" && (
                                    <Form.Group>
                                        <Form.Label>End Time</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            name="endTime"
                                            value={formData.endTime || ""}
                                            onChange={handleChange}
                                        />
                                        {errors.endTime && (
                                            <span className="text-danger">
                                                {errors.endTime}
                                            </span>
                                        )}
                                    </Form.Group>
                                )}
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Impact Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="impactType"
                                        value={formData.impactType || ""}
                                        onChange={handleChange}
                                    />
                                    {errors.impactType && (
                                        <span className="text-danger">
                                            {errors.impactType}
                                        </span>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Locations</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="locations"
                                        value={formData.locations || ""}
                                        onChange={handleChange}
                                    />
                                    {errors.locations && (
                                        <span className="text-danger">
                                            {errors.locations}
                                        </span>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mt-2">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                value={formData.subject || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label>Description</Form.Label>
                            <ReactQuill
                                value={formData.description}
                                onChange={handleDescriptionChange}
                                theme="snow"
                                style={{ height: "120px" }}
                            />
                            {errors.description && (
                                <span className="text-danger">
                                    {errors.description}
                                </span>
                            )}
                        </Form.Group>

                        <Form.Group className="mt-5">
                            <Form.Label>Customer Impact</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="customerImpact"
                                value={formData.customerImpact || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Row className="mt-2">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>DRI Engaged</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="driEngaged"
                                        value={formData.driEngaged || ""}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Azure CRI</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="azureCri"
                                        value={formData.azureCri || ""}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            {formData.status !== "Mitigated" && (
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Next Update</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="nextUpdate"
                                            value={formData.nextUpdate || ""}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select an update time
                                            </option>
                                            <option value="1hr">1hr</option>
                                            <option value="2hr">2hr</option>
                                            <option value="4hr">4hr</option>
                                            <option value="6hr">6hr</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            )}
                        </Row>

                        <Form.Group className="mt-2">
                            <Form.Label>Recipients</Form.Label>
                            <Form.Control
                                type="text"
                                name="recipients"
                                value={formData.recipients || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <div className="mt-4 my-4">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    dispatch(clearFormData());
                                    navigate("/");
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="success"
                                className="mx-3"
                            >
                                Preview
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateItem;
