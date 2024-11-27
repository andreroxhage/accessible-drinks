import singleDrinkLoader from '@/app/utils/singleDrinkLoader';
import SingleDrink from '@/app/components/SingleDrink';

export default async function SingleDrinkPage({
  params,
}: {
  params: { id: string };
}) {
  const drink = await singleDrinkLoader(params.id);
  console.log(drink);

  if (!drink) {
    return <div>Drink not found</div>;
  } else {
    return <SingleDrink drink={drink} />;
  }
}
