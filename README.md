# 📊 Graphing Tool

An interactive web-based graphing tool for plotting mathematical functions and generating equations from points.

## Features

✨ **Function Plotting**
- Enter mathematical equations and see them plotted in real-time
- Supports standard functions: `x^2`, `sin(x)`, `sqrt(x)`, `abs(x)`, etc.
- Toggle function visibility on/off

🎯 **Point Management**
- Add points to the coordinate plane via X, Y input fields
- View all points in a scrollable list
- Remove individual points or clear all at once

📈 **Curve Fitting & Equation Generation**
- Automatically fit curves to your points
- Choose from 4 curve types:
  - **Linear**: Straight line fit
  - **Quadratic**: Parabolic curves
  - **Cubic**: Complex polynomial curves
  - **Spline**: Smooth interpolation
- View the generated equation and R² fit quality

🔍 **Interactive Graph**
- Auto-scaling coordinate plane
- Grid lines and labeled axes
- Zoom and pan functionality
- Color-coded visualization:
  - 🔵 Blue: Function plot
  - 🔴 Red: Fitted curve (dashed)
  - 🟢 Green: Added points

## Installation

```bash
# Clone the repository
git clone https://github.com/Armand-Bz/graphing-tool.git
cd graphing-tool

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open your browser to `http://localhost:3000`.

## Usage

1. **Plot a Function**
   - Enter an equation in the left panel (e.g., `x^2`, `sin(x)`, `2*x + 3`)
   - The function will plot automatically on the graph
   - Use the examples for quick reference

2. **Add Points**
   - Enter X and Y coordinates in the "Add Point" section
   - Click "Add" or press Enter
   - Points appear as green dots on the graph

3. **Fit a Curve**
   - Select a curve type from the dropdown (Linear, Quadratic, Cubic, or Spline)
   - The tool automatically fits the selected curve to your points
   - The fitted curve appears as a red dashed line

4. **Interact with the Graph**
   - **Zoom**: Scroll or use the zoom controls
   - **Pan**: Click and drag to move around
   - **Hover**: See coordinate values on hover

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Plotly.js** - Interactive graphing
- **math.js** - Equation parsing and evaluation
- **regression** - Polynomial curve fitting
- **Vite** - Build tool

## Project Structure

```
src/
├── components/
│   ├── FunctionInput.tsx     # Equation input with examples
│   ├── PointManager.tsx      # Point management & curve selector
│   └── Graph.tsx             # Interactive visualization
├── utils/
│   └── mathUtils.ts          # Math operations & curve fitting
├── styles/
│   ├── App.css               # Main layout
│   ├── FunctionInput.css     # Function input styling
│   ├── PointManager.css      # Point manager styling
│   └── Graph.css             # Graph styling
├── App.tsx                   # Root component
└── main.tsx                  # Entry point
```

## Supported Functions

The tool supports most standard mathematical functions:

- **Arithmetic**: `+`, `-`, `*`, `/`, `^` (power)
- **Trigonometry**: `sin(x)`, `cos(x)`, `tan(x)`, `asin(x)`, `acos(x)`, `atan(x)`
- **Logarithmic**: `log(x)`, `ln(x)`, `log10(x)`
- **Other**: `sqrt(x)`, `abs(x)`, `exp(x)`

Examples:
- `x^2` - Simple quadratic
- `sin(x) * x` - Damped sine wave
- `1/x` - Hyperbola
- `sqrt(x)` - Square root
- `2*x + 3` - Linear function

## License

MIT

## Author

Created by Armand-Bz
