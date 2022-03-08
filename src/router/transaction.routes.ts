import express from "express";
import TransactionController from "../api/controllers/transaction.controller";
import {validateToken} from '../api/middlewares/auth'

const router = express.Router();

/**
 * @api {put} /api/transaction/transfer/ Transfer
 * @apigroup Transaction
 * @apiVersion 1.0.0
 * @apiParam {String} sender
 * @apiParam {String} reciever 
 * @apiParam {Number} amount 
  * @apiParamExample {json} Body Request Example
 * {
 *  "sender":"622652e3cac8f11ac66e0c66",
 *  "reciever":"62265981ae901f48de26d605",
 *  "amount":00
 * }
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK:
 *{
 *    "message": "Sender transfered 00 to reciever"
 *}
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 404 Not Found
 * {
 *    "message": "Sender not found"
 * }
 * 
 * @apiErrorExample {json} Error
 * HTTP/1.1 404 Not Found
 * {
 *    "message": "Reciever not found"
 * }
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message": "Not enought balance to transfer"
 * }
 */
router.use('/api/transaction/transfer',validateToken).put('/api/transaction/transfer', TransactionController.P2P);

export { router as transactionRoutes };
