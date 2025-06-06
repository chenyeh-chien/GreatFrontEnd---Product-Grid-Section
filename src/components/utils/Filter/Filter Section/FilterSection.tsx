import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

interface Props {
  name: string;
  isExtending: boolean;
  children: React.ReactNode
}

export default function FilterSection({ 
  name, 
  isExtending, 
  children 
}: Props) {
  return (
    <section className="flex flex-col gap-6 self-stretch">
      <div className="flex gap-2 items-center self-stretch justify-between">
        <h1>{name}</h1>
        <button>
        {
          isExtending 
          ? <FaPlus />
          : <FaMinus />
        }
        </button>
      </div>
      {children}
    </section>
  )
}