import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/ Card";
import MealItem from "./MealItem/MealItem";
import Loader from "../UI/Loader";
export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://food-app-5b454-default-rtdb.firebaseio.com/meals.son"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      const loadedArray = [];
      for (const key in responseData) {
        loadedArray.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedArray);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    return () => {};
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (httpError) {
    return (
      <section className={classes.mealLoading}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}
