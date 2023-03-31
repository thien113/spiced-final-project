import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "@/src/components/admin/Layout";
import { hasToken } from "../../../components/admin/utils/checkUser";
import DeliveryOrder from "@/src/components/admin/order/DeliveryOrder";
import Booking from "@/src/components/admin/order/Booking";
import PickUpOrder from "@/src/components/admin/order/PickUpOrder";
import OrderInKitchen from "@/src/components/admin/order/OrderInKitchen";
import OrderOnTheWay from "@/src/components/admin/order/OrderOnTheWay";

function Dashboard() {
  return (
    <section className="admin-section">
      <AdminLayout />
      <div className="admin-row">
        <DashboardTabs />
        <div className="dashboard-column">
          <div className="cards">
            <DeliveryOrder />
            <PickUpOrder />
            <Booking />
          </div>
          <hr />
          <div className="dashboard-row">
            <OrderInKitchen />
            <OrderOnTheWay />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Dashboard;

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
