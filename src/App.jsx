import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

//Importing API
const api = import.meta.env.VITE_REACT_API_PAY;

//Website Url
const webUrl = import.meta.env.VITE_REACT_API_WEB_URL;

export default function App() {
  const [inputNumber, setInputNumber] = useState("");
  const [amount, setAmount] = useState("");
  const invoiceId = useRef("");
  const status = useRef([]);
  const count = useRef(0);

  //Making Loader hidden on page load
  useEffect(() => {
    $("#loader-container").css("visibility", "hidden");
  }, []);

  const clearFields = () => {
    setTimeout(() => {
      setInputNumber((inputNumber) => "");
      setAmount((amount) => "");
    }, 2000);
  };

  const handleInputNumber = (e) => {
    setInputNumber((inputNumber) => e.target.value);
  };

  const handleAmount = (e) => {
    setAmount((amount) => e.target.value);
  };

  //Calls stk push api
  const handlePay = (e) => {
    e.preventDefault();

    clearFields(); //Clears the fields after 2s

    let payOut = `${api}/transact/${inputNumber}/${amount}/${webUrl}`;

    fetch(payOut)
      .then((res) => res.json())
      .then((data) => {
        if (
          data.invoice.state == "PENDING" ||
          data.invoice.state == "PROCESSING"
        ) {
          $("#loader-container").css("visibility", "visible");

          invoiceId.current = data.invoice.invoice_id;
        }
        //console.log(invoiceId.current);

        //Payment status API
        const paymentStatus = `${api}/status/${invoiceId.current}`;

        setTimeout(() => {
          do {
            setInterval(() => {
              fetch(paymentStatus)
                .then((res) => res.json())
                .then((data) => {
                  status.current = data;
                  //console.log(status.current);
                  if (
                    status.current.invoice.state != "PROCESSING" ||
                    status.current.invoice.failed_reason ==
                      "Request cancelled by user" ||
                    status.current.invoice.state != "PENDING"
                  ) {
                    $("#loader-container").css("visibility", "hidden");
                  }

                  //Alerts when the payment request has been cancelled by the user
                  else if (
                    status.current.invoice.failed_reason ==
                    "Request cancelled by user"
                  ) {
                    alert("Request Cancelled By User!");
                  } else if (status.current.invoice.state == "SUCCESS") {
                    alert("Payment made successfully");
                  }
                })
                .catch((error) => console.log("Error ", error));
            }, 3000);
          } while (
            status.current.invoice.failed_reason != "Request cancelled by user"
          );
        }, 3000);
      })
      .catch((error) => console.log("Error ", error));
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-secondary">M-PESA STK PUSH CHAP CHAP!</h1>
      <hr />
      <Loader />
      <form
        action="submit"
        onSubmit={handlePay}
        className="form-control"
        style={{
          maxWidth: "32rem",
          display: "block",
          margin: "auto",
          padding: "16px",
        }}
      >
        <input
          type="number"
          className="form-control"
          required
          value={inputNumber}
          onChange={handleInputNumber}
          placeholder="Your Number: e.g 2547********"
        />
        <br />
        <input
          type="number"
          className="form-control"
          required
          value={amount}
          onChange={handleAmount}
          placeholder="Amount: e.g 100"
        />
        <br />
        <div className="text-center">
          <button type="submit" className="btn btn-secondary">
            PAY
          </button>
        </div>
      </form>
    </div>
  );
}
