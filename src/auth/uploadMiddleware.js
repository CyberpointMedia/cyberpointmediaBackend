const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS SDK with your credentials
const s3 = new AWS.S3({
  accessKeyId: process.env.YOUR_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.YOUR_AWS_SECRET_ACCESS_KEY,
  region: process.env.YOUR_AWS_REGION
});

const storeUpload = async ({ stream, filename }) => {
  const uploadParams = {
    Bucket: process.env.YOUR_AWS_BUCKET_NAME,
    Key: `uploads/${filename}`, // Adjust the path as needed
    Body: stream
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    return data.Location; // Return the S3 object URL
  } catch (error) {
    throw new Error(`Failed to upload file to S3: ${error.message}`);
  }
};

module.exports = { storeUpload };
