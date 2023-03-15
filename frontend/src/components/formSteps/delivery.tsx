import { AccordionDetails, Box, Button } from "@mui/material";
import { error } from "console";
import { Field, FieldProps, useFormikContext } from "formik";
import { FormProps } from "../../pages/transportationForm";
import LocationInputField from "../locationInputField";

interface DeliveryStepProps {
  handleNext: () => void;
  handleBack: () => void;
  formik: any;
}

function DeliveryStep(props: DeliveryStepProps) {
  const { handleBack, handleNext } = props;
  const { values, errors } = useFormikContext<FormProps>();

  return (
    <AccordionDetails>
      <Field name="deliveryAddress">
        {({ field }: FieldProps<string>) => (
          <LocationInputField label="Delivery address" />
        )}
      </Field>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: 1,
          borderColor: "grey.500",
          paddingTop: 4,
          marginTop: 2,
        }}
      >
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="contained"
          disabled={!values.deliveryAddress || !values.deliveryCoordinates}
          color="primary"
          onClick={() => handleNext()}
        >
          Next
        </Button>
      </Box>
    </AccordionDetails>
  );
}

export default DeliveryStep;
