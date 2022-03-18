const express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const mongoose = require('mongoose');
const { ValidationError } = require('mongoose/lib/document');
const Employee = mongoose.model('Employee');


router.get('/',(req, res)=>{
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) =>{
    // console.log(req.body);
    if(req.body._id == '')
       insertRecord(req, res);
    else
       updateRecord(req, res);   
});

// router.post('/', (req, res) => {
//     insertRecord(req, res);
// });

function insertRecord(req, res){
    var employee = new Employee();
    employee.Name = req.body.Name;
    employee.Age = req.body.Age;
    employee.Email = req.body.Email;
    employee.Gender = req.body.Gender;
    employee.Mobile = req.body.Mobile;
    employee.Birthday = req.body.Birthday;
    employee.City = req.body.City;
    employee.State = req.body.State;
    employee.Country = req.body.Country;
    employee.Address1 = req.body.Address1;
    employee.Address2 = req.body.Address2;
    employee.save((err, doc) => {
        if(!err)
            res.redirect('employee/list')
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);

                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else    
                console.log('Error during record insertion : ' + err)
        }
    });
}

function updateRecord(req, res){
    Employee.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('employee/list');
        }
        else{
            if(err.name == "ValidationError"){
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Updatee Employee',
                    employee: req.body
                });
            }
            else{
                console.log('Error during record update : ' + err);
            }
        }
    });
}

router.get('/list', (req, res) => {
    // res.json('from list')
    Employee.find((err, docs) => {
        if(!err){
            const context = {
                list: docs.map(doc => {
                    return {
                        _id: doc._id,
                        Name: doc.Name,
                        Age: doc.Age,
                        Email : doc.Email,
                        Gender: doc.Gender,
                        Mobile : doc.Mobile,
                        Birthday: doc.Birthday,
                        City : doc.City,
                        State: doc.State,
                        Country: doc.Country,
                        Address1: doc.Address1,
                        Address2: doc.Address2
                    }
                })
            }
            res.render('employee/list', {
                list: context.list
            })
            // res.render("employee/list", {
            //     list: docs
            // });
        }
        else{
            console.log("Error in retrieving employee list : " + err);
        }
    });
});

function handleValidationError(err, body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'Name': 
              body['NameError'] = err.errors[field].message;
              break;
            
            case 'Age': 
            body['AgeError'] = err.errors[field].message;
            break; 

            case 'Email': 
            body['EmailError'] = err.errors[field].message;
            break;

            case 'Gender': 
            body['GenderError'] = err.errors[field].message;
            break;
            
            case 'Mobile': 
            body['MobileError'] = err.errors[field].message;
            break; 

            case 'Birthday': 
            body['BirthdayError'] = err.errors[field].message;
            break;

            case 'City': 
            body['CityError'] = err.errors[field].message;
            break;
            
            case 'State': 
            body['StateError'] = err.errors[field].message;
            break; 

            case 'Country': 
            body['CountryError'] = err.errors[field].message;
            break;

            case 'Address1': 
            body['Address1Error'] = err.errors[field].message;
            break;
            
            case 'Address2': 
            body['Address2Error'] = err.errors[field].message;
            break; 

            default:
                break;
        }
    }
}

router.get('/:id', (req, res) =>{
    Employee.findById(req.params.id, (err, doc) => {
        if(!err){
            
            res.render("employee/addOrEdit", {
                employee: doc.toJSON(),
                viewTitle: "Update Employee"
            });
        }
        // else{

        // }
    });
})

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/employee/list');
        }
        else{
            console.log('Error in employee delete : ' + err);
        }
    });
});

module.exports = router;