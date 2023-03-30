import { useState } from "react";

export default function AdminLayout() {
  const [opening, setOpening] = useState(true);
  function toggleOpening() {
    setOpening(!opening);
  }
  return (
    <>
      <div className="row">
        <h2>Dashboard</h2>
        <button onClick={toggleOpening}>
          {!opening ? <p>Open</p> : <p>Close</p>}
        </button>
      </div>
    </>
  );
}
