import { IGameProps } from "@/utils/interface/IGameProps";
import Image from "next/image";
import Link from "next/link";
import { BiRightArrowCircle } from "react-icons/bi";

interface ICard {
  data: IGameProps;
}

const Card: React.FC<ICard> = ({ data }: ICard) => {
  return (
    <Link href={`/game/${data.id}`}>
      <article className='w-full bg-slate-200 rounded-lg p-4 mb-5'>
        <div className='relative w-full h-56 hover:scale-105 transition-all duration-300'>
          <Image
            className='rounded-lg object-cover'
            src={data.image_url}
            alt={data.title}
            fill
            quality={100}
            sizes='(max-width: 768px) 100vw, (max-width:1200px) 33vw'
          />
        </div>
        <div className='flex items-center justify-between mt-4'>
          <p className='text-sm font-bold text-black text-ellipsis truncate whitespace-nowrap overflow-hidden'>
            {data.title}
          </p>
          <BiRightArrowCircle size={24} color='#000000' />
        </div>
      </article>
    </Link>
  );
};

export default Card;
