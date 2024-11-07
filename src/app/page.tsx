import Carousel from './components/Carousel';
import carouselLoader from './utils/carouselLoader';

export default async function Home() {
  const drinks = await carouselLoader();

  return (
    <div className="bg-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Carousel drinks={drinks} />
        <footer>footer</footer>
      </main>
    </div>
  );
}
