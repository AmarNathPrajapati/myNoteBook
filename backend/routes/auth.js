const express = require('express');
const router  = express.Router();
const User = require('../models/User');// importing User Schema
// to validate user data
const { body, validationResult } = require('express-validator');
// to secure user password
// const bcryptjs = require('bcryptjs');
//using jwt to provide better security 
// var jwt = require('jsonwebtoken');
// const JWT_SECRET = "Amarisgood$programmar";
// const fecthuser = require('../middleware/fetchuser');

//Route1:creating a user using POST "api/auth/createuser" No login required
router.post('/createuser',[
// authentication of user data
    body('name','Enter a  valid name').isLength({ min: 5 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password length should be minimum 5 Character').isLength({ min: 5 })

],async (req,res)=>{
  // return bad request if there are error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
// check whether exist already or not

        try {
          
        // let user = await User.findOne({email:req.body.email});
        // if(user){
        //   return res.status(400).json({error:"Sorry user with this email already exists"})
        // }
      // creating salt for password
      // const salt =await bcryptjs.genSalt(10);
      //generating hashpassword using bcrypt js
      // const secPassword = await bcryptjs.hash(req.body.Password,salt);
      // Create user if everything is ok
        const user = await User.create({
        name: req.body.name,
        // password: secPassword,//now we store hash password
        password:req.body.password,
        email: req.body.email,
      })
      
      // crating token
      // const data = {
      //   user:{
      //     id:user.id
      //   }
      // }
      // const authToken = jwt.sign(data,JWT_SECRET);
      // res.json({authToken});
      res.json(user)
  } catch (error) {
          console.error(error.message);
          res.status(500).send("Some error occured : internal serever");
  }


})
    //Route2:  authentication of user "api/auth/login".no login required No login required
//     router.post('/login',[
//       // authentication of user data
//           body('Email','Enter a valid email').isEmail(),    
//           body('Password','Password can not be blanked').exists(),    
//       ],async (req,res)=>{
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//     }
//     const {Email,Password} = req.body;
//     try{
//       let user =await User.findOne({Email});
//       if(!user){
//         return res.status(400).json({error:"Invalid Credentials"});
//       }

//       const passwordCompare =await bcryptjs.compare(Password,user.Password);
//       if(!passwordCompare){       
//         return res.status(400).json({error:"Invalid Credentials"});
//       }
//       const data = {
//         user:{
//           id:user.id
//         }
//       }
//       const authToken = jwt.sign(data,JWT_SECRET);
//       res.send({authToken});
//     }catch (error) {
//       console.error(error.message);
//       res.status(500).send("Some error occured : internal serever");
// }
//       })
// // Route3: Get loggedin  user Detail
// router.post('/getuser',fecthuser,async (req,res)=>{
//       try {
//         userId = req.user.id;
//         const user = await User.findById(userId).select("-password");
//         res.send(user);
//       }catch (error) {
//         console.error(error.message);
//         res.status(500).send("Some error occured : internal serever");
//   }
// })
module.exports = router

/*
  jwt is a method to verify user.it facilitate a secure connection between b/w server and client.
*/