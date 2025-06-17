import { v4 as uuidv4 } from 'uuid';
import type { EcommerceProductInfo } from '../../utils/types';
import InfoSection from "./InfoSection";

interface Props {
  infos: EcommerceProductInfo[];
}

export default function InfoMain({ infos }: Props) {
  return (
    <section className='flex flex-col gap-8 self-stretch'>
      {infos.map((info, index) => {
        return (
          <InfoSection 
            key={uuidv4()}
            name={info.title}
            descriptions={info.description}
            showBorder={index > 0}/>
        )
      })}
    </section>
  )
}