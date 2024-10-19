"use client";
import { useEffect, useRef, useState, useCallback } from 'react';

const GameOfLife = () => {
    const canvasRef = useRef(null);
    const [grid, setGrid] = useState([]);
    const [running, setRunning] = useState(false);
    const [generation, setGeneration] = useState(0);
    const [gridSize, setGridSize] = useState(35);
    const [cellSize, setCellSize] = useState(13);

    const interval = 150;

    const updateDimensions = useCallback(() => {
        const width = window.innerWidth;
        if (width < 640) {
            setGridSize(25);
            setCellSize(13);
        } else if (width < 1024) {
            setGridSize(35);
            setCellSize(13);
        } else { // Large screens
            setGridSize(35);
            setCellSize(13);
        }
    }, []);

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [updateDimensions]);

    const createGrid = useCallback(() => {
        return Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
    }, [gridSize]);

    const drawGrid = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, gridSize * cellSize, gridSize * cellSize);
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                ctx.fillStyle = grid[y] && grid[y][x] ? '#e8d5ad' : '#333';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
            }
        }
    }, [grid, gridSize, cellSize]);

    const isGridEmpty = useCallback(() => {
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (grid[y][x] === 1) {
                    return false;
                }
            }
        }
        return true;
    }, [grid, gridSize]);

    const nextGeneration = useCallback(() => {
        const newGrid = createGrid();
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const neighbors = countNeighbors(x, y);
                if (grid[y] && grid[y][x] === 1) {
                    newGrid[y][x] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
                } else {
                    newGrid[y][x] = (neighbors === 3) ? 1 : 0;
                }
            }
        }

        if (isGridEmpty()) {
            setRunning(false);
            return;
        }

        setGrid(newGrid);
        setGeneration(prevGen => prevGen + 1);
    }, [grid, createGrid, gridSize, isGridEmpty]);

    const countNeighbors = useCallback((x, y) => {
        let neighbors = 0;
        const directions = [
            [0, 1], [1, 1], [1, 0], [1, -1],
            [0, -1], [-1, -1], [-1, 0], [-1, 1]
        ];

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
                neighbors += grid[newY] && grid[newY][newX] ? 1 : 0;
            }
        }
        return neighbors;
    }, [grid, gridSize]);

    const randomizeGrid = () => {
        const randomizedGrid = createGrid().map(row => row.map(() => (Math.random() > 0.7 ? 1 : 0)));
        setGrid(randomizedGrid);
    };

    const resetGrid = () => {
        setGrid(createGrid());
        setGeneration(0);
    };

    useEffect(() => {
        setGrid(createGrid());
    }, [createGrid]);

    useEffect(() => {
        drawGrid();
    }, [grid, drawGrid]);

    useEffect(() => {
        if (!running) return;
        const intervalId = setInterval(nextGeneration, interval);
        return () => clearInterval(intervalId);
    }, [running, nextGeneration, interval]);

    const handleCellClick = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / cellSize);
        const y = Math.floor((e.clientY - rect.top) / cellSize);

        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row => [...row]);
            if (newGrid[y] && newGrid[y][x] !== undefined) {
                newGrid[y][x] = newGrid[y][x] ? 0 : 1;
            }
            return newGrid;
        });
    }, [cellSize]);

    return (
        <div className="flex flex-col items-center justify-center lg:min-h-screen text-white p-4 select-none">
            <div className="relative mb-4">
                <canvas
                    ref={canvasRef}
                    width={gridSize * cellSize}
                    height={gridSize * cellSize}
                    className="rounded-lg shadow-lg"
                    onClick={handleCellClick}
                />
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 px-3 py-1 rounded-md text-xs sm:text-sm">
                    {running ? 'Simulating' : 'Pause'}
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-3 py-1 rounded-md text-xs sm:text-sm">
                    Cycle: {generation}
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
                <button
                    onClick={() => {
                        if (running) {
                            setRunning(false);
                            resetGrid();
                        } else {
                            setRunning(true);
                        }
                    }}
                    className={`px-4 sm:px-6 py-2 rounded-md font-semibold transition-all duration-300 ${
                        running
                            ? 'bg-[#e8d5ad] hover:bg-black border hover:border-[#e8d5ad] text-black hover:text-[#e8d5ad]'
                            : 'bg-[#e8d5ad] hover:bg-black border hover:border-[#e8d5ad] text-black hover:text-[#e8d5ad]'
                    }`}
                >
                    {running ? 'Stop' : 'Start'}
                </button>
                <button
                    onClick={randomizeGrid}
                    className="px-4 sm:px-6 py-2 rounded-md font-semibold transition-all duration-300 bg-[#e8d5ad] hover:bg-black border hover:border-[#e8d5ad] text-black hover:text-[#e8d5ad]"
                >
                    Randomize
                </button>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm text-center max-w-md">
                Click on the cells to create life. Click the start button to simulate the Game of Life.
            </p>
        </div>
    );
};

export default GameOfLife;
