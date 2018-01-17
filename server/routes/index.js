var express=require('express');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var Applications=require('../models/Applicants');

var router = express.Router();

router.use(bodyParser.json()).get('/api/',function(req,res,next){

		res.send('Server');
}).post('/api/',function(req,res,next) {
        var newApp = {
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "email": req.body.email,
            "zipcode": req.body.zipcode,
            "code": '',
            "status": "Not submitted",

        }
        Applications.create(newApp,function (err, resp) {
            if (err) {
                // duplicate entry of email
                if(11000 === err.code){
                    res.status(422).send( {
                        "type": "error",
                        "message": "'Email already registered'"
                    });
                }else {
                    console.log("Error:" + err);
                    res.send({
                        "type": "error",
                        "message":err.statusText
                    });
                }
            }
            else{
                res.json({ "id" :resp._id});
            }

        });
    });
router.route('/api/submit/').put(function(req, res, next) {
    console.log(req.body._id, req.body.code);
    Applications.findOneAndUpdate({$and : [ {_id:(req.body._id)},{ status : "Not submitted"}]},{$set: {code : req.body.code , status: "Pending" }},{new:true},function(err,resp){
        if (err)
            res.send( { "type": "error","message": res.statusText } );
        else{
            if(resp!=null)
                res.json({ type:'success', "message": 'code submitted successfully'});
            else{
                res.send({
                    type: "error","message":'CODE WAS SUBMITTED EARLIER, CANNOT SUBMIT AGAIN'
                });
            }
        }

    });

});

/* request for loading all the applicants on Admin page*/
router.route('/api/getAll/').get(function(req, res, next) {
	console.log("dsdsd");
    Applications.find(function(err,resp) {
        if (err)
            res.send({"type": "error", "message": res.statusText});
        else {
                console.log(resp);
            res.json(
                resp
            );
        }
    })
})

/* request for updating applicant's coding evaluation*/
router.route('/api/update/').put(function(req,res,next){
    Applications.findOneAndUpdate({email:req.body.email},{$set : {status : req.body.status}},function(err,resp){
        if(err)
            res.send({"type":"error" , "message":res.statusText});
        else
            res.send({"type": "success", "message":"code updated successfully"});
    })
})


module.exports=router;