import AdminLayout from "../../../../components/admin/Layout";
import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import { useRouter } from "next/router";
import useSWR from "swr";
import { hasToken } from "../../../../components/admin/utils/checkUser";

function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(id ? `/api/orders/${id}` : null);
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

  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
      </div>
    </section>
  );
}
export default OrderDetails;
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
