
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.2/mod.ts";
import githubAppJwt from "https://esm.sh/universal-github-app-jwt";
import { pemToArrayBuffer, convertToCryptoKey } from "./convertCryptoKey.ts";


const [appId, privateKey] = Deno.args;
if (Deno.args.length < 2) { 
  throw "Usage: github-app-auth <app-id> <private-key-base64-encoded>]"
}

// const appId = Deno.env.get('APP_ID');
// const privateKey = Deno.env.get('PRIVATE_KEY');
/*
const cryptoKeyPair=pemToArrayBuffer(privateKey, 'private')
console.log( cryptoKeyPair);

const { token, expiration } = await githubAppJwt({
  id: appId,
  privateKey: cryptoKeyPair.pemKey
});
console.log(token)
*/

console.log(appJwt(appId,privateKey));
  export function appJwt(appId: string, privateKey: string): Promise<string> {
    return create(
      { alg: "RS256", typ: "JWT" },
      {
        iss: appId, // issuer
        iat: getNumericDate(0), // issued at time (now)
        exp: getNumericDate(5 * 60), // expiration time (in 5 minutes)
      },
      atob(privateKey),
    );
  }

  

/*
  
  import githubAppJwt from "https://esm.sh/universal-github-app-jwt";


const { token, appId, expiration } = await githubAppJwt({
    id: APP_ID,
    privateKey: PRIVATE_KEY,
  });

  */