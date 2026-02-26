import { useState, useCallback } from 'react';

interface CalculatorState {
  display: string;
  currentValue: string;
  operator: string | null;
  previousValue: string | null;
  waitingForNewNumber: boolean;
}

const initialState: CalculatorState = {
  display: '0',
  currentValue: '',
  operator: null,
  previousValue: null,
  waitingForNewNumber: false,
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(initialState);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  const evaluateExpression = useCallback((prev: string, op: string, current: string): string => {
    const num1 = parseFloat(prev);
    const num2 = parseFloat(current);

    if (isNaN(num1) || isNaN(num2)) return 'Error';

    let result: number;
    switch (op) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) return 'Error'; // Division by zero
        result = num1 / num2;
        break;
      default:
        return 'Error';
    }
    // Prevent floating point inaccuracies for display, e.g., 0.1 + 0.2 = 0.30000000000000004
    // Limit to a reasonable number of decimal places, e.g., 10
    return parseFloat(result.toFixed(10)).toString();
  }, []);

  const handleNumberClick = useCallback((num: string) => {
    setState(prevState => {
      if (prevState.display === 'Error') {
        return { ...initialState, display: num, currentValue: num };
      }

      if (prevState.waitingForNewNumber) {
        return { ...prevState, currentValue: num, display: num, waitingForNewNumber: false };
      } else {
        const newCurrentValue = prevState.currentValue === '0' ? num : prevState.currentValue + num;
        return { ...prevState, currentValue: newCurrentValue, display: newCurrentValue };
      }
    });
  }, []);

  const handleOperatorClick = useCallback((nextOperator: string) => {
    setState(prevState => {
      if (prevState.display === 'Error') return prevState;

      let newPreviousValue = prevState.previousValue;
      let newDisplay = prevState.display;

      if (prevState.previousValue && prevState.operator && prevState.currentValue) {
        const result = evaluateExpression(prevState.previousValue, prevState.operator, prevState.currentValue);
        if (result === 'Error') {
          return { ...initialState, display: 'Error' };
        }
        newPreviousValue = result;
        newDisplay = result;
      } else if (prevState.currentValue) {
        newPreviousValue = prevState.currentValue;
      }

      return {
        ...prevState,
        previousValue: newPreviousValue,
        operator: nextOperator,
        display: newDisplay, // Display the result or the first number
        waitingForNewNumber: true,
        currentValue: '', // Clear current value for next number input
      };
    });
  }, [evaluateExpression]);

  const handleEqualsClick = useCallback(() => {
    setState(prevState => {
      if (prevState.display === 'Error') return prevState;

      if (prevState.previousValue && prevState.operator && prevState.currentValue) {
        const result = evaluateExpression(prevState.previousValue, prevState.operator, prevState.currentValue);
        if (result === 'Error') {
          return { ...initialState, display: 'Error' };
        }
        return {
          ...initialState,
          display: result,
          currentValue: result,
          waitingForNewNumber: true,
        };
      } else if (prevState.currentValue) {
        // If only a number is entered and '=' is pressed, just display it
        return { ...prevState, display: prevState.currentValue, waitingForNewNumber: true };
      }
      return prevState;
    });
  }, [evaluateExpression]);

  const handleDecimalClick = useCallback(() => {
    setState(prevState => {
      if (prevState.display === 'Error') {
        return { ...initialState, display: '0.', currentValue: '0.' };
      }

      if (prevState.waitingForNewNumber) {
        return { ...prevState, currentValue: '0.', display: '0.', waitingForNewNumber: false };
      } else if (!prevState.currentValue.includes('.')) {
        const newCurrentValue = prevState.currentValue === '' ? '0.' : prevState.currentValue + '.';
        return { ...prevState, currentValue: newCurrentValue, display: newCurrentValue };
      }
      return prevState;
    });
  }, []);

  const handleClearClick = useCallback(() => {
    setState(initialState);
  }, []);

  const handleBackspaceClick = useCallback(() => {
    setState(prevState => {
      if (prevState.display === 'Error') {
        return initialState;
      }

      if (prevState.waitingForNewNumber) {
        // If an operator was just pressed, or equals was pressed,
        // backspace should effectively clear the operator and allow editing the previous number.
        if (prevState.operator && prevState.previousValue) {
          return {
            ...prevState,
            operator: null,
            display: prevState.previousValue, // Revert display to previous number
            currentValue: prevState.previousValue, // Allow editing previous number
            waitingForNewNumber: false,
          };
        } else {
          // If no operator or previous value (e.g., after equals), just reset to '0'
          return { ...initialState, display: '0', currentValue: '' };
        }
      } else {
        // Actively typing a number
        if (prevState.currentValue.length > 1) {
          const newCurrentValue = prevState.currentValue.slice(0, -1);
          return { ...prevState, currentValue: newCurrentValue, display: newCurrentValue };
        } else if (prevState.currentValue.length === 1 || prevState.currentValue === '0.') {
          // If only one digit or '0.', clear to '0'
          return { ...prevState, currentValue: '0', display: '0' };
        }
      }
      return prevState; // No change if currentValue is '0' and backspace is pressed
    });
  }, []);

  return {
    display: state.display,
    handleNumberClick,
    handleOperatorClick,
    handleEqualsClick,
    handleDecimalClick,
    handleClearClick,
    handleBackspaceClick,
  };
};
