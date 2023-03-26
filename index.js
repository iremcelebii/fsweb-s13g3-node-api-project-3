//!dotenv yi yükledim bu koduda en yukarıda yazdım:
require("dotenv").config();

// require your server and launch it
const server = require("./api/server");
const port = process.env.PORT || 3001;

server.listen(port, () => console.log("API running on port " + port));

//!KOMUT SATIRINDA YAZDIĞIM BİR PARAMETREYİ UYGULAMAMA AKTARDIM
console.log(process.argv);

//eğer npm start foo bar değil boş npm start dersem undefined olacak
console.log(process.argv[2]);

//!ENV VARİABLE DAKİ BİR DEĞİŞKENİ UYGULAMAMA AKTARDIM
const userName = process.env.USERNAME;
console.log(userName);
