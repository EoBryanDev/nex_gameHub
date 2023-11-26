"use client";

import { useState } from "react";
import { FiEdit, FiX } from "react-icons/fi";

const Favorite: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [gameName, setGameName] = useState<string>("");

  const handleVisibility = () => {
    setShowInput(!showInput);
    if (input !== "") {
      setGameName(input);
    }
    setInput("");
  };
  return (
    <main className='w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col'>
      {(showInput && (
        <div className='flex items-center justify-center gap-3'>
          <input
            className='w-full rounded-md h-8 px-2 text-black'
            type='text'
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInput(e.target.value);
            }}
          />
          <button onClick={handleVisibility}>
            <FiX size={24} color='#ffffff' />
          </button>
        </div>
      )) || (
        <button
          onClick={handleVisibility}
          className='self-start hover:scale-110 duration-200 transition-all'
        >
          <FiEdit size={24} color='#ffffff' />
        </button>
      )}
      {(gameName && (
        <div>
          <span className='text-white'>Favorite Game:</span>
          <p>{gameName}</p>
        </div>
      )) || <p className='font-bold text-white'>Add Game</p>}
    </main>
  );
};

export default Favorite;
