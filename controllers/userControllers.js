
// const { response } = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer")
// const Users = require("../model/userModel");
// const {User} = require("../model/userModel");
 
// const createUser = async (req,res) => {
//   console.log(req.body);

//   const { firstName, lastName, email, password } = req.body;

//   if(!firstName || !lastName || !email || !password){
//       return res.json({
//           success : false,
//           message : "Please enter all the fields."
//       })
//   }

//   // step 4 : try catch block
//   try {
//       // step 5 : Check existing user
//       console.log(User);
//       const existingUser = await User.findOne({email: email})
//       if(existingUser){
//           return res.json({
//               success : false,
//               message : "User already exists."
//           })
//       }

//       // password encryption
//       const randomSalt = await bcrypt.genSalt(10);
//       const encryptedPassword = await bcrypt.hash(password,randomSalt)

//       // step 6 : create new user
//       const newUser = new User({
//           // fieldname : incomming data name
//           firstName : firstName,
//           lastName : lastName,
//           email : email,
//           password : encryptedPassword,
//       })

//       // step 7 : save user and response
//       await newUser.save();
//       res.status(200).json({
//           success : true,
//           message : "User created successfully."
//       })

      
//   } catch (error) {
//       console.log(error);
//       res.status(500).json("Server Error")
//   }

  
// }
 
// // const loginUser = async (req, res) => {
// //   // Step 1: Check incoming data
// //   console.log(req.body);
 
// //   // Destruction
// //   const { email, password } = req.body;
 
// //   // Validation
// //   if (!email || !password) {
// //     return res.json({ success: false, message: "Please enter all fields" });
// //   }
 
// //   // try catch block
// //   try {
// //     //  finding users
// //     const user = await User.findOne({ email: email });
// //     if (!user) {
// //       return res.json({
// //         success: false,
// //         message: "User Not Found",
// //       });
// //     }
 
// //     // User exist
// //     // Comparing Password
// //     const databasePassword = user.password;
// //     const isMatched = await bcrypt.compare(password, databasePassword);
 
// //     if (!isMatched) {
// //       return res.json({
// //         success: false,
// //         message: "Invalid Credentials",
// //       });
// //     }
 
// //     // Create token
// //     const token = await jwt.sign({ id: user._id, isAdmin:user.isAdmin }, process.env.JWT_SECRET);
// //     sendTokenResponse(user,200,res);

// //     //  response
// //     res.status(200).json({
// //       success: true,
// //       message: "User Logged in successfully",
// //       token: token,
// //       userData: user,
      
// //     });

// //   } catch (error) {
// //     console.error(error);
// //     res.json({
// //       success: false,
// //       message: "Server error",
// //       error: error,
// //     }
// //     );
// //   }


// // };

// const loginUser = async (req, res) => {
//   // Step 1: Check incoming data
//   console.log(req.body);
 
//   // Destruction
//   const { email, password } = req.body;
 
//   // Validation
//   if (!email || !password) {
//     return res.json({ success: false, message: "Please enter all fields" });
//   }
 
//   // try catch block
//   try {
//     //  finding users
//     const user = await User.findOne({ email: email });
//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User Not Found",
//       });
//     }
 
//     // User exist
//     // Comparing Password
//     const databasePassword = user.password;
//     const isMatched = await bcrypt.compare(password, databasePassword);
 
//     if (!isMatched) {
//       return res.json({
//         success: false,
//         message: "Invalid Credentials",
//       });
//     }
 
//     // Create token
//     const token = await jwt.sign({ id: user._id, isAdmin:user.isAdmin }, process.env.JWT_SECRET);
 
//     //  response
//     res.status(200).json({
//       success: true,
//       message: "User Logged in successfully",
//       token: token,
//       userData: user,
      
//     });
//   } catch (error) {
//     console.error(error);
//     res.json({
//       success: false,
//       message: "Server error",
//       error: error,
//     });
//   }
//   // sendTokenResponse(student, 200, res);

