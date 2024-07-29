import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const Cntx = createContext();

function CitiesContext({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5555/cities")
      .then((response) => {
        setCities(response.data);
      })
      .finally(setIsLoading(false));
  }, []);

  function getCity(id) {
    setIsLoading(true);
    axios
      .get(`http://localhost:5555/cities/${id}`)
      .then((response) => setCurrentCity(response.data))
      .finally(setIsLoading(false));
  }

  function createCity(city) {
    setIsLoading(true)
    axios.post("http://localhost:5555/cities", city).then(
      response => setCities([...cities, response.data])
    ).finally(setIsLoading(false));
  }

  function deleteCity(cityId) {
    console.log(cityId)
    setIsLoading(true)
    console.log(`http://localhost:5555/cities/${cityId}`)
    axios.delete(`http://localhost:5555/cities/${cityId}`)
    .then(setCities(cities => cities.filter((city) => city.id !== cityId)))
    .finally(setIsLoading(false));
  }

  return (
    <Cntx.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </Cntx.Provider>
  );
}

export const useCities = () => {
  return useContext(Cntx);
};
export default CitiesContext;
