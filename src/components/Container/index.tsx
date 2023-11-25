interface IContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<IContainerProps> = ({children}: IContainerProps) => {
    return (
        <section className='max-w-screen-xl mx-auto px-3'>
            {children}
        </section>
    )
}

export default Container