// };
// const getProfile = async (req, res) => {
//   try {
//     const user = await Users.findById(req.user.id).select('-password');
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }
//     res.json({ success: true, user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// const editProfile = async (req, res) => {
//   const { firstName, lastName, email } = req.body;

//   // Build a user object
//   let userFields = {};
//   if (firstName) userFields.firstName = firstName;
//   if (lastName) userFields.lastName = lastName;
//   if (email) userFields.email = email;

//   try {
//     let user = await Users.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // Update the user
//     user = await Users.findByIdAndUpdate(
//       req.user.id,
//       { $set: userFields },
//       { new: true }
//     );

//     res.json({ success: true, message: "Profile updated successfully", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// const getUsers = async (req,res) => {
//   try {
//       const allUsers = await User.find({});
//       res.json({
//           success : true,
//           message : "All users fetched successfully!",
//           products : allUsers
//       })
      
//   } catch (error) {
//       console.log(error);
//       res.send("Internal server error")
//   }
// }
// const getSingleUser = async (req,res) => {
//   const userId = req.params.id;
//   try {
//       const singleUser = await User.findById(userId);
//       res.json({
//           success : true,
//           message : "Single user fetched successfully!",
//           product : singleUser
//       })
      
//   } catch (error) {
//       console.log(error);
//       res.send("Internal server error")
//   }
// }
// const getMyProfile = async (req, res) => {
//   try {
//     // Fetch user details except the password using the ID from JWT token
//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }
//     res.json({ success: true, user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Function to update the profile of the logged-in user
// const updateMyProfile = async (req, res) => {
//   const { firstName, lastName, email } = req.body;
//   const userFields = { firstName, lastName, email };
//   try {
//     let user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }
//     // Update the user profile
//     user = await User.findByIdAndUpdate(req.user.id, { $set: userFields }, { new: true }).select('-password');
//     // localStorage.setItem("user", JSON.stringify(res.data.user));

//     res.json({ success: true, message: "Profile updated successfully", user });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


// // update product
// // const editProfile = async (req,res) => {
// //   // step 1 : check incomming data
// //   console.log(req.body);
// //   console.log(req.files);

// //   // destructuring data
// //   const {
// //       firstName,
// //       lastName,
// //       email,
     
// //   } = req.body;
 

// //   // validate data
// //   if( !firstName 
// //       || !lastName 
// //       || !email 
// //      ){
// //       return res.json({
// //           success : false,
// //           message : "Required fields are missing!"
// //       })
// //   }

// //   try {
// //           // make updated json data
// //           const updatedData = {
// //             firstName : firstName,
// //             lastName : lastName,
// //             email : email,
// //           }

// //           // find product and update
// //           const userId = req.params.id;
// //           await Users.findByIdAndUpdate(userId, updatedData)
// //           res.json({
// //               success : true,
// //               message : "User Profile updated successfully ",
// //               updatedUser : updatedData
// //           })
// //   } catch (error) {
// //       res.status(500).json({  
// //           success : false,
// //           message : "Internal server error"
// //       })
// //   }
// // }

// //Forgot password 
// const forgotPassword = async (req, res, next) => {
//   const { email } = req.body;

//   //validation
//   if (!email) {
//       return res.status(400).json({
//           success: false,
//           message: 'Please Enter email'
//       })
//   }
//   try {
//       const user = await User.findOne({ email });
//       if (!user) {
//           // const randomString = randomstring.generate();
//           // const data = await User.updateOne({email: email}, {$set:{token: randomString}});

//           res.status(400).json({
//               success: true,
//               message: 'User Donot Exist.'
//           })
//           return;
//       }
//       //Creating a token 
//       const secret = process.env.JWT_SECRET + user.password

//       const token = jwt.sign({
//           email: user.email,
//           id: user._id
//       }, secret, { expiresIn: '10m' })

