import useSWR from "swr";

export default function Ratings({ restaurant }) {
  const { data, isLoading } = useSWR("/api/reviews");
  if (!data) return;

  if (isLoading) {
    return <h4>Loading...</h4>;
  }
  const filteredData = data.filter((e) => e.rating >= restaurant[0].rating);
  return (
    <div className="slider">
      <div className="slide-track">
        {filteredData.map((d) => (
          <div className=" slide">
            <div>
              <h4>{d.name}</h4>
              <i>{d.comment}</i>
              <p>
                <strong>{d.rating}/5</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
