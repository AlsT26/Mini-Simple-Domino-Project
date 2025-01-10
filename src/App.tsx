import React, { useState } from "react";
import "./styles.css";
import { addNewDomino, countDoubles, Domino, flipDominoes, initialDominoes, removeByTotal, removeDuplicatesByTotal, sort } from "./utils";
import Dots from "./components/Dots";

const App: React.FC = () => {
  const [dominoes, setDominoes] = useState<Domino[]>(initialDominoes);
  const [doubleCount, setDoubleCount] = useState<number>(countDoubles(initialDominoes));
  const [totalInput, setTotalInput] = useState<number | "">("");
  const [newDomino, setNewDomino] = useState<{ a: number | ""; b: number | "" }>({ a: "", b: "" });

  const handleCountDoubles = () => {
    const double = countDoubles(dominoes);
    setDoubleCount(double);
  };

  const handleSort = (order: "asc" | "desc") => {
    const sorted = sort(dominoes, order);
    setDominoes(sorted);
  };

  const handleRemoveDuplicates = () => {
    const nonDup = removeDuplicatesByTotal(dominoes);
    setDominoes(nonDup);
  };

  const handleFlipValues = () => {
    const flipped = flipDominoes(dominoes);
    setDominoes(flipped);
  };

  const handleRemoveByTotal = () => {
    if (typeof totalInput === "number" && !isNaN(totalInput)) {
      const filteredDominoes = removeByTotal(dominoes, totalInput);
      setDominoes(filteredDominoes);
      setTotalInput("");
    } else {
      alert("Please enter a valid number for the total.");
    }
  };

  const handleAddNewDomino = () => {
    const { a, b } = newDomino;

    if (a === "" || b === "" || a < 0 || b < 0 || a > 6 || b > 6) {
      alert("Please enter valid domino numbers (0-6)");
      return;
    }

    const updatedDominoes = addNewDomino(a, b, dominoes);
    setDominoes(updatedDominoes);
    setNewDomino({ a: "", b: "" });
  };

  return (
    <div className="p-6 mx-auto max-w-screen-lg text-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Dominoes</h1>

      <div className="flex flex-col items-center gap-6">
        <div>{JSON.stringify(dominoes)}</div>

        {/* Display Dominoes */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Displayed Dominoes</h2>
          <div className="grid grid-cols-4 gap-4">
            {dominoes.map(([a, b], index) => (
              <div key={index} className="domino-card border rounded-lg bg-gray-100 text-center shadow w-[80px] h-[170px] flex flex-col justify-between items-center relative">
                <div className="half top border border-b-black">
                  <Dots value={a} />
                </div>
                <div className="divider"></div>
                <div className="half bottom border border-t-black">
                  <Dots value={b} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button onClick={handleCountDoubles} className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600 flex items-center">
            Count Doubles
            <span className="ml-2 bg-white text-green-500 font-bold py-1 px-3 rounded shadow">{doubleCount}</span>
          </button>

          <button
            onClick={() => {
              setDominoes(initialDominoes);
              setDoubleCount(countDoubles(initialDominoes));
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
          >
            Reset Dominoes
          </button>

          <button onClick={() => handleSort("asc")} className="bg-orange-400 text-white py-2 px-4 rounded shadow hover:bg-orange-600">
            Sort (ASC)
          </button>
          <button onClick={() => handleSort("desc")} className="bg-orange-400 text-white py-2 px-4 rounded shadow hover:bg-orange-600">
            Sort (DESC)
          </button>

          <button onClick={() => handleRemoveDuplicates()} className="bg-red-400 text-white py-2 px-4 rounded shadow hover:bg-red-600">
            Remove Duplicate
          </button>

          <button onClick={() => handleFlipValues()} className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">
            Flip Values
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="flex items-center gap-4">
            <input type="number" value={totalInput} onChange={(e) => setTotalInput(e.target.value === "" ? "" : parseInt(e.target.value))} placeholder="Enter total" className="border rounded px-4 py-2" />
            <button onClick={handleRemoveByTotal} className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600">
              Remove by Total
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="flex items-center gap-4">
            <input type="number" value={newDomino.a} onChange={(e) => setNewDomino({ ...newDomino, a: e.target.value === "" ? "" : parseInt(e.target.value) })} placeholder="Enter first number" className="border rounded px-4 py-2" />
            <input type="number" value={newDomino.b} onChange={(e) => setNewDomino({ ...newDomino, b: e.target.value === "" ? "" : parseInt(e.target.value) })} placeholder="Enter second number" className="border rounded px-4 py-2" />
            <button onClick={handleAddNewDomino} className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600">
              Add Domino
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
