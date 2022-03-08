import express from "express";
import personController from "../api/controllers/person.controller";
import {validateToken} from '../api/middlewares/auth'

const router = express.Router();

/**
 * @api {get} /api/person/ List
 * @apigroup Person
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK:
 *{
 *   "persons": [
 *       {
 *           "name": "Jhon Doe",
 *           "gender": "male",
 *           "birthDate": "01/06/1990",
 *           "email": "email@email.com",
 *           "cpf": "000.000.000-00"
 *       },
 *       {
 *           "name": "Live Challange",
 *           "gender": "female",
 *           "birthDate": "01/06/1990",
 *           "email": "email2@email.com",
 *           "cpf": "111.111.111-11"
 *       }
 *   ]
 *}
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 404 Not Found
 * {
 *    "message":"There is no account data."
 * }
 */
router.use('/api/person/',validateToken).get('/api/person/', personController.get);

/**
 * @api {get} /api/person/:id Get by Id
 * @apigroup Person
 * @apiVersion 1.0.0
 * @apiParam (query string) {String} id
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK:
 *{
 *    "name": "Jhon Doe",
 *    "gender": "male",
 *    "birthDate": "01/06/1990",
 *    "email": "email@email.com",
 *    "cpf": "000.000.00-00"
 *}
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 404 Not Found
 * {
 *    "message":"Person not found."
 * }
 */
router.use('/api/person/:id',validateToken).get("/api/person/:id", personController.getById);

/**
 * @api {post} /api/person/ Post
 * @apigroup Person
 * @apiVersion 1.0.0
 * @apiParam {String} name
 * @apiParam {String} gender 
 * @apiParam {Date} birthDate 
 * @apiParam {String} email 
 * @apiParam {String} cpf 
 * @apiParam {String} password 
 * @apiParamExample {json} Body Request Example
 * {
 *  "name":"Jhon Doe",
 *  "gender":"female",
 *  "birthDate":"1990-06-02",
 *  "email":"email@email.com",
 *  "cpf":"335.093.730-65",
 *  "password": "password123"
 * }
 * @apiSuccessExample {json} Success
 * HTTP/1.1 201 Created:
 *{
 *    "name": "Jhon Doe",
 *    "gender": "female",
 *    "birthDate": "1990-06-02T00:00:00.000Z",
 *    "email": "email@email.com",
 *    "cpf": "335.093.730-65",
 *    "_id": "6227bf3ce663ea2fc75e0c28",
 *    "createdAt": "2022-03-08T20:40:28.938Z",
 *    "__v": 0
 *}
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message":"There is already a person with the given email!"
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message":"There is already a person with the given CPF!"
 * }
 */
router.use('/api/person',validateToken).post("/api/person", personController.post);

/**
 * @api {put} /api/person/:id Put
 * @apigroup Person
 * @apiVersion 1.0.0
 * @apiParam (query string) {String} id
 * @apiParam  {String} name
 * @apiParam {String} gender 
 * @apiParam {Date} birthDate 
 * @apiParam {String} email 
 * @apiParam {String} cpf 
 * @apiParam {String} password
 * @apiParamExample {json} Body Request Example
 * {
 *  "name":"Jhon Doe",
 *  "gender":"female",
 *  "birthDate":"1990-06-02",
 *  "email":"email@email.com",
 *  "cpf":"335.093.730-65",
 *  "password": "password123"
 * } 
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK:
 *{
 *    "name": "Jhon Doe",
 *    "gender": "female",
 *    "birthDate": "1990-06-02T00:00:00.000Z",
 *    "email": "email@email.com",
 *    "cpf": "335.093.730-65",
 *    "_id": "6227bf3ce663ea2fc75e0c28",
 *    "createdAt": "2022-03-08T20:40:28.938Z",
 *    "__v": 0
 *}
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message":"The Id parameter is mandatory."
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message":"There is already a person with the given email!"
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message":"There is already a person with the given CPF!"
 * }
 * @apiErrorExample {json} Error
 * HTTP/1.1 404 Not Found
 * {
 *    "message":"Person not found."
 * }
 */
router.use('/api/person/:id',validateToken).put('/api/person/:id', personController.put);

/**
 * @api {delete} /api/person/:id Delete
 * @apigroup Person
 * @apiVersion 1.0.0
 * @apiParam (query string) {String} id
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK:
 *{
 *  "message": "Person successfully deleted"
 *}
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message":"The Id parameter is mandatory."
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 404 Not Found
 * {
 *    "message":"Person not found."
 * }
 */
router.use('/api/person/:id',validateToken).delete('/api/person/:id', personController.delete);

export { router as personRoutes };
