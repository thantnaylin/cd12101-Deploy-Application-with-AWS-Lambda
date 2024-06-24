import middy = require("middy");
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {UpdateTodoRequest} from "../../requests/UpdateToDoRequest";
import {getUserId} from "../utils";
import {updateTodo} from "../../businessLogic/toDos";
import {cors, httpErrorHandler} from "middy/middlewares";

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const todoId = event.pathParameters.todoId
      const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

      const userId = getUserId(event);

      const updatedTodoItem = await updateTodo(userId, todoId, updatedTodo);

      return {
        statusCode: 200,
        body: JSON.stringify({
          item: updatedTodoItem
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