import React from "react";

export const ContactCard = ({ contact }) => {
    if (!contact) return null;
    
    return (
        <div className="contact-card">
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
        </div>
    );
};

export default ContactCard;