import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const API_URL = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((plantsData) => setPlants(plantsData))
      .catch(() => {
        // Use the starter data when the deployed site cannot reach json-server.
        fetch(`${import.meta.env.BASE_URL}db.json`)
          .then((response) => response.json())
          .then((data) => setPlants(data.plants));
      });
  }, []);

  function handleAddPlant(newPlant) {
    // Add the saved plant to the page after the server returns it.
    setPlants([...plants, newPlant]);
  }

  function handleToggleStock(id) {
    // Flip the stock status for only the plant that was clicked.
    const updatedPlants = plants.map((plant) =>
      plant.id === id
        ? { ...plant, inStock: !(plant.inStock ?? true) }
        : plant
    );

    setPlants(updatedPlants);
  }

  const visiblePlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchText={searchText} onSearchChange={setSearchText} />
      <PlantList plants={visiblePlants} onToggleStock={handleToggleStock} />
    </main>
  );
}

export default PlantPage;
