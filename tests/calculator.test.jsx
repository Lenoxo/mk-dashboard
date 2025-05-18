import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, test } from "vitest";

const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];

const operations = ["+", "-", "*", "/"];

const Calculator = () => {
  const [value, setValue] = useState("");

  const handleButtonPress = (newValue) => setValue(value.concat(newValue));

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
      </div>
    </section>
  );
};

describe("Calculator", () => {
  afterEach(cleanup);
  test("should render", () => {
    render(<Calculator />);
  });

  test("should show title", () => {
    render(<Calculator />);

    screen.getByText("Calculator");
  });

  test("should show numbers", () => {
    render(<Calculator />);
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    numbers.forEach((number) => {
      screen.getByText(number);
    });
  });

  test("should show 4 rows for numbers", () => {
    render(<Calculator />);

    expect(screen.getAllByRole("row").length).toBe(4);
  });

  test("should show an input element", () => {
    render(<Calculator />);

    screen.getByRole("textbox");
  });

  test("should show the value in the input element when pressing 1 button", () => {
    render(<Calculator />);

    const button1 = screen.getByText("1");
    fireEvent.click(button1);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("1");
  });

  test("should show the value in the input element when pressing several buttons", () => {
    render(<Calculator />);

    const button1 = screen.getByText("1");
    fireEvent.click(button1);
    const button2 = screen.getByText("2");
    fireEvent.click(button2);
    const button3 = screen.getByText("3");
    fireEvent.click(button3);
    const button4 = screen.getByText("4");
    fireEvent.click(button4);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("1234");
  });

  test("should show the value in the input element when pressing several buttons and the operation", () => {
    render(<Calculator />);

    const button4 = screen.getByText("4");
    fireEvent.click(button4);

    const addition = screen.getByText("+");
    fireEvent.click(addition);

    const button2 = screen.getByText("2");
    fireEvent.click(button2);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("4+2");
  });
});
