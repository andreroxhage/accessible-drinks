import SingleDrink from '@/app/components/SingleDrink';
import singleDrinkLoader from '@/app/utils/singleDrinkLoader';

export default async function SingleDrinkPage({
  params,
}: {
  params: { id: string };
}) {
  const drink = await singleDrinkLoader(params.id);

  return (
    <div>
      <SingleDrink drinkId={drink} />
    </div>
  );
}
