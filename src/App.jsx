import { useState, useEffect } from "react";
import ContactCard from "./components/ContactCard";
import ContactList from "./components/ContactList";
import Copyright from "./components/Copyright";
import Header from "./components/Header";
import "./theme.css";

const contacts = [
	{
		id: 1,
		name: "Ana García",
		phone: "+1 (555) 123-4567",
		email: "ana.garcia@email.com",
		isFavorite: true,
	},
	{
		id: 2,
		name: "José Velis",
		phone: "+51 962130755",
		email: "jose.velis@email.com",
		isFavorite: false,
	},
	{
		id: 3,
		name: "Luis Pérez",
		phone: "+51 912345678",
		email: "luis.perez@email.com",
		isFavorite: true,
	},
];

export default function App() {
	const [selectedContact, setSelectedContact] = useState(contacts[0]);
	const [showFavorites, setShowFavorites] = useState(false);

	const headerStyle = {
		backgroundColor: "var(--color-primary)",
		color: "white",
		padding: "16px",
		borderRadius: "8px",
		marginBottom: "24px",
		textAlign: "center",
	};

	// Filtra los contactos según el checkbox
	const filteredContacts = showFavorites
		? contacts.filter((c) => c.isFavorite)
		: contacts;

	// Si el filtro está activo y el contacto seleccionado no es favorito, selecciona el primer favorito
	useEffect(() => {
		if (
			showFavorites &&
			!selectedContact.isFavorite &&
			filteredContacts.length > 0
		) {
			setSelectedContact(filteredContacts[0]);
		}
	}, [showFavorites, selectedContact, filteredContacts]);

	return (
		<div
			style={{
				fontFamily: "Verdana",
				background: "var(--color-bg)",
				minHeight: "100vh",
				color: "var(--color-text)",
			}}
		>
			<div style={headerStyle}>
				<Header />
			</div>
			{/* Sección de filtro */}
			<section
				style={{
					display: "flex",
					justifyContent: "center",
					marginBottom: "20px",
				}}
			>
				<label
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						background: "var(--color-bg)",
						border: "1.5px solid var(--color-secondary)",
						borderRadius: "8px",
						padding: "8px 16px",
						fontWeight: "bold",
						boxShadow: "0 2px 8px rgba(56, 142, 60, 0.08)",
						cursor: "pointer",
					}}
				>
					<input
						type="checkbox"
						checked={showFavorites}
						onChange={(e) => setShowFavorites(e.target.checked)}
						style={{
							accentColor: "var(--color-accent)",
							width: "18px",
							height: "18px",
							cursor: "pointer",
						}}
					/>
					Mostrar solo favoritos ⭐
				</label>
			</section>
			<div
				style={{
					display: "flex",
					gap: "16px",
					justifyContent: "center",
					marginBottom: "24px",
				}}
			>
				{filteredContacts.map((contact, idx) => (
					<button
						key={contact.id}
						className={`contact-btn${
							selectedContact.id === contact.id ? " active" : ""
						}`}
						onClick={() => setSelectedContact(contact)}
					>
						Contacto {idx + 1}
					</button>
				))}
			</div>
			<h2 style={{ color: "var(--color-secondary)" }}>Contacto Actual:</h2>
			<ContactCard
				contact={selectedContact}
				isFavorite={selectedContact.isFavorite}
			/>
			<ContactList />
			<Copyright />
		</div>
	);
}