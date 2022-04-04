const mongoose = require('mongoose')

if(process.argv.length<3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

if(process.argv.length==4){
    console.log("Please enter number also")
    process.exit(1)
}

const url = process.env.MONGODB_URI
console.log("connecting to ", url)

mongoose.connect(url)
        .then(result => console.log('connected to MongoDB')
        .catch(error => console.log("error connecting to MongoDB", error.message))

)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })



  module.exports = mongoose.model('Person', personSchema)

// const Person = mongoose.model('Person', personSchema)

// if(process.argv.length===3){

//     Person.find({}).then(result =>{
//         console.log("phonebook: ")
//         result.forEach(person => console.log(person.name, person.number))
//         mongoose.connection.close()
//     })

// }

// if(process.argv.length===5){
//     const nameVal= process.argv[3]
//     const numberVal= process.argv[4]

//     const person = new Person({
//         name: nameVal,
//         number: numberVal
//     })

//     person.save().then(result => {
//         console.log("added ",result.name," number ",result.number," to phonebook")
//         mongoose.connection.close()
//     })
// }

