const express = require('express');
const router = express.Router();
const Student = require('../models/students.model');
import {Request, Response} from "express"
import { Student } from "../types";

//FILTER
router.get('/search', async(req: Request, res: Response)=>{
    try{
        const field: string = req.query.field as string || 'fname'
        const keyword: string = req.query.keyword as string || ''
        const students: Student = await Student.find({[field] : {$regex : keyword, $options : 'i'}})
        res.status(200).json(students)
    }catch(error){
        error instanceof Error ? 
        res.status(400).json({error : error.message}) :     
        res.status(400).json({ error: 'An unknown error occurred' });
    }
})

//SORT
router.get('/sort', async(req: Request, res: Response)=>{
    try{
        const field: string = req.query.field as string || 'fname'
        const direction: string = req.query.direction as string || 'ASC'
        const isAsc: number= direction.toUpperCase()==="ASC" ? 1 : -1
        const students: Student[] = await Student.find({}).sort({[field] : isAsc})
        res.status(200).json(students)
    }catch(error){
        error instanceof Error?
        res.status(400).json({error : error.message}) :
        res.status(400).json({ error: 'An unknown error occurred' });         
    }
})

//INDEX
router.get('/', async(req: Request, res: Response)=>{
    try{
        const students: Student[] = await Student.find({}).select("-__v")
        res.status(200).json(students)
    }catch(error){
        error instanceof Error?
        res.status(500).json({error : error.message}) :
        res.status(500).json({ error: 'An unknown error occurred' });     }
});

//SHOW
router.get('/:id', async(req: Request, res: Response)=>{
    try{
        const student: Student | null = await Student.findById(req.params.id)
        student ? res.status(200).json(student) : res.status(404).json({message : "The student was not found"})
    }catch(error){
        error instanceof Error?
        res.status(400).json({error : error.message}) :
        res.status(400).json({ error: 'An unknown error occurred' });     }
})

//STORE
router.post('/', async(req: Request, res: Response)=>{
    try {
        const student: Student = await Student.create(req.body);
        res.status(201).json({message: "The student has been stored",student});
    } catch (error) {
        error instanceof Error?
        res.status(400).json({error : error.message}) :
        res.status(400).json({ error: 'An unknown error occurred' });     }
});

//UPDATE
// router.put('/:id', async(req: Request, res: Response)=>{
//     try {
//        const student: Student = await Student.findByIdAndUpdate(req.params.id, req.body) 
//        if(!student) return res.status(404).json({message : "The student was not found"})
        
//        const updatedStudent: Student=await Student.findById(req.params.id)
//        res.status(200).json({message : "The student has been updated", student: updatedStudent})
//     } catch (error) {
//         error instanceof Error?
//         res.status(400).json({error : error.message}) :
//         res.status(400).json({ error: 'An unknown error occurred' });     }
// })
router.put('/:id', async(req: Request, res: Response)=>{
    try {
       const student: Student | null = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
       if(!student) return res.status(404).json({message : "The student was not found"})
        res.status(200).json({ message: "The student has been updated", student });
    } catch (error) {
        error instanceof Error?
        res.status(400).json({error : error.message}) :
        res.status(400).json({ error: 'An unknown error occurred' });     }
})

//DELETE
router.delete('/:id', async(req: Request, res: Response)=>{
    try{
        const student: Student | null = await Student.findByIdAndDelete(req.params.id)
        if(!student) return res.status(404).json({message : "The student was not found"})
        res.status(200).json({message : "The student has been deleted"});
    }catch(error){
        error instanceof Error?
        res.status(400).json({error : error.message}) :
        res.status(400).json({ error: 'An unknown error occurred' });     }
})

module.exports = router;