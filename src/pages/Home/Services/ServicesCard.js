import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServicesCard = ({ services }) => {
  const { _id,img, title, price } = services;
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img className="" src={img} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <div className="flex">
            <p className="font-semibold text-2xl text-orange-600">
              Price : ${price}
            </p>
            <Link to={`/checkout/${_id}`}>
              <button className="btn btn-outline border-none ">
                <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
