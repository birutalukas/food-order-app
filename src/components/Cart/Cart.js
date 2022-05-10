import { useContext, useState } from "react";

import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import "../UI/Modal";
import Modal from "../UI/Modal";
import Checkout from "./Checkout";
import CartContext from "../../store/cart-context";
import { Fragment } from "react/cjs/react.production.min";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const [isCheckout, setIsCheckout] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true);
        fetch(
            "https://food-order-app-3ef37-default-rtdb.firebaseio.com/orders.json",
            {
                method: "POST",
                body: JSON.stringify({
                    orderedItems: cartCtx.items,
                    userData: userData,
                }),
            }
        );
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const cartActions = (
        <div className={classes.actions}>
            <button
                className={classes["button--alt"]}
                onClick={props.onCloseCart}
            >
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onConfirm={submitOrderHandler}
                    onCancel={props.onCloseCart}
                />
            )}
            {!isCheckout && cartActions}
        </Fragment>
    );

    const cartModalIsSubmittingContent = <p>Your order is beeing sent...</p>;

    const cartModalDidSubmitContent = (
        <Fragment>
            <p>Your order has been sent successfully!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onCloseCart}>
                    Close
                </button>
            </div>
        </Fragment>
    );

    return (
        <Modal onCloseCart={props.onCloseCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && !didSubmit && cartModalIsSubmittingContent}
            {!isSubmitting && didSubmit && cartModalDidSubmitContent}
        </Modal>
    );
};

export default Cart;
