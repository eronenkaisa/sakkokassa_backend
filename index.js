require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
require('./mongoose')
const Person = require('./models/person')
const Penalty = require('./models/penalty')
const PenaltyType = require('./models/penaltyType')
const { response } = require('express')

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())


app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons)
	})
})

app.get('/api/persons/:personId', (req, res, next) => {
	Person.findById(req.params.personId)
		.then(person => {
			if (person) {
				res.json(person)
			} else {
				res.status(404).end()
			}
		})
		.catch(error => {
			next(error)
		})
})

app.post('/api/persons', (req, res) => {
	const body = req.body
	console.log(body)

	if (body.name === undefined) {
		return res.status(400).json({ error: 'name missing' })
	}

	const person = new Person({
		name: body.name
	})

	person.save().then(savedPerson => {
		res.json(savedPerson)
	})
})

//Deletes person and her/his penalties
app.delete('/api/persons/:personId', (req, res, next) => {
	Person.findByIdAndRemove(req.params.personId)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))

	Penalty.deleteMany({ personId: req.params.personId }).then(result => {
		res.status(204).end()
	})
		.catch(error => next(error))

})



app.get('/api/penalties', (req, res) => {
	Penalty.find({}).then(penalties => {
		res.json(penalties)
	})
})

app.get('/api/penalties/:personId', (req, res) => {
	Penalty.find({ personId: req.params.personId }).then(penalties => {
		res.json(penalties)
	})
})

app.post('/api/penalties', (req, res) => {
	const body = req.body
	console.log('POST penalties runko:', body)

	if (body.personId === '') {
		return res.status(400).json({ error: 'personId missing' })
	}

	const penalty = new Penalty({
		personId: body.personId,
		date: body.date,
		type: body.type,
		sum: body.sum * 100,
		comment: body.comment,
		paid: false
	})

	penalty.save().then(savedPenalty => {
		res.json(savedPenalty)
	})
})

app.get('/api/penaltyTypes', (req, res) => {
	PenaltyType.find({}).then(penaltyTypes => {
		res.json(penaltyTypes)
	})
})

app.post('/api/penaltyTypes', (req, res) => {
	const body = req.body
	console.log(body)

	if (body.type === undefined) {
		return res.status(400).json({ error: 'penalty type missing' })
	}

	const penaltyType = new PenaltyType({
		type: body.type
	})

	penaltyType.save().then(savedType => {
		res.json(savedType)
	})
})




const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

