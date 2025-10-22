import { useState, useEffect } from "react";
import {
  negateValue,
  calculate,
  calculateSquareRoot,
  calculatePercentage,
  calculateSquare,
  calculateReciprocal,
} from "../utils/calculations";
import { OPERATORS } from "../constants/calculatorConstants";
import { formatExpression, formatNumber } from "../utils/formatters";

const useCalculator = () => {
  // Basic states
  const [currentInput, setCurrentInput] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [displayExpression, setDisplayExpression] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState([]);

  // Handler for number inputs (0-9)
  const handleNumber = (num) => {
    if (waitingForOperand) {
      setCurrentInput(num);
      setWaitingForOperand(false);
    } else {
      setCurrentInput(currentInput === "0" ? num : currentInput + num);
    }
  };

  // Handler for decimal point
  const handleDecimal = () => {
    if (waitingForOperand) {
      setCurrentInput("0.");
      setWaitingForOperand(false);
    } else if (!currentInput.includes(".")) {
      setCurrentInput(currentInput + ".");
    }
  };

  // Handler for operators (+, -, *, /)
  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(currentInput);

    // If there's no previous value, move current input to previous
    if (previousValue === null) {
      setPreviousValue(inputValue);
      // update display to show the moved value and operator
      setDisplayExpression(formatExpression(inputValue, nextOperator));
    } else if (operator) {
      // If there's already an operator, compute intermediate result
      const result = calculate(previousValue, inputValue, operator);

      // Add the completed calculation to history
      const expression = `${previousValue} ${operator} ${inputValue} =`;
      addToHistory(expression, result);

      setPreviousValue(result);
      setCurrentInput(String(result));
      // Important: update expression to show the computed result followed by the new operator
      setDisplayExpression(formatExpression(result, nextOperator));
    } else {
      // No pending operator but have a previous value (edge cases)
      setDisplayExpression(formatExpression(previousValue, nextOperator));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  // Handler for equals (=)
  const handleEqual = () => {
    if (previousValue === null || operator === null) {
      // If there's no operation pending, just add the current number to history
      const currentValue = parseFloat(currentInput);
      const expression = `${formatNumber(currentInput)} =`;
      addToHistory(expression, currentValue);
      return;
    }

    const inputValue = parseFloat(currentInput);
    const result = calculate(previousValue, inputValue, operator);
    const expression = `${previousValue} ${operator} ${inputValue} =`;

    addToHistory(expression, result);

    setCurrentInput(String(result));
    setPreviousValue(null);
    setOperator(null);
    setDisplayExpression(expression);
    setWaitingForOperand(true);
  };

  // Handler for clear (C)
  const handleClear = () => {
    setCurrentInput("0");
    setPreviousValue(null);
    setOperator(null);
    setDisplayExpression("");
    setWaitingForOperand(false);
  };

  // Handler for clear entry (CE)
  const handleClearEntry = () => {
    setCurrentInput("0");
    setWaitingForOperand(false);
  };

  // Handler for backspace (←)
  const handleBackspace = () => {
    if (currentInput.length > 1) {
      setCurrentInput(currentInput.slice(0, -1));
    } else {
      setCurrentInput("0");
    }
  };

  // Function to add to history (add new items to the top as a stack)
  const addToHistory = (expression, result) => {
    setHistory((prev) => [
      {
        calculation: expression,
        result: formatNumber(String(result)),
      },
      ...prev,
    ]);
  };

  // Handler for square root (√)
  const handleSquareRoot = () => {
    const formatted = formatNumber(currentInput);
    const result = calculateSquareRoot(currentInput);
    const expression = `√(${formatted})`;

    setCurrentInput(String(result));
    setDisplayExpression(expression);
    setWaitingForOperand(true);

    addToHistory(expression, result);
  };

  // Handler for percentage (%)
  const handlePercent = () => {
    const result = calculatePercentage(parseFloat(currentInput));
    setCurrentInput(String(result));
  };

  // Handler for negate (±)
  const handleNegate = () => {
    setCurrentInput(negateValue(currentInput));
  };

  // Handler for square (x²)
  const handleSquare = () => {
    const formatted = formatNumber(currentInput);
    const result = calculateSquare(currentInput);
    const expression = `(${formatted})²`;

    setCurrentInput(String(result));
    setDisplayExpression(expression);
    setWaitingForOperand(true);

    addToHistory(expression, result);
  };

  // Handler for reciprocal (1/x)
  const handleReciprocal = () => {
    const formatted = formatNumber(currentInput);
    const result = calculateReciprocal(currentInput);
    const expression = `1/(${formatted})`;

    setCurrentInput(String(result));
    setDisplayExpression(expression);
    setWaitingForOperand(true);

    addToHistory(expression, result);
  };

  // Keyboard support
  const handleKeyPress = (event) => {
    event.preventDefault();
    const { key } = event;

    // Numbers
    if (/^[0-9]$/.test(key)) {
      handleNumber(key);
      return;
    }

    // Operators
    switch (key) {
      case ".":
        handleDecimal();
        break;
      case "+":
        handleOperator(OPERATORS.ADD);
        break;
      case "-":
        handleOperator(OPERATORS.SUBTRACT);
        break;
      case "*":
        handleOperator(OPERATORS.MULTIPLY);
        break;
      case "/":
        handleOperator(OPERATORS.DIVIDE);
        break;
      case "Enter":
      case "=":
        handleEqual();
        break;
      case "Escape":
        handleClear();
        break;
      case "Delete":
        handleClearEntry();
        break;
      case "Backspace":
        handleBackspace();
        break;
    }
  };

  // Set up keyboard listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentInput, previousValue, operator, waitingForOperand]);

  // Memory Functions
  const handleMC = () => {
    setMemory([]); // Clear all memory
  };

  // Handler to clear history
  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleMR = () => {
    if (memory.length > 0) {
      setCurrentInput(memory[0].toString()); // Recall last memory value
      setWaitingForOperand(true);
    }
  };

  const handleMAdd = () => {
    const currentValue = parseFloat(currentInput);
    if (memory.length === 0) {
      setMemory([currentValue]);
    } else {
      const newValue = memory[0] + currentValue;
      // Update the top value and keep the stack order
      setMemory([newValue, ...memory.slice(1)]);
    }
    setWaitingForOperand(true);
  };

  const handleMSubtract = () => {
    const currentValue = parseFloat(currentInput);
    if (memory.length === 0) {
      setMemory([-currentValue]);
    } else {
      const newValue = memory[0] - currentValue;
      // Update the top value and keep the stack order
      setMemory([newValue, ...memory.slice(1)]);
    }
    setWaitingForOperand(true);
  };

  const handleMS = () => {
    const currentValue = parseFloat(currentInput);
    // Already using stack behavior (adding to the top)
    setMemory((prev) => [currentValue, ...prev]);
    setWaitingForOperand(true);
  };

  return {
    currentInput,
    displayExpression,
    handleNumber,
    handleDecimal,
    handleOperator,
    handleEqual,
    handleClear,
    handleClearEntry,
    handleBackspace,
    handleSquareRoot,
    handlePercent,
    handleNegate,
    handleSquare,
    handleReciprocal,
    history,
    memory,
    handleMC,
    handleMR,
    handleMAdd,
    handleMSubtract,
    handleMS,
    handleClearHistory,
  };
};

export default useCalculator;
