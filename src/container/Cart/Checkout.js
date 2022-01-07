import classes from "./Checkout.module.css";
import useInput from "../../hooks/useInput";
const Checkout = (props) => {
  const notEmpty = (value) => value.trim() !== "";
  const lengthlValidation = (value) => value.trim().length >= 5;
  const {
    enteredValue: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    onBlurHandler: nameBlurHandler,
    onChangeHandler: nameChangeHandler,
    resetValueHandler: nameReset,
  } = useInput(notEmpty);
  const {
    enteredValue: enteredStreet,
    isValid: streetIsValid,
    hasError: streetHasError,
    onBlurHandler: streetBlurHandler,
    onChangeHandler: streetChangeHandler,
    resetValueHandler: streetReset,
  } = useInput(notEmpty);

  const {
    enteredValue: enteredPostal,
    isValid: postalIsValid,
    hasError: postalHasError,
    onBlurHandler: postalBlurHandler,
    onChangeHandler: postalChangeHandler,
    resetValueHandler: postalReset,
  } = useInput(lengthlValidation);
  const {
    enteredValue: enteredCity,
    isValid: cityIsValid,
    hasError: cityHasError,
    onBlurHandler: cityBlurHandler,
    onChangeHandler: cityChangeHandler,
    resetValueHandler: cityReset,
  } = useInput(notEmpty);

  const formIsValid =
    nameIsValid && streetIsValid && postalIsValid && cityIsValid;
  const confirmHandler = (event) => {
    event.preventDefault();
    nameReset();
    streetReset();
    postalReset();
    cityReset();
  };
  const nameClassName = `${classes.control} ${nameHasError && classes.invalid}`;
  const streetClassName = `${classes.control} ${
    streetHasError && classes.invalid
  }`;
  const postalClassName = `${classes.control} ${
    postalHasError && classes.invalid
  }`;
  const cityClassName = `${classes.control} ${cityHasError && classes.invalid}`;

  const submitOrder = () =>
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClassName}>
        <label htmlFor="name">Your Name</label>
        <input
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          type="text"
          id="name"
        />
        {nameHasError && (
          <p className={classes.invalid}>Kindly enter a valid name</p>
        )}
      </div>
      <div className={streetClassName}>
        <label htmlFor="street">Street</label>
        <input
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          type="text"
          id="street"
        />
        {streetHasError && (
          <p className={classes.invalid}>Kindly enter a valid street</p>
        )}
      </div>
      <div className={postalClassName}>
        <label htmlFor="postal">Postal Code</label>
        <input
          value={enteredPostal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
          type="text"
          id="postal"
        />
        {postalHasError && (
          <p className={classes.invalid}>Kindly enter a valid postal code</p>
        )}
      </div>
      <div className={cityClassName}>
        <label htmlFor="city">City</label>
        <input
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          type="text"
          id="city"
        />
        {cityHasError && (
          <p className={classes.invalid}>Kindly enter a valid city</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button
          onClick={submitOrder}
          disabled={!formIsValid}
          className={classes.submit}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
