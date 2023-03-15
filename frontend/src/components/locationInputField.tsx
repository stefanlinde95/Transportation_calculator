import { useState } from "react";
import {
  Box,
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import useInput from "../hooks/useInput";
import DistanceCalculator from "./distanceCalculator";
import { useFormikContext } from "formik";
import { FormProps } from "../pages/transportationForm";

const LocationInputField = ({ label }: { label: string }) => {
  const { setFieldValue } = useFormikContext<FormProps>();
  const [coordinates, setCoordinates] = useState<string>("");
  const address = useInput("");

  return (
    <div className="flex">
      <Box
        className="left-col"
        sx={{ display: "block", width: "50%", minHeight: "250px" }}
      >
        <h3>{label}</h3>
        <TextField
          placeholder="Delivery address"
          value={address.value}
          autoFocus={false}
          fullWidth
          onChange={address.onChange}
          InputProps={{
            endAdornment: (
              <IconButton
                sx={{ visibility: address.value ? "visible" : "hidden" }}
                onClick={() => {
                  address.setValue("");
                  setCoordinates("");
                  setFieldValue("deliveryAddress", "");
                  setFieldValue("deliveryCoordinates", [0, 0]);
                }}
              >
                X
              </IconButton>
            ),
          }}
        />
        {address.suggestions?.length > 0 && (
          <ClickAwayListener onClickAway={() => address.setSuggestions([])}>
            <List sx={{ border: 1, borderColor: "gray" }}>
              {address.suggestions.map((suggestion, index = 1) => {
                const { place_name, center, id } = suggestion;
                return (
                  <ListItem
                    key={id}
                    onClick={() => {
                      address.setValue(place_name);
                      setFieldValue("deliveryAddress", place_name);
                      setFieldValue("deliveryCoordinates", center);
                      // @ts-ignore
                      setCoordinates(center.join(","));
                      address.setSuggestions([]);
                    }}
                  >
                    {place_name}
                  </ListItem>
                );
              })}
            </List>
          </ClickAwayListener>
        )}
      </Box>

      <Box className="right-col" sx={{ display: "block", width: "50%" }}>
        <DistanceCalculator input={coordinates} />
      </Box>
    </div>
  );
};

export default LocationInputField;
