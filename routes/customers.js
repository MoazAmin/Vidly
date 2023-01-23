const {Customer , validate} = require('../mod/customers')
const _ = require('lodash')
const express = require('express')
const router = express.Router();


router.get('/', async (req,res) => {
    res.send(await Customer.find().select('name'))
})

//Creating a customer 
router.post('/', async (req,res) => {
    const { error, value }  = validate(req.body)
    if(error) {
        return res.status(400).send(error.message)
    }
    let customer = new Customer(_.pick(value,'name','phone','isGold'))
    customer = await customer.save()
    return res.send(value)
    })

//Getting a customer 
router.get('/:id', async (req,res) => {
    const customer = await Customer.findOne({_id: req.params.id})

    if(!customer) return res.status(400).send("Customer ID invalid")
    return res.send(customer)
})

//Updating Customer 
router.put('/:id', async (req,res) => {
    let customer = await Customer.findOne({_id: req.params.id})
    if(!customer) return res.status(400).send("Customer ID invalid")

    const { error, value }  = validate(req.body)
    if(error) return res.status(400).send(error.message)

    customer.name = req.body.name
    customer.isGold = req.body.isGold
    customer.phone = req.body.phone

    await customer.save()
    return res.send(value)
})

//Deleting a customer
router.delete('/:id', async (req,res) => {
    const customer = await Customer.findByIdAndRemove({_id : req.params.id})
    .catch(() => console.log("Customer id Invalid"))
    
    if(!customer) return res.status(400).send("Customer ID invalid")
    return res.send(`Deleted Customer ${customer.name} successfully`)
})


module.exports = router