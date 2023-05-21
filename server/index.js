import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
const port = 3000;

const stripe = new Stripe(
  "sk_test_51N8rcWC2MMiJWj7U6dIQm4WAqhdr45F9keyMfRRVDkcOgROZsgBUME8pa35fZUrX9Z8e5Uo0jHBjTOPu7bW8GoYE004O010N3K"
);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  console.log(req.body);
  try {
    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Gamin Keyboard",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
  
    res.send({ message: "success" });
  } catch (err) {
    res.json({message: err.raw.message})
  }
});

app.listen(port, () => {
  console.log("Server listening on http://localhost:" + port);
});
