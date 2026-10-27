import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

import { storage } from "../utils/storage";
import useCustomers from "../Hooks/useCustomers";
import useProducts from "../Hooks/useProducts";
import useOrders from "../Hooks/useOrders";

import StatCard from "../Components/dashboard/StatCard";
import RecentOrders, {
  type DashboardOrder,
} from "../Components/dashboard/RecentOrders";

// Keep your existing Customer interface here.

const Dashboard = () => {
  const user = storage.getUser();
  const fullName = user?.fullName?.trim() || "User";

  const { customers } = useCustomers();
  const { products } = useProducts();
  const { orders } = useOrders();

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const totalSales = useMemo(
    () =>
      orders.reduce(
        (total: number, order: DashboardOrder) =>
          total + Number(order.totalCost || 0),
        0
      ),
    [orders]
  );

  const recentOrders = useMemo(
    () =>
      [...orders]
        .sort(
          (a: DashboardOrder, b: DashboardOrder) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .slice(0, 5),
    [orders]
  );

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(
      (item: { _id: string; name: string }) => item._id === customerId
    );

    return customer?.name || customerId || "Unknown";
  };

  const formatCurrency = (value: number) =>
    `Rs. ${value.toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatDate = (date: string) => {
    if (!date) return "-";

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  /*
   * KEEP YOUR EXISTING generatePdf FUNCTION HERE.
   * Do not change its PDF layout or calculations.
   */

  const generatePdf = async () => {
  setIsGeneratingPdf(true);

  try {
    // Paste your existing jsPDF and autoTable code here.
    // Keep the existing PDF layout and calculations unchanged.
  } catch (error) {
    console.error("Failed to generate PDF:", error);
  } finally {
    setIsGeneratingPdf(false);
  }
};

  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: { xs: 23, sm: 26, md: 29 },
            fontWeight: 800,
            lineHeight: 1.25,
            color: "#102c24",
            letterSpacing: "-0.7px",
          }}
        >
          Good morning, {fullName} 👋
        </Typography>

        <Typography sx={{ mt: 0.8, fontSize: 13, color: "#64748b" }}>
          Here's what's happening with your business today.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2.5,
          mb: 3,
        }}
      >
        <StatCard
          title="Total Customers"
          value={customers.length}
          description="All registered customers"
          icon={<PeopleAltOutlinedIcon />}
        />

        <StatCard
          title="Total Products"
          value={products.length}
          description="Products in inventory"
          icon={<Inventory2OutlinedIcon />}
        />

        <StatCard
          title="Total Orders"
          value={orders.length}
          description="Orders placed"
          icon={<ShoppingCartOutlinedIcon />}
        />

        <StatCard
          title="Total Sales"
          value={formatCurrency(totalSales)}
          description="Total sales revenue"
          icon={<AttachMoneyOutlinedIcon />}
        />
      </Box>

      <RecentOrders
        orders={recentOrders}
        getCustomerName={getCustomerName}
        formatDate={formatDate}
        formatCurrency={formatCurrency}
        onGeneratePdf={generatePdf}
        isGeneratingPdf={isGeneratingPdf}
      />
    </Box>
  );
};

export default Dashboard;
