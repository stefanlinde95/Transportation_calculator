import { AccordionDetails, Box, Button, TextField } from "@mui/material";
import { Field, FieldProps, FormikValues, useFormikContext } from "formik";
import AlertMessage from "../alertMessage";
import OrderDetails from "../orderDetails";

interface SubmitStepProps {
  handleBack: (values: FormikValues) => void;
}
function SubmitStep(props: SubmitStepProps) {
  const { handleBack } = props;
  const { values, errors, touched } = useFormikContext();
  return (
    <AccordionDetails>
      <div className="flex">
        <Box className="left-col" sx={{ display: "block" }}>
          <OrderDetails />
        </Box>
        <Box className="right-col" sx={{ display: "block" }}>
          <h3>Contact infromation</h3>
          <Field name="name">
            {({ field }: FieldProps<string>) => (
              <TextField
                label="Name"
                type="text"
                variant="outlined"
                margin="normal"
                fullWidth
                {...field}
              />
            )}
          </Field>

          <Field name="email">
            {({ field }: FieldProps<string>) => (
              <TextField
                label="E-mail"
                type="email"
                variant="outlined"
                margin="normal"
                fullWidth
                {...field}
              />
            )}
          </Field>
          <Field name="comments">
            {({ field }: FieldProps<string>) => (
              <TextField
                label="Comments"
                type="textarea"
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={4}
                {...field}
              />
            )}
          </Field>
        </Box>
      </div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </Box>
    </AccordionDetails>
  );
}

export default SubmitStep;
