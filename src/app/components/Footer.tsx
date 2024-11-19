import Image from 'next/image';
import Link from 'next/link';

const navigation = {
  solutions: [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary-grey">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <Image
            src="/drinklogo.png"
            alt="Company name"
            width={36}
            height={36}
            className="h-20 w-auto"
            priority
          />
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Navigation
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-200 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Credits
                </h3>
                <div className="mt-6">
                  <p className="text-sm leading-6 text-gray-200">
                    Powered by{' '}
                    <a
                      href="https://www.thecocktaildb.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white underline"
                    >
                      TheCocktailDB API
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}