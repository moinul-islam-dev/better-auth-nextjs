import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGO_BETTERAUTH_URI;


if (!mongoUri) {
    throw new Error("MONGO_BETTERAUTH_URI is not defined");
}

const githubClientId = process.env.GITHUB_CLIENT_ID
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

const client = new MongoClient(mongoUri);
const db = client.db("nextjs-better-auth-tutorial");

export const auth = betterAuth({

    database: mongodbAdapter(db, {
        client
    }),

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {

        // Only add GitHub auth if both the client ID and secret are actually set in the environment.
        // If they are missing, the spread operator (...) safely ignores the empty object so the app doesn't crash.
        ...(
            githubClientId && githubClientSecret

                ? {
                    github: {
                        clientId: githubClientId,
                        clientSecret: githubClientSecret,
                    }
                }

                : {}
        ),


        // Same logic for Google—dynamically inject the provider config only if we have the credentials.
        // This keeps the configuration flexible for different environments (like local dev vs production).
        ...(
            googleClientId && googleClientSecret

                ? {
                    google: {
                        clientId: googleClientId,
                        clientSecret: googleClientSecret,
                    }
                }

                : {}
        )

    },

    plugins: [nextCookies()],
})