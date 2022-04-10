import { asClass, createContainer } from "awilix";
import { loadControllers, scopePerRequest } from "awilix-express";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const container = createContainer();

container.register({
  userService: asClass(UserService).scoped(),
  userRepository: asClass(UserRepository).scoped()
});

app.use(scopePerRequest(container));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(loadControllers("./controllers/*.controller.ts", { cwd: __dirname }));

// Listen on port 8080
var listener = app.listen(8088, function () {
  console.log("Listening on port " + listener.address().port);
});
