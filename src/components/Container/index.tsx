interface IContainer {
    children: React.ReactNode;
}

const Container: React.FC<IContainer> = ({children}: IContainer) => {
    return (
        <section className='max-w-screen-xl mx-auto px-3'>
            {children}
        </section>
    )
}

export default Container