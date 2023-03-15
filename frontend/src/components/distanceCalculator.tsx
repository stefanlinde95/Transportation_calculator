import {
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

export const DistanceCalculator = ({ input }: { input: string }) => {
  const [coordinates, setCoordinates] = useState<number[]>([0, 0]);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Some random coordinates where transportation service starts
  const start = [-122.42, 37.78];

  const { setFieldValue } = useFormikContext();

  const convertSecondsToDHM = (duration: number) => {
    if (duration === null) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const days = Math.floor(hours / 24);
    const leftoverHours = hours % 24;

    return { days, hours: leftoverHours, minutes };
  };

  const { days, hours, minutes } = convertSecondsToDHM(duration);
  
  const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

  useEffect(() => {
    setCoordinates(input.split(",").map((coord) => Number(coord.trim())));
  }, [input]);

  useEffect(() => {
    const DistanceCalculationURL = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${coordinates[0]},${coordinates[1]}?&access_token=${ACCESS_TOKEN}`;
    if (coordinates[0] !== 0 && coordinates[1] !== 0) {
      setIsLoading(true);
      axios
        .get(DistanceCalculationURL)
        .then((response) => {
          const data = response.data;
          if (data.code === "NoRoute") {
            return setError("No route found to delivery address.");
          }
          if (data.code === "InvalidInput") {
            return setError("Invalid input");
          }
          setError(null);
          setDistance(Math.round(data.routes[0].distance));
          setDuration(Math.round(data.routes[0].duration));
          setFieldValue("deliveryDistance", data.routes[0].distance);
          setFieldValue("deliveryDuration", data.routes[0].duration);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
          setError("An error occurred while finding address.");
        });
    }
  }, [coordinates]);

  let distanceElement = null;
  if (distance !== null && !isLoading && !error && distance !== 0) {
    distanceElement = (
      <>
        <List>
          <ListItem>
            <ListItemText
              primary="Distance"
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {Math.round(distance / 1000)} km
                  </Typography>
                </>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Estimated time spent on transportation"
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {duration !== 0 &&
                      `${days} day(s), ${hours} hour(s), ${minutes} minute(s)`}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider component="li" />
        </List>
      </>
    );
  } else if (isLoading && !error) {
    distanceElement = <CircularProgress />;
  }
  return (
    <>
      {distanceElement}
      {error && distance !== 0 && (
        <Alert severity="error" color="error">
          {error}
        </Alert>
      )}
    </>
  );
};
export default DistanceCalculator;
