import {arrToJson, jsonToArr} from "./files.js"

const path = './data/events.json'

export const addTicket = async (req, res) => {
    try {
        const {username,password,eventName,quantity} = req.body
        const newTicket = { 
            username: username, 
            eventName:eventName,
            ticketsBought:quantity}

        const tickets = await jsonToArr(path)
        const readReceipts = await jsonToArr('./data/receipts.json')
        const findTicket = tickets.find(ticket  => newTicket.eventName === ticket.eventName.toLowerCase())
        if(findTicket){
        if (newTicket) {
            readReceipts.push(newTicket)
            await arrToJson('./data/receipts.json', readReceipts)
            await editTicketInEVents(req,res)
            res.json({"message":  "Tickets purchased successfully", newTicket})
        } else { res.status(400).json({ "message": "Missing name or password!" }) }}
        else {res.status(404).json({"message":"No event with that name was found."})}
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};




const editTicketInEVents = async (req,res) =>{
    try {
        const {quantity,eventName} = req.body
        const readfile = await jsonToArr(path)
        const findFile = readfile.find(event => event.eventName === eventName)
        if(findFile.ticketsBought >= quantity){
            findFile.ticketsBought -= quantity;
            await arrToJson(path,readfile);
        }
        else{res.status(404).json({"message":"There are not enough tickets to buy."})}
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}