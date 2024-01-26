import express from "express";
import ptp from "pdf-to-printer";
import fs from "fs";
import multer from "multer";
import 'dotenv/config'

const app = express();
const port = process.env.port || 3000;

const storage = multer.diskStorage({
    destination: "files/",
    filename: function (req, file, cb) {
        cb( null,  Date.now() +"_"+ file.originalname);
    },
});

const upload = multer({ storage: storage });

const authMiddleware = function (req, res, next) {
    if(req.headers.token != process.env.token ){
        return res.status(401).json({
            message: "Token expired"
        });
    }
    next()
}

app.get('/printers', async (req, res) => {
    let printers = await ptp.getPrinters()
    return res.status(200).json({
        data: printers,
        message: "success"
    });
})

app.use(authMiddleware)

app.post("/printers/print", upload.single('file'), async (req, res) => {
    const file = req.file.path;
    const printer = req.body.printer_name;
    const copy = req.body.copy;

    const options = {
        printer: printer,
        copies: copy || 1,
    }
    try{
        await ptp.print(file, options)
        fs.unlinkSync(file);
        return res.status(200).json({
            message: "success"
        });
    }catch(err){
        return res.status(500).json({
            message: "failed"
        });
    }
});

app.listen(port, () => {
    console.log(`Service running port ${port}`)
});