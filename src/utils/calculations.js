import { OPERATORS } from "../constants/calculatorConstants";

export const calculate = (firstValue, secondValue, operator) => {
  const a = parseFloat(firstValue);
  const b = parseFloat(secondValue);

  if (isNaN(a) || isNaN(b)) return "Error";

  switch (operator) {
    case OPERATORS.ADD:
      return a + b;
    case OPERATORS.SUBTRACT:
      return a - b;
    case OPERATORS.MULTIPLY:
      return a * b;
    case OPERATORS.DIVIDE:
      return b === 0 ? "Error" : a / b;
    default:
      return secondValue;
  }
};

export const calculateSquareRoot = (value) => {
  const num = parseFloat(value);
  if (num < 0) return "Error";
  return Math.sqrt(num);
};

export const calculatePercentage = (value, previousValue) => {
  if (!previousValue) return value / 100;
  return (previousValue * value) / 100;
};

export const negateValue = (value) => {
  return (-1 * parseFloat(value)).toString();
};

export const calculateSquare = (value) => {
  const num = parseFloat(value);
  return (num * num).toString();
};

export const calculateReciprocal = (value) => {
  const num = parseFloat(value);
  if (num === 0) return "Error";
  return (1 / num).toString();
};
