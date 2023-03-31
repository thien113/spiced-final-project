import Link from "next/link";

export default function DashboardTabs() {
  return (
    <div className="dashboard-column tabs">
      <Link className="tabs-tab" href="/admin/dashboard">
        New!!!
      </Link>
      <Link className="tabs-tab" href="/admin/dashboard/orders">
        Orders
      </Link>
      <Link className="tabs-tab" href="/admin/dashboard/bookings">
        Bookings
      </Link>
      <Link className="tabs-tab" href="/admin/dashboard/products">
        Products
      </Link>
      <Link className="tabs-tab" href="/admin/dashboard/categories">
        Categories
      </Link>
      <Link className="tabs-tab" href="/admin/dashboard/reports">
        Report
      </Link>
      <Link className="tabs-tab" href="/admin/dashboard/reviews">
        Reviews
      </Link>
      <Link className="tabs-tab" href="/admin/dashboard/deals">
        Discount/Deals
      </Link>
      <Link className="tabs-tab" href="/admin/dashboard/emails">
        Email-Marketing
      </Link>
      <Link className="tabs-tab" href="/admin/dashboard/settings">
        Settings
      </Link>
    </div>
  );
}
