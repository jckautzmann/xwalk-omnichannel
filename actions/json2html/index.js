/*
* <license header>
*/

/**
 * This is a sample action showcasing how to access an external API
 *
 * Note:
 * You might want to disable authentication and authorization checks against Adobe Identity Management System for a generic action. In that case:
 *   - Remove the require-adobe-auth annotation for this action in the manifest.yml of your application
 *   - Remove the Authorization header from the array passed in checkMissingRequestInputs
 *   - The two steps above imply that every client knowing the URL to this deployed action will be able to invoke it without any authentication and authorization checks against Adobe Identity Management System
 *   - Make sure to validate these changes against your security requirements before deploying the action
 */


const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))

    // check for missing request input parameters and headers
    const requiredParams = [/* add required params */]
    const requiredHeaders = ['Authorization']
    const errorMessage = null // checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    // extract the user Bearer token from the Authorization header
    const token = getBearerToken(params)
    // log the token
    logger.debug(`Bearer token: ${token}`);
    
    // TODO: get the AEM Author URL from the request
    const apiEndpoint = 'https://author-p130360-e1272151.adobeaemcloud.com/api/assets/xwalk-omnichannel/press/press1.json';
    
    // TODO: get the AEM login token from the request (Bearer token from the Authorization header)
    const loginToken = 'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3NTUyNzAwMDQwNTJfMDllZjg2MmQtM2YxZC00Y2UwLTllZjYtZWNjNzgzNWFkODZjX3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkZXYtY29uc29sZS1wcm9kIiwidXNlcl9pZCI6Ijg1QUUxRkYwNjMxQzMzREEwQTQ5NUUxOEA3ZWViMjBmODYzMWMwY2I3NDk1YzA2LmUiLCJzdGF0ZSI6IlJkbEFLZnBJRVlmaFJkRmtVS21HMUh1RSIsImFzIjoiaW1zLW5hMSIsImFhX2lkIjoiQkY5QUQ0NDE1NDg5RTZDRDBBNEM5OEEyQGFkb2JlLmNvbSIsImN0cCI6MCwiZmciOiJaV1JFRk5NTlZMUDU0SFdLSE9RVjJYQUFVVSIsInNpZCI6IjE3NTUyNTI1NDY4MTFfYTQ4OGFhNmItMDA0Yy00OTJlLTg5NjktOTk1OGY3M2IyNGI1X3ZhNmMyIiwicnRpZCI6IjE3NTUyNzAwMDQwNTNfMjVhY2M0OTYtYmY3OS00OGIyLTk0ZGYtYjE3YzczYjMyMTgzX3VlMSIsIm1vaSI6IjYzMTkwY2I3IiwicGJhIjoiTWVkU2VjTm9FVixMb3dTZWMiLCJydGVhIjoiMTc1NjQ3OTYwNDA1MyIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsImNyZWF0ZWRfYXQiOiIxNzU1MjcwMDA0MDUyIiwic2NvcGUiOiJBZG9iZUlELG9wZW5pZCxyZWFkX29yZ2FuaXphdGlvbnMsYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0LGFkZGl0aW9uYWxfaW5mby5yb2xlcyJ9.eo52jJGZiFhSBFwEqvXJtOCwfEbrxINXRm5aujZFKfMeej4OD1IkNT2qOulFtd02NTcQNxAjN6MmDuEy_r80TiDhLH1GpFiAzwlu8JswTVpRHIfyGsGtjR4m6LtV3COeChamN4EqGZ_W8bM65jIq0omysAUSdqq6n0mqfyTAF3e1OZ8c2piStU93IAUhOQ7mZXYw3KX5OppTcDfQAaxTcPIxWGXvpY-3pI6Cv6W7cFZfjcHdJyuhv4upYbySHLa3scH-SjNbwxCTqWdDoX5HW4xZIS14SpigGgv4Lnd4Vw_FqFrmggnQK2botSCeW9dxkwINle-DPTIYEeAnjyXilg';
    
    // fetch the API endpoint with the Authorization header
    const res = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${loginToken}`
      }
    });
    
    if (!res.ok) {
      throw new Error('request to ' + apiEndpoint + ' failed with status code ' + res.status)
    }
    const content = await res.json()
    
    // TODO: transform the JSON into semantic HTML: use Amol's json2html library
    
    const response = {
      statusCode: 200,
      body: content
    }

    // log the response status code
    logger.info(`${response.statusCode}: successful request`)
    return response
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

exports.main = main
