import Image from 'next/image';
import Button from './components/Button';

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Click me!</Button>
    </main>
  );
};

export default Home;
