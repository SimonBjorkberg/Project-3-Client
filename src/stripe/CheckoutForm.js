import React from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ShoppingCartContext } from "../context/shoppingCart.context";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

import orderService from "../services/order.service";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { userInfo } = useContext(AuthContext);
  const { total, cartProducts } = useContext(ShoppingCartContext);
  const { orderCart } = cartProducts;
  console.log(cartProducts, total)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    await orderService.create({
      products: cartProducts,
      // customer: userInfo._id,
      totalAmount: total,
    });
    if (!error) {
      console.log("Token created: ", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:5005/stripe/charge",
          { amount: total * 100, id: id }
        );
        if (response.data.success) {
          window.location.href = "http://localhost:3000/stripe/thank-you";
        } else if (!response.data.success) {
          window.location.href = "http://localhost:3000/stripe/card-declined";
        }
      } catch (error) {
        console.log("erreur! ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Test Payment</h1>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            hidePostalCode: true,
          }}
        />
        <button>Payment</button>
      </form>
    </>
  );
};
