import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import DatePicker from "react-datepicker";
import useSWR from "swr";
import "react-datepicker/dist/react-datepicker.css";
import DateFormatter from "./utils/dateformatter";

export default function Chart() {
  const { data, isLoading } = useSWR("/api/orders");
  const [startDate, setStartDate] = useState(new Date());
  if (!data) return;

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  const dateToFilter = DateFormatter(startDate);
  const dataEx = data?.filter(
    (data) =>
      data.status === "finished" && data.created.includes(dateToFilter) === true
  );
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <LineChart
        width={600}
        height={300}
        data={dataEx}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="total" stroke="#ff66c4" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="total" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </>
  );
}
