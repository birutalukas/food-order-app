import { Fragment } from "react/cjs/react.production.min";
import classes from "./Header.module.css";
import HeaderImage from "../../assets/images/meals.jpeg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes["main-image"]}>
                <img src={HeaderImage} alt="Full table of delicious food" />
            </div>
        </Fragment>
    );
};

export default Header;
