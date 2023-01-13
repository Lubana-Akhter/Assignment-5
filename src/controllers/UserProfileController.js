const UserProfileModel = require("../models/UserProfileModel");
var jwt = require('jsonwebtoken');

exports.CreateUserProfile = (req, res) => {
    let reqbody = req.body;
    UserProfileModel.create(reqbody, (err, data) => {
        if (err) {
            res.status(400).json({ status: "Fail", data: err })
        }
        else {
            res.status(200).json({ status: "Success", data: data })
        }
    })

}

exports.UserLogin = (req, res) => {
    let Username = req.body["Username"];
    let Password = req.body["Password"];
    UserProfileModel.find({ Username: Username, Password: Password }, (err, data) => {
        if (err) {
            res.status(401).json({ status: "Unauthorised" })
        }
        else {
            if (data.length > 0) {
                //Create JWTauth token
                let payload = {
                    exp: Math.floor(Date.now() / 1000) + (24*30*60 * 60),
                    data: data[0]
                }
                let token = jwt.sign(payload, "secreTKeySARIN");
                res.status(200).json({ status: "Success", token: token, data: data[0] })
            }
            else {
                res.status(401).json({ status: "Unauthorised" })
            }
        }
    })

}

exports.SelectUser = (req, res) => {
    let Username =req.headers["username"];

    UserProfileModel.find({ Username: Username }, (err, data) => {
        if (err) {
            res.status(401).json({ status: "Unauthorised" })
        }
        else {
            res.status(200).json({ status: "Success", data: data })
        }
    })

}

exports.UpdateUser = (req, res) => {
    let Username =req.headers["username"];
    let reqbody = req.body;
   
  UserProfileModel.updateOne({ Username: Username },{$set:reqbody},{upsert:true}, (err, data)=>{
    if (err) {
        res.status(400).json({ status: "update Failed", data:err })
    }
    else {
        res.status(200).json({ status: "Update Success", data: data })
    }
  })
}