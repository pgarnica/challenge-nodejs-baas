import express from "express";
import AccountController from "../api/controllers/account.controller";
import { validateToken } from "../api/middlewares/auth";

const router = express.Router();

/**
 * @api {get} /api/account List
 * @apigroup Account
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK:
 *{
 *   "accounts": [
 *       {
 *           "name": "email@email.com",
 *           "balance": 100,
 *           "person": {
 *               "name": "Jhon Doe",
 *               "gender": "male",
 *               "birthDate": "01/06/1990",
 *               "email": "email@email.com",
 *               "cpf": "000.000.000-00"
 *           }
 *       },
 *       {
 *           "name": "email2@email.com",
 *           "balance": 0,
 *           "person": {
 *               "name": "Live Challange",
 *               "gender": "female",
 *               "birthDate": "01/06/1990",
 *               "email": "email2@email.com",
 *               "cpf": "111.111.111-11"
 *           }
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
router.use("/api/account/", validateToken).get("/api/account/", AccountController.get);
/**
 * @api {get} /api/account/:id Get by Id
 * @apigroup Account
 * @apiVersion 1.0.0
 * @apiParam (query string) {String} id
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK:
 * {
 *     "name": "email@email.com",
 *     "balance": 100,
 *     "person": {
 *         "name": "Jhon Doe",
 *         "gender": "male",
 *         "birthDate": "01/06/1990",
 *         "email": "email@email.com",
 *         "cpf": "000.000.000-00"
 *     }
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 404 Not Found
 * {
 *    "message":"Account not found."
 * }
 */
router.use("/api/account/:id", validateToken).get("/api/account/:id", AccountController.getById);
/**
 * @api {get} /api/account/balance/:id Get Balance
 * @apigroup Account
 * @apiVersion 1.0.0
 * @apiParam (query string) {String} id
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK:
 * {
 *     "balance": 100
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 404 Not Found
 * {
 *    "message":"Account not found."
 * }
 */
router.use("/api/account/balance/:id", validateToken).get("/api/account/balance/:id", AccountController.getBalance);

export { router as accountRoutes };
