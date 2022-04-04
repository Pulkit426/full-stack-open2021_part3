require('dotenv').config()
const express = require('express')
const morgan  = require('morgan')
const cors = require('cors')
const app= express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())


morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



app.get('/api/persons',(request,response) => {
    Person.find({}).then(result => 
        response.json(result))
})

app.get('/api/info', (request,response) => {
    const length = Person.find({}).then(result => result.length)
    const currDate= new Date()
    response.send(`Phonebook has info for ${length} people <br/> ${currDate}`)

})
 
app.get('/api/persons/:id', (request,response) => {
    Person.findById(request.params.id).then(result => response.json(result))
})

// app.delete('/api/persons/:id', (request,response) => {
//     const id= Number(request.params.id)

//     persons= persons.filter(person => person.id!==id)
//     response.status(204).end()
// })

const generateId = () => {
    return Math.floor(Math.random()*(3435973))
}

app.post('/api/persons', (request,response) => {
   const body= request.body 

   if(!body.name || !body.number){
       return response.status(400).json({
           "error": "Please fill complete info"
       }) 
   }


   const newPerson = new Person({
       name : body.name,
       number: body.number 
   })

   newPerson.save().then(savedPerson => response.json(savedPerson))

})


const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})