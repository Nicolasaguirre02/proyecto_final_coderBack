export default class Ticket{
    constructor(model){
        this.model = model
    };

    async getTicketID(id){
        return await this.model.findById(id);
    }

    async newTicket(ticket){
        return await this.model.create(ticket);
    }
}