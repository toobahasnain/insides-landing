# Stripe Integration TODO

This file is the single source of truth for completing and deploying the Stripe Checkout integration.

## Values to Replace

The following values are placeholders and must be updated before testing with a real product or going live.

**Files containing placeholders:**
- [server.js](server.js)
- [.env.example](.env.example)

| Field | Current Value | What to Set |
|-------|--------------|-------------|
| `STRIPE_SECRET_KEY` | `sk_test_...` | Your Stripe test secret key for development. Store live keys in your deployment's secret manager, never in source control. |
| `STRIPE_PRICE_ID` / `line_items[].price` | `price_...` | The Stripe Price ID for the one-time product being sold. |
| `success_url` | `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}` | Your actual success page URL. Set `DOMAIN` to your deployed site origin and provide a success page at `/success`; keep the `{CHECKOUT_SESSION_ID}` template. |
| `cancel_url` | `http://localhost:3000/` | The actual page customers should return to after canceling. Set `DOMAIN` to your deployed site origin or adjust the URL in [server.js](server.js). |
| `DOMAIN` | `http://localhost:3000` | The origin of the frontend that customers should return to. |

`mode` is currently set to `payment` as confirmed for this one-time purchase. Change it to `subscription` only if the product is changed to recurring billing. The current implementation intentionally omits `payment_method_collection`, as required for one-time payments.

## Configured Parameters

These Checkout Studio parameters are set in [server.js](server.js).

| Parameter | Value |
|-----------|-------|
| `ui_mode` | `hosted_page` (Stripe Node SDK 23.1.0) |
| `billing_address_collection` | `auto` |
| `phone_number_collection` | `{ enabled: false }` |
| `automatic_tax` | `{ enabled: false }` |
| `allow_promotion_codes` | `false` |
| `submit_type` | `auto` |
| `integration_identifier` | `hosted_web_0001` |
| `origin_context` | `web` |

## Setup and Next Steps

1. Copy `.env.example` to `.env` and set your Stripe test secret key, one-time Price ID, and local frontend origin. `.env` is ignored by Git.
2. Use Node.js 20 or newer, as required by the installed Stripe SDK. Install dependencies with `npm install` if needed; the Express server and Stripe SDK are declared in `package.json`.
3. Start the frontend with `npm start` and the Checkout API with `npm run start:server`. The server listens on port `4242` by default; set `PORT` in the server environment to change it.
4. Connect a checkout action in the frontend to send a `POST` to `/api/create-checkout-session`. In development, configure a proxy or send the request to the server's origin (`http://localhost:4242`). Deploy the API and frontend so the browser can reach the API.
5. Add a success page at `/success` and set `DOMAIN` to the deployed frontend origin. Confirm that the cancel URL returns customers to an appropriate page.
6. Use Stripe test mode and the test card `4242 4242 4242 4242`, any future expiration date, and any three-digit CVC. Switch to live keys and a live Price ID only after testing; configure secrets through the hosting provider.
7. Implement order fulfillment and tracking after payment. Do not treat a redirect alone as proof of payment; verify the Checkout Session server-side and add a signed webhook handler when fulfillment is implemented.

## Project Structure

- [server.js](server.js) — Express server and `POST /api/create-checkout-session` endpoint.
- [.env.example](.env.example) — names and placeholders for the required local environment variables.
- [STRIPE_INTEGRATION_TODO.md](STRIPE_INTEGRATION_TODO.md) — remaining setup and launch checklist.

## Flow Overview

The frontend sends a POST request to the Express endpoint. The server creates a hosted Stripe Checkout Session using the configured Price ID and redirects the customer to Stripe. Stripe returns the customer to the configured success or cancel URL.

## Resources

- [Stripe Support](https://support.stripe.com)
- [Stripe documentation](https://docs.stripe.com/mcp)
