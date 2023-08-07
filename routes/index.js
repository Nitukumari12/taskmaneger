var express = require('express');
var router = express.Router();

const data = require("../model/taskmanager");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/taskmanager', function(req, res, next) {
  res.render('taskmanager', { title: 'taskmanager' });
});
router.post("/taskmanager", async function (req, res, next){
  try { 
    const newdata = new data(req.body);
    await newdata.save();
    res.redirect("/task");
  } catch (error) {
    console.log(error);
  }
});


router.get("/task", async function (req, res, next){
  const post = await data.find();
  res.render("task",{post});
});

router.get("/delete/:id", async function(req, res, next){
  try {
    await data.findByIdAndDelete(req.params.id);
     res.redirect("/task");
  } catch (error) {
    res.send(error);
  }
});



router.get("/update/:id",async function(req, res){
  try {
    const data1 = await data.findById(req.params.id);
    res.render("update",{post:data1})
  } catch (error) {
    console.log(error)
  }
});
router.post("/update/:id", async function(req, res, next){
  try {
    await data.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/task");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
