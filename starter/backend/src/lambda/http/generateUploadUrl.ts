import middy = require("middy");
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {getUserId} from "../utils";
import {createAttachmentPresignedUrl} from "../../businessLogic/toDos";
import {cors, httpErrorHandler} from "middy/middlewares";

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const todoId = event.pathParameters.todoId
      const userId = getUserId(event);

      const uploadUrl = await createAttachmentPresignedUrl(todoId, userId);
      return {
        statusCode: 200,
        body: JSON.stringify({
          uploadUrl
        })
      }
    }
)

handler
    .use(httpErrorHandler())
    .use(
        cors({
          credentials: true
        })
    )