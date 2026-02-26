# Modern Calculator App

![Calculator Screenshot](https://via.placeholder.com/600x400?text=Calculator+App+Screenshot)

A sleek and functional calculator application built with React, TypeScript, Tailwind CSS, and shadcn/ui. This project demonstrates a modern web development stack for creating interactive user interfaces.

## Features

*   **Basic Arithmetic Operations**: Addition, Subtraction, Multiplication, Division.
*   **Clear Functionality**: Reset the calculator with a single button.
*   **Backspace Functionality**: Remove the last digit of the current input.
*   **Decimal Support**: Perform calculations with floating-point numbers, preventing multiple decimals in a single number.
*   **Responsive Design**: Adapts to different screen sizes (though primarily designed for a fixed-size desktop experience).
*   **Modern UI**: Built with Tailwind CSS and shadcn/ui for a clean and intuitive user experience, with distinct styling for operators.

## Tech Stack

*   **Framework**: [React](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

*   [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
*   [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/sgupta285/Calculator.git
    cd Calculator
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

To create a production-ready build:

```bash
npm run build
# or
yarn build
```

This will generate optimized static files in the `dist` directory.

## Usage

Simply open the application in your browser. Click the number buttons to input digits, then select an operator (+, -, *, /), input the second number, and press '=' to see the result. Use 'C' to clear the current input or reset the calculator. Use the backspace button to remove the last digit entered.

## Project Structure

```
Calculator/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components (e.g., button.tsx)
│   │   └── calculator.tsx # Main calculator component logic and UI
│   ├── hooks/         # Custom React hooks (e.g., useCalculator.ts)
│   ├── lib/
│   │   └── utils.ts     # Utility functions (e.g., cn for class merging)
│   ├── App.tsx          # Main application component
│   ├── index.css        # Global styles and Tailwind directives
│   └── main.tsx         # Entry point for React application
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite-env.d.ts
├── vite.config.ts
└── README.md
```

## Author

*   **Srijan Gupta**

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for more details.
