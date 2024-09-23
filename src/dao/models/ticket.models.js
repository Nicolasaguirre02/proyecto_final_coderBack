import mongoose from "mongoose";

const ticketCollectino = "ticket";

const ticketShema = new mongoose.Schema({
    code: {type: String, unique:true, require:true},
    purchase_datetime: { type: Date, required: true, default: Date.now }, 
    amount: {type:Number, require:true, min:0},
    purchaser: {type:String, require:true}
});

const ticketModel = mongoose.model(ticketCollectino, ticketShema);

export default ticketModel;