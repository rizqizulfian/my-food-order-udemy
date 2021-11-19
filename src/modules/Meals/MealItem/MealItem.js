import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

const MealItem = (props) => {
  const priceMeal = `Rp. ${props.price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{priceMeal}</div>
      </div>
      <div>
        <MealItemForm />
      </div>
    </li>
  )
};

export default MealItem;
