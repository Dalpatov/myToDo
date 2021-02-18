const express = require('express');
const mongoose = require("mongoose");
const app = express();
const Schema = mongoose.Schema;

const taskScheme = new Schema({
    text: String,
    isCheck: Boolean
});

const url = "mongodb+srv://restart987:restart987@cluster0.20a2n.mongodb.net/BDTODO?retryWrites=true&w=majority";
 mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
 const Task = mongoose.model("tasks",taskScheme);

 app.get('/allTask', (req, res) => {
  const task = new Task({
    text: req.body.text,
    isCheck: req.body.req
});
    task.save().then(result => {
        Task.find().then(result => {
            res.send({data:result});
        })
})
})

 app.delete('/deleteTask', (req, res) => {
  Task.deleteOne({_id: req.body._id}).then(result => {
    Task.find().then(result => {
        res.send({data:result});
    })
})   
});


  app.patch('/updateTask', (req, res) => {
    Task.updateOne({_id: peq.body._id},req.body).then(result => {
        Task.find().then(result => {
            res.send({data:result});
        })
});     
});

app.post('/createTask', (req, res) => {
  Task.find().then(result => {
    res.send({data:result});
})
});

  
app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});