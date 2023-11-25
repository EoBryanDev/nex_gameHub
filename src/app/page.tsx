import Container from "@/components/Container";
import { IGameProps } from "@/utils/interface/IGameProps";
import Image from "next/image";
import Link from "next/link";

import { BsArrowRightSquare } from "react-icons/bs";

import Input from "@/components/Input";

async function getDailyGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 320 } }
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fech data!");
  }
}
export default async function Home() {
  const dailyGame: IGameProps = await getDailyGame();

  return (
    <main className='w-full'>
      <Container>
        <h1 className='text-center font-bold text-xl my-5'>
          Let us suggest an exclusive game to you !!
        </h1>
        <Link href={`/game/${dailyGame.id}`}>
          <section className='w-full bg-black rounded-lg'>
            <div className='w-full max-h-96 h-96 relative'>
              <div className='absolute z-20 bottom-0 p-3 flex justify-center items-center gap-2'>
                <p className='font-bold text-xl text-white'>
                  {dailyGame.title}
                </p>
                <BsArrowRightSquare size={24} color='#ffffff' />
              </div>
              <Image
                src={dailyGame.image_url}
                alt={dailyGame.title}
                priority
                quality={100}
                fill
                className='max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300'
                sizes='(max-width: 768px) 100vw, (max-width:1200px) 33vw'
              />
            </div>
          </section>
        </Link>

        <Input type="text" placeholder="Looking for any game?"/>
      </Container>
    </main>
  );
}
