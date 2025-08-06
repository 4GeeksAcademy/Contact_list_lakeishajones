import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const ContactSubmit = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // Show success message
    const showSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    // Function to refresh the page
    const refreshPage = () => {
        window.location.reload();
    };

    // Pre-fill form if editing existing contact
    useEffect(() => {
        if (store.singleContact) {
            setFormData({
                name: store.singleContact.name || "",
                email: store.singleContact.email || "",
                phone: store.singleContact.phone || "",
                address: store.singleContact.address || ""
            });
        }
    }, [store.singleContact]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (store.singleContact && store.singleContact.id) {
            updateContact();
        } else {
            createContact();
        }
    };

    const createContact = () => {
        const option = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData)
        };

        fetch("https://playground.4geeks.com/contact/agendas/keisha/contacts", option)
            .then((resp) => {
                setLoading(false);
                if (resp.ok) {
                    console.log("Contact created successfully");
                    showSuccess("✅ Contact created successfully!");
                    dispatch({ type: "clear-single-contact" });
                    setTimeout(() => {
                        refreshPage();
                    }, 1500);
                } else {
                    console.error("Failed to create contact");
                }
                return resp.json();
            })
            .then((data) => {
                console.log("Contact created:", data);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error creating contact:", error);
            });
    };

    const updateContact = () => {
        const option = {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData)
        };

        fetch(`https://playground.4geeks.com/contact/agendas/keisha/contacts/${store.singleContact.id}`, option)
            .then((resp) => {
                setLoading(false);
                if (resp.ok) {
                    console.log("Contact updated successfully");
                    showSuccess("✅ Contact updated successfully!");
                    dispatch({ type: "clear-single-contact" });
                    setTimeout(() => {
                        refreshPage();
                    }, 1500);
                } else {
                    console.error("Failed to update contact");
                }
                return resp.json();
            })
            .then((data) => {
                console.log("Contact updated:", data);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error updating contact:", error);
            });
    };

    const handleCancel = () => {
        dispatch({ type: "clear-single-contact" });
        navigate("/");
    };

    return (
        <div className="main-container">
            <div className="glass-container">
                {/* Success Message */}
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}
                
                <div className="form-container">
                    <h2 className="form-title">
                        {store.singleContact && store.singleContact.id ? "✏️ Edit Contact" : "✨ Add New Contact"}
                    </h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter full name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter email address"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                placeholder="Enter address"
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="loading"></span> Saving...
                                    </>
                                ) : (
                                    <>
                                        💾 {store.singleContact && store.singleContact.id ? "Update Contact" : "Save Contact"}
                                    </>
                                )}
                            </button>
                            <button type="button" onClick={handleCancel} className="btn btn-secondary">
                                ❌ Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactSubmit;