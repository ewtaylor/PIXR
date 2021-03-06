// var authController = require("../controllers/authcontroller.js");
var db = require("../models");
path = require('path');

module.exports = function(app, passport) {
  function isLoggedIn(req, res, next) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
  app.get("/signup", (req, res) => {
    res.render("signup");
  });
  // app.get("/signup", authController.signup, function(req, res){
  //   res.render("signup");
  // });
  app.get("/signin", (req, res) => {
    res.render("signin");
  });
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/home",
      failureRedirect: "/signin"
    })
  );
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/home",
      failureRedirect: "/signup"
    })
  );
  app.get("/home", isLoggedIn, (req, res) => {
    res.render("home");
  });

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/role", isLoggedIn, (req, res) => {
    res.render("role");
  });

  // app.get("/search", (req, res) => {
  //   res.render("search");
  // });

  app.get("/about", isLoggedIn, (req, res) => {
    res.render("about");
  });

  app.get("/upload", isLoggedIn, (req, res) => {
    res.render("upload");
  })
  app.get("/images", isLoggedIn, (req, res) => {
  //  var dirname1 ="../"+ __dirname+"/images/"
  //  img={}
  //  fa-----
   
  // // console.log(dirname)
  //   images = "image1.jpg"

  //   img="<img src="+dirname1+images+">"
  // "<img src='../../images/image1.jpg'>"
    res.render("images")
  })
  
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
