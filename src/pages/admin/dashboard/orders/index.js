import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "../../../../components/admin/Layout";
import useSWR from "swr";
import Link from "next/link";
import { hasToken } from "../../../../components/admin/utils/checkUser";
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
      <section className="admin-section">
        <AdminLayout />
        <div className="admin-row">
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
    <section className="admin-section">
      <AdminLayout />
      <div className="admin-row">
        <DashboardTabs />
        <div className="dashboard-column">
          <div className="dashboard-row">
            <h3>Orders</h3>
            <DatePicker
              className="datepicker"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="cards">
            {filteredData.map((d) => (
              <Link href={`/admin/dashboard/orders/${d._id}`}>
                <div className="dashboard-row card">
                  <h4>Order Number: {d._id}</h4>
                  <strong>For: {d.type.toUpperCase()}</strong>
                  <p>Name: {d.name}</p>
                  <strong>Total: {d.total} €</strong>
                </div>
              </Link>
            ))}
          </div>
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
