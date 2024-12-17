import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllOrdersOfShop } from "@/redux/actions/order";
import { getAllProductShop } from "@/redux/actions/product";

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const [loading, setLoading] = useState(true); // Added loading state
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const [totalEarning, setTotalEarning] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [productsku, setProductsku] = useState([]);

  useEffect(() => {
    if (seller?._id) {
      setLoading(true);
      dispatch(getAllOrdersOfShop(seller._id));
      dispatch(getAllProductShop(seller._id));
    }
  }, [dispatch, seller]);

  useEffect(() => {
    if (orders) {
      const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const orderData = sortedOrders.filter((item) => item.status === "Delivered");
      setDeliveredOrder(orderData);
    }
  }, [orders]);

  useEffect(() => {
    if (deliveredOrder) {
      const total = deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);
      setTotalEarning(total);
    }
  }, [deliveredOrder]);

  useEffect(() => {
    if (deliveredOrder) {
      let salesData = [];
      let skutoupd = [];
      let nametoupd = [];

      // Extract SKU and product names
      deliveredOrder.forEach((order) => {
        order.cart.forEach((item) => {
          if (item.skuid && item.name) {
            skutoupd.push(item.skuid);
            nametoupd.push(item.name);
          }
        });
        salesData.push(order.totalPrice);
      });

      const uniqueSkus = [...new Set(skutoupd)];
      const uniqueNames = [...new Set(nametoupd)];

      setProductsku(uniqueSkus);
      setProductNames(uniqueNames);
      setOrderData(salesData);
      setLoading(false); // Set loading to false once data is processed
    }
  }, [deliveredOrder]);

  const chartData = useMemo(() => {
    if (orderData.length === 0 || productsku.length === 0 || productNames.length === 0) return null;

    return {
      labels: productsku, // Using SKU values for the X-axis
      datasets: [
        {
          label: `Total Sales (₹${totalEarning.toFixed(2)})`,
          data: orderData,
          fill: true,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          borderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
          tension: 0.3,
        },
      ],
    };
  }, [orderData, productsku, productNames]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: "Total Sales Overview (₹)",
        font: { size: 14 },
        color: "#333",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `₹${tooltipItem.raw.toFixed(2)}`,
          title: (tooltipItems) =>
            productNames[tooltipItems[0].dataIndex] || "Unknown Product", // Display product name in tooltip
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Product SKUs",
          color: "#555",
          font: { size: 12 },
        },
      },
      y: {
        title: {
          display: true,
          text: "Sales (₹)",
          color: "#555",
          font: { size: 12 },
          weight: "bold",
        },
        ticks: {
          callback: (value) => `₹${value}`,
        },
        beginAtZero: true,
      },
    },
  };

  // Skeleton Loader
  if (loading) {
    return (
      <div className="border border-gray-100 bg-white shadow-lg rounded-[10px]  space-y-4 p-4">
        <div className="w-1/3 h-6 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-full h-72 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div className="w-full h-[430px] border border-gray-100 bg-white !shadow-xl rounded-[10px] p-4 flex flex-col items-center">
      <div className="w-full h-[400px] cursor-pointer">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SalesChart;
