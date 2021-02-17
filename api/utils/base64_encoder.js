const Base64 = {};

function encoder(string){
    let b = new Buffer.from(string.toString());
    let aux = b.toString('base64');
    let result = "";
    for (let i = 0; i < 7; i++){
        let num = Math.floor(Math.random() * (30));
        result += aux[num];
    }
    result += aux[8]+aux[9]+aux[10]+aux[31]+Math.floor(Math.random() * (10));
    return result;
}

Base64.encoder = encoder;

module.exports = Base64;