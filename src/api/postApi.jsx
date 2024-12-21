import axios from "axios";

const api = axios.create({
  baseURL: "https://v6.exchangerate-api.com/v6/78b1e835d75d1721198f78da",
});

//we need to create get request

export const currencyConvertor = (fromCurrency, toCurrency, amount) => {
  return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
};
