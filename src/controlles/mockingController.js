import express from 'express';
import { generarProducts } from '../utils.js';

const router = express.Router();


async function mockingController(req, res){
    try {
        let products = generarProducts();
        res.send({playload:products})
    } catch (error) {
        console.log(error)
    }
}


export default {
    mockingController
}