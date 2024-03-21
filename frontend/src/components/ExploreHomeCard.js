import React from "react";
import { useNavigate } from "react-router-dom";

const ExploreHomeCard = ({ home }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(home.home_id);
    navigate(`/home/${home.home_id}`);
  };

  return (
    <div
      className="col-span-1 p-8 rounded-3xl bg-[#b9c1b6]"
      onClick={handleClick}
    >
      <h2>{home.name}</h2>
      <p>Location: {home.location}</p>
      <p>Accommodation Type: {home.accommodationType}</p>
      <p>
        Bedrooms: {home.bedrooms}, Bathrooms: {home.bathrooms}
      </p>
      <p>Rent Amount: ${home.rentAmount}</p>
      <p>Utilities Included: {home.utilitiesIncluded ? "Yes" : "No"}</p>
      <p>Move In Date: {new Date(home.moveInDate).toLocaleDateString()}</p>
      {home.images && home.images.length > 0 && (
        <div>
          {home.images.map((image, index) => (
            <img
              key={index}
              src={`/${image}`}
              alt={`Home ${home.name}`}
              style={{ maxWidth: "100px", marginRight: "10px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreHomeCard;
