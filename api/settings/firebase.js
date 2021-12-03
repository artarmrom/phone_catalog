let admin = require("firebase-admin");

let serviceAccount = require("./phonecatalog-23c32-firebase-adminsdk-zux9h-415bf38814.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports=admin;