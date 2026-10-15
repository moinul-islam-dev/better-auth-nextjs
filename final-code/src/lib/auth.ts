import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGO_BETTERAUTH_URI;

if(!mongoUri) {
    throw new Error("MONGO_BETTERAUTH_URI is not defined");
}

const client = new MongoClient(mongoUri);
const db = client.db();

export const auth =  betterAuth({

    database: mongodbAdapter( db , {
        client
    }),

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {

        github: {
            clientId: "",
            clientSecret: ""
        },

        google: {
            clientId: "",
            clientSecret: "",        
        }

    }
})