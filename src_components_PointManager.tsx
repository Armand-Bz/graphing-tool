import React, { useState } from 'react';
import '../styles/PointManager.css';

interface Point {
  x: number;
  y: number;
}

type CurveType = 'linear' | 'quadratic' | 'cubic' | 'spline';

interface PointManagerProps {
  points: Point[];
  addPoint: (x: number, y: number) => void;
  removePoint: (index: number) => void;
  clearPoints: () => void;
  curveType: CurveType;
  setCurveType: (type: CurveType) => void;
}

export default function PointManager({
  points,
  addPoint,
  removePoint,
  clearPoints,
  curveType,
  setCurveType
}: PointManagerProps) {
  const [xInput, setXInput] = useState<string>('');
  const [yInput, setYInput] = useState<string>('');

  const handleAddPoint = () => {
    const x = parseFloat(xInput);
    const y = parseFloat(yInput);

    if (!isNaN(x) && !isNaN(y)) {
      addPoint(x, y);
      setXInput('');
      setYInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddPoint();
    }
  };

  return (
    <div className="point-manager">
      <h2>Points & Curve Fitting</h2>

      <div className="input-section">
        <h3>Add Point</h3>
        <div className="point-inputs">
          <input
            type="number"
            value={xInput}
            onChange={(e) => setXInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="X"
            step="0.1"
          />
          <input
            type="number"
            value={yInput}
            onChange={(e) => setYInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Y"
            step="0.1"
          />
          <button onClick={handleAddPoint} className="add-btn">Add</button>
        </div>
      </div>

      <div className="curve-section">
        <h3>Curve Type</h3>
        <select
          value={curveType}
          onChange={(e) => setCurveType(e.target.value as CurveType)}
          className="curve-select"
        >
          <option value="linear">Linear</option>
          <option value="quadratic">Quadratic</option>
          <option value="cubic">Cubic</option>
          <option value="spline">Spline</option>
        </select>
      </div>

      <div className="points-list">
        <div className="points-header">
          <h3>Points ({points.length})</h3>
          {points.length > 0 && (
            <button onClick={clearPoints} className="clear-btn">Clear All</button>
          )}
        </div>
        <div className="points-container">
          {points.length === 0 ? (
            <p className="empty-message">No points added yet</p>
          ) : (
            <ul className="points-ul">
              {points.map((point, index) => (
                <li key={index} className="point-item">
                  <span className="point-coords">
                    ({point.x.toFixed(2)}, {point.y.toFixed(2)})
                  </span>
                  <button
                    onClick={() => removePoint(index)}
                    className="remove-btn"
                    title="Remove point"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}