const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
    Username: { type: String },
    TodoSubject: { type: String },
    TodoDescription: { type: String },
    TodoStatus: { type: String, default: "New" },
    TodoCreateDate: { type: Date },
    TodoUpdateDate: { type: Date }



}, { timestamps: true, versionKey: false, autoIndex: true });
const TodoListModel = mongoose.model("TodoList", DataSchema)
module.exports = TodoListModel;