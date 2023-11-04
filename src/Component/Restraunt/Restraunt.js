import "./Restraunt.css";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Restaurant = () => {
  const [itemData, setItemData] = useState([]);
  useEffect(() => {
    apiCalling();
  }, []);
  const apiCalling = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const request = await axios.get(
      "https://staging.fastor.in/v1/m/restaurant?city_id=118&&",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Request", request.data);
    setItemData(request.data);
  };

  return (
    <div className="main-retaurant-container">
      <Header />
      <div className="your-taste-container">
        <b>Your Taste</b>
        <p>see all</p>
      </div>
      <div className="your-taste-image-container">
        <div className="image-container">
          <img
            className="images"
            src={"https://source.unsplash.com/random/900×700/?cake"}
            alt="img"
          />
          <div className="inner-image-container">
            <b>Nik Baker's</b>
            <p>connaught place, New Delhi</p>
          </div>
        </div>
        <div className="image-container">
          <img
            className="images"
            src={"https://source.unsplash.com/random/900×700/?cake"}
            alt="img"
          />
          <div className="inner-image-container">
            <b>It's Bake</b>
            <p>connaught place, New Delhi</p>
          </div>
        </div>
        <div className="image-container">
          <img
            className="images"
            src={"https://source.unsplash.com/random/900×700/?cake"}
            alt="img"
          />
          <div className="inner-image-container">
            <b>Cakery Bakers</b>
            <p>connaught place, New Delhi</p>
          </div>
        </div>
      </div>
      <b>Populars ones</b>
      <div className="popular-ones-container">
        {itemData.map((item) => {
          return (
            <div key={item.restaurant_id}>
              <Link to={`/restaurant/${item.restaurant_id}`}>
                <img
                  src={
                    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                  }
                  alt="img"
                />
              </Link>
              <div>
                <div>
                  <b>{item.restaurant_name}</b>
                  <p> cake, pasty, pastas</p>
                  <p>{item?.location?.location_address_2}</p>
                </div>
                <div>
                  <p> ★{item.rating.restaurant_avg_rating} Popularity</p>
                  <p>
                    {item.currency.symbol}
                    {item.avg_cost_for_two} cost for two
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Restaurant;
