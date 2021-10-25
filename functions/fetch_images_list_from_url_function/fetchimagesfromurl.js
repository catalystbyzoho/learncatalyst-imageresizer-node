const path = require('path');
const axios = require('axios');
const catalyst = require('zcatalyst-sdk-node');
const API_KEY = APIKEY_FROM_PIXABAY;
const FOLDERID = [resizedImages_FOLDER_ID, storeImages_FOLDER_ID];
const TABLENAME = 'ImagefileDetails';

async function downloadImages(fileUrl, catalystApp) {
    const folder = catalystApp.filestore().folder(FOLDERID[1]);
    const imagefileName = path.basename(fileUrl);
    const response = await axios({
        method: 'GET',
        url: fileUrl,
        responseType: 'stream',
    });
    const uploadedfile = await folder.uploadFile({
        code: response.data,
        name: imagefileName
    });
    return {
        imagefileID: uploadedfile.id,
        imagefileName
    };
};

async function deletePreviousEntries(catalystApp) {

    for (const FOLDER of FOLDERID) {
        const folderDetails = await catalystApp.filestore().getFolderDetails(FOLDER);
        const fileDetails = folderDetails.toJSON().file_details;
        while (fileDetails.length) {
            await Promise.all(fileDetails.splice(0, 10).map(async (fileDetail) => {
                const id = fileDetail.id;
                return folderDetails.deleteFile(id);
            }));
        }
    }
    const table = catalystApp.datastore().table(TABLENAME);
    const rows = await catalystApp.zcql().executeZCQLQuery('select * from ImagefileDetails limit 1,200');
    const ROWID = [];
    for (const row of rows) {
        ROWID.push(row.ImagefileDetails.ROWID)
    }
    if (ROWID.length > 0) {
        await table.deleteRows(ROWID);
    }
}

module.exports = async (context, _basicIO) => {

    try {
        const catalystApp = catalyst.initialize(context);
        const table = catalystApp.datastore().table(TABLENAME);
        await deletePreviousEntries(catalystApp);
        const URL = `https://pixabay.com/api/?key=${API_KEY}&per_page=5&min_width=400&q=people`;
        const imgs = await axios.get(URL);
        const imgData = imgs.data.hits;
        const rowData = [];
        for (const image of imgData) {
            const fileInfo = await downloadImages(image.webformatURL, catalystApp);
            rowData.push({
                imagefileID: fileInfo.imagefileID,
                imagefileName: fileInfo.imagefileName
            });
        }
        await table.insertRows(rowData);
    } catch (err) {
        console.log("Error while fetching data from URL", err);
    }
    context.close();
};