import { createAppAuth } from "https://cdn.pika.dev/@octokit/auth-app?dts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import {readTXT} from "https://deno.land/x/flat@0.0.15/src/txt.ts";


// deno run --allow-read --allow-write --allow-env  auth/gh_auth.ts > jwt.txt
// authorization=`cat jwt.txt`
// id="33351991"
// gh api -X POST -H "authorization=bearer $authorization" /app/installations/$id/access_tokens --jq -r .token
//echo "token=$(gh api -X POST -H "authorization=bearer $authorization" /app/installations/${{env.id}}/access_tokens --jq -r .token)" 

const env=config();
const pm= await readTXT(env.PRIVATE_KEY_FILE);
const auth = createAppAuth({
    appId: env.APP_ID,
    privateKey: pm,
    clientId: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET
  });
  
  const appAuthentication = await auth({
    type: "app",
  });

  // Retrieve JSON Web Token (JWT) to authenticate as app
//   const appAuthentication = await auth({ type: "app" });

  console.log( appAuthentication.token);
  Deno.env.set("APP_TOKEN",appAuthentication.token );