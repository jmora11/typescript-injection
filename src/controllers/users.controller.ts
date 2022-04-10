import { POST, route } from "awilix-express";
import { before, GET } from "awilix-router-core";
import { UserService } from "../services/user.service";
import bodyParser from "body-parser";

@before(bodyParser())
@route("/users")
export default class UsersController {
  usersService: UserService;
  constructor(container) {
    this.usersService = container.userService;
  }

  @route("/initData")
  @GET()
  async initData(req, res, _next) {
    await this.usersService.initData();
    return res.send("Data intiated");
  }

  @route("/getAll")
  @GET()
  async getUsers(req, res, _next) {
    const result = await this.usersService.getUsersAsync();
    return res.send(result);
  }

  @route("/get/:id")
  @GET()
  async getUserById(req, res, _next) {
    const result = await this.usersService.getUserByIdAsync(req.params.id);
    return res.send(result);
  }

  @route("/save")
  @POST()
  async addUser(req, res, _next) {
    const result = await this.usersService.saveUser(req.body);
    return res.send(result);
  }

  @route("/delete/:id")
  @POST()
  async deleteUser(req, res, _next) {
    const result = await this.usersService.delete(req.params.id);
    return res.send(result);
  }
}
