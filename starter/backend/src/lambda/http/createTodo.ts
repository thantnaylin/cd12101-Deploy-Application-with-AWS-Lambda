import middy = require("middy");
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {CreateTodoRequest} from "../../requests/CreateToDoRequest";
import {getUserId} from "../utils";
import {createTodo} from "../../businessLogic/toDos";
import {cors} from "middy/middlewares";

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const newTodo: CreateTodoRequest = JSON.parse(event.body)

      const userId = getUserId(event);
      const todo = createTodo(userId, newTodo)

      return {
        statusCode: 201,
        body: JSON.stringify({
          item: todo
        })
      }
    }
)

handler.use(
    cors({
      credentials: true
    })
)