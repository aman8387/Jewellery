import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex flex-col items-center justify-center text-center">
      <span className="text-2xl font-serif tracking-normal capitalize text-stone-800 leading-none">
       ALANKRA
      </span>
      <span className="text-[9px] tracking-[0.25em] text-stone-500 font-light mt-1">
        Jewels
      </span>
    </Link>
  );
}