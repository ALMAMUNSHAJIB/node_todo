const express = require('express');
const mongoose = require('mongoose');


const Todo = require('./models/todo');

const app = express();



//set  view engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));


mongoose.connect('mongodb://localhost/todolist', {
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongoose is connected!!!');
}).catch((err) => {
    console.log(err);
})

app.get('/', async(req, res)=>{
    const todos = await Todo.find({}).sort('_date');
    res.render('index', {todos});
});

app.get('/:id/delete', async(req, res)=>{
    const todos = await Todo.findByIdAndDelete(req.params.id);
   res.redirect('/');
});

app.get('/about', (req, res)=> {
    res.render('about');
});


app.post('/', async(req, res)=>{
    try{

        const text = req.body.text.trim();
        if(text == ''){
            return res.redirect('/');
        }
        let newTodo = new Todo({
            text
        });
        await newTodo.save().then(result => console.log(result));
        res.redirect('/');

    }catch(err){
      console.log(err);
    }

   

});


app.get('*', (req, res) => {
    res.send('<h1>404 Error !! </h1>')
});


const port = process.env.PORT || 3300;

app.listen(port, ()=>{
    console.log(`Server is on: ${port}`);
});