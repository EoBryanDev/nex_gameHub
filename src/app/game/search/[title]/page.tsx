import Card from "@/components/Card";
import Container from "@/components/Container";
import Input from "@/components/Input";
import { IGameProps } from "@/utils/interface/IGameProps";

interface ISearchProps {
  params: {
    title: string;
  };
}

const getSpecifiedGame = async (title: string) => {
  try {
    const decodedTitle = decodeURIComponent(title);
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodedTitle}`,
      { next: { revalidate: 320 } }
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fech data!");
  }
};
const Search: React.FC<ISearchProps> = async ({ params }: ISearchProps) => {
  const game: IGameProps[] = await getSpecifiedGame(params.title);
  return (
    <main className='w-full text-black'>
      <Container>
        <Input type='text' placeholder='Looking for any game ? ' />

        <h1 className='font-bold text-xl my-5'>
          Look what we found for you...
        </h1>

        {!game && <p>There was not found any game with this title!</p>}

        <section className='grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {game?.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </section>
      </Container>
    </main>
  );
};

export default Search;
