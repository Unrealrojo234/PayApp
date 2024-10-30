import { useEffect, useState } from "react";

//Importing API
const api = import.meta.env.VITE_REACT_API_PAY;

//Website Url
const webUrl = "pay-app-two.vercel.app";

export default function App() {
  const [inputNumber, setInputNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleInputNumber = (e) => {
    setInputNumber((inputNumber) => e.target.value);
  };

  const handleAmount = (e) => {
    setAmount((amount) => e.target.value);
  };

  const handlePay = (e) => {
    e.preventDefault();

    let payOut = `${api}/transact/${inputNumber}/${amount}/${webUrl}`;

    console.log(payOut);

    fetch(payOut)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("Error", error));
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-primary">M-PESA STK PUSH CHAP CHAP!</h1>
      <hr />
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
