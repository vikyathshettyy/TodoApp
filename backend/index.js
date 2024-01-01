const express = require('express');
const app = express();
const {createTodo,updateTodo} = require('./types');
const {Todos} = require('./db/index')
const cors = require('cors');

app.use(cors());


app.use(express.json());

app.post('/todo',async function(req,res) {
    const parsedPayload = createTodo.safeParse(req.body);
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent wrong inputs",
        })
        return;
    }
    try{
        await Todos.create({
            title:req.body.title,
            description: req.body.description,
            completed: false,
        })
    
        res.json({
            msg: "Todo created",
        })

    }
    catch(e) {
        console.log(e.message);
        res.status(500).send('internal server error');
    }

    
    

})

app.get('/todos',async function(req,res) {
    
    try{
        const alltodos = await Todos.find({})
        res.json({
            alltodos,
        });

    }

    catch(e) {
        console.log(e.message);
        res.status(500).send('internal server error');
    }

   

})

app.put('/completed',async function(req,res) {
    const parsedPayload = updateTodo.safeParse(req.body);
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent wrong inputs",
        })
        return;
    }

    try{
        await Todos.update({
            _id: req.body.id,
        },{ 
            completed: true,
        })
        res.json({
            msg: "todo marked as completed",
        })

    }
    catch(e) {
        res.status(500).send('intenal server error');
    }
   

})


app.listen(3000,()=>{
    console.log('server is listening at port 3000');
})
