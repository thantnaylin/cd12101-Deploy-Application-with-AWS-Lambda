import middy = require("middy");
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {getUserId} from "../utils";
import {deleteTodo} from "../../businessLogic/toDos";
import {cors, httpErrorHandler} from "middy/middlewares";

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const todoId = event.pathParameters.todoId;
      const userId = getUserId(event);

      const todoItem = await deleteTodo(userId, todoId);

      return {
        statusCode: 200,
        body: JSON.stringify({
          item: todoItem
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