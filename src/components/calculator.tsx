import React from 'react';
import { Button } from './ui/button';
import { Backspace } from 'lucide-react'; // Import Backspace icon
import { useCalculator } from '@/hooks/useCalculator'; // Import the custom hook

const Calculator: React.FC = () => {
  const {
    display,
    handleNumberClick,
    handleOperatorClick,
    handleEqualsClick,
    handleDecimalClick,
    handleClearClick,
    handleBackspaceClick,
  } = useCalculator();

  const buttonClasses = "w-full h-16 text-xl font-semibold";
  // Operator buttons now explicitly use shadcn's default (primary) variant for distinct styling.
  // The 'operatorButtonClasses' variable is removed as it was empty and redundant.
  const utilityButtonClasses = "bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100";
  const numberButtonClasses = "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-80">
      <div className="bg-gray-100 dark:bg-gray-900 text-right p-4 mb-4 rounded-md text-4xl font-mono overflow-hidden whitespace-nowrap text-gray-900 dark:text-gray-50">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button className={`${buttonClasses} ${utilityButtonClasses}`} onClick={handleClearClick}>C</Button>
        <Button className={`${buttonClasses} ${utilityButtonClasses}`} onClick={handleBackspaceClick}><Backspace className="h-6 w-6" /></Button>
        <Button className={`${buttonClasses}`} variant="default" onClick={() => handleOperatorClick('/')}>/</Button>
        <Button className={`${buttonClasses}`} variant="default" onClick={() => handleOperatorClick('*')}>*</Button>

        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('7')}>7</Button>
        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('8')}>8</Button>
        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('9')}>9</Button>
        <Button className={`${buttonClasses}`} variant="default" onClick={() => handleOperatorClick('-')}>-</Button>

        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('4')}>4</Button>
        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('5')}>5</Button>
        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={() => handleNumberClick('6')}>6</Button>
        <Button className={`${buttonClasses}`} variant="default" onClick={() => handleOperatorClick('+')}>+</Button>

        <Button className={`${buttonClasses} ${numberButtonClasses} col-span-2`} onClick={() => handleNumberClick('0')}>0</Button>
        <Button className={`${buttonClasses} ${numberButtonClasses}`} onClick={handleDecimalClick}>.</Button>
        <Button className={`${buttonClasses}`} variant="default" onClick={handleEqualsClick}>=</Button>
      </div>
    </div>
  );
};

export default Calculator;
