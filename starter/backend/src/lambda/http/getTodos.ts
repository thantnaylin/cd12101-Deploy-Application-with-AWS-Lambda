import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {getUserId} from "../utils";
import {getTodosForUser} from "../../businessLogic/toDos";
import {cors} from "middy/middlewares";
import middy = require("middy");

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const userId = getUserId(event);
      const todos = await getTodosForUser(userId);

      return {
        statusCode: 200,
        body: JSON.stringify({
          items: todos
        })
      }
    }
)

handler.use(
    cors({
      credentials: true
    })
)