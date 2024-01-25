import env from "dotenv";
env.config();

// Set your AWS credentials
export const awsCredentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: "your-session-token", // Optional, only needed for temporary security credentials
  region: "us-east-1",
};
