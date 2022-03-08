import Express from "express";
import AuthenticationController from "../api/controllers/authentication.controller";

const router = Express();

/**
 * @api {post} /api/login Login
 * @apiName Login
 * @apigroup Authentication
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiParamExample {json} Body Request Example
 * {
 *    "email": "email@email.com",
 *    "password": "password"
 * }
 *
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK:
 * {
 *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmYxOTE5OTRiNDc1NDQ1MGVmNThiMSIsImlhdCI6MTYxNzg5Mzk3OCwiZXhwIjoxNjE3OTgwMzc4fQ.dwTdeP-nXgOGsn1WJpgoHJcuH2CJ3lXJ26UaOE_DBCM"
 * }
 *
 * @apiErrorExample {json} Error
 * HTTP/1.1 400 Bad Request
 * {
 *    "message": "Invalid email or password."
 * }
 */
router.post('/api/login', AuthenticationController.login);

export { router as authenticationRoutes };
