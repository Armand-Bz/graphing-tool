import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import { evaluate } from 'mathjs';
import { generateCurveData, fitCurve } from '../utils/mathUtils';
import '../styles/Graph.css';

interface Point {
  x: number;
  y: number;
}

type CurveType = 'linear' | 'quadratic' | 'cubic' | 'spline';

interface GraphProps {
  equation: string;
  points: Point[];
  curveType: CurveType;
  showFunction: boolean;
}

export default function Graph({
  equation,
  points,
  curveType,
  showFunction
}: GraphProps) {
  const [data, setData] = React.useState<any[]>([]);
  const [layout, setLayout] = React.useState<any>({
    title: 'Function Grapher',
    xaxis: { title: 'X', zeroline: true, gridwidth: 1 },
    yaxis: { title: 'Y', zeroline: true, gridwidth: 1 },
    hovermode: 'closest',
    margin: { l: 50, r: 50, t: 50, b: 50 }
  });

  useEffect(() => {
    const traces: any[] = [];
    const xRange = { min: -10, max: 10 };
    const yRange = { min: -10, max: 10 };

    // Generate function plot
    if (showFunction && equation) {
      try {
        const functionData = generateCurveData(equation, xRange.min, xRange.max);
        if (functionData) {
          traces.push({
            x: functionData.x,
            y: functionData.y,
            type: 'scatter',
            mode: 'lines',
            name: `f(x) = ${equation}`,
            line: { color: '#3b82f6', width: 2 },
            hovertemplate: '<b>f(x) = %{fullData.name}</b><br>x: %{x}<br>y: %{y}<extra></extra>'
          });
        }
      } catch (err) {
        console.error('Error plotting function:', err);
      }
    }

    // Add points
    if (points.length > 0) {
      traces.push({
        x: points.map(p => p.x),
        y: points.map(p => p.y),
        type: 'scatter',
        mode: 'markers',
        name: 'Points',
        marker: { color: '#10b981', size: 8, symbol: 'circle' },
        hovertemplate: '<b>Point</b><br>x: %{x}<br>y: %{y}<extra></extra>'
      });

      // Fit curve if we have enough points
      if (points.length >= 2) {
        try {
          const fittedData = fitCurve(points, curveType, xRange.min, xRange.max);
          if (fittedData) {
            traces.push({
              x: fittedData.x,
              y: fittedData.y,
              type: 'scatter',
              mode: 'lines',
              name: `Fitted ${curveType}`,
              line: { color: '#ef4444', width: 2, dash: 'dash' },
              hovertemplate: '<b>Fitted curve</b><br>x: %{x}<br>y: %{y}<extra></extra>'
            });
          }
        } catch (err) {
          console.error('Error fitting curve:', err);
        }
      }
    }

    setData(traces);
  }, [equation, points, curveType, showFunction]);

  return (
    <div className="graph">
      <Plot
        data={data}
        layout={layout}
        config={{
          responsive: true,
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['lasso2d', 'select2d']
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}