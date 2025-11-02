// Require the package
const QRCode = require('qrcode')

let data = {
    name:"Tito Manelde Gonzalez",
    credit_card: 2121-1010-2010-1111,
    currency:"cup",
    mobil: 83928760,
    id:"aisuoiqu3234738jdhf100223"
}

let stringdata = JSON.stringify(data);

// Print the QR code to terminal
QRCode.toString(stringdata,{type:'terminal'},
                    function (err, QRcode) {

    if(err) return console.log("error occurred")

    // Printing the generated code
    console.log(QRcode)
})
  
// Converting the data into base64 
QRCode.toDataURL(stringdata, function (err, code) {
    if(err) return console.log("error occurred")

    // Printing the code
    console.log(code)
})