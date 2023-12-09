import { useEffect } from "react";
import { useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import api from "../../utils/apiConfig";
Chart.register(...registerables);

const DailySalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartColors = {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    borderColor: 'rgba(255, 0, 0, 1)',
    hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
    hoverBorderColor: 'rgba(255, 0, 0, 1)',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/ventas/all");
        setSalesData(response.data.content);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Mostrar un mensaje de error al usuario
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const parseChartData = () => {
    const dailyData = {};

    salesData.forEach((sale) => {
      const date = new Date(sale.fechaVenta).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = 0;
      }
      dailyData[date] += sale.total;
    });

    return Object.values(dailyData);
  };

  const parseChartLabels = () => {
    const uniqueDates = [...new Set(salesData.map(sale => new Date(sale.fechaVenta).toLocaleDateString()))];
    return uniqueDates;
  };

  const data = {
    labels: parseChartLabels(),
    datasets: [
      {
        label: 'Ventas por fecha',
        ...chartColors,
        borderWidth: 1,
        data: parseChartData(),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '80vw', height: '40vh' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DailySalesChart;
