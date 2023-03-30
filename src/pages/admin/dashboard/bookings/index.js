import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "../../../../components/admin/Layout";
import useSWR from "swr";
import { hasToken } from "../../../../components/admin/utils/checkUser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DateFormatter from "../../../../components/admin/utils/dateformatter";

function DashboardBookings() {
  const { data, isLoading } = useSWR("/api/bookings");
  const [startDate, setStartDate] = useState(new Date());

  if (!data) return;

  if (isLoading) {
    return (
      <section className="admin-section">
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
    (data) => data.date === dateToFilter && data.status === "accepted"
  );

  return (
    <section className="admin-section">
      <AdminLayout />
      <div className="admin-row">
        <DashboardTabs />
        <div className="dashboard-column">
          <h3>Bookings</h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />

          {filteredData.map((d) => (
            <>
              <div className="dashboard-row">
                <h4>Date: {d.date}</h4>
                <p>Name: {d.name}</p>
                <p>Email: {d.email}</p>
                <p>Telephone: # {d.telephone}</p>
                <p>People: # {d.people}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
export default DashboardBookings;

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
