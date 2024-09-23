import ticketModel from "../dao/models/ticket.models.js";
import Ticket from "../dao/repositories/Ticket.repository.js";
import { generarCodigo } from "../utils.js";

const ticketData = new Ticket(ticketModel);


async function newTicketService(idCart, cart, useremail){
    const idCarrito = idCart;
    const cartsDetails = cart.products;

    const totalSum = cartsDetails.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);
    
    const newTicket = {
        code: generarCodigo(),
        amount:totalSum,
        purchaser:useremail
    }
    
    const respuestaticket = ticketData.newTicket(newTicket);
   
    return respuestaticket;
}


export default {
    newTicketService
}