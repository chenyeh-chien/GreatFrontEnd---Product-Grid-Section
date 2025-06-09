import { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { clsx } from "clsx";

interface Props {
  id: string;
  totalStar: number;
  currStar: number;
  selected: boolean;
  onClick: (id: string) => void;
}

export default function RatingButton({ 
  id, 
  totalStar, 
  currStar, 
  selected, 
  onClick 
}: Props) {
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
      onMouseLeave={() => setIsHover(false)}
      onClick={() => onClick(id)}>
      {Array.from({ length: totalStar }).map((_, index) => {
        return (
          <IoIosStar 
            key={index}
            className={clsx(
            "text-xl text-neutral-200",
            index + 1 <= currStar && "text-yellow-400",
            index + 1 <= currStar && selected && "text-yellow-600"
          )}/> // selected: text-yellow-600
        )})
      }
    </button>
  )
}

// hover && others