import ContactCard from "./ContactCard";

export default function ContactList() {
  const contacts = [
    {
      id: 1,
      name: "José Velis",
      email: "jose.velis@email.com",
      phone: "+51 962130755",
      isFavorite: true,
    },
    {
      id: 2,
      name: "Ana Torres",
      email: "ana.torres@email.com",
      phone: "+51 987654321",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Luis Pérez",
      email: "luis.perez@email.com",
      phone: "+51 912345678",
      isFavorite: true,
    },
  ];

  return (
    <div>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          isFavorite={contact.isFavorite}
        />
      ))}
    </div>
  );
}