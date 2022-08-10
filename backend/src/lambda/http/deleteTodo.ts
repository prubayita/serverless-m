import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { createLogger } from '../../utils/logger'
import { deleteTodo } from '../../helpers/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Remove a TODO item by id
    logger.info('Deleting TODO item', { event })
    
    try {
      const todoId = event.pathParameters.todoId;
      const userId = getUserId(event);
      const item = await deleteTodo(todoId, userId)
      return {
        statusCode: 200,
        body: JSON.stringify({
          item
        })
      }

    } catch (error) {
      logger.error('Error: ', error.message)
      throw new Error(error);
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
