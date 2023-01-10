const {Customer , customerSchema} = require('../mod/customers')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();


const custom = mongoose.model('customer', Customer)


router.get('/', async (req,res) => {
    res.send(await custom.find())
})

//Creating a customer 
router.post('/', async (req,res) => {
    const { error, value }  = customerSchema.validate
    ({name : req.body.name, phone: req.body.phone, isGold:req.body.isGold}) ;
    if(error) {
        return res.status(400).send(error.message)
    }
    else {
        let customer = new custom({
            name : req.body.name, 
            phone: req.body.phone,
             isGold:req.body.isGold
        })
        customer = await customer.save()
        return res.send(value)
    }
})

//Getting a customer 
router.get('/:id', async (req,res) => {
    let customer = await custom.findById({_id: req.params.id})
    .catch(() => console.log("Customer id Invalid"))

    if(!customer) return res.status(400).send("Customer ID invalid")
    return res.send(customer)
})

//Updating Customer 
router.put('/:id', async (req,res) => {
    let customer = await custom.findById({_id: req.params.id})
    const { error, value }  = customerSchema.validate
    ({name : req.body.name, phone: req.body.phone, isGold:req.body.isGold}) ;
    if(error) {
        return res.status(400).send(error.message)
    }
    else {
        let customer = await custom.findByIdAndUpdate({_id: req.params.id}, 
            {
            name : req.body.name, 
            phone: req.body.phone,
            isGold:req.body.isGold
            })    
            .catch(() => console.log("Customer id Invalid"))
            if(!customer) return res.status(400).send("Customer ID invalid")

        return res.send(customer)
    }
})

//Deleting a customer
router.delete('/:id', async (req,res) => {
    const customer = await custom.findByIdAndRemove({_id : req.params.id})
    .catch(() => console.log("Customer id Invalid"))
    
    if(!customer) return res.status(400).send("Customer ID invalid")
    return res.send("Deleted Succesfully")
})


module.exports = router