//       //Creating a link
//       const link = `http://localhost:5000/api/user/reset-password/${user._id}/${token}`;
//       console.log(link)
//       var transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//               user: 'asmitakatel444@gmail.com',
//               pass: 'tlca obnw bojw rdoj'
//           }
//       })

//       var mailOption = {
//           from: 'asmitakatel444@gmail.com',
//           to: email,
//           subject: 'Password Reset link',
//           text: link
//       };

//       transporter.sendMail(mailOption, function(error, info){
//           if(error){
//               console.log(error)
//           }else{
//               console.log('Email Sent' + info.response)
//           }
//       });

//   } catch (error) {
//       res.status(400).json({
//           success: false,
//           message: error.message
//       })
//   }
// }

// //Reset Password
// const resetPassword = async (req, res) => {
//   //Taking id and token from params
//   console.log("Hittttttttttttt")
//   const { id, token } = req.params;
//   console.log(id)
//   console.log(token)

//   // to check if the id or token is provided 
//   const oldUser = await User.findById({ _id: id });
//   if (!oldUser) {
//       return res.status(400).json({
//           success: false,
//           message: "User Doesnot Exist"
//       })
//   }
//   // //Verifying token
//   const secret = process.env.JWT_SECRET + oldUser.password
//   try {
//       const verify = jwt.verify(token, secret);
//       // if token is verified 
//       if (verify) {
//           res.render('index', { email: verify.email })
//       }
//   } catch (error) {
//       console.log("hello")
//       res.status(500).json({
//           message: 'Password link is not verified'
//       })
//   }}

//   //Set New Password
// const setNewPassword = async (req, res) => {
//   console.log(req.body)
//   //Getting id and token from params 
//   const { id, token } = req.params
//   //password from body
//   const { password } = req.body

//   //Finding user 
//   const oldUser = await User.findById({_id: id})
//   if(!oldUser){
//       return res.status(400).json({
//           success: false,
//           message: 'User doesnot exist'
//       })
//   }
//   //Creating a secret 
//   const secret = process.env.JWT_SECRET + oldUser.password
//   try {
//       jwt.verify(token, secret);
//       const encryptedPassword = await bcrypt.hash(password, 10)
//       await User.updateOne({_id: id}, {$set : {password: encryptedPassword}});
//       return res.status(200).json({
//           success: true,
//           message: 'Password Reset Succcessfully'
//       })
//   } catch (error) {
//       console.log(error)
//       res.status(500).json({
//           message: 'Password reset failed'
//       })
//   }
// }
//  const uploadImage = async (req, res, next) => {

//   if (!req.file) {
//     return res.status(400).send({ message: "Please upload a file" });
//   }
//   res.status(200).json({
//     success: true,
//     data: req.file.filename,
//   });
// }

//   // const sendTokenResponse = (User, statusCode, res) => {
//   //   const token = User.getSignedJwtToken();

//   //   const options = {
//   //     expires: new Date(
//   //       Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//   //     ),
//   //     httpOnly: true,
//   //   };

//   //   // Cookie security is false .if you want https then use this code. do not use in development time
//   //   if (process.env.NODE_ENV === "proc") {
//   //     options.secure = true;
//   //   }
//   //   //we have created a cookie with a token

//   //   res
//   //     .status(statusCode)
//   //     .cookie("token", token, options) // key , value ,options
//   //     .json({
//   //       success: true,
//   //       token,
//   //       userId: User._id,
//   //     });
//   // };

// module.exports = {
//   createUser,
//   loginUser,
//   getProfile,
//   editProfile,
//   getSingleUser,
//   getUsers, getMyProfile, updateMyProfile, forgotPassword, resetPassword, setNewPassword, uploadImage
// };

