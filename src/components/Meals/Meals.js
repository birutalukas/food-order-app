import { Fragment } from "react/cjs/react.production.min";
import AvalableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
    return (
        <Fragment>
            <MealsSummary />

            <AvalableMeals />
        </Fragment>
    );
};

export default Meals;
