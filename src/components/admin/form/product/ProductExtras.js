export default function ProductExtras({ extras, onDelete, productId }) {
  return (
    <div className="row">
      {extras.map((e) => (
        <p>
          {e.extra}: {e.price} €
          <button
            onClick={() => {
              onDelete(e._id, productId);
            }}
          >
            Delete
          </button>
        </p>
      ))}
    </div>
  );
}
