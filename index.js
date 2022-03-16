const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
const busboy = require('busboy');

function getExtension(filename) {
    return filename.filename.split(".").pop();
}

function isFileValid(filename) {
    const allowedExts = ["mp4"];
    const allowedMimeTypes = ["video/mp4"];

    const extension = getExtension(filename);
    const mimetype = filename.mimeType

    return allowedExts.indexOf(extension.toLowerCase()) != -1  &&
    allowedMimeTypes.indexOf(mimetype) != -1;
}

app.post('/upload-video', (req, res) => {
    const bb = busboy({ headers: req.headers });

    bb.on('file', async (fieldname, file, filename) => {
        if ("file" != fieldname) {
            return res.json({message :"Please type the form field as file"});
        }
        const status = isFileValid(filename);
        if (!status) {
            return res.json({message : "Please Provide a file with valide extenstion"});
        }      
        res.json({ message: "File successfully uploaded" });
    });
    req.pipe(bb);
});    

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});




