// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import Button from "./Button";

import styles from "./Form.module.css";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { createCity } = useCities();
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
      .then((response) => {
        setSelectedCity(response.data.city);
        setCountry(response.data.countryCode);
      })
      .finally(setIsLoading(false));
  }, [lat, lng]);

  function submitHandler(e) {
    e.preventDefault();
    if (!selectedCity || !date) return;

    const newCity = {
      cityName: selectedCity,
      country,
      emoji: convertToEmoji(country),
      notes,
      date,
      position: { lat, lng },
    };
    createCity(newCity);
    navigate('/app/cities')
  }

  if (!lat || !lng) return <div className={styles.asking}>
    🖐️ Please select a new location from map 
  </div>

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="selectedCity">city name</label>
        <input
          id="selectedCity"
          onChange={(e) => setSelectedCity(e.target.value)}
          value={isLoading ? "Loading" : selectedCity}
        />
        <span className={styles.flag}>{convertToEmoji(country)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {selectedCity}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker selected={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {selectedCity}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={submitHandler}> Add </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
