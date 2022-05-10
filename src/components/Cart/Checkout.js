import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveCharLength = (value) => value.trim().length === 5;

const Checkout = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const [isFormValid, setIsFormValid] = useState({
        name: true,
        street: true,
        zip: true,
        city: true,
    });

    const nameInputClasses = `${classes.control} ${
        isFormValid.name ? "" : classes.invalid
    }`;

    const streetInputClasses = `${classes.control} ${
        isFormValid.street ? "" : classes.invalid
    }`;

    const zipInputClasses = `${classes.control} ${
        isFormValid.zip ? "" : classes.invalid
    }`;

    const cityInputClasses = `${classes.control} ${
        isFormValid.city ? "" : classes.invalid
    }`;

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = isNotEmpty(enteredName);
        const streetIsValid = isNotEmpty(enteredStreet);
        const zipIsValid = isFiveCharLength(enteredPostalCode);
        const cityIsValid = isNotEmpty(enteredCity);

        const formIsValid =
            nameIsValid && streetIsValid && zipIsValid && cityIsValid;

        if (!formIsValid) {
            setIsFormValid({
                name: nameIsValid,
                street: streetIsValid,
                zip: zipIsValid,
                city: cityIsValid,
            });
        } else {
            setIsFormValid({
                name: true,
                street: true,
                zip: true,
                city: true,
            });
            props.onConfirm({
                name: enteredName,
                street: enteredStreet,
                zip: enteredPostalCode,
                city: enteredCity,
            });
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div className={nameInputClasses}>
                <label hmtlfor="name">Your name:</label>
                <input type="text" id="name" ref={nameInputRef}></input>
                {!isFormValid.name && <p>Name must be not empty!</p>}
            </div>
            <div className={streetInputClasses}>
                <label hmtlfor="street">Street:</label>
                <input type="text" id="street" ref={streetInputRef}></input>
                {!isFormValid.street && <p>Street must be not empty!</p>}
            </div>
            <div className={zipInputClasses}>
                <label hmtlfor="postal">Postal code:</label>
                <input type="text" id="postal" ref={postalCodeInputRef}></input>
                {!isFormValid.zip && (
                    <p>Postal Code must be 5 characters length!</p>
                )}
            </div>
            <div className={cityInputClasses}>
                <label hmtlfor="city">City:</label>
                <input type="text" id="city" ref={cityInputRef}></input>
                {!isFormValid.city && <p>City must be not empty!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
