import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const Checkout = () => {
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const from = event.target;
    const name = `${from.firstName.value} ${from.lastName.value}`;
    const phone = from.phone.value;
    const email = user?.email || "unregister";
    const message = from.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };
   

    // if (phone.length > 10) {
    //   alert("Phone Number should be 10 characters or longer");
    // }

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.acknowledged){
        alert('Order placed successfully')
        from.reset()
        }
        console.log(data)
      })
      .catch((error) => console.error(error))

      
  };
  return (
    <div>
      <form  onSubmit={handlePlaceOrder}>
        <h2 className="text-4xl">You are about to order: {title}</h2>
        <h4 className="text-3xl">Price: {price}</h4>
        <div className="grid grid-cols1 lg:grid-cols-2 gap-4 mb-5">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input  w-full max-full input-bordered"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input  w-full max-full input-bordered"
          />
          <input
            name="phone"
            type="text"
            placeholder="Your Phone "
            required
            className="input  w-full max-full input-bordered"
          />
          <input
            name="email"
            type="email"
            defaultValue={user?.email}
            placeholder="Your Email"
            className="input  w-full max-full input-bordered"
            readOnly
          />
        </div>
        <textarea
          name="message"
          placeholder="Your message"
          className="textarea textarea-bordered textarea-lg w-full"
        ></textarea>
        <input className="btn" type="submit" value="Place Your Order" />
      </form>
    </div>
  );
};

export default Checkout;
