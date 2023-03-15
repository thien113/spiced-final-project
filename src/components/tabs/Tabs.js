import { useEffect, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import Card from "./Card";

export default function Tabs() {
  const { data: productData, isLoading: productLoading } =
    useSWR("/api/products");
  const { data: categoryData, isLoading: categoryLoading } =
    useSWR("/api/categories");

  const types = categoryData?.map((type) => type.name);
  types?.unshift("All");
  const [active, setActive] = useState("All");
  if (!productData || !categoryData) return;

  if (productLoading || categoryLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <ButtonGroup>
        {types.map((c) => (
          <Tab key={c.name} active={active === c} onClick={() => setActive(c)}>
            {c}
          </Tab>
        ))}
      </ButtonGroup>
      <p />
      <p>
        {active != "All" &&
          productData
            .filter((product) => product.category === active)
            .map((product) => <Card product={product} />)}
        {active === "All" &&
          productData.map((product) => <Card product={product} />)}
      </p>
    </>
  );
}
const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
