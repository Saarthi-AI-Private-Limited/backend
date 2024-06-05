import { Router } from "express";
const router = Router();
import user from "../models/UserModel.js";

router.post("/register", (req, res) => {
  // TODO: encrypt password on client side

  // const saltPassword = await bcrypt.genSalt(10); //salting
  // const securePassword = await bcrypt.hash(request.body.password, saltPassword); //hashing

  //getting each user details from request.body
  const newUser = new user({
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    email: request.body.email,
    address: request.body.address,
    phonenumber: request.body.phonenumber,
    password: request.body.password,
  });

  //saving each user details
  newUser
    .save()
    .then((data) => {
      response.json(data);
    })

    //if error occurs
    .catch((error) => {
      response.json(error);
    });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  user
    .findOne({ email: email })
    .then((data) => {
      if (data) {
        if (data.password === password) {
          response.json(data);
        } else {
          response.json({ message: "Invalid password" });
        }
      } else {
        response.json({ message: "Invalid email" });
      }
    })
    .catch((error) => {
      response.json(error);
    });
});
export default router;
