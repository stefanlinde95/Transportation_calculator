import { AccordionDetails, Box, Button, TextField } from "@mui/material";
import { Field, FieldProps, useFormikContext } from "formik";
import { FormProps } from "../../pages/transportationForm";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";

interface DateStepProps {
  handleNext: () => void;
  handleBack: () => void;
}

function DateStep(props: DateStepProps) {
  const { handleBack, handleNext } = props;
  const { setFieldValue, values } = useFormikContext<FormProps>();
  const date = new Date();
  return (
    <AccordionDetails sx={{ paddingTop: 2 }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Field name="date">
          {({ field }: FieldProps<FormProps>) => (
            <MobileDatePicker
              label="Date"
              inputFormat="MM/DD/yyyy"
              value={field.value}
              minDate={date}
              onChange={(date) => setFieldValue("date", date)}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" fullWidth />
              )}
            />
          )}
        </Field>
      </LocalizationProvider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: 1,
          borderColor: "grey.500",
          paddingTop: 2,
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
          color="primary"
          onClick={() => handleNext()}
        >
          Next
        </Button>
      </Box>
    </AccordionDetails>
  );
}

export default DateStep;
