import AWS from "aws-sdk";

const s3Client = new AWS.S3({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});



export const useS3Bucket = async ({ bucketName }) => {
  try {
    return await s3Client
      .listObjectsV2({
        Bucket: bucketName,
      })
      .promise();
  } catch (err) {
   
  }
};
