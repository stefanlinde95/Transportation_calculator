import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/data", async (req, res) => {
  const data = await prisma.data.findMany();
  res.send(data);
});

app.post("/data", async (req, res) => {
  const data = await prisma.data.create({
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
});

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
