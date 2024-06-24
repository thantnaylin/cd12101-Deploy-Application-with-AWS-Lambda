// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'celt4dpec8'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  domain: 'dev-fczqgoasdkdvdacq.us.auth0.com',            // Auth0 domain
  clientId: 'OM5MGAqFzx4kw5DGT3KHMlbe1S33sL9J',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
