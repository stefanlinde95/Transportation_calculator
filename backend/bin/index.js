"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.data.findMany();
    res.send(data);
}));
app.post("/data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.data.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            deliveryAddress: req.body.deliveryAddress,
            deliveryCoordinates: req.body.deliveryCoordinates,
            deliveryDistance: req.body.deliveryDistance,
            deliveryDuration: req.body.deliveryDuration,
            date: req.body.date,
            material: req.body.material,
            comments: req.body.comments,
            quantity: req.body.quantity,
            price: req.body.price,
        }
    });
    res.send(data);
}));
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
