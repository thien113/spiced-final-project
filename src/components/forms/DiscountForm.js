import { useState } from "react";
import useSWR from "swr";

export default function DiscountForm({ setDiscount, discount }) {
  const { data, isLoading } = useSWR("/api/deals");

  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");

  if (!data) return;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  function check(event) {
    setCode(event.target.value);
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      const filteredData = data?.find((data) => data.code === code);
      if (!filteredData) {
        setStatus("no");
        setDiscount(0);
      } else {
        setStatus("yes");
        setDiscount(filteredData.discount);
      }
    }
  }

  return (
    <>
      <label htmlFor="discount">Code: </label>
      <input
        type="text"
        name="discount"
        onChange={check}
        onKeyDown={handleKeyDown}
      />
      {status === "yes" && <p>Your code is valid! You get {discount} % off!</p>}
      {status === "no" && <p>Your code is invalid!</p>}
    </>
  );
}
