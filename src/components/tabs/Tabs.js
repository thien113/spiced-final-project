import { useEffect, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import Card from "./Card";

export default function Tabs({ productHandler }) {
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
          <Tab key={c} active={active === c} onClick={() => setActive(c)}>
            {c}
          </Tab>
        ))}
      </ButtonGroup>
      <div>
        {active != "All" &&
          productData
            .filter((product) => product.category === active)
            .map((product) => (
              <Card product={product} productHandler={productHandler} />
            ))}
        {active === "All" &&
          productData.map((product) => (
            <Card
              key={product._id}
              product={product}
              productHandler={productHandler}
            />
          ))}
      </div>
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
