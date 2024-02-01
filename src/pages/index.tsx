import Image from "next/image";
import { Inter } from "next/font/google";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  ScatterController,
  CategoryScale,
  LinearScale,
  Chart,
  PointElement,
  LineElement,
  DoughnutController,
  ArcElement,
  Legend,
  Tooltip,
} from "chart.js";

// Register the required controllers and elements
Chart.register(
  ScatterController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  DoughnutController,
  CategoryScale,
  LinearScale,
  ArcElement,
  Legend,
  Tooltip
);

// Register the required plugins
Chart.register(CategoryScale, LinearScale);

export default function Home() {
  const [graph, setGraph] = useState<Array<{ x: string; y: number }>>();
  const [pieChartData, setPieChartData] =
    useState<Array<{ label: string; value: number }>>();
  const [table, setTable] =
    useState<
      Array<{ id: number; name: string; quantity: number; price: number }>
    >();

  const fetchGraph = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/graph`);
      if (response.ok) {
        const data = await response.json();
        setGraph(data);
        console.log(data);
      } else {
        console.error("Error fetching graphs:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching graphs:", error);
    }
  };

  const fetchPie = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/pie-chart`);
      if (response.ok) {
        const data = await response.json();
        setPieChartData(data);
        console.log(data);
      } else {
        console.error("Error fetching pie:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching pie:", error);
    }
  };

  const fetchTable = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/table`);
      if (response.ok) {
        const data = await response.json();
        setTable(data);
        console.log(data);
      } else {
        console.error("Error fetching pie:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching pie:", error);
    }
  };

  useEffect(() => {
    fetchGraph();
    fetchPie();
    fetchTable()
  }, []);

  return (
    <div className="h-screen bg-black  flex flex-row items-center justify-center">
      <div className="w-[20%] bg-[#20263a] h-full flex flex-col items-center justify-around">
        <div className="w-full h-[20%] flex flex-col items-center justify-center">
          <img
            src="/Assets/Briefcase.png
      "
            alt=""
          />
          <img
            src="/Assets/StatBoard.png
      "
            alt=""
          />
        </div>
        <div className="w-full h-[50%] flex flex-col items-end justify-around">
          <div className="w-[80%] h-[15%] bg-white flex flex-row items-center justify-center rounded-l-[10px]">
            <img src="/Assets/Circled Menu.png" alt="" />
            <button className="w-[40%] h-full bg-white rounded-l-[10px]">
              Dashboard
            </button>
          </div>
          <div className="w-[80%] h-[15%] bg-black flex flex-row items-center justify-center rounded-l-[10px]">
            <img src="/Assets/Support.png" alt="" />
            <button className="w-[40%] h-full text-white bg-black rounded-l-[10px]">
              Support
            </button>
          </div>{" "}
          <div className="w-[80%] h-[15%] bg-black flex flex-row items-center justify-center rounded-l-[10px]">
            <img src="/Assets/Circled Menu.png" alt="" />
            <button className="w-[40%] h-full text-white bg-black rounded-l-[10px]">
              Plugins
            </button>
          </div>{" "}
          <div className="w-[80%] h-[15%] bg-black flex flex-row items-center justify-center rounded-l-[10px]">
            <img src="/Assets/Help.png" alt="" />
            <button className="w-[40%] h-full text-white bg-black rounded-l-[10px]">
              Help
            </button>
          </div>{" "}
        </div>
      </div>
      <div className="w-[80%] h-full flex flex-col items-center justify-start bg-[#e8edff]">
        <div className="w-full h-[10%] flex flex-row items-center justify-between bg-[#e8edff]">
          <h1>Good MOrning</h1>
          <div className="w-[15%] h-full border-[2px]"></div>
        </div>
        <div className="w-full h-[45%] flex flex-row items-center justify-between p-4">
          <div className="w-[45%] h-full ">
            <Line
              data={{
                labels: graph ? graph.map((data) => data.x) : [],
                datasets: [
                  {
                    label: "Values",
                    data: graph ? graph.map((data) => data.y) : [],
                    backgroundColor: "#064FF0",
                    borderColor: "#064FF0",
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    type: "category",
                  },
                  y: {
                    beginAtZero: true,
                  },
                },
                elements: {
                  line: {
                    tension: 0.5,
                  },
                },
                plugins: {
                  title: {
                    text: "Custom Graph",
                  },
                },
              }}
            />
          </div>
          <div className="w-[45%] h-full ">
            <Doughnut
              data={{
                labels: pieChartData?.map((data) => data.label) || [],
                datasets: [
                  {
                    data: pieChartData?.map((data) => data.value),
                    backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#4CAF50",
                      "#9966FF",
                    ],
                    hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#4CAF50",
                      "#9966FF",
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    text: "Pie Chart",
                    display: true,
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="w-full h-[45%] flex flex-row items-center justify-between p-4">
          <div className="w-[45%] h-full border border-black">
          <table className="border border-black w-full h-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {table?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
        </div>
      </div>
    </div>
  );
}
