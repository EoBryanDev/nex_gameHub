import Container from "@/components/Container";
import { IGameProps } from "@/utils/interface/IGameProps";
import Image from "next/image";
import Link from "next/link";

async function getDailyGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`
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
            <Image
              src={dailyGame.image_url}
              alt={dailyGame.title}
              priority
              quality={100}
              width={100}
              height={100}
            />
          </section>
        </Link>
      </Container>
    </main>
  );
}
