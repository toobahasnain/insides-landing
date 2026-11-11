require("dotenv").config();

const express = require("express");
const Stripe = require("stripe");

function requiredSetting(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be set before starting the checkout server.`);
  }
  return value;
}

const secretKey = requiredSetting("STRIPE_SECRET_KEY");
const priceId = requiredSetting("STRIPE_PRICE_ID");
const domain = requiredSetting("DOMAIN");

if (secretKey === "sk_test_..." || priceId === "price_...") {
  throw new Error("Replace the Stripe placeholders in .env before starting the checkout server.");
}

let siteUrl;
try {
  siteUrl = new URL(domain);
} catch {
  throw new Error("DOMAIN must be an absolute URL, such as http://localhost:3000.");
}

if (siteUrl.protocol !== "http:" && siteUrl.protocol !== "https:") {
  throw new Error("DOMAIN must use the http or https protocol.");
}

const stripe = new Stripe(secretKey);
const app = express();

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "hosted_page",
      mode: "payment",
      billing_address_collection: "auto",
      phone_number_collection: { enabled: false },
      automatic_tax: { enabled: false },
      allow_promotion_codes: false,
      submit_type: "auto",
      integration_identifier: "hosted_web_0001",
      origin_context: "web",
      success_url: `${new URL("/success", siteUrl)}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: new URL("/", siteUrl).toString(),
      line_items: [{ price: priceId, quantity: 1 }],
    });

    if (!session.url) {
      throw new Error("Stripe did not return a hosted Checkout URL.");
    }

    res.redirect(303, session.url);
  } catch (error) {
    console.error("Failed to create a Stripe Checkout Session:", error);
    res.status(500).send("Unable to start checkout. Please try again later.");
  }
});

const port = process.env.PORT || 4242;
app.listen(port, () => {
  console.log(`Stripe Checkout server listening on port ${port}.`);
});
