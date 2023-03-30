import useSWR from "swr";

export default function Ratings({ restaurant }) {
  const { data, isLoading } = useSWR("/api/reviews");
  if (!data) return;

  if (isLoading) {
    return <h4>Loading...</h4>;
  }
  const filteredData = data.filter((e) => e.rating >= restaurant[0].rating);
  console.log("fitlered data of ratings", filteredData);
  return (
    <>
      <h4>What our customers think about us</h4>
      {filteredData.map((d) => (
        <>
          <p>{d.name}</p>
          <p>{d.comment}</p>
          <p>{d.rating}/5</p>
        </>
      ))}
    </>
  );
}
