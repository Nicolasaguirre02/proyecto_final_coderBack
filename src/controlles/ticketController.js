import express from 'express';
import ticketService from '../services/ticketService.js';
import cartsService from '../services/cartsService.js';
import { enviarMail } from '../utils.js';

const router = express.Router();

async function newTocketController(req, res){
    try {
        const idCart = req.params.cid;
        const cart = await cartsService.getCartDetailsIdService(idCart);
        const user = req.user;
        const  respuestaTicket = await ticketService.newTicketService(idCart, cart, user.email);
        await enviarMail(respuestaTicket);  
        res.status(200).json({"status":"succes", "respuesta":respuestaTicket})
    } catch (error) {
        res.json({"Error al crear ticket":error})
    }
}


export default {
    newTocketController
}
