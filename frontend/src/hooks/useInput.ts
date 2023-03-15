import { useState } from "react";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const YOUR_MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1Ijoic3RlZmFubGluZGU5NSIsImEiOiJjbGVqYmpxaGowNTFmM3JvOHRrZ2pyMXFzIn0._OQWCwm-CPbnSjmErbvEmw";

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${YOUR_MAPBOX_ACCESS_TOKEN}&autocomplete=true`;
      const response = await fetch(endpoint);
      const results = await response.json();
      setSuggestions(results?.features);
    } catch (error) {
      console.log("Error fetching data, ", error);
    }
  };

  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions,
  };
};

export default useInput;
