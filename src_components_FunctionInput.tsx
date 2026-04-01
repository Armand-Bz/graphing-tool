import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import '../styles/FunctionInput.css';

interface FunctionInputProps {
  equation: string;
  setEquation: (eq: string) => void;
  showFunction: boolean;
  setShowFunction: (show: boolean) => void;
}

const EXAMPLE_FUNCTIONS = [
  'x^2',
  'sin(x)',
  'cos(x)',
  'sqrt(x)',
  'abs(x)',
  '2*x + 3',
  'x^3 - 2*x',
  '1/x'
];

export default function FunctionInput({
  equation,
  setEquation,
  showFunction,
  setShowFunction
}: FunctionInputProps) {
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEquation(value);
    setError('');
    
    try {
      if (value) {
        evaluate(value, { x: 0 });
      }
    } catch (err) {
      setError('Invalid equation');
    }
  };

  const loadExample = (example: string) => {
    setEquation(example);
    setError('');
  };

  return (
    <div className="function-input">
      <h2>Function Plotter</h2>
      
      <div className="input-group">
        <label htmlFor="equation">Equation:</label>
        <input
          id="equation"
          type="text"
          value={equation}
          onChange={handleChange}
          placeholder="e.g., x^2, sin(x), 2*x + 3"
          className={error ? 'input-error' : ''}
        />
        {error && <p className="error-text">{error}</p>}
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="show-function"
          checked={showFunction}
          onChange={(e) => setShowFunction(e.target.checked)}
        />
        <label htmlFor="show-function">Show function</label>
      </div>

      <div className="examples">
        <p className="label">Examples:</p>
        <div className="example-buttons">
          {EXAMPLE_FUNCTIONS.map((example) => (
            <button
              key={example}
              onClick={() => loadExample(example)}
              className="example-btn"
              title={`Load: ${example}`}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}