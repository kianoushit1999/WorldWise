// import CityItem from "./CityItem";
import Spinner from "./Spinner";

import styles from "./CityList.module.css";
import CityItem from "./CityItem";

function CityList({ isLoading, cities }) {
  if (isLoading) return <Spinner />;
  return <div className={styles.cityList}>
    {cities.map((city) => {return <CityItem city={city} key={city.id} />})}
  </div>
    
}

export default CityList;
