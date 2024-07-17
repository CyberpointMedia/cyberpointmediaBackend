const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { WritableStreamBuffer } = require('stream-buffers');

// Configure AWS SDK with your credentials
const s3 = new AWS.S3({
  accessKeyId: process.env.YOUR_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.YOUR_AWS_SECRET_ACCESS_KEY,
  region: process.env.YOUR_AWS_REGION
});

const storeUpload = async ({ stream, filename }) => {
  // Generate a unique identifier for the file name
  const uniqueFilename = `${uuidv4()}${path.extname(filename)}`;
  const maxSize = 5 * 1024 * 1024; // 5 MB in bytes

  const bufferStream = new WritableStreamBuffer();
  stream.pipe(bufferStream);

  await new Promise((resolve, reject) => {
    bufferStream.on('finish', resolve);
    bufferStream.on('error', reject);
  });

  const buffer = bufferStream.getContents();
  console.log('File size:', buffer.length);
  if (buffer.length > maxSize) {
    throw new Error('File size exceeds the 5 MB limit');
  }
  
  const uploadParams = {
    Bucket: process.env.YOUR_AWS_BUCKET_NAME,
    Key: `uploads/${uniqueFilename}`, // Adjust the path as needed
    Body: buffer
  };

  try {
    console.log('Uploading file to S3:', uploadParams);
    const data = await s3.upload(uploadParams).promise();
    return data.Location; // Return the S3 object URL
  } catch (error) {
    throw new Error(`Failed to upload file to S3: ${error.message}`);
  }
};

module.exports = { storeUpload };
