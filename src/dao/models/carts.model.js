import mongoose from "mongoose";

//Crea la coleccion
const cartsCollection = "carts";

//Crea el esquema de la coleccion
const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: { type: Number },
      },
    ],
    default: [],
  },
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
