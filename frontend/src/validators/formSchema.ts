import * as yup from "yup";

export const validationSchemaStep1 = yup.object().shape({
  material: yup.string().required("Material is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "Quantity must be greater than 0")
    .max(100, "Quantity must be less than 100"),
});

export const validationSchemaStep2 = yup.object().shape({
  material: yup.string().required("Material is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "Quantity must be greater than 0"),
  deliveryAddress: yup.string().required("From field is required"),
  deliveryCoordinates: yup
    .array()
    .required("Delivery coordinates are required"),
  deliveryDistance: yup.number().required("Delivery distance is required"),
});

export const validationSchemaStep3 = yup.object().shape({
  material: yup.string().required("Material is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "Quantity must be greater than 0"),
  date: yup.date().required("Date is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  name: yup.string().required("Name is required"),
  deliveryAddress: yup.string().required("From field is required"),
  deliveryCoordinates: yup
    .array()
    .required("Delivery coordinates are required"),
  deliveryDistance: yup.number().required("Delivery distance is required"),
  comments: yup.string().optional(),
  price: yup.number().required("Error on price calculation / price is required"),
});
