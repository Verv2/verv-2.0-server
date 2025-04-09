import stripe from "stripe";
import config from "../../../config";

const stripePayment = async (amount: number) => {
  const roundAmount = Math.round(amount * 100);
  console.log(roundAmount, "amount inside the intent");

  const stripeInstance = new stripe(
    config.stripe.stripe_client_secret as string
  );
  const paymentIntent = await stripeInstance.paymentIntents.create({
    amount: roundAmount * 100,
    currency: "gbp",
    payment_method_types: ["card"],
  });

  return paymentIntent;
};

export const PaymentService = {
  stripePayment,
};
