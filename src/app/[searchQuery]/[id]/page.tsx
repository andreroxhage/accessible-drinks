import singleDrinkLoader from '@/app/utils/singleDrinkLoader';
import SingleDrink from '@/app/components/SingleDrink';

export default async function SingleDrinkPage({
  params,
}: {
  params: Promise<{ id: string; searchQuery: string }>;
}) {
  const resolvedParams = await params;
  const { id, searchQuery } = resolvedParams;
  const drink = await singleDrinkLoader(id);

  if (!drink) {
    return <div>Drink not found</div>;
  }

  return <SingleDrink drink={drink} searchQuery={searchQuery} />;
}
