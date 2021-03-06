const express = require('express')
const bodyParser = require('body-parser')
import { connect, model, Schema } from 'mongoose'
const app = express()
import { ApiRouter } from '../src/router'

app.use(bodyParser.json())

connect('mongodb://localhost:27017/database')
const router = ApiRouter()

const customer = model('Customer', new Schema({
    complex: {
        name: String,
        number: Number
    },
    name: { type: String, required: true },
    comment: { type: String },
    arraycomment: [{ type: String }],
    arrayint: [{ type: Number }],
    arrayDate: [{ type: Date }],
    dateField: { type: Date }
}))
const provider= model('Provider', new Schema({
    name: {
        type: [{ hola: { type: String, required: true, label: true }, adios: { type: String, required: true } }],
        required: true,
    },
    customer: [{
        ref: 'Customer', type: Schema.Types.ObjectId
    }],
    comment: { type: String }
}))

router.setGlobalRoute('')
router.setModel('/customer', customer, {name: 'name'})
router.setModel('/provider', provider)
app.use('/', router)
app.get('/tree', router.publishUiTree())
app.listen(3000, () => {
    console.log('Express server listening on port 3000')
})
module.exports = {
    customer, provider
}