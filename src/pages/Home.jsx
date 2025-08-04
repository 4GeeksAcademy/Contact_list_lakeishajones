import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useState, useEffect } from "react";
import {ContactCard }from "./ContactCard.jsx";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom'


export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	const [contactsArray, setContactsArray] = useState("")

	useEffect(() => {
		getData()
	}, [])

	// this is a POST request 
	const createAgenda = () => {
		// to make POST method, create an options object
		const option = {
			method: "POST",
			// headers also from Postman Site as the 'format' always using JSON 	
			headers: {
				"Content-type": "application/json"
			},
			// the 'body' is where we get it from PostMan site
			body: JSON.stringify({
				"slug": "keisha"
			})
		}
		fetch("https://playground.4geeks.com/contact/agendas/keisha", option)
			.then((resp) => {
				if (resp.ok == false) {
					console.log("failed to create")
				}
				else (
					getData()
				)
				return resp.json()
			})
			.then((data) => console.log("agenda created! ", data))
	}

	// this is a GET request 
	const getData = () => {
		fetch("https://playground.4geeks.com/contact/agendas/keisha")
			.then((resp) => {
				console.log("resp: ", resp)
				if (resp.ok == false) {
					createAgenda()
				}
				else {
					return resp.json()
				}
			})
			.then((data) => {
				dispatch({ type: "set-contact-list", payload: data.contacts })
			})
	}


	useEffect(() => {
		getData();

	}, [])
	console.log(store, "contact listttt");
	// {/* <ContactCard contact = contact /> */} map the contacts
	console.log(store.contactsArray, "im here !!!!")

	const handleDelete = (id) => {
		fetch("https://playground.4geeks.com/contact/agendas/keisha/contacts/" + id, {
			method: "DELETE"
		})
		getData()

	}

	return (
		<div className="text-center p-4 m-4">
			{/* {condition ? if true do this (this where we map if its true) : if not do this} */}
			{store.contactsArray.length > 0 ?
				store.contactsArray.map(
					(contacts) => {
						return (
							<div className="m-3 bg-success-subtle text-success-emphasis">
								<div>name: {contacts.name}</div>
								<div>email: {contacts.email}</div>
								<div>phone: {contacts.phone}</div>
								<div>address: {contacts.address}</div>
								<Link to="/submit">
									<button
										onClick={() => {
											dispatch({ type: "set-single-contact", payload: contacts })
										}}
										className="bg-info-subtle"
									>
										Edit Contact</button>
								</Link>
								<button onClick={() => handleDelete(contacts.id)}
									className="bg-info-subtle">
									Delete Contact
								</button>

							</div>
						)
					})
				:
				"no contacts found"}
			<ContactCard />
		</div>
	);
};