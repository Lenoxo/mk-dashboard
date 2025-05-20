import { useState } from "react";

const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];
const operations = ["+", "-", "*", "/"];
const Calculator = () => {
  const [value, setValue] = useState("");

  const handleButtonPress = (newValue) => setValue(value.concat(newValue));
  const handleEqualSignPress = (op) => {
    const result = eval(op);
    setValue(result);
  };

  return (
    <section>
      <h1>Calculator</h1>
      <input value={value} readOnly />
      <div role="grid">
        {rows.map((row, index) => {
          return (
            <div key={index} role="row">
              {row.map((num) => {
                return (
                  <button onClick={() => handleButtonPress(num)} key={num}>
                    {num}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <div role="column">
        {operations.map((op) => {
          return (
            <button onClick={() => handleButtonPress(op)} key={op}>
              {op}
            </button>
          );
        })}
        <button onClick={() => handleEqualSignPress(value)}>=</button>
      </div>
    </section>
  );
};

export { Calculator };
