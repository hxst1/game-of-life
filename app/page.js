import GameOfLife from "@/app/components/GameOfLife";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen w-full items-center justify-center text-white select-none">
            <h1 className="text-3xl font-bold absolute left-5 top-5 text-white shadow-lg mb-8">Game of Life</h1>
            <a
                href="https://github.com/hxst1/game-of-life"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-5 right-5"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="hover:opacity-80 transition-opacity duration-200"
                >
                    <path
                        d="M12 0C5.371 0 0 5.371 0 12c0 5.303 3.438 9.8 8.207 11.387.599.111.793-.261.793-.58 0-.286-.011-1.041-.017-2.043-3.338.725-4.042-1.611-4.042-1.611-.545-1.383-1.331-1.751-1.331-1.751-1.087-.744.083-.729.083-.729 1.202.084 1.834 1.235 1.834 1.235 1.07 1.833 2.807 1.303 3.492.996.108-.775.419-1.303.762-1.602-2.665-.303-5.467-1.333-5.467-5.931 0-1.31.469-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.302 1.23a11.485 11.485 0 013.005-.404c1.02.005 2.048.137 3.005.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.234 1.911 1.234 3.221 0 4.609-2.807 5.624-5.478 5.921.43.372.814 1.103.814 2.222 0 1.606-.014 2.901-.014 3.293 0 .321.192.696.801.578C20.565 21.797 24 17.303 24 12 24 5.371 18.627 0 12 0z"/>
                </svg>
            </a>


            <div
                className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-16 mt-28 lg:mt-0">
                <div className="p-4 rounded-lg shadow-lg border border-gray-700 max-w-xs sm:max-w-md">
                    <h2 className="text-lg font-semibold mb-4 text-center">Game Rules</h2>
                    <ul className="space-y-2 list-disc list-inside text-sm leading-relaxed">
                        <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
                        <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
                        <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by
                            reproduction.
                        </li>
                        <li>Any live cell with two or three live neighbors survives to the next generation.</li>
                    </ul>
                </div>

                <div>
                    <GameOfLife/>
                </div>
            </div>
        </div>
    );
}
