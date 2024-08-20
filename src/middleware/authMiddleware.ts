/** Build API authorization */
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { AuthenticationError, ServerError } from './error';
import Zod from 'zod';
const buildGetJwkSet = async (issuerEndpoint: URL) => {
  const appendedEndpoint = new URL('/oidc/.well-known/openid-configuration', issuerEndpoint);
  const fetched = await fetch(appendedEndpoint, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const json = await fetched.json();
  const result = Zod.object({ jwks_uri: Zod.string(), issuer: Zod.string() }).parse(json);
  const { jwks_uri: jwksUri, issuer } = result;

  return Object.freeze([createRemoteJWKSet(new URL(jwksUri)), issuer] as const);
};

export const verifyTokenWithScopes = async (
  token: string,
  env: any,
  requiredScopes: string[] = []
) => {
  const issuerEndpoint = env.ISSUER_ENDPOINT;
  const workerResourceIndicator = env.WORKER_RESOURCE_INDICATOR;

  console.log('token:', token);
  console.log('issuerEndpoint', issuerEndpoint);

  if (typeof issuerEndpoint !== 'string') {
    throw new ServerError('The env variable `ISSUER_ENDPOINT` is not set.');
  }

  if (typeof workerResourceIndicator !== 'string') {
    throw new ServerError('The env variable `WORKER_RESOURCE_INDICATOR` is not set.');
  }

  console.log('workerResourceIndicator', workerResourceIndicator);
  console.log('requiredScopes', requiredScopes);

  const [getKey, issuer] = await buildGetJwkSet(new URL(issuerEndpoint));
  try {
    const {
      payload: { scope },
    } = await jwtVerify(token, getKey, {
      issuer,
      audience: workerResourceIndicator,
    });

    const scopes = typeof scope === 'string' ? scope.split(' ') : [];
    if (!requiredScopes.every((scope) => scopes.includes(scope))) {
      throw new AuthenticationError('The token does not have required scopes.');
    }
  } catch (error) {
    console.log(error);
    throw new AuthenticationError('JWT verification failed.', error);
  }

  return true;
};

export async function authorizationValidator(
  request: Request,
  env: any,
  requiredScopes: string[] = []
): Promise<Request> {
  // Check if the Authorization header exists
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthenticationError('Unauthorized, Bearer auth required.');
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new AuthenticationError('Unauthorized, missing Bearer token.');
  }

  // Perform additional validation or processing with the token if needed
  await verifyTokenWithScopes(token, env, requiredScopes);

  // Return the authorized request
  return request;
}
/** Build API authorization */
