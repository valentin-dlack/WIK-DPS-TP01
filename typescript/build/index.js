"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = require("express")();
const port = process.env.PING_LISTEN_PORT || '3000'; //use port 3000 unless there exists a preconfigured port
function TestError(test) {
    if (test === true)
        return false;
    throw new Error();
}
app.set("json spaces", 2);
app.get("/ping", (req, res, next) => {
    try {
        TestError(false);
        res.json(req.headers);
        //uncomment to test the error handling :
    }
    catch (e) {
        next(e);
    }
});
app.get('*', (req, res) => {
    res.status(404).json({ code: 404 });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ code: 500 });
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
