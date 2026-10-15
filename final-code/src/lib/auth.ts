import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";


export const auth =  betterAuth({

    

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