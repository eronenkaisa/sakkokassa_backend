const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]

const url =
	`mongodb+srv://eronenkaisa:${password}@cluster0.dyvrfvp.mongodb.net/sakkokassa?retryWrites=true&w=majority`

/*mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
	name: 'Kaisa'
})

person.save().then(result => {
	console.log('person saved!')
	mongoose.connection.close()
})
*/

mongoose.connect(url)

const penaltySchema = new mongoose.Schema({
	playerId: String,
	date: String,
	comment: String,
	sum: Number,
	paid: Boolean,
})

const Penalty = mongoose.model('Penalty', penaltySchema)

const penalty = new Penalty({
	playerId: '6351288d13a0979b79b76232',
	date: '20.10.2022',
	comment: 'Being late',
	sum: 5,
	paid: false
})

penalty.save().then(result => {
	console.log('penalty saved!')
	mongoose.connection.close()
})


