import {arrToJson, jsonToArr} from "./files.js"

const path = './data/events.json'

export const addEvent = async (req, res) => {
    try {
        const {eventName , ticketsForSale, username,password} = req.body
        const newEvent = { 
            eventName:eventName,
            ticketsAvailable:ticketsForSale,
            createdBy: username}
        const event = await jsonToArr(path)
        if (newEvent) {
            event.push(newEvent)
            await arrToJson(path, event)
            res.json({"message": "Event created successfully"})
        } else { res.status(400).json({ "message": "Missing name or password!" }) }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};