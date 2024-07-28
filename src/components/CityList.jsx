// import CityItem from "./CityItem";
import Spinner from "./Spinner";

import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const {cities, isLoading} = useCities()

  if (isLoading) return <Spinner />;
  return <div className={styles.cityList}>
    {cities.map((city) => {return <CityItem city={city} key={city.id} />})}
  </div>
    
}

export default CityList;
