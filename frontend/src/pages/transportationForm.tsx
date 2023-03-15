import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Accordion,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import MaterialsStep from "../components/formSteps/materials";
import {
  validationSchemaStep1,
  validationSchemaStep2,
  validationSchemaStep3,
} from "../validators/formSchema";
import DeliveryStep from "../components/formSteps/delivery";
import DateStep from "../components/formSteps/date";
import SubmitStep from "../components/formSteps/submit";
import axios from "axios";

export interface FormProps {
  deliveryAddress: string;
  deliveryCoordinates: [number, number];
  deliveryDuration: number;
  deliveryDistance: number;
  date: Date;
  material: string;
  quantity: number;
  name: string;
  comments: string;
  email: string;
  price: number;
}

const TransportationForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const initialValues: FormProps = {
    deliveryAddress: "",
    deliveryCoordinates: [0, 0],
    deliveryDistance: 0,
    deliveryDuration: 0,
    date: new Date(),
    name: "",
    email: "",
    material: "",
    comments: "",
    quantity: 0,
    price: 0,
  };

  // Since we have 3 steps, we need to validate the form based on the current step
  let currentValidationSchema;
  if (activeStep === 1) {
    currentValidationSchema = validationSchemaStep1;
  } else if (activeStep === 2) {
    currentValidationSchema = validationSchemaStep2;
  } else {
    currentValidationSchema = validationSchemaStep3;
  }

  const handleSubmit = (values: FormProps): void => {
    axios
      .post(
        "http://localhost:3306/data",
        {
          name: values.name,
          deliveryAddress: values.deliveryAddress,
          deliveryCoordinates: values.deliveryCoordinates,
          deliveryDistance: values.deliveryDistance,
          deliveryDuration: values.deliveryDuration,
          date: values.date,
          material: values.material,
          quantity: values.quantity,
          comments: values.comments,
          email: values.email,
          price: values.price,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Your order has been submitted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const formattedDate = (values: Date) => {
    return new Date(values).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "4em", marginBottom: "4em" }}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={currentValidationSchema}
      >
        {(formik) => (
          <Form>
            <Accordion expanded={activeStep === 0}>
              <AccordionSummary onClick={() => setActiveStep(0)}>
                <Typography fontSize={25} fontWeight={600}>
                  Step 1: Material
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {activeStep >= 1 &&
                    `${formik.values.material} ${formik.values.quantity} kg`}
                </Typography>
              </AccordionSummary>
              <MaterialsStep handleNext={handleNext} />
            </Accordion>
            <Accordion expanded={activeStep === 1} disabled={activeStep < 1}>
              <AccordionSummary onClick={() => setActiveStep(1)}>
                <Typography fontSize={25} fontWeight={600}>
                  Step 2: Delivery
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {activeStep >= 2 && `${formik.values.deliveryAddress}`}
                </Typography>
              </AccordionSummary>
              <DeliveryStep
                handleBack={handleBack}
                handleNext={handleNext}
                formik={formik.values}
              />
            </Accordion>

            <Accordion expanded={activeStep === 2} disabled={activeStep < 2}>
              <AccordionSummary onClick={() => setActiveStep(2)}>
                <Typography fontSize={25} fontWeight={600}>
                  Step 3: Date
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {activeStep === 3 && formattedDate(formik.values.date)}
                </Typography>
              </AccordionSummary>
              <DateStep handleBack={handleBack} handleNext={handleNext} />
            </Accordion>

            <Accordion expanded={activeStep === 3} disabled={activeStep < 3}>
              <AccordionSummary onClick={() => setActiveStep(3)}>
                <Typography fontSize={25} fontWeight={600}>
                  Step 4: Purchase
                </Typography>
              </AccordionSummary>
              <SubmitStep handleBack={handleBack} />
            </Accordion>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default TransportationForm;
