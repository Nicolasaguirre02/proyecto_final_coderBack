import { Router } from "express";
import messageModel from "../../dao/models/messages.model.js";
import mongoose from "mongoose";

const router = Router();

router.get("/messages", async (req, res) => {
  try {
    let listMesagges = await messageModel.find();
    res.send({ result: "succes", playload: listMesagges });
  } catch (error) {
    console.log("Error al listar mesagges", error);
  }
});

router.post("/messages", async (req, res) => {
  try {
    let newMessage = req.body;
    if (!newMessage.user || !newMessage.message) {
      res.send({ status: "error", error: "Falan parametros" });
    }
    let response = await messageModel.create(newMessage);
    res.send({ result: "Succes", playload: response });
  } catch (error) {}
});

router.delete("/messages/:mid", async (req, res) => {
  try {
    let messageID = req.params.mid;
    let resultado = await messageModel.deleteOne({ _id: messageID });
    res.send({ response: "Succes", playload: resultado });
  } catch (error) {
    res.send({ status: "error", error: "Error al eliminar" });
  }
});

export default router;
