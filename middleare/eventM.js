import { jsonToArr } from "../cntrl/files.js"

const path = './data/users.json'

export const validUser = async (req,res,next)=>{
try {
    const {username, password} = req.body
    const users = await jsonToArr(path)
    const findUsers = users.find(user => username === user.username && password === user.password)
    if (findUsers){
        next()
    }else{res.status(401).json("not funde")}
} catch (error) {
    res.status(404).json({error:error.message})
}
}