import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getInfo = "https://stg.dhunjam.in/account/admin/4";

const Admin: React.FC = () => {
  const element = document.getElementById("bar");

  const [post, setPost] = useState(null);

  const [disabled, setDisabled] = useState(false);
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == "true") {
      setDisabled(true);
      element!.style.display = "none";
    } else {
      setDisabled(false);
      element!.style.display = "block";
    }
  };

  const labels = [
    "Custom",
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
  ];
  // const [dt, setdt] = useState<string[]>([]);
  const [cat_6, setCat_6] = useState("");
  const [cat_7, setCat_7] = useState("");
  const [cat_8, setCat_8] = useState("");
  const [cat_9, setCat_9] = useState("");
  const [cat_10, setCat_10] = useState("");

  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Amount",
        data: [cat_6, cat_7, cat_8, cat_9, cat_10],
        backgroundColor: ["rgb(102, 63, 217)"],
        borderColor: ["rgb(153, 102, 255)"],
        borderWidth: 1,
      },
    ],
  });

  const handleEvent = async () => {
    try {
      const response = await fetch(getInfo, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: {
            category_6: cat_6,
            category_7: cat_7,
            category_8: cat_8,
            category_9: cat_9,
            category_10: cat_10,
          },
        }), // Replace with your request payload
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(JSON.stringify(responseData));
        setData({
          ...data,
          datasets: [
            {
              ...data.datasets[0],
              data: [cat_6, cat_7, cat_8, cat_9, cat_10],
            },
          ],
        });
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get(getInfo).then((response) => {
      setPost(response.data);
      setCat_6(response.data.data.amount.category_6);
      setCat_7(response.data.data.amount.category_7);
      setCat_8(response.data.data.amount.category_8);
      setCat_9(response.data.data.amount.category_9);
      setCat_10(response.data.data.amount.category_10);
      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: [cat_6, cat_7, cat_8, cat_9, cat_10],
          },
        ],
      });
    });
  }, []);

  if (!post) return null;

  return (
    <>
      <div className="login-div">
        <h1>Social, Hebbal on Dhun Jam</h1>
        <div className="grid">
          <div>
            <p>Do you want to change your customers for requesting songs?</p>
          </div>
          <div className="radio">
            <label className="radio-inline">
              <input
                type="radio"
                name="radio"
                value="false"
                onChange={radioHandler}
              />
              Yes
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="radio"
                value="true"
                onChange={radioHandler}
              />
              No
            </label>
          </div>
          <div>Custom song request amount-</div>
          <div className="custom-amount">
            <input
              type="number"
              min="99"
              placeholder="99"
              onChange={(e) => {
                setCat_6(e.target.value);
                handleEvent();
              }}
              disabled={disabled}
            />
          </div>
          <div>Regular song request amounts, from high to low-</div>
          <div className="regular-amount">
            <input
              type="number"
              min="79"
              placeholder="79"
              onChange={(e) => {
                setCat_7(e.target.value);
                handleEvent();
              }}
              disabled={disabled}
            />
            <input
              type="number"
              min="59"
              placeholder="59"
              onChange={(e) => {
                setCat_8(e.target.value);
                handleEvent();
              }}
              disabled={disabled}
            />
            <input
              type="number"
              min="39"
              placeholder="39"
              onChange={(e) => {
                setCat_9(e.target.value);
                handleEvent();
              }}
              disabled={disabled}
            />
            <input
              type="number"
              min="99"
              placeholder="19"
              onChange={(e) => {
                setCat_10(e.target.value);
                handleEvent();
              }}
              disabled={disabled}
            />
          </div>
        </div>

        <div className="bar" id="bar">
          <Bar data={data} />
        </div>
        <div>
          <button>Save</button>
        </div>
      </div>
    </>
  );
};

export default Admin;
