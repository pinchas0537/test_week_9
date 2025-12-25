import express from "express";
import usersRouter from "./routers/usersR.js"
import eventRouter from "./routers/eventR.js"
import ticketRouter from "./routers/ticketsR.js"

const app = express();
const port = 8080;

app.use(express.json());

app.use("/user",usersRouter);

app.use("/creator",eventRouter)

app.use("/users",ticketRouter)

app.get("/", (req, res) => {
    res.send("Wolcome to server!")
});

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`)
});
