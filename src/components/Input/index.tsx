"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface IInput {
  type: string;
  placeholder: string;
}

const Input: React.FC<IInput> = ({ type, placeholder }: IInput) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue === "") return;

    router.push(`/game/search/${inputValue}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      className='w-full bg-slate-200 my-5 flex gap 2 items-center justify-between rounded-lg p-2'
    >
      <input
        className='bg-slate-200 outline-none w-11/12'
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
      />
      <button type='submit'>
        <FiSearch size={24} color='#ea500c' />
      </button>
    </form>
  );
};

export default Input;
