const { createWriteStream } = require('fs');
const path = require('path');

const storeUpload = async ({ stream, filename }) => {
  const uploadPath = path.join(__dirname, '../uploads', filename);
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(uploadPath))
      .on('finish', () => resolve(uploadPath))
      .on('error', reject)
  );
};

module.exports = { storeUpload };