const { response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const Users = require("../model/userModel");
const {User} = require("../model/userModel");
 
const createUser = async (req,res) => {
  // step 1 : Check if data is coming or not
  console.log(req.body);

  // step 2 : Destructure the data
  const { firstName, lastName, email, password } = req.body;

  // step 3 : validate the incomming data
  if(!firstName || !lastName || !email || !password){
      return res.json({
          success : false,
          message : "Please enter all the fields."
      })
  }

  // step 4 : try catch block
  try {
      // step 5 : Check existing user
      console.log(User);
      const existingUser = await User.findOne({email: email})
      if(existingUser){
          return res.json({
              success : false,
              message : "User already exists."
          })
      }

      // password encryption
      const randomSalt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password,randomSalt)

      // step 6 : create new user
      const newUser = new User({
          // fieldname : incomming data name
          firstName : firstName,
          lastName : lastName,
          email : email,
          password : encryptedPassword,
      })

      // step 7 : save user and response
      await newUser.save();
      res.status(200).json({
          success : true,
          message : "User created successfully."
      })

      
  } catch (error) {
      console.log(error);
      res.status(500).json("Server Error")
  }

  
}
 
const loginUser = async (req, res) => {
  // Step 1: Check incoming data
  console.log(req.body);
 
  // Destruction
  const { email, password } = req.body;
 
  // Validation
  if (!email || !password) {
    return res.json({ success: false, message: "Please enter all fields" });
  }
 
  // try catch block
  try {
    //  finding users
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }
 
    // User exist
    // Comparing Password
    const databasePassword = user.password;
    const isMatched = await bcrypt.compare(password, databasePassword);
 
    if (!isMatched) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
 
    // Create token
    const token = await jwt.sign({ id: user._id, isAdmin:user.isAdmin }, process.env.JWT_SECRET);
 
    //  response
    res.status(200).json({
      success: true,
      message: "User Logged in successfully",
      token: token,
      userData: user,
      
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Server error",
      error: error,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    // Fetch user details except the password
    const user = await Users.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const editProfile = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Build a user object
  let userFields = {};
  if (firstName) userFields.firstName = firstName;
  if (lastName) userFields.lastName = lastName;
  if (email) userFields.email = email;

  try {
    let user = await Users.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update the user
    user = await Users.findByIdAndUpdate(
      req.user.id,
      { $set: userFields },
      { new: true }
    );

    res.json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUsers = async (req,res) => {
  try {
      const allUsers = await User.find({});
      res.json({
          success : true,
          message : "All users fetched successfully!",
          products : allUsers
      })
      
  } catch (error) {
      console.log(error);
      res.send("Internal server error")
  }
}
const getSingleUser = async (req,res) => {
  const userId = req.params.id;
  try {
      const singleUser = await User.findById(userId);
      res.json({
          success : true,
          message : "Single user fetched successfully!",
          product : singleUser
      })
      
  } catch (error) {
      console.log(error);
      res.send("Internal server error")
  }
}
const getMyProfile = async (req, res) => {
  try {
    // Fetch user details except the password using the ID from JWT token
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Function to update the profile of the logged-in user
const updateMyProfile = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const userFields = { firstName, lastName, email };
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // Update the user profile
    user = await User.findByIdAndUpdate(req.user.id, { $set: userFields }, { new: true }).select('-password');
    // localStorage.setItem("user", JSON.stringify(res.data.user));

    res.json({ success: true, message: "Profile updated successfully", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// update product
// const editProfile = async (req,res) => {
//   // step 1 : check incomming data
//   console.log(req.body);
//   console.log(req.files);

//   // destructuring data
//   const {
//       firstName,
//       lastName,
//       email,
     
//   } = req.body;
 

//   // validate data
//   if( !firstName 
//       || !lastName 
//       || !email 
//      ){
//       return res.json({
//           success : false,
//           message : "Required fields are missing!"
//       })
//   }

//   try {
//           // make updated json data
//           const updatedData = {
//             firstName : firstName,
//             lastName : lastName,
//             email : email,
//           }

//           // find product and update
//           const userId = req.params.id;
//           await Users.findByIdAndUpdate(userId, updatedData)
//           res.json({
//               success : true,
//               message : "User Profile updated successfully ",
//               updatedUser : updatedData
//           })
//   } catch (error) {
//       res.status(500).json({  
//           success : false,
//           message : "Internal server error"
//       })
//   }
// }

//Forgot password 
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  //validation
  if (!email) {
      return res.status(400).json({
          success: false,
          message: 'Please Enter email'
      })
  }
  try {
      const user = await User.findOne({ email });
      if (!user) {
          // const randomString = randomstring.generate();
          // const data = await User.updateOne({email: email}, {$set:{token: randomString}});

          res.status(400).json({
              success: true,
              message: 'User Donot Exist.'
          })
          return;
      }
      //Creating a token 
      const secret = process.env.JWT_SECRET + user.password

      const token = jwt.sign({
          email: user.email,
          id: user._id
      }, secret, { expiresIn: '10m' })

      //Creating a link
      const link = `http://localhost:5000/api/user/reset-password/${user._id}/${token}`;
      console.log(link)
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'asmitakatel444@gmail.com',
              pass: 'tlca obnw bojw rdoj'
          }
      })

      var mailOption = {
          from: 'asmitakatel444@gmail.com',
          to: email,
          subject: 'Password Reset link',
          text: link
      };

      transporter.sendMail(mailOption, function(error, info){
          if(error){
              console.log(error)
          }else{
              console.log('Email Sent' + info.response)
          }
      });

  } catch (error) {
      res.status(400).json({
          success: false,
          message: error.message
      })
  }
}

//Reset Password
const resetPassword = async (req, res) => {
  //Taking id and token from params
  console.log("Hittttttttttttt")
  const { id, token } = req.params;
  console.log(id)
  console.log(token)

  // to check if the id or token is provided 
  const oldUser = await User.findById({ _id: id });
  if (!oldUser) {
      return res.status(400).json({
          success: false,
          message: "User Doesnot Exist"
      })
  }
  // //Verifying token
  const secret = process.env.JWT_SECRET + oldUser.password
  try {
      const verify = jwt.verify(token, secret);
      // if token is verified 
      if (verify) {
          res.render('index', { email: verify.email })
      }
  } catch (error) {
      console.log("hello")
      res.status(500).json({
          message: 'Password link is not verified'
      })
  }}

  //Set New Password
const setNewPassword = async (req, res) => {
  console.log(req.body)
  //Getting id and token from params 
  const { id, token } = req.params
  //password from body
  const { password } = req.body

  //Finding user 
  const oldUser = await User.findById({_id: id})
  if(!oldUser){
      return res.status(400).json({
          success: false,
          message: 'User doesnot exist'
      })
  }
  //Creating a secret 
  const secret = process.env.JWT_SECRET + oldUser.password
  try {
      jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10)
      await User.updateOne({_id: id}, {$set : {password: encryptedPassword}});
      return res.status(200).json({
          success: true,
          message: 'Password Reset Succcessfully'
      })
  } catch (error) {
      console.log(error)
      res.status(500).json({
          message: 'Password reset failed'
      })
  }
}

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ email: email });

    if (user == null) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }
    const otp = await Math.floor(10000 + Math.random() * 90000);
    const generatesalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(
      JSON.stringify(otp),
      generatesalt
    );
    user.password = encryptedPassword;
    await user.save();

    if (user) {
      const emailSubject = "Forget Password";
      const emailText = ` Your password has been reset. 
      Your new Password is ${otp} 
      Please change the password once you login to the system.

      Thank you!!
      `;

      await sendEmail(email, emailSubject, emailText);
      return res.json({
        success: true,
        message: "Password has been sent to your email.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

 
module.exports = {
  createUser,
  loginUser,
  getProfile,
  editProfile,
  getSingleUser,
  getUsers, getMyProfile, updateMyProfile, forgotPassword, resetPassword, setNewPassword,forgetPassword
};
