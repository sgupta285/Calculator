import React, { useState } from 'react';
import { Button } from './ui/button';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [currentValue, setCurrentValue] = useState<string>('');
  const [operator, setOperator] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [waitingForNewNumber, setWaitingForNewNumber] = useState<boolean>(false);

  const evaluateExpression = (prev: string, op: string, current: string): string => {
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
    return result.toString();
  };

  const handleNumberClick = (num: string) => {
    if (display === 'Error') {
      handleClearClick();
      setDisplay(num);
      setCurrentValue(num);
      return;
    }

    if (waitingForNewNumber) {
      setCurrentValue(num);
      setDisplay(num);
      setWaitingForNewNumber(false);
    } else {
      const newCurrentValue = currentValue === '0' ? num : currentValue + num;
      setCurrentValue(newCurrentValue);
      setDisplay(newCurrentValue);
    }
  };

  const handleOperatorClick = (nextOperator: string) => {
    if (display === 'Error') return;

    if (previousValue && operator && currentValue) {
      const result = evaluateExpression(previousValue, operator, currentValue);
      if (result === 'Error') {
        setDisplay('Error');
        resetState();
        return;
      }
      setPreviousValue(result);
      setDisplay(result);
    } else if (currentValue) {
      setPreviousValue(currentValue);
    }
    setOperator(nextOperator);
    setWaitingForNewNumber(true);
  };

  const handleEqualsClick = () => {
    if (display === 'Error') return;

    if (previousValue && operator && currentValue) {
      const result = evaluateExpression(previousValue, operator, currentValue);
      if (result === 'Error') {
        setDisplay('Error');
        resetState();
        return;
      }
      setDisplay(result);
      setCurrentValue(result);
      setPreviousValue(null);
      setOperator(null);
      setWaitingForNewNumber(true);
    } else if (currentValue) {
      // If only a number is entered and '=' is pressed, just display it
      setDisplay(currentValue);
      setWaitingForNewNumber(true);
    }
  };

  const handleDecimalClick = () => {
    if (display === 'Error') {
      handleClearClick();
      setDisplay('0.');
      setCurrentValue('0.');
      return;
    }

    if (waitingForNewNumber) {
      setCurrentValue('0.');
      setDisplay('0.');
      setWaitingForNewNumber(false);
    } else if (!currentValue.includes('.')) {
      const newCurrentValue = currentValue === '' ? '0.' : currentValue + '.';
      setCurrentValue(newCurrentValue);
      setDisplay(newCurrentValue);
    }
  };

  const resetState = () => {
    setCurrentValue('');
    setOperator(null);
    setPreviousValue(null);
    setWaitingForNewNumber(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    resetState();
  };

  const buttonClasses = "w-full h-16 text-xl font-semibold";
  const operatorButtonClasses = "bg-orange-500 hover:bg-orange-600 text-white";
  const utilityButtonClasses = "bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100";
  const numberButtonClasses = "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-80">
      <div className="bg-gray-100 dark:bg-gray-900 text-right p-4 mb-4 rounded-md text-4xl font-mono overflow-hidden whitespace-nowrap text-gray-900 dark:text-gray-50">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button className={`${buttonClasses} ${utilityButtonClasses} col-span-3`} onClick={handleClearClick}>C</Button>
        <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={() => handleOperatorClick('/')}>/</Button>

        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('7')}>7</Button>
        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('8')}>8</Button>
        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('9')}>9</Button>
        <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={() => handleOperatorClick('*')}>*</Button>

        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('4')}>4</Button>
        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('5')}>5</Button>
        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('6')}>6</Button>
        <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={() => handleOperatorClick('-')}>-</Button>

        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('1')}>1</Button>
        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('2')}>2</Button>
        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('3')}>3</Button>
        <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={() => handleOperatorClick('+')}>+</Button>

        <Button className={`${buttonClasses} ${numberButtonClasses} col-span-2`} onClick={() => handleNumberClick('0')}>0</Button>
        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={handleDecimalClick}>.</Button>
        <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={handleEqualsClick}>=</Button>
      </div>
    </div>
  );
};

export default Calculator;
