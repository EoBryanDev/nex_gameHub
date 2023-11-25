import { redirect } from "next/navigation";
import Image from "next/image";
import { IGameProps } from "@/utils/interface/IGameProps";
import Container from "@/components/Container";

interface IGameDetailProps {
  params: {
    id: string;
  };
}
const getGameDetails = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 320 } }
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fech data!");
  }
};
const GameDetail: React.FC<IGameDetailProps> = async ({
  params,
}: IGameDetailProps) => {
  const gameDetails: IGameProps = await getGameDetails(params.id);

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
      </Container>
    </main>
  );
};

export default GameDetail;
