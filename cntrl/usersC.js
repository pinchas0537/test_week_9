import { arrToJson, jsonToArr } from "./files.js"

const path = './data/users.json'

export const addUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const newUser = { username: username, password: password }
        const user = await jsonToArr(path)
        if (user.find(user => user.username === newUser.username)) res.status(409).json({ "message": "Such a username already exists!" })
        if (newUser) {
            user.push(newUser)
            await arrToJson(path, user)
            res.json({ "message": "User registered successfully" })
        } else { res.status(400).json({ "message": "Missing name or password!" }) }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export const getSumByUsername = async (req, res) => {
    let countTicketsBought = 0
    const events = []
    let averageTicketsPerEvent = 0
    const { username } = req.params
    const file = await jsonToArr('./data/receipts.json')
    const filterFile = file.filter((user) => {
        if (user.username === username) {
            countTicketsBought += user.ticketsBought
            // const forEvents = events.filter(event => )
            events.push(user.eventName)
            const average = (countTicketsBought / events.length)
            averageTicketsPerEvent += average
            const total = {
                totalTicketsBought: countTicketsBought,
                events: events,
                averageTicketsPerEvent: averageTicketsPerEvent
            }
            res.json(total)
        }
    })
    if (filterFile == []) {
        res.json({
            totalTicketsBought: countTicketsBought,
            events: events,
            averageTicketsPerEvent: averageTicketsPerEvent
        })
    }else{res.json({
            totalTicketsBought: countTicketsBought,
            events: events,
            averageTicketsPerEvent: averageTicketsPerEvent
        })}
}