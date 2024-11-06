interface DrinkCardProps {
  drink: any;
}

const DrinkCard: React.FC<DrinkCardProps> = ({ drink }) => {
  return (
    <div>
      <img src={drink.strDrinkThumb} alt={drink.strDrink} />
      <h3>{drink.strDrink}</h3>
      <p>{drink.strInstructions}</p>
    </div>
  );
};

export default DrinkCard;
