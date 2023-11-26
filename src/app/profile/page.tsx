import Container from "@/components/Container";
import Image from "next/image";
import userImg from "public/user.png";
import { FaShareAlt } from "react-icons/fa";

const Profile: React.FC = () => {
  return (
    <main className='w-full text-black'>
      <Container>
        <section className='my-5 flex flex-col items-center justify-between relative gap-3 sm:flex-row'>
          <div className='w-full flex items-center gap-4 text-lg flex-col sm:flex-row justify-center sm:justify-normal'>
            <Image
              src={userImg}
              alt='Profile Image'
              className='rounded-full w-56 h-56 object-cover'
            />
          </div>

          <h1 className='font-bold text-2x1'>User Logged</h1>

          <div className='absolute sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-2'>
            <button className='bg-gray-700 px-4 py-3 rounded-lg text-white'>
              Configurations
            </button>
            <button className='bg-gray-700 px-4 py-3 rounded-lg'>
              <FaShareAlt size={24} color='#ffffff' />
            </button>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default Profile;
