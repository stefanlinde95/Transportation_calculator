import { useRef, useState } from "react";
import {
  AccordionDetails,
  Alert,
  AlertColor,
  AlertTitle,
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  MATERIALS,
  WOOD,
  STEEL,
  PLASTIC,
  GLASS,
  CERAMIC,
} from "../../constants/materials";
import { Field, FieldProps, FormikValues, useFormikContext } from "formik";
import AlertMessage from "../alertMessage";

interface MaterialsStepProps {
  handleNext: (values: FormikValues) => void;
}

function MaterialsStep(props: MaterialsStepProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const materialRef = useRef<typeof WOOD>(WOOD);
  const {
    values,
    errors,
    touched,
    setFieldValue,
  }: { values: any; errors: any; touched: any; setFieldValue: any } =
    useFormikContext();

  const { handleNext } = props;

  const handleChange = (event: SelectChangeEvent<string>) => {
    const materialName = event.target.value;
    setFieldValue("material", "");
    setSelectedMaterial(materialName);
    switch (materialName) {
      case "Wood":
        materialRef.current = WOOD;
        break;
      case "Steel":
        materialRef.current = STEEL;
        break;
      case "Plastic":
        materialRef.current = PLASTIC;
        break;
      case "Glass":
        materialRef.current = GLASS;
        break;
      case "Ceramic":
        materialRef.current = CERAMIC;
        break;
      default:
        materialRef.current = WOOD;
        break;
    }
  };

  return (
    <AccordionDetails>
      <div id="materials" className="flex">
        <Box
          className="left-col"
          sx={{ display: "block", width: "50%", minHeight: "250px" }}
        >
          <h3>Category:</h3>
          <Select
            id="material_select"
            sx={{ width: "100%" }}
            onChange={handleChange}
            value={selectedMaterial}
          >
            <MenuItem value="" disabled>
              -- Select category --
            </MenuItem>
            {MATERIALS.map((material) => (
              <MenuItem key={material.name} value={material.name}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
          {selectedMaterial ? (
            <Field name="material">
              {({ field }: FieldProps<string>) => (
                <RadioGroup {...field}>
                  <h3 className="options_title">{selectedMaterial} options:</h3>
                  {materialRef.current.map(
                    (item: { id: number; name: string; price: number }) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.name}
                        control={<Radio color="primary" />}
                        label={`${item.name} (${item.price}€ /kg)`}
                      />
                    ),
                  )}
                </RadioGroup>
              )}
            </Field>
          ) : (
            <AlertMessage
              type="info"
              title="No category selected"
              body="Select category first"
            />
          )}
        </Box>
        <Box id="quantity" className="right-col" sx={{ display: "block" }}>
          <Field name="quantity">
            {({ field }: FieldProps<string>) => (
              <TextField
                label="Quantity"
                type="number"
                disabled={!values.material}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  inputMode: "numeric",
                  min: 1,
                }}
                margin="normal"
                variant="outlined"
                {...field}
              />
            )}
          </Field>
          {errors.quantity && touched.quantity ? (
            <AlertMessage
              type="error"
              title="Quantity error"
              body={errors.quantity}
            />
          ) : null}
        </Box>
      </div>
      <Box
        sx={{
          textAlign: "right",
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
          disabled={!values.material || !values.quantity || !!errors.quantity}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </AccordionDetails>
  );
}

export default MaterialsStep;
