const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: 'This field is required',
        // trim: true
    },
    Age:{
        type: Number,
        required: true,
        // trim: true
    },
    Email:{
        type: String,
        required: true,
        // trim: true
    },
    Gender:{
        type: String,
        required: true,
        // trim: true
    },
    Mobile:{
        type: Number,
        required: true,
        // trim: true
    },
    Birthday:{
        type: String,
        required: true,
        // trim: true
    }, 
    City:{
        type: String,
        required: true,
        // trim: true
    },
    State:{
        type: String,
        required: true,
        // trim: true
    },
    Country:{
        type: String,
        required: true,
        // trim: true
    },
    Address1:{
        type: String,
        required: true,
        // trim: true
    },
    Address2:{
        type: String,
        required: true,
        // trim: true
    }

});

//email validation
employeeSchema.path('Email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail');


mongoose.model('Employee', employeeSchema);