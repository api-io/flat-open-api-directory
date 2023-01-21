import { createAppAuth } from "https://cdn.pika.dev/@octokit/auth-app?dts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env=config();
const auth = createAppAuth({
    appId: env.APP_ID,
    privateKey: env.PRIVATE_KEY,
    clientId: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET
  });
  
  const appAuthentication = await auth({
    type: "app",
  });
  
  // Retrieve JSON Web Token (JWT) to authenticate as app
//   const appAuthentication = await auth({ type: "app" });

  console.log( appAuthentication.token);