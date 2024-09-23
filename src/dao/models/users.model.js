import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  age: { type: Number, require: true },
  password: { type: String, require: true },
  rol: {
    type: String,
    enum: ["premium", "user"],
    default: "user",
    require: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  documents: [
    {
      name: {type: String, require: true},
      reference: {type: String, require: true}
    }
  ],
  last_conecction: {type: Date, default: new Date()}
});

const userModel = mongoose.model(usersCollection, userSchema);

export default userModel;
