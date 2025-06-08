import { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { clsx } from "clsx";

interface Props {
  totalStar: number;
  currStar: number;
  selected: boolean;
}

export default function RatingButton({ totalStar, currStar, selected }: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button 
      className={clsx(
        "flex items-center gap-1 p-0.5 w-max",
        "focus:rounded-sm focus:border-2 focus:border-solid",
        "focus:border-indigo-200 focus:outline-none",
        "hover:cursor-pointer"
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      {Array.from({ length: totalStar }).map((_, index) => {
        return (
          <IoIosStar 
            key={index}
            className={clsx(
            "text-xl text-neutral-200",
            index + 1 <= currStar && "text-yellow-400"
          )}/> // selected: text-yellow-600
        )})
      }
    </button>
  )
}

// hover && others