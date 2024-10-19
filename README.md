# Conway's Game of Life

This project is a modern and minimalist implementation of the famous Conway's Game of Life, developed with Next.js and styled with Tailwind CSS.

## Features

- Complete implementation of Conway's Game of Life
- Minimalist and modern user interface
- Interactive controls to start, pause, and randomize the simulation
- Ability to activate/deactivate cells by clicking on them
- Responsive and accessible design

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (version 14 or higher)
- npm (usually comes with Node.js)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/hxst1/game-of-life.git
   ```

2. Navigate to the project directory:
   ```
   cd game-of-life
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Execution

To run the project in development mode:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## How to Play

1. When the page loads, you'll see an empty grid.
2. Click on the cells to activate them (they will turn turquoise).
3. Use the "Start" button to begin the simulation.
4. Use the "Pause" button to stop the simulation at any time.
5. Use the "Randomize" button to activate random cells.
6. You can continue clicking on cells to activate or deactivate them even during the simulation.

## Rules of the Game of Life

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Contributing

Contributions are welcome. Please open an issue to discuss the changes you would like to make.

## License

[MIT](https://choosealicense.com/licenses/mit/)