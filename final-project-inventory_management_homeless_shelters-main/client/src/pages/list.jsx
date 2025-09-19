import React, { useEffect, useState } from "react";
import { getInventoryItems, deleteInventoryItem } from "../services/inventoryService";
import { useNavigate } from "react-router-dom";
import { Table, Container, Row, Col, Modal } from "react-bootstrap";
import "../styles/list.css";

const InventoryList = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadInventoryItems();
    }, []);

    const loadInventoryItems = async () => {
        const data = await getInventoryItems();
        setInventoryItems(data);
    };

    const handleDeleteConfirm = async () => {
        await deleteInventoryItem(currentItemId);
        setShowDeleteModal(false);
        loadInventoryItems(); // Refresh list
    };

    const handleDelete = (id) => {
        setCurrentItemId(id);
        setShowDeleteModal(true);
    };

    return (
        <Container className="page-container">
            <Row className="text-center my-4">
                <Col>
                    <h1 className="title">Inventory List</h1>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col className="text-end">
                    <button
                        className="custom-btn gradient-btn"
                        onClick={() => navigate("/inventory/add")}
                    >
                        ➕ Add Item
                    </button>
                </Col>
            </Row>

            <Table striped bordered hover responsive className="custom-table">
                <thead>
                    <tr className="table-header">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Shelter</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryItems.map((item) => (
                        <tr key={item.itemId}>
                            <td>{item.itemName}</td>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td>{item.shelter.name}</td>
                            <td>
                                <button
                                    className="custom-btn edit-btn"
                                    onClick={() => navigate(`/inventory/edit/${item.itemId}`)}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    className="custom-btn delete-btn"
                                    onClick={() => handleDelete(item.itemId)}
                                >
                                    🗑️ Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                <Modal.Footer>
                    <button
                        className="custom-btn cancel-btn"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="custom-btn delete-btn"
                        onClick={handleDeleteConfirm}
                    >
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default InventoryList;
