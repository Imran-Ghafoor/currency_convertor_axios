import { useState } from "react";
import { currencyConvertor } from "./api/postApi";

const App = () => {
  const [amount, setAmount] = useState(0); // amount to convert
  const [fromCurrency, setFromCurrency] = useState("USD"); // base currency
  const [toCurrency, setToCurrency] = useState("PKR"); // target currency
  const [convertedAmount, setConvertedAmount] = useState(null); // converted

  const [loading, setLoading] = useState(false); //loading state
  const [error, setError] = useState(null); //error state

  // handleConvertCurrency

  const handleConvertCurrency = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await currencyConvertor(fromCurrency, toCurrency, amount);
      const { conversion_result } = await res.data;
      setLoading(false);
      setConvertedAmount(conversion_result);
      console.log(conversion_result);
    } catch (error) {
      setError("Error fetching conversion rate");
      console.log(error);
    }
  };

  return (
    <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1>
        <div>
          <label htmlFor="currency_amount">
            Amount:
            <input
              type="number"
              id="currency_amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>
        <div className="currency-selector">
          <div>
            <label>
              From:
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
                <option value="PKR">PKR</option>
                <option value="SAR">SAR</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              To:
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                <option value="PKR">PKR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
                <option value="SAR">SAR</option>
              </select>
            </label>
          </div>
        </div>
        <button
          disabled={loading || amount <= 0}
          onClick={handleConvertCurrency}
        >
          {loading ? "Converting" : "Convert"}
        </button>

        <hr />
        {convertedAmount && (
          <div>
            <h2>
              {amount} {fromCurrency}={convertedAmount.toFixed(2)}
              {toCurrency}
            </h2>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </section>
  );
};
export default App;
