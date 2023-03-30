import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "../../../../components/admin/Layoutx";
import useSWR from "swr";
import Link from "next/link";
import { hasToken } from "../../checkUser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DateFormatter from "../../../../components/admin/utils/dateformatter";

function DashboardOrders() {
  const { data, isLoading } = useSWR("/api/orders");
  const [startDate, setStartDate] = useState(new Date());

  if (!data) return;

  if (isLoading) {
    return (
      <section className="page-section">
        <AdminLayout />
        <div className="row">
          <DashboardTabs />
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }
  const dateToFilter = DateFormatter(startDate);
  const filteredData = data?.filter(
    (d) => d.created.slice(0, 10) === dateToFilter
  );
  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <div className="column">
          <h3>Orders</h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          {filteredData.map((d) => (
            <Link href={`/admin/dashboard/orders/${d._id}`}>
              <div className="row">
                <h4>Order Number: {d._id}</h4>
                <strong>For: {d.type.toUpperCase()}</strong>
                <p>Name: {d.name}</p>
                <strong>Total: {d.total} €</strong>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export default DashboardOrders;
export async function getServerSideProps(context) {
  const token = await hasToken(context.req);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
