const express = require("express");
const TodoListController = require("../controllers/TodoListController");
const UserProfileController = require("../controllers/UserProfileController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const router = express.Router();


router.post("/create-profile", UserProfileController.CreateUserProfile)
router.post("/user-login", UserProfileController.UserLogin)


router.get("/select-profile", AuthVerifyMiddleware, UserProfileController.SelectUser)
router.post("/update-profile", AuthVerifyMiddleware, UserProfileController.UpdateUser)


router.post("/create-todo", AuthVerifyMiddleware, TodoListController.CreateTodo)
router.get("/select-todo", AuthVerifyMiddleware, TodoListController.SelectTodo)
router.post("/update-todo", AuthVerifyMiddleware, TodoListController.UpdateTodo)
router.post("/update-todo-status", AuthVerifyMiddleware, TodoListController.UpdateStatusTodo)
router.post("/delete-todo", AuthVerifyMiddleware, TodoListController.RemoveTodo)
router.get("/filter-todo-bystatus", AuthVerifyMiddleware, TodoListController.FilterTodoByStatus)
router.get("/filter-todo-bydate", AuthVerifyMiddleware, TodoListController.FilterTodoByDate)



module.exports = router;