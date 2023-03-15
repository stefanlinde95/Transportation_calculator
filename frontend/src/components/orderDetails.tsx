import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { findMaterialPrice } from "../utils/getMaterialPriceByKey";
import { FormProps } from "../pages/transportationForm";

const OrderDetails = () => {
  const { values, setFieldValue } = useFormikContext<FormProps>();

  const formattedDate = new Date(values.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const roundedDeliveryDistance = Math.round(values.deliveryDistance / 1000);

  const deliveryDurationToDays = () => {
    const days = Math.floor(values.deliveryDuration / 86400);
    return days;
  };

  const calculatePrice = () => {
    const pricePerKm = 0.5;
    const priceForDistance = pricePerKm * roundedDeliveryDistance;
    const priceForMaterial =
      findMaterialPrice(values.material) * values.quantity;
    const price = priceForDistance + priceForMaterial;
    return Math.round(price);
  };

  useEffect(() => {
    deliveryDurationToDays();
    setFieldValue(
      "price",
      deliveryDurationToDays() >= 1
        ? calculatePrice() * (deliveryDurationToDays() * 1.25)
        : calculatePrice(),
    );
  }, [values.deliveryDuration]);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemText
          primary="Material"
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {values.material}
              </Typography>
              {!!values.quantity &&
                ` - ${values.quantity} x  ${findMaterialPrice(
                  values.material,
                )}$ / kg (${
                  values.quantity * findMaterialPrice(values.material)
                }$)`}
            </>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Delivery"
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              ></Typography>
              {values.deliveryAddress}
              {!!values.deliveryDistance &&
                ` - ${roundedDeliveryDistance}km (${
                  0.5 * roundedDeliveryDistance
                }$)`}
            </>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Date"
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              ></Typography>
              {formattedDate}
            </>
          }
        />
      </ListItem>
      {deliveryDurationToDays() > 0 && (
        <ListItem>
          <ListItemText
            primary="Multiplier for days (+25% / day)"
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                ></Typography>
                X {deliveryDurationToDays()}
              </>
            }
          />
        </ListItem>
      )}
      <Divider component="li" />
      <ListItem>
        <ListItemText
          sx={{ display: "flex", justifyContent: "space-between" }}
          primary="Total"
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
                fontWeight={500}
              >
                {deliveryDurationToDays() >= 1
                  ? calculatePrice() * (deliveryDurationToDays() * 1.25)
                  : calculatePrice()}
                $
              </Typography>
            </>
          }
        />
      </ListItem>
    </List>
  );
};

export default OrderDetails;
