const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// Ensure that the .env contains the following keys
const {AWS_S3_REGION, S3_BUCKET, AWS_S3_BASE_URL} = process.env;

module.exports = async function(file) {
  // Create an instance of the S3 client
  const s3Client = new S3Client({ region: AWS_S3_REGION});
  // s3's PutObjectCommand will expect an object with the following properties
  const s3Params = {
    Bucket: S3_BUCKET,
    // Create a unique filename to use as the S3 Key
    Key: `${Date.now()}-${file.originalname}`,
    // The uploaded file's binary content is held in the buffer property
    Body: file.buffer
  };
  // Send the file to s3
  await s3Client.send(new PutObjectCommand(s3Params));
  // Return the endpoint to download the file
  return `${AWS_S3_BASE_URL}${S3_BUCKET}/${s3Params.Key}`;
};