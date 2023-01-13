const TodoListModel = require("../models/TodoListModel");

exports.CreateTodo = (req, res) => {
    let reqbody = req.body;

    let TodoSubject = reqbody["TodoSubject"];
    let TodoDescription = reqbody["TodoDescription"];
    let Username = req.headers["username"];
    let TodoStatus = "New";
    let TodoCreateDate = Date.now();
    let TodoUpdateDate = Date.now();

    let postbody = {
        Username: Username,
        TodoSubject: TodoSubject,
        TodoDescription: TodoDescription,
        TodoStatus: TodoStatus,
        TodoCreateDate: TodoCreateDate,
        TodoUpdateDate: TodoUpdateDate
    }


    TodoListModel.create(postbody, (err, data) => {

        if (err) {
            res.status(400).json({ status: "Fail", data: err })
        }
        else {
            res.status(200).json({ status: "Success", data: data })
        }
    })

}

exports.SelectTodo = (req, res) => {
    let Username = req.headers["username"];

    TodoListModel.find({ Username: Username }, (err, data) => {
        if (err) {
            res.status(401).json({ status: "Unauthorised" })
        }
        else {
            res.status(200).json({ status: "Success", data: data })
        }
    })

}

exports.UpdateTodo = (req, res) => {

    let reqbody = req.body;
    let _id = reqbody['_id'];
    let TodoSubject = reqbody["TodoSubject"];
    let TodoDescription = reqbody["TodoDescription"];
    let TodoUpdateDate = Date.now();

    let postbody = {
        TodoSubject: TodoSubject,
        TodoDescription: TodoDescription,
        TodoUpdateDate: TodoUpdateDate
    }


    TodoListModel.updateOne({ _id: _id }, { $set: postbody }, { upsert: true }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "update Failed", data: err })
        }
        else {
            res.status(200).json({ status: "Update Success", data: data })
        }
    })
}

exports.UpdateStatusTodo = (req, res) => {

    let reqbody = req.body;
    let _id = reqbody['_id'];
    let TodoStatus = reqbody["TodoStatus"];
    let TodoUpdateDate = Date.now();

    let postbody = {
        TodoStatus: TodoStatus,
        TodoUpdateDate: TodoUpdateDate
    }


    TodoListModel.updateOne({ _id: _id }, { $set: postbody }, { upsert: true }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "update status Failed", data: err })
        }
        else {
            res.status(200).json({ status: "Update status Success", data: data })
        }
    })
}

exports.RemoveTodo = (req, res) => {

    let reqbody = req.body;
    let _id = reqbody['_id'];
   
    TodoListModel.remove({ _id: _id }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "Delete Failed", data: err })
        }
        else {
            res.status(200).json({ status: "Delete Success", data: data })
        }
    })
}

exports.FilterTodoByStatus = (req, res) => {
    let Username = req.headers["username"];
    let TodoStatus = req.body["TodoStatus"];

    TodoListModel.find({ Username: Username,TodoStatus:TodoStatus }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "Not this status" })
        }
        else {
            res.status(200).json({ status: "Success", data: data })
        }
    })

}
exports.FilterTodoByDate = (req, res) => {
    let Username = req.headers["username"];
    let FromDate = req.body["FromDate"];
    let ToDate= req.body["ToDate"];

    TodoListModel.find({ Username: Username,TodoCreateDate:{$gte:new Date(FromDate), $lte:new Date(ToDate)}}, (err, data) => {
        if (err) {
            res.status(400).json({ status: "not found", data:err })
        }
        else {
            res.status(200).json({ status: "Success", data: data })
        }
    })

}