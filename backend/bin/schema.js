"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const yup = __importStar(require("yup"));
exports.validationSchema = yup.object().shape({
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
    price: yup
        .number()
        .required("Error on price calculation / price is required"),
});
