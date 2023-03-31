import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import AdminLayout from "../../../../components/admin/Layout";
import useSWR from "swr";
import DealCreateForm from "@/src/components/admin/form/deal/DealCreateForm";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { hasToken } from "../../../../components/admin/utils/checkUser";

function DashboardDeals() {
  const { data, isLoading } = useSWR("/api/deals");
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
  async function handleCreateDeal(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const dealData = Object.fromEntries(formData);

    const response = await fetch("/api/deals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dealData),
    });

    if (response.ok) {
      event.target.reset();
      router.push("/admin/dashboard/deals");
    } else {
      console.error(response.status);
    }
  }

  async function handleDelete(id) {
    const response = await fetch(`/api/deals/${id}`, { method: "DELETE" });
    if (response.ok) {
      router.push("/admin/dashboard/deals");
    } else {
      console.log(response.status);
    }
  }
  return (
    <section className="admin-section">
      <AdminLayout />
      <div className="admin-row">
        <DashboardTabs />
        <div className="dashboard-column">
          <div className="admin-row">
            <h3>Deals</h3>
            <button
              onClick={() => {
                setOpen(!open);
              }}
            >
              Create New Deal
            </button>
          </div>
          {open && <DealCreateForm onSubmit={handleCreateDeal} />}
          {data.map((d) => (
            <div className="dashboard-column">
              <div className="dashboard-row">
                <h4>Deals: {d.code}</h4>
                <p>Discount: {d.discount}</p>
                <p>
                  Start: {d.start}
                  <strong>-</strong> {d.end}
                </p>
              </div>
              <div className="dashboard-row">
                <Link href={`/admin/dashboard/deals/${d._id}`}>
                  <button>Update</button>
                </Link>
                <button
                  onClick={() => {
                    handleDelete(d._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default DashboardDeals;
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
