const express = require('express');
const router = express.Router();
const Employee = require('../model/employee');
router.use(express.json());

router.get('/', async(req, res)=> {
    try{
        const emp = await Employee.find();
        res.send(emp);    
    }catch(err){
        console.log("Error : ", err.message);
        res.status(400).send(err.message);
    }
});


router.get('/:id', async(req, res)=> {
    try{
        const id = req.params.id;
        if(id.match(/^[0-9a-fA-F]{24}$/)){
            const emp = await Employee.findById(id);
            if(!emp) res.status(404).send("Not Found");
            res.send(emp);
        }else{
            return res.status(400).send("Bad Request");
        }
    }catch(err){
        console.log('Error : ', err.message);
    }
})



router.post('/', async(req, res)=> {
    try{//success scenario
        const emp = await Employee.create({
            name: req.body.name,
            age: req.body.age,
            skills: req.body.skills
        });
        res.send(emp);
    }catch(err){//failure scenario
        console.log('Error', err);
        res.send(err.message);
    }
});

router.patch('/:id', async(req, res)=>{
    try{
        const id = req.params.id;
        if(id.match(/^[0-9a-fA-F]{24}$/)){
            const emp = await Employee.findById(id);
            if(!emp) return res.status(404).send('Not Found');
            emp.name = req.body.name;
            emp.age = req.body.age;
            emp.skills = req.body.skills;
            const result =  await emp.save();
            res.send(result);
        }else{
            res.status(400).send('Bad Request');
        }
    }catch(err){
        console.log('Error : ', err.message);
    }
})


router.delete('/:id', async(req, res)=> {
    try{
        const id = req.params.id;
        if(id.match(/^[0-9a-fA-F]{24}$/)){
            const emp = await Employee.findById(id);
            if(!emp) return res.status(404).send('Not Found');
            emp.delete();
            res.send(emp);
        }else{
            res.status(400).send('Bad Request');
        }
    }catch(err){
        console.log('Error : ', err.obj);
    }
});

router.delete('/', async(req, res)=> {
    try{
        await Employee.deleteMany();          
        return res.send('All Data Deleted Successfully');
    }catch(err){
        console.log('Error : ', err.obj);
    }
});



module.exports = router;