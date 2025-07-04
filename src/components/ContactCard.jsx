export default function ContactCard({ contact }) {
  return (
    <div
      style={{
        border: "2px solid var(--color-secondary)",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px 0",
        background: "white",
        boxShadow: "0 2px 8px rgba(56, 142, 60, 0.08)",
      }}
    >
      <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {contact.name}
        <span
          style={{
            color: contact.isFavorite ? "var(--color-accent)" : "#bbb",
            fontSize: "1.5rem",
            transition: "color 0.3s",
          }}
        >
          {contact.isFavorite ? "⭐" : "☆"}
        </span>
      </h3>
      <p>📞 {contact.phone}</p>
      <p>Email: {contact.email}</p>
    </div>
  );
}