import React, { useState } from 'react';
import FunctionInput from './components/FunctionInput';
import PointManager from './components/PointManager';
import Graph from './components/Graph';
import './styles/App.css';

interface Point {
  x: number;
  y: number;
}

type CurveType = 'linear' | 'quadratic' | 'cubic' | 'spline';

export default function App() {
  const [equation, setEquation] = useState<string>('x^2');
  const [points, setPoints] = useState<Point[]>([]);
  const [curveType, setCurveType] = useState<CurveType>('quadratic');
  const [showFunction, setShowFunction] = useState<boolean>(true);

  const addPoint = (x: number, y: number) => {
    setPoints([...points, { x, y }]);
  };

  const removePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const clearPoints = () => {
    setPoints([]);
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <FunctionInput 
          equation={equation} 
          setEquation={setEquation}
          showFunction={showFunction}
          setShowFunction={setShowFunction}
        />
        <PointManager
          points={points}
          addPoint={addPoint}
          removePoint={removePoint}
          clearPoints={clearPoints}
          curveType={curveType}
          setCurveType={setCurveType}
        />
      </div>
      <div className="right-panel">
        <div className="graph-container">
          <Graph
            equation={equation}
            points={points}
            curveType={curveType}
            showFunction={showFunction}
          />
        </div>
      </div>
    </div>
  );
}