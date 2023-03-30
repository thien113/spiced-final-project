import ProductUpdateForm from "@/src/components/admin/form/product/ProductUpdateForm";
import AdminLayout from "../../../../components/admin/Layout";
import DashboardTabs from "@/src/components/admin/tabs/Tabs";
import { useRouter } from "next/router";
import useSWR from "swr";
import { hasToken } from "../../../../components/admin/utils/checkUser";

function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(id ? `/api/products/${id}` : null);
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

  async function handleEditProduct(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const productData = Object.fromEntries(formData);
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        event.target.reset();
        router.push("/admin/dashboard/products");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="page-section">
      <AdminLayout />
      <div className="row">
        <DashboardTabs />
        <ProductUpdateForm product={data} onSubmit={handleEditProduct} />
      </div>
    </section>
  );
}
export default ProductDetails;
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
