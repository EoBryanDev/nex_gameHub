import { redirect } from "next/navigation";
import Image from "next/image";
import { IGameProps } from "@/utils/interface/IGameProps";
import Container from "@/components/Container";
import Label from "@/components/Label";
import Card from "@/components/Card";
import { Metadata } from "next";

interface IGameDetailProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params,
}: IGameDetailProps): Promise<Metadata> => {
  try {
    const response: IGameProps = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { next: { revalidate: 60 } }
    )
      .then((resp) => resp.json())
      .catch(() => {
        return { title: "DailyGames - Find new games" };
      });

    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url]
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    };
  } catch (error) {
    return {
      title: "DailyGames - Find new games",
    };
  }
};

const getGameDetails = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 320 } }
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data!");
  }
};

async function getDailyGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-store" }
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fech data!");
  }
}
const GameDetail: React.FC<IGameDetailProps> = async ({
  params,
}: IGameDetailProps) => {
  const gameDetails: IGameProps = await getGameDetails(params.id);

  const recommendedGame: IGameProps = await getDailyGame();

  if (!gameDetails) redirect("/");

  return (
    <main className='w-full text-black'>
      <div className='relative w-full h-80 sm:h-96'>
        <Image
          className='rounded-lg object-cover'
          src={gameDetails.image_url}
          alt={gameDetails.title}
          priority
          fill
          quality={100}
          sizes='(max-width: 768px) 100vw, (max-width:1200px) 33vw'
        />
      </div>

      <Container>
        <h1 className='font-bold text-sl my-4'>{gameDetails.title}</h1>

        <p>{gameDetails.description}</p>

        <h2 className='font-black text-lg my-4'>Platforms</h2>

        <div className='flex gap-2 flex-wrap'>
          {gameDetails?.platforms?.map((label) => (
            <Label name={label} key={label} />
          ))}
        </div>

        <h2 className='font-black text-lg my-4'>Categories</h2>

        <div className='flex gap-2 flex-wrap'>
          {gameDetails?.categories?.map((label) => (
            <Label name={label} key={label} />
          ))}
        </div>

        <p className='my-4'>
          <strong>Release Date:</strong>
          {gameDetails.release}
        </p>

        <h2 className='font-black text-lg my-4'>Recommended Game</h2>

        <div className='flex'>
          <div className='flex-grow'>
            <Card data={recommendedGame} />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default GameDetail;
