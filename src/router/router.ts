import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    return res.status(200).send({
        title: "Challenge NodeJs Bank as a Service (BaaS)",
        version: "1.0.0"
    });
})

export { router as apiRouter }