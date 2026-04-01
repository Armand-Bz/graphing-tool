import { evaluate } from 'mathjs';
import * as regression from 'regression';

interface Point {
  x: number;
  y: number;
}

interface CurveData {
  x: number[];
  y: number[];
}

export function generateCurveData(
  equation: string,
  xMin: number,
  xMax: number,
  step: number = 0.1
): CurveData | null {
  try {
    const x: number[] = [];
    const y: number[] = [];

    for (let xVal = xMin; xVal <= xMax; xVal += step) {
      try {
        const yVal = evaluate(equation, { x: xVal });
        if (typeof yVal === 'number' && isFinite(yVal)) {
          x.push(xVal);
          y.push(yVal);
        }
      } catch (err) {
        // Skip invalid points
      }
    }

    return x.length > 0 ? { x, y } : null;
  } catch (err) {
    console.error('Error generating curve data:', err);
    return null;
  }
}

export function fitCurve(
  points: Point[],
  curveType: 'linear' | 'quadratic' | 'cubic' | 'spline',
  xMin: number,
  xMax: number
): CurveData | null {
  if (points.length < 2) return null;

  try {
    const data = points.map(p => [p.x, p.y]);
    let result: any;

    switch (curveType) {
      case 'linear':
        result = regression.linear(data);
        break;
      case 'quadratic':
        result = regression.polynomial(data, { order: 2 });
        break;
      case 'cubic':
        result = regression.polynomial(data, { order: 3 });
        break;
      case 'spline':
        // For spline, use polynomial as approximation
        result = regression.polynomial(data, { order: Math.min(4, points.length - 1) });
        break;
      default:
        return null;
    }

    const x: number[] = [];
    const y: number[] = [];
    const step = (xMax - xMin) / 100;

    for (let xVal = xMin; xVal <= xMax; xVal += step) {
      const yVal = result.predict(xVal)[1];
      if (isFinite(yVal)) {
        x.push(xVal);
        y.push(yVal);
      }
    }

    return { x, y };
  } catch (err) {
    console.error('Error fitting curve:', err);
    return null;
  }
}