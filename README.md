# SERVICE PDF PRINTING

Restapi untuk mencetak .pdf ke printer (hanya windows)

tools:

- Express js
- [pdf-to-printer](https://github.com/artiebits/pdf-to-printer)
- [node-windows](https://github.com/coreybutler/node-windows) untuk membuat service auto start ketika pc nyala

## Setup
1. Download dan Install [nodejs](https://nodejs.org/dist/v18.20.5/node-v18.20.5-x64.msi)
2. Download repo ini.
3. Download dependencies
`npm install`

4. Copy .env.example ke .env konfigurasi token dan port

5. Install service, membuat service auto start ketika pc nyala. cek di task manager bagian service. pastikan service dengan nama "aaapdfprinting" sudah ada.

    `npm run svc-install`
6. untuk uninstall 
  
    `npm run svc-uninstall`

## Api

#### untuk cek apakah service sudah bisa diakses
- method: get
- path: /ping

contoh

    curl --location 'http://localhost:3000/ping'

jika belum bisa diakses turn off firewall defender

#### untuk menampilkan list printer yang ada di pc
- method: get
- path: /

contoh

    curl --location 'http://localhost:3000/'

#### untuk kirim job ke printer default
- method: post
- path: /print
- content-type: multipart/form-data

form-data: 
- file


contoh

    curl --location 'http://localhost:3000/print' \
    --header 'token: rahasia' \
    --form 'file=@"/C:/Users/arip/Downloads/CATATAN PERKEMBANGAN PASIEN TERINTEGRASI (CPPT).pdf"' 

#### untuk kirim job ke printer tertentu
- method: post
- path: /print
- content-type: multipart/form-data

form-data: 
- printer_name (nama printer tujuan)
- file
- copy (jumlah yang mau di cetak)


contoh

    curl --location 'http://localhost:3000/print' \
    --header 'token: rahasia' \
    --form 'printer_name="Canon G5000"' \
    --form 'file=@"/C:/Users/arip/Downloads/CATATAN PERKEMBANGAN PASIEN TERINTEGRASI (CPPT).pdf"' \
    --form 'copy="1"'