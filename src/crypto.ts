import * as CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_KEY || "");
const iv = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_IV || "");

export const encrypt = (encString:string) => {
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(encString), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
}

export const decrypt = (decString:string) => {
    var decrypted = CryptoJS.AES.decrypt(decString, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString();
}