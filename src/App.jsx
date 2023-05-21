import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51N8rcWC2MMiJWj7UqRqJETMvPrmR25HMXt8ye1cpl8zhyboEWtPuhQotiHrwTuBXjv49TvMssWW86SYvr5dWsyrO001Lc4ewHg"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("http://localhost:3000/api/checkout", {
          id,
          amount: 100 * 100,
        });
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src="https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_94456450/fee_786_587_png"
        alt="k68 keyboard"
        className="img-fluid"
      />
      <h3 className="text-center">Price: 100$</h3>
      <div className="form-group mb-3">
        <CardElement className="form-control" />
      </div>
      <button className="btn btn-success" disabled={!stripe}>
        {!loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Buy"
        )}
      </button>
    </form>
  );
};

function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <div className="container p-4">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <CheckoutForm />
            </div>
          </div>
        </div>
      </Elements>
    </>
  );
}

export default App;
