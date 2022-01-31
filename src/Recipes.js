import React, { useEffect, useState } from "react";

const Recipes = () => {

  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    fetch("https://api.airtable.com/v0/appD9YFLSX3Kflhy6/Events?api_key=keyhPyeleDSLqACg1")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.records);
        console.log('recipes', data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const styleObj = {
    float: "left",
    margin: "15px",
    color: "#fff"
  }

  return (
    <div>
      {recipes.length > 0 ? (
        recipes.map((record) => (
          <span>{record.id}</span>
        ))
      ) : (
        <p>Fetching Data...</p>
      )}
    </div>
  );

};

export default Recipes;