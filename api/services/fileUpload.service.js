/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { createWriteStream, unlink } = require('fs');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const sharp = require('sharp');

const UPLOAD_DIR = './uploads';
// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR);

const singleFileUpload = async (upload, typeFile) => {
  mkdirp.sync(`${UPLOAD_DIR}/${typeFile}`);

  const { createReadStream, filename, mimetype } = await upload;

  const stream = createReadStream();
  const id = shortid.generate();
  const fnlFilename = `${id}.jpg`;
  const fnlFilename_sm = `sm-${id}.jpg`;
  const fnlFilename_m = `m-${id}.jpg`;
  const fnlFilename_th = `th-${id}.jpg`;

  const folderPath = `${UPLOAD_DIR}/${typeFile}/`;
  const path = `${folderPath}${fnlFilename}`;
  const file = {
    id,
    filename: {
      orig: fnlFilename,
      sm: fnlFilename_sm,
      m: fnlFilename_m,
      th: fnlFilename_th,
    },
    mimetype,
    path,
  };

  // eslint-disable-next-line no-console
  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(path);

    // When the upload is fully written, resolve the promise.
    writeStream.on('finish', resolve);

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on('error', (error) => {
      unlink(path, () => {
        reject(error);
      });
    });

    // In node <= 13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on('error', (error) => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });

  await sharp(path)
    .resize(224, 327)
    .toFile(`${folderPath}${fnlFilename_sm}`, (err) => {
    }).png()
    .toBuffer();

  await sharp(path)
    .resize(346, 500)
    .toFile(`${folderPath}${fnlFilename_m}`, (err) => {
    }).png()
    .toBuffer();

  await sharp(path)
    .resize(39, 56)
    .toFile(`${folderPath}${fnlFilename_th}`, (err) => {
    }).png()
    .toBuffer();

  return file;
};

// const uploadWithResize = async (upload, typeFile) {

// }

module.exports = { singleFileUpload };
