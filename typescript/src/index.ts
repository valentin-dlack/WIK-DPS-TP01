import { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = require("express")();
const port: string = process.env.PING_LISTEN_PORT || '3000'; //use port 3000 unless there exists a preconfigured port

function TestError(test: boolean): boolean | never {
    if (test === true)
      return false;
    throw new Error();
}

app.set("json spaces", 2);

app.get("/ping", (req: Request, res: Response, next: Function) => {
    try {
        //uncomment to test the error handling :
        //TestError(false);
        res.json(req.headers);
    } catch (e) {
        next(e);
    }
});

app.get('*', (req: Request, res: Response) => {
    res.status(404)
    res.send()
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500);
    res.send();
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});

