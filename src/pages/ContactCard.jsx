import React from "react";

export const ContactCard = (contact) =>{
    return (
    <div className="container">
        <h2>{contact.name}</h2>
        <p>{contact.address}</p>
        <p>{contact.phone}</p>
        <h5>{contact.email}</h5>

    </div>
    )
}