import express from "express";
import ptp from "pdf-to-printer";
import fs from "fs";
import multer from "multer";
import 'dotenv/config'

const app = express();
const port = process.env.port || 3000;

const upload = multer({
    storage: multer.diskStorage({
        destination: "files",
        filename: (req, file, cb) => {
            if (file.mimetype === 'application/pdf') {
                cb(null, Date.now() + "-" + file.originalname)
            } else {
                cb(new Error('Only PDF file is allowed'), false);
            }
        }
    }),
})

const auth = function (req, res, next) {
    const token = process.env.token || "admin3dp"
    if(req.headers.token != token ){
        return res.status(401).json({
            message: "Token expired"
        });
    }
    next()
}

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
  
app.get('/', asyncHandler(async (req, res) => {
    let printers = await ptp.getPrinters()
    return res.status(200).json({
        data: printers,
        message: "success"
    });
}))

app.get('/ping', asyncHandler(async (req, res) => {
    return res.status(200).json({
        message: "service print ready !!!"
    });
}))

app.use(auth)

app.post("/print", upload.single('file'), asyncHandler(async (req, res) => {
    if(!req.file){
        return res.status(404).json({
            message: "file is required"
        })
    }
    const file = req.file.path;
    const printer_name = req.body.printer_name;
    const copy = req.body.copy;

    if(!printer_name){
        await ptp.print(file)
    }else{
        await ptp.print(file, {
            printer: printer_name,
            copies: copy || 1
        })
    }
    fs.unlinkSync(file);
    return res.status(200).json({
        message: "success"
    });
}));

app.use((err, req, res, next) => {
    if(req.file){
        fs.unlinkSync(req.file.path);
    }
    
    return res.status(500).json({ message: err.message });
});

app.listen(port, () => {
    console.log(`Service running on port ${port}`)
});