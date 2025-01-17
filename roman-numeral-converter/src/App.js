import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [number, setNumber] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convertToRoman = (num) => {
    const ref = [
      ["M", 1000],
      ["CM", 900],
      ["D", 500],
      ["CD", 400],
      ["C", 100],
      ["XC", 90],
      ["L", 50],
      ["XL", 40],
      ["X", 10],
      ["IX", 9],
      ["V", 5],
      ["IV", 4],
      ["I", 1],
    ];
    const res = [];

    ref.forEach(([symbol, value]) => {
      while (num >= value) {
        res.push(symbol);
        num -= value;
      }
    });

    return res.join("");
  };

  const validateInput = (numStr, intValue) => {
    if (!numStr || numStr.includes("e") || numStr.includes(".")) {
      setError("Please enter a valid number.");
      return false;
    }
    if (intValue < 1) {
      setError("Please enter a number greater than or equal to 1.");
      return false;
    }
    if (intValue > 3999) {
      setError("Please enter a number less than or equal to 3999.");
      return false;
    }
    return true;
  };

  const handleConvert = (e) => {
    e.preventDefault();
    const int = parseInt(number, 10);

    // Clear any existing error or output
    setError("");
    setOutput("");

    if (validateInput(number, int)) {
      setOutput(convertToRoman(int));
    }
  };

  return (
    <div className="container">
      <h1>Roman Numeral Converter</h1>
      <p className="description">
        Enter a number between 1 and 3999 to convert it into Roman numerals.
      </p>
      <form onSubmit={handleConvert}>
        <label htmlFor="number">Enter a Number:</label>
        <input
          type="number"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="e.g., 1987"
          required
        />
        <button type="submit">Convert</button>
      </form>

      {error && <div className="error">{error}</div>}
      {output && <div className="output">{output}</div>}
    </div>
  );
};

export default App;
