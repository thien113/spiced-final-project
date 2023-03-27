import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "@/src/components/admin/Layout";
import { hasToken } from "../../checkUser";
//import useSWR from "swr";
/*import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DateFormatter from "../utils/dateformatter";*/

function DashboardReviews() {
  /* const { data, isLoading } = useSWR("/api/emails");
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
  */
  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <div className="column">
          <h3>Reviews</h3>
        </div>
      </div>
    </section>
  );
}
export default DashboardReviews;
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
