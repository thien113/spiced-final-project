import Link from "next/link";

export default function DashboardTabs() {
  return (
    <div className="column">
      <Link href="/admin/dashboard">New!!!</Link>
      <Link href="/admin/dashboard/orders">Orders</Link>
      <Link href="/admin/dashboard/bookings">Bookings</Link>
      <Link href="/admin/dashboard/products">Products</Link>
      <Link href="/admin/dashboard/categories">Categories</Link>
      <Link href="/admin/dashboard/reports">Report</Link>
      <Link href="/admin/dashboard/reviews">Reviews</Link>
      <Link href="/admin/dashboard/deals">Discount/Deals</Link>
      <Link href="/admin/dashboard/emails">Email-Marketing</Link>
      <Link href="/admin/dashboard/settings">Settings</Link>
    </div>
  );
}
