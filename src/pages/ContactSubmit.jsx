import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const ContactSubmit = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()

    const [name, setName] = useState(store.singleContact.name)
    const [email, setEmail] = useState(store.singleContact.email)
    const [phone, setPhone] = useState(store.singleContact.phone)
    const [address, setAddress] = useState(store.singleContact.address)
    // console.log("i've arrived", store)


    const submitContact = () => {
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "phone": phone,
                "email": email,
                "address": address
            })
        }
        fetch("https://playground.4geeks.com/contact/agendas/keisha/contacts", option)
            .then((resp) => resp.json())
            .then((data) => console.log("contact created: ", data))
    }


    const updateContact = (id) => {
        const option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "phone": phone,
                "email": email,
                "address": address
            })
        }
        fetch("https://playground.4geeks.com/contact/agendas/keisha/contacts/" + id, option)
            .then((resp) => resp.json())
            .then((data) => console.log("contact created: ", data))
        navigate("/")
    }
    return (
        <div className="contact-info bg-success-subtle text-success-emphasis">
            <h3 className="d-flex mx-auto ">Add New Contact</h3>
            {/* ^needs to be centered.. keep working on this */}

            <div className="col-3 m-4">
                <label className="m-2">Name</label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="name" />
            </div>
            
            <div className="col-3 m-4">
                <label className="m-2">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="email" />
            </div>
           
            <div className="col-3 m-4">
                <label className="m-2">Phone</label>
                <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" placeholder="phone" />
            </div>
           
            <div className="col-3 m-4">
                <label className="m-2">Address</label>
                <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder="address" />
            </div>
            
            <div className="m-4 d-flex align-items-center gap-3">
                <Link to="/">
                <button onClick={submitContact} className="bg-info-subtle"> Save Contact</button>
                <button onClick={() => updateContact(store.singleContact.id)} className="bg-info-subtle"> Update Contact </button>
                </Link>
            </div>
        </div>
    )
};

// this page display the 'ADD CONTACT' section