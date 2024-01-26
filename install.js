import { Service } from 'node-windows';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svc = new Service({
    name:'aaaServicePdfPrinter',
    description: 'Service for print pdf',
    script: path.join(__dirname,'index.js'),
});

svc.on('install',function(){
    svc.start();
});

svc.install();
