//referencing sdk in js file
import AWS from "aws-sdk";
import { awsCredentials } from "../../AWS.config.js";
//specifying aws region where dynamodb table will be created

AWS.config.update({ awsCredentials });
//instantiate dynamodb class

const docClient = new AWS.DynamoDB.DocumentClient();
//here we specify th query condition or the where clause, for instance if we
// have multiple table entries for a user_id and want to get all those items at
//once (in this case we don't, but for the sake of learning XD)
// docClient.query(
//   {
//     TableName: "PromocionesMexico",
//     // condition is: user_id must be equal to the value of expression attribute id
//     KeyConditionExpression: "id = :id",
//     ExpressionAttributeValues: {
//       ":id": "1",
//     },
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );
export const insertValues = async (data) => {
  docClient.put(
    {
      TableName: "PromocionesMexico",
      Item: {
        // specify attributes as key value pairs
        id: "first",
        //timestamp is the primary key
        title: data.title,
        description: data.description,
        img: data.img,
        url: data.url,
        timestamp: 3,
        content: "products",
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Success saving", data);
      }
    }
  );

  return await { status: "ok" };
};

// docClient.scan({ TableName: "PromocionesMexico" }, (err, data) => {
//   if (err) {
//     console.error("Unable to scan. Error:", JSON.stringify(err, null, 2));
//   } else {
//     console.log("Scan succeeded. Result:", JSON.stringify(data, null, 2));
//   }
// });
