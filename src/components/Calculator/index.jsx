import React from "react";
import useCalculator from "../../hooks/useCalculator";
import { formatNumber } from "../../utils/formatters";
import { OPERATORS } from "../../constants/calculatorConstants";
import "./style.css";

const Calculator = () => {
  const {
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
  } = useCalculator();

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <div className="calculator-type">Standard</div>
      </div>

      <div className="calculator-display">
        <div className="expression">{displayExpression}</div>
        <div className="current-value">{formatNumber(currentInput)}</div>
      </div>

      <div className="calculator-memory">
        <button className="memory-btn">MC</button>
        <button className="memory-btn">MR</button>
        <button className="memory-btn">M+</button>
        <button className="memory-btn">M-</button>
        <button className="memory-btn">MS</button>
      </div>

      <div className="calculator-grid">
        {/* Row 1 */}
        <button className="btn btn-secondary" onClick={handlePercent}>
          %
        </button>
        <button className="btn btn-secondary" onClick={handleClearEntry}>
          CE
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          C
        </button>
        <button className="btn btn-secondary" onClick={handleBackspace}>
          ⌫
        </button>

        {/* Row 2 */}
        <button className="btn btn-secondary" onClick={handleReciprocal}>
          1/x
        </button>
        <button className="btn btn-secondary" onClick={handleSquare}>
          x²
        </button>
        <button className="btn btn-secondary" onClick={handleSquareRoot}>
          √x
        </button>
        <button
          className="btn btn-operator"
          onClick={() => handleOperator(OPERATORS.DIVIDE)}
        >
          ÷
        </button>

        {/* Row 3 */}
        <button className="btn btn-digit" onClick={() => handleNumber("7")}>
          7
        </button>
        <button className="btn btn-digit" onClick={() => handleNumber("8")}>
          8
        </button>
        <button className="btn btn-digit" onClick={() => handleNumber("9")}>
          9
        </button>
        <button
          className="btn btn-operator"
          onClick={() => handleOperator(OPERATORS.MULTIPLY)}
        >
          ×
        </button>

        {/* Row 4 */}
        <button className="btn btn-digit" onClick={() => handleNumber("4")}>
          4
        </button>
        <button className="btn btn-digit" onClick={() => handleNumber("5")}>
          5
        </button>
        <button className="btn btn-digit" onClick={() => handleNumber("6")}>
          6
        </button>
        <button
          className="btn btn-operator"
          onClick={() => handleOperator(OPERATORS.SUBTRACT)}
        >
          -
        </button>

        {/* Row 5 */}
        <button className="btn btn-digit" onClick={() => handleNumber("1")}>
          1
        </button>
        <button className="btn btn-digit" onClick={() => handleNumber("2")}>
          2
        </button>
        <button className="btn btn-digit" onClick={() => handleNumber("3")}>
          3
        </button>
        <button
          className="btn btn-operator"
          onClick={() => handleOperator(OPERATORS.ADD)}
        >
          +
        </button>

        {/* Row 6 */}
        <button className="btn btn-digit" onClick={handleNegate}>
          ±
        </button>
        <button className="btn btn-digit" onClick={() => handleNumber("0")}>
          0
        </button>
        <button className="btn btn-digit" onClick={handleDecimal}>
          .
        </button>
        <button className="btn btn-equals" onClick={handleEqual}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
