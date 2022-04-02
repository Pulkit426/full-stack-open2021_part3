const mongoose = require('mongoose')

if(process.argv.length<3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

if(process.argv.length==4){
    console.log("Please enter number also")
    process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://user1:${password}@cluster0.dmhvx.mongodb.net/PhoneBook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length===3){

    Person.find({}).then(result =>{
        console.log("phonebook: ")
        result.forEach(person => console.log(person.name, person.number))
        mongoose.connection.close()
    })

}

if(process.argv.length===5){
    const nameVal= process.argv[3]
    const numberVal= process.argv[4]

    const person = new Person({
        name: nameVal,
        number: numberVal
    })

    person.save().then(result => {
        console.log("added ",result.name," number ",result.number," to phonebook")
        mongoose.connection.close()
    })
}

