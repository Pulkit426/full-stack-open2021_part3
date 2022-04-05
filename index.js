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
    Person.find({})
          .then(result => response.json(result))
})

app.get('/api/info', (request,response) => {
    Person.find({}).then(result => {
    const currDate= new Date()
    response.send(`Phonebook has info for ${result.length} people <br/> ${currDate}`)
 })
 })
 
app.get('/api/persons/:id', (request,response,next) => {
    Person.findById(request.params.id)
          .then(result => {
                if(result) 
                    response.json(result)
                else
                    response.status(404).end()
               })
          .catch(error => next(error))
})

app.delete('/api/persons/:id', (request,response,next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error))
})

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


const errorHandler = (error,request,response,next) => {
    console.error(error.message)

    if(error.name==='CastError')
    return response.status(400).send({error: 'malformatted id'})

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})