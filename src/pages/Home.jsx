import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "./ContactCard.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [contactsArray, setContactsArray] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        getData();
    }, []);

    // Show success message
    const showSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    // Function to refresh the page
    const refreshPage = () => {
        window.location.reload();
    };

    // this is a POST request 
    const createAgenda = () => {
        const option = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "slug": "keisha"
            })
        };
        
        fetch("https://playground.4geeks.com/contact/agendas/keisha", option)
            .then((resp) => {
                if (resp.ok == false) {
                    console.log("failed to create");
                } else {
                    getData();
                }
                return resp.json();
            })
            .then((data) => {
                console.log("agenda created! ", data);
                showSuccess("✅ Agenda created successfully!");
                refreshPage();
            })
            .catch((error) => {
                console.error("Error creating agenda:", error);
            });
    };

    // this is a GET request 
    const getData = () => {
        fetch("https://playground.4geeks.com/contact/agendas/keisha")
            .then((resp) => {
                console.log("resp: ", resp);
                if (resp.ok == false) {
                    createAgenda();
                } else {
                    return resp.json();
                }
            })
            .then((data) => {
                if (data) {
                    dispatch({ type: "set-contact-list", payload: data.contacts });
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this contact? 🗑️")) {
            fetch("https://playground.4geeks.com/contact/agendas/keisha/contacts/" + id, {
                method: "DELETE"
            })
            .then((resp) => {
                if (resp.ok) {
                    console.log("Contact deleted successfully");
                    showSuccess("🗑️ Contact deleted successfully!");
                    refreshPage();
                } else {
                    console.error("Failed to delete contact");
                }
            })
            .catch((error) => {
                console.error("Error deleting contact:", error);
            });
        }
    };

    return (
        <div className="main-container">
            <div className="glass-container">
                {/* Page Header */}
                <div className="page-header">
                    { <h1 className="page-title">Contact List</h1> }
                    { <p className="page-subtitle">Manage your contacts with style</p> }
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}

                {/* Add New Contact Button */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Link to="/submit">
                        <button className="btn btn-primary">
                            ➕ Add New Contact
                        </button>
                    </Link>
                </div>

                {/* Contact List */}
                {store.contactsArray && store.contactsArray.length > 0 ? (
                    store.contactsArray.map((contact) => (
                        <div key={contact.id} className="contact-card">
                            <div className="contact-info">
                                <div className="contact-field">
                                    <span className="contact-icon"></span>
                                    <strong>Name:</strong>
                                    <span>{contact.name}</span>
                                </div>
                                <div className="contact-field">
                                    <span className="contact-icon"></span>
                                    <strong>Email:</strong>
                                    <span>{contact.email}</span>
                                </div>
                                <div className="contact-field">
                                    <span className="contact-icon"></span>
                                    <strong>Phone:</strong>
                                    <span>{contact.phone}</span>
                                </div>
                                <div className="contact-field">
                                    <span className="contact-icon"></span>
                                    <strong>Address:</strong>
                                    <span>{contact.address}</span>
                                </div>
                            </div>
                            <div className="contact-actions">
                                <Link to="/submit">
                                    <button
                                        onClick={() => {
                                            dispatch({ type: "set-single-contact", payload: contact });
                                        }}
                                        className="btn btn-info"
                                    >
                                        ✏️ Edit Contact
                                    </button>
                                </Link>
                                <button 
                                    onClick={() => handleDelete(contact.id)}
                                    className="btn btn-danger"
                                >
                                    🗑️ Delete Contact
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                     <div className="empty-state">
                        <h3>📭 No Contacts Found</h3>
                        <p>Start building your contact list by adding your first contact!</p>
                        
                        {/* <Link to="/submit">
                            <button className="btn btn-primary">
                                ➕ Add Your First Contact
                            </button>
                        </Link> */}
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
