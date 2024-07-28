import CountryItem from "./CountryItem";
import Spinner from "./Spinner";

import styles from "./CountryList.module.css";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const {cities, isLoading} = useCities()
  if (isLoading) return <Spinner />;

  const countries = cities.reduce((prevVal, curVal) => {
    if(!prevVal.map((el) => el.country).includes(curVal.country)) return[...prevVal, {
        id: curVal.id,
        country: curVal.country,
        emoji: curVal.emoji
    }]
    else return prevVal
  }, [])

  return (
    <div className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem country={country} key={country.id}/>;
      })}
    </div>
  );
}

export default CountryList;
