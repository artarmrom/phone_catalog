let admin = require('../settings/firebase');
let db = admin.firestore();

exports.getRoutes = (app) => {
    app.get('/', function (req, res) {
        res.status(200).send('API Catalogue Phone is working');
    });

    app.get('/phone', async function (req, res) {
        let phoneDocs = await db.collection('phone_catalog').get();
        if (phoneDocs.empty) {
            res.status(204).send();
        } else {
            let phoneData = [];
            for (let phoneDoc of phoneDocs.docs) {
                phoneData.push(phoneDoc.data())
            }
            res.status(200).send(phoneData);
        }
    });

    app.post('/createPhone', async function (req, res) {
        let data = req.body;
        if (!data || Object.keys(data).length === 0 || !checkData(data)) {
            res.status(400).send("Bad request");
        } else {
            let id = '' + data.id;
            let phoneDoc = await db.collection('phone_catalog').doc(id).get();
            if (phoneDoc.exists) {
                res.status(409).send("Phone id already exist");
            } else {
                await db.collection('phone_catalog').doc(id).set(data);
                res.status(204).send();
            }
        }
    });

    app.post('/editPhone', async function (req, res) {
        let data = req.body;
        if (!data || Object.keys(data).length === 0 || !checkData(data)) {
            res.status(400).send("Bad request");
        } else {
            let id = data.id;
            id += '';
            let phoneDoc = await db.collection('phone_catalog').doc(id).get();
            if (phoneDoc.exists) {
                await db.collection('phone_catalog').doc(id).set(data, {merge: true});
                res.status(204).send();
            } else {
                res.status(409).send("Phone not found");
            }
        }
    });

    app.delete('/deletePhone/:phoneId', async function (req, res) {
        let phoneId = req.params.phoneId;
        if (!phoneId) {
            res.status(400).send("Bad request");
        } else {
            phoneId += '';
            let phoneDoc = await db.collection('phone_catalog').doc(phoneId).get();
            if (phoneDoc.exists) {
                await db.collection('phone_catalog').doc(phoneId).delete();
                res.status(204).send();
            } else {
                res.status(409).send("Phone not found");
            }
        }
    });

}

const fields = {
    color: "string",
    description: "string",
    id: "number",
    imageFileName: "string",
    manufacturer: "string",
    name: "string",
    price: "number",
    processor: "string",
    ram: "number",
    screen: "string"
}

function checkData(data, checkWholeData){
    let dataKeys = Object.keys(data);
    let copyFields = {...fields}
    let copyData = {...data}
    for(let key of dataKeys){
        if(copyFields[key] && copyFields[key]===typeof copyData[key]) {
            delete copyFields[key]
            delete copyData[key]
        }
    }
    if(checkWholeData) {
        return Object.keys(copyFields).length === 0 && Object.keys(copyData).length === 0;
    }else{
        return Object.keys(copyData).length === 0;
    }
}