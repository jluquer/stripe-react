import express from "express";
import stripe from "stripe";
import cors from "cors";

const app = express();
const port = 3000;

const stripe = new Stripe(
  "sk_test_51N8rcWC2MMiJWj7U6dIQm4WAqhdr45F9keyMfRRVDkcOgROZsgBUME8pa35fZUrX9Z8e5Uo0jHBjTOPu7bW8GoYE004O010N3K"
);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.post("/api/checkout", (req, res) => {
  console.log(req.body);
  res.send("received");
});

app.listen(port, () => {
  console.log("Server listening on http://localhost:" + port);
});
