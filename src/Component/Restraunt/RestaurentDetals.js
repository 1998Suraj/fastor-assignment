import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./RestaurantDetails.css"; // Import your CSS file

const RestaurantDetails = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    apiCalling(); // Call the API when the component mounts
  }, []);

  const apiCalling = async () => {
    const token = localStorage.getItem("token");
    const request = await axios.get(
      `https://staging.fastor.in/v1/m/restaurant?city_id=118&&`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const output = request.data;
    // Filter the products that match the 'restaurant_id' from the URL
    const matchingProducts = output.filter((item) => item.restaurant_id === id);
    setItemData(matchingProducts); // Update the state with the matching products
  };

  return (
    <div className="restaurant-details-container">
      <h1 className="restaurant-name">Restaurant Details</h1>
      <img
        src={"https://source.unsplash.com/random/900×700/?cake"}
        alt="Restaurant"
        className="restaurant-image"
      />
          {itemData.map((item, index) => {
              return (
                <div className="restaurant-info" key={index}>
                  <h2 className="cafe-name">
                    {item.restaurant_name}
                  </h2>
                  <p className="cafe-address">
                    {item?.location?.location_address_2}
                  </p>
                  <p className="cafe-rating">
                    ★{item.rating.restaurant_avg_rating} Popularity
                  </p>

                  <p className="cafe-description">
                    Our delicate vanilla cake swirled with chocolate and filled
                    with mocha chocolate chip cream and a layer of dark
                    chocolate ganache
                  </p>
                </div>
              );
      })}
    </div>
  );
};

export default RestaurantDetails;
