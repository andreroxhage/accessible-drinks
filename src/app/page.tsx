import Carousel from './components/Carousel';
import carouselLoader from './utils/carouselLoader';

// import NavigationBar from '@sj-ab/component-library.ui.navigation-bar/dist/NavigationBar.js';

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