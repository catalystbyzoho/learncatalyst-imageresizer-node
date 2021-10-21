'use strict';
const express = require('express');
const app = express();
app.use(express.json());
const catalyst = require('zcatalyst-sdk-node');
const CIRCUITID = CIRCUITID;
const FOLDERID = [resizedImages_FOLDER_ID, storeImages_FOLDER_ID];
const FOLDERNAME = { resizedImages_FOLDER_ID: "Images", resizedImages_FOLDER_ID: "ResizedImages" };

app.post('/triggerCircuit', async (req, res) => {
    try {
        const CatalystApp = catalyst.initialize(req);
        const execName = new Date().getTime().toString();
        await CatalystApp.circuit().execute(CIRCUITID, execName, {
            name: 'John Smith'
        });
        res.status(200).send({ "status": "failure", "message": "Circuit Execution Triggered Successfully" });
    } catch (e) {
        res.status(500).send({ "status": "failure" })
    }
});

app.get('/getImageIds', async (req, res) => {
    try {
        const CatalystApp = catalyst.initialize(req);
        const respObj = await getImageIdsFromFilestore(CatalystApp);
        res.status(200).send(respObj);
    } catch (e) {
        console.log(e)
        res.status(500).send({ "status": "failure" });
    }
});

async function getImageIdsFromFilestore(CatalystApp) {

    const allImageIds = {};
    for (const FOLDER of FOLDERID) {
        const folder = await CatalystApp.filestore().getFolderDetails(FOLDER);
        const folderIds = [];
        const fileDetails = folder.toJSON().file_details;
        for (const fileDetail of fileDetails) {
            const id = fileDetail.id;
            folderIds.push(id);
        };
        allImageIds[FOLDERNAME[FOLDER]] = folderIds;
    }
    return allImageIds;
}

module.exports = app;