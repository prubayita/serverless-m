import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../helpers/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Implement creating a new TODO item
    logger.info('Creating TODO item', { todo: JSON.parse(event.body) })
    try {
      const newTodo: CreateTodoRequest = JSON.parse(event.body)

      const userId = getUserId(event)

      const todo = await createTodo(newTodo, userId)

      return {
        statusCode: 201,
        body: JSON.stringify({
          item: todo
        })
      }
    } catch (error) {
      logger.error('Error: ', error.message)
      throw new Error(error)
    }
  }
    
)

handler.use(
  cors({
    credentials: true
  })
)
