interface ILabelProps {
  name: string;
}

const Label: React.FC<ILabelProps> = ({ name }: ILabelProps) => {
  return (
    <main className='flex-grow sm:flex-grow-0 py-1 px-3 bg-slate-200 text-black text-center rounded-lg hover:font-bold duration-200'>
      {name}
    </main>
  );
};

export default Label;
