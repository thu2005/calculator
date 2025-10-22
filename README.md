# Calculator App

A modern, responsive calculator built with React and Vite. Features basic arithmetic operations, advanced mathematical functions, memory management, and calculation history.

## Features

- **Basic Operations**: Addition, subtraction, multiplication, division
- **Advanced Functions**: Square (x²), square root (√x), reciprocal (1/x), negate (+/-)
- **Memory Operations**: Store (MS), Recall (MR), Add (M+), Subtract (M-), Clear (MC)
- **History Management**: Track and clear calculation history
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Division by zero, invalid operations

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation & Running

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd calculator
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```
   The app will open at `http://localhost:5173`

3. **Build for production**:
   ```bash
   npm run build
   ```

## Testing

### Run Tests
```bash
npm test
```

### Test Coverage
The test suite includes 33 comprehensive test cases covering:

- **Basic Number Input & Display** (7 tests): Number input, decimal handling, leading zeros
- **Basic Operations** (8 tests): Arithmetic operations, chain calculations, error cases
- **Advanced Operations** (7 tests): Mathematical functions, decimal support, edge cases  
- **Memory Operations** (8 tests): Memory store/recall, complex sequences, error handling
- **History Management** (3 tests): History tracking, clearing, multiple calculations

### Test Commands
```bash
# Run tests once
npm test

# Run tests in watch mode  
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

All tests use React Testing Library and Vitest for reliable, fast testing with proper state management validation.
