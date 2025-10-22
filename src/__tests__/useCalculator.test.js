import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useCalculator from "../hooks/useCalculator";

describe("Calculator Tests", () => {
  describe("1. Basic Number Input & Display", () => {
    it("should initialize with zero", () => {
      const { result } = renderHook(() => useCalculator());
      expect(result.current.currentInput).toBe("0");
      expect(result.current.displayExpression).toBe("");
    });

    it("should handle multiple digit input", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("1");
      });
      expect(result.current.currentInput).toBe("1");

      act(() => {
        result.current.handleNumber("2");
      });
      expect(result.current.currentInput).toBe("12");

      act(() => {
        result.current.handleNumber("3");
      });
      expect(result.current.currentInput).toBe("123");
    });

    it("should handle leading zero", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("0");
      });
      expect(result.current.currentInput).toBe("0");

      act(() => {
        result.current.handleNumber("5");
      });
      expect(result.current.currentInput).toBe("5");
    });

    it("should handle decimal point", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("1");
      });
      expect(result.current.currentInput).toBe("1");

      act(() => {
        result.current.handleDecimal();
      });
      expect(result.current.currentInput).toBe("1.");

      act(() => {
        result.current.handleNumber("5");
      });
      expect(result.current.currentInput).toBe("1.5");
    });

    it("should prevent multiple decimal points", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("1");
      });
      expect(result.current.currentInput).toBe("1");

      act(() => {
        result.current.handleDecimal();
      });
      expect(result.current.currentInput).toBe("1.");

      act(() => {
        result.current.handleNumber("5");
      });
      expect(result.current.currentInput).toBe("1.5");

      act(() => {
        result.current.handleDecimal(); // trying to add second decimal
      });
      expect(result.current.currentInput).toBe("1.5"); // decimal should be ignored

      act(() => {
        result.current.handleNumber("8");
      });
      expect(result.current.currentInput).toBe("1.58");
    });
    it("should handle decimal point with leading zero", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleDecimal();
      });
      expect(result.current.currentInput).toBe("0.");

      act(() => {
        result.current.handleNumber("5");
      });
      expect(result.current.currentInput).toBe("0.5");
    });
  });

  describe("2. Basic Operations", () => {
    it("should perform addition: 2 + 3 = 5", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("2");
      });
      expect(result.current.currentInput).toBe("2");

      act(() => {
        result.current.handleOperator("+");
      });
      expect(result.current.displayExpression).toBe("2 +");

      act(() => {
        result.current.handleNumber("3");
      });
      expect(result.current.currentInput).toBe("3");

      act(() => {
        result.current.handleEqual();
      });
      expect(result.current.currentInput).toBe("5");
      expect(result.current.displayExpression).toBe("2 + 3 =");
    });

    it("should perform subtraction: 7 - 4 = 3", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("7");
      });
      expect(result.current.currentInput).toBe("7");

      act(() => {
        result.current.handleOperator("-");
      });
      expect(result.current.displayExpression).toBe("7 -");

      act(() => {
        result.current.handleNumber("4");
      });
      expect(result.current.currentInput).toBe("4");

      act(() => {
        result.current.handleEqual();
      });
      expect(result.current.currentInput).toBe("3");
      expect(result.current.displayExpression).toBe("7 - 4 =");
    });

    it("should perform multiplication: 6 * 8 = 48", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("6");
      });
      expect(result.current.currentInput).toBe("6");

      act(() => {
        result.current.handleOperator("*");
      });
      expect(result.current.displayExpression).toBe("6 *");

      act(() => {
        result.current.handleNumber("8");
      });
      expect(result.current.currentInput).toBe("8");

      act(() => {
        result.current.handleEqual();
      });
      expect(result.current.currentInput).toBe("48");
      expect(result.current.displayExpression).toBe("6 * 8 =");
    });

    it("should perform division: 15 / 3 = 5", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("1");
      });
      act(() => {
        result.current.handleNumber("5");
      });
      expect(result.current.currentInput).toBe("15");

      act(() => {
        result.current.handleOperator("/");
      });
      expect(result.current.displayExpression).toBe("15 /");

      act(() => {
        result.current.handleNumber("3");
      });
      expect(result.current.currentInput).toBe("3");

      act(() => {
        result.current.handleEqual();
      });
      expect(result.current.currentInput).toBe("5");
      expect(result.current.displayExpression).toBe("15 / 3 =");
    });

    it("should handle chain operations: 2 + 3 * 4 = 14", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("2");
      });
      expect(result.current.currentInput).toBe("2");

      act(() => {
        result.current.handleOperator("+");
      });
      expect(result.current.displayExpression).toBe("2 +");

      act(() => {
        result.current.handleNumber("3");
      });
      expect(result.current.currentInput).toBe("3");

      act(() => {
        result.current.handleOperator("*");
      });
      // Should calculate previous operation and show intermediate result
      expect(result.current.displayExpression).toBe("5 *");

      act(() => {
        result.current.handleNumber("4");
      });
      expect(result.current.currentInput).toBe("4");

      act(() => {
        result.current.handleEqual();
      });
      expect(result.current.currentInput).toBe("20");
      expect(result.current.displayExpression).toBe("5 * 4 =");
    });

    it("should handle decimal operations: 1.5 + 2.3 = 3.8", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("1");
      });
      act(() => {
        result.current.handleDecimal();
      });
      act(() => {
        result.current.handleNumber("5");
      });
      expect(result.current.currentInput).toBe("1.5");

      act(() => {
        result.current.handleOperator("+");
      });
      expect(result.current.displayExpression).toBe("1.5 +");

      act(() => {
        result.current.handleNumber("2");
      });
      act(() => {
        result.current.handleDecimal();
      });
      act(() => {
        result.current.handleNumber("3");
      });
      expect(result.current.currentInput).toBe("2.3");

      act(() => {
        result.current.handleEqual();
      });
      expect(result.current.currentInput).toBe("3.8");
      expect(result.current.displayExpression).toBe("1.5 + 2.3 =");
    });

    it("should handle division by zero: 5 / 0 = Error", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("5");
      });
      expect(result.current.currentInput).toBe("5");

      act(() => {
        result.current.handleOperator("/");
      });
      expect(result.current.displayExpression).toBe("5 /");

      act(() => {
        result.current.handleNumber("0");
      });
      expect(result.current.currentInput).toBe("0");

      act(() => {
        result.current.handleEqual();
      });
      expect(result.current.currentInput).toBe("Error");
      expect(result.current.displayExpression).toBe("5 / 0 =");
    });
  });

  describe("3. Advanced Operations", () => {
    it("should calculate square: 5² = 25", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("5");
      });
      expect(result.current.currentInput).toBe("5");

      act(() => {
        result.current.handleSquare();
      });
      expect(result.current.currentInput).toBe("25");
    });

    it("should calculate reciprocal: 1/4 = 0.25", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("4");
      });
      expect(result.current.currentInput).toBe("4");

      act(() => {
        result.current.handleReciprocal();
      });
      expect(result.current.currentInput).toBe("0.25");
    });

    it("should calculate square root: √16 = 4", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("1");
      });
      act(() => {
        result.current.handleNumber("6");
      });
      expect(result.current.currentInput).toBe("16");

      act(() => {
        result.current.handleSquareRoot();
      });
      expect(result.current.currentInput).toBe("4");
    });

    it("should handle reciprocal of zero: 1/0 = Error", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("0");
      });
      expect(result.current.currentInput).toBe("0");

      act(() => {
        result.current.handleReciprocal();
      });
      expect(result.current.currentInput).toBe("Error");
    });

    it("should handle square root of negative number: √(-4) = Error", () => {
      const { result } = renderHook(() => useCalculator());

      // First make it -4 using negate function
      act(() => {
        result.current.handleNumber("4");
      });
      act(() => {
        result.current.handleNegate();
      });
      expect(result.current.currentInput).toBe("-4");

      act(() => {
        result.current.handleSquareRoot();
      });
      expect(result.current.currentInput).toBe("Error");
    });

    it("should handle decimal square: (2.5)² = 6.25", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("2");
      });
      act(() => {
        result.current.handleDecimal();
      });
      act(() => {
        result.current.handleNumber("5");
      });
      expect(result.current.currentInput).toBe("2.5");

      act(() => {
        result.current.handleSquare();
      });
      expect(result.current.currentInput).toBe("6.25");
    });

    it("should handle decimal square root: √6.25 = 2.5", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("6");
      });
      act(() => {
        result.current.handleDecimal();
      });
      act(() => {
        result.current.handleNumber("2");
      });
      act(() => {
        result.current.handleNumber("5");
      });
      expect(result.current.currentInput).toBe("6.25");

      act(() => {
        result.current.handleSquareRoot();
      });
      expect(result.current.currentInput).toBe("2.5");
    });
  });

  describe("4. Memory Operations", () => {
    it("should store value in memory: MS", () => {
      const { result } = renderHook(() => useCalculator());

      act(() => {
        result.current.handleNumber("1");
      });
      act(() => {
        result.current.handleNumber("2");
      });
      act(() => {
        result.current.handleNumber("3");
      });
      expect(result.current.currentInput).toBe("123");

      act(() => {
        result.current.handleMS();
      });
      expect(result.current.memory).toContain(123);
    });

    it("should add value to memory: M+", () => {
      const { result } = renderHook(() => useCalculator());

      // First store 50 in memory
      act(() => {
        result.current.handleNumber("5");
      });
      act(() => {
        result.current.handleNumber("0");
      });
      act(() => {
        result.current.handleMS();
      });
      expect(result.current.memory).toContain(50);

      // Then add 25 to memory (50 + 25 = 75)
      act(() => {
        result.current.handleNumber("2");
      });
      act(() => {
        result.current.handleNumber("5");
      });
      act(() => {
        result.current.handleMAdd();
      });

      // Memory should now contain 75 (result of 50+25)
      expect(result.current.memory).toContain(75);
      expect(result.current.memory.length).toBe(1); // Should only have one value
      expect(result.current.memory[0]).toBe(75);
    });

    it("should subtract value from memory: M-", () => {
      const { result } = renderHook(() => useCalculator());

      // First store 100 in memory
      act(() => {
        result.current.handleNumber("1");
      });
      act(() => {
        result.current.handleNumber("0");
      });
      act(() => {
        result.current.handleNumber("0");
      });
      act(() => {
        result.current.handleMS();
      });
      expect(result.current.memory).toContain(100);

      // Then subtract 30 from memory (100 - 30 = 70)
      act(() => {
        result.current.handleNumber("3");
      });
      act(() => {
        result.current.handleNumber("0");
      });
      act(() => {
        result.current.handleMSubtract();
      });

      // Memory should now contain 70 (result of 100-30)
      expect(result.current.memory).toContain(70);
      expect(result.current.memory.length).toBe(1);
      expect(result.current.memory[0]).toBe(70);
    });

    it("should recall memory value: MR", () => {
      const { result } = renderHook(() => useCalculator());

      // Store 42 in memory
      act(() => {
        result.current.handleNumber("4");
      });
      act(() => {
        result.current.handleNumber("2");
      });
      act(() => {
        result.current.handleMS();
      });
      expect(result.current.memory).toContain(42);

      // Clear current input
      act(() => {
        result.current.handleClear();
      });
      expect(result.current.currentInput).toBe("0");

      // Recall memory
      act(() => {
        result.current.handleMR();
      });
      expect(result.current.currentInput).toBe("42");
    });

    it("should clear memory: MC", () => {
      const { result } = renderHook(() => useCalculator());

      // Store some values in memory first
      act(() => {
        result.current.handleNumber("1");
      });
      act(() => {
        result.current.handleNumber("0");
      });
      act(() => {
        result.current.handleMS();
      });

      act(() => {
        result.current.handleNumber("2");
      });
      act(() => {
        result.current.handleNumber("0");
      });
      act(() => {
        result.current.handleMAdd();
      });

      // Memory should have values
      expect(result.current.memory.length).toBeGreaterThan(0);

      // Clear memory
      act(() => {
        result.current.handleMC();
      });
      expect(result.current.memory).toEqual([]);
      expect(result.current.memory.length).toBe(0);
    });

    it("should handle memory operations with decimal numbers", () => {
      const { result } = renderHook(() => useCalculator());

      // Store 3.14 in memory
      act(() => {
        result.current.handleNumber("3");
      });
      act(() => {
        result.current.handleDecimal();
      });
      act(() => {
        result.current.handleNumber("1");
      });
      act(() => {
        result.current.handleNumber("4");
      });
      act(() => {
        result.current.handleMS();
      });
      expect(result.current.memory).toContain(3.14);

      // Add 2.86 to memory (3.14 + 2.86 = 6)
      act(() => {
        result.current.handleNumber("2");
      });
      act(() => {
        result.current.handleDecimal();
      });
      act(() => {
        result.current.handleNumber("8");
      });
      act(() => {
        result.current.handleNumber("6");
      });
      act(() => {
        result.current.handleMAdd();
      });
      expect(result.current.memory).toContain(6);
      expect(result.current.memory[0]).toBe(6);
    });

    it("should handle memory recall when memory is empty", () => {
      const { result } = renderHook(() => useCalculator());

      // Ensure memory is empty
      act(() => {
        result.current.handleMC();
      });
      expect(result.current.memory).toEqual([]);

      // Try to recall from empty memory
      act(() => {
        result.current.handleMR();
      });
      // Should remain at current value (0 by default)
      expect(result.current.currentInput).toBe("0");
    });

    it("should handle complex memory operations sequence", () => {
      const { result } = renderHook(() => useCalculator());

      // Store 10
      act(() => {
        result.current.handleNumber("1");
      });
      act(() => {
        result.current.handleNumber("0");
      });
      act(() => {
        result.current.handleMS();
      });
      expect(result.current.memory[0]).toBe(10);

      // Add 5 (memory becomes 15)
      act(() => {
        result.current.handleNumber("5");
      });
      act(() => {
        result.current.handleMAdd();
      });
      expect(result.current.memory[0]).toBe(15);

      // Subtract 3 (memory becomes 12)
      act(() => {
        result.current.handleNumber("3");
      });
      act(() => {
        result.current.handleMSubtract();
      });
      expect(result.current.memory[0]).toBe(12);

      // Recall should give us 12
      act(() => {
        result.current.handleMR();
      });
      expect(result.current.currentInput).toBe("12");

      // Memory should only contain the final result
      expect(result.current.memory.length).toBe(1);
      expect(result.current.memory[0]).toBe(12);
    });
  });

  describe("5. History Management", () => {
    it("should add calculation to history", () => {
      const { result } = renderHook(() => useCalculator());

      // Perform a simple calculation: 5 + 3 = 8
      act(() => {
        result.current.handleNumber("5");
      });
      act(() => {
        result.current.handleOperator("+");
      });
      act(() => {
        result.current.handleNumber("3");
      });
      act(() => {
        result.current.handleEqual();
      });

      // Check if calculation was added to history
      expect(result.current.history.length).toBeGreaterThan(0);
      expect(result.current.history[0].calculation).toBe("5 + 3 =");
      expect(result.current.history[0].result).toBe("8");
    });

    it("should accumulate multiple calculations in history", () => {
      const { result } = renderHook(() => useCalculator());

      // First calculation: 10 - 4 = 6
      act(() => {
        result.current.handleNumber("1");
      });
      act(() => {
        result.current.handleNumber("0");
      });
      act(() => {
        result.current.handleOperator("-");
      });
      act(() => {
        result.current.handleNumber("4");
      });
      act(() => {
        result.current.handleEqual();
      });

      // Second calculation: 3 * 2 = 6
      act(() => {
        result.current.handleClear();
      });
      act(() => {
        result.current.handleNumber("3");
      });
      act(() => {
        result.current.handleOperator("*");
      });
      act(() => {
        result.current.handleNumber("2");
      });
      act(() => {
        result.current.handleEqual();
      });

      // History should contain both calculations
      expect(result.current.history.length).toBe(2);
      // History is ordered with newest first (stack), so index 0 is newest
      expect(result.current.history[0].calculation).toBe("3 * 2 =");
      expect(result.current.history[0].result).toBe("6");
      expect(result.current.history[1].calculation).toBe("10 - 4 =");
      expect(result.current.history[1].result).toBe("6");
    });

    it("should clear history when requested", () => {
      const { result } = renderHook(() => useCalculator());

      // Add some calculations to history
      act(() => {
        result.current.handleNumber("7");
      });
      act(() => {
        result.current.handleOperator("+");
      });
      act(() => {
        result.current.handleNumber("8");
      });
      act(() => {
        result.current.handleEqual();
      });

      act(() => {
        result.current.handleNumber("9");
      });
      act(() => {
        result.current.handleOperator("/");
      });
      act(() => {
        result.current.handleNumber("3");
      });
      act(() => {
        result.current.handleEqual();
      });

      // History should have entries
      expect(result.current.history.length).toBeGreaterThan(0);

      // Clear history
      act(() => {
        result.current.handleClearHistory();
      });
      expect(result.current.history).toEqual([]);
      expect(result.current.history.length).toBe(0);
    });
  });
});
