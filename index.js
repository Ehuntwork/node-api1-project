//BASICS
const express = require('express')
const shortid = require('shortid')//generates a short id number
const server = express();

//EXPRESS LEARNS JSON
server.use(express.json());

//SHCEMA(s)
let users = [
    {
        id: shortid.generate(), 
        name: "Jane Doe", 
        bio: "Not Tarzan's Wife, another Jane", 
    },
]

let user = 
    {
        id: 0, 
        name: "", 
        bio: "", 
    }

//GET USERS(SUCCESS)
server.get('/api/users', (req, res) =>{
    res.status(200).json(users)
})

//GET USER(SUCCESS)
server.get('/api/users/:id', (req, res) =>{
    const id = req.params.id.toLocaleLowerCase();
    
    if(users.filter(a => a.id.toLocaleLowerCase() === id)===[]){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else{
        user = users.filter(a => a.id.toLocaleLowerCase() === id)
        res.status(200).json(user)

    }

})

//POST USER(SUCCESS)
server.post('/api/users', (req, res) =>{
    const user = req.body;
    user.id = shortid.generate();

    if(user.name === undefined || user.bio === undefined){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    else{
        users.push(user)
        res.status(201).json(users)
    }

})

//PUT USER
server.put('/api/users/:id', (req, res) =>{
    const id = req.params.id.toLocaleLowerCase();
    const UpdateUser = req.body;

    for(let i = 0; users.length > i; i++){
        if(users[i].id.toLocaleLowerCase() === id){
            return users[i] = UpdateUser
        }
    }
    // users.map(u =>{
    //     if(u.id.toLocaleLowerCase() === id){
    //         console.log(u)
    //         return users = [...users, users[u]]
    //     }}
    // )

    res.status(200).json(users)
})

//DELETE USER(SUCCESS)
server.delete('/api/users/:id', (req, res) =>{
    const id = req.params.id.toLocaleLowerCase();

    users = users.filter(a => a.id.toLocaleLowerCase() !== id)

    res.status(204).end();
})



//DEFINE PORT
const port = 5000;
server.listen(port, ()=> console.log('...server is running'))