# SERVICE TO PRINT PDF

Restapi untuk mencetak .pdf ke printer

spesifikasi

- Express js
- [pdf-to-printer](https://github.com/artiebits/pdf-to-printer)
- [node-windows](https://github.com/coreybutler/node-windows) untuk membuat service auto start ketika pc nyala

## Setup
Download dependencies

    npm install

Copy .env.example ke .env konfigurasi token dan port

Run

    node install.js

  
  membuat service auto start ketika pc nyala. cek di task manager bagian service

untuk uninstall 
  
    node uninstall.js

##Api

untuk menampilkan list printer yang ada di pc
method: get
path: /printers

contoh

    curl --location 'http://localhost:3000/printers'

untuk kirim job ke printer
method: post
content-type: multipart/form-data

form: 
- printer_name (nama printer tujuan)
- file
- copy (jumlah yang mau di cetak)


contoh

    curl --location 'http://localhost:3000/printers/print' \
    --header 'token: rahasia' \
    --form 'printer_name="Canon G5000"' \
    --form 'file=@"/C:/Users/arip/Downloads/CATATAN PERKEMBANGAN PASIEN TERINTEGRASI (CPPT).pdf"' \
    --form 'copy="1"'