"use server";

import { headers } from "next/headers";
import { auth } from "../auth"

interface SignUpProps {
    email: string;
    password: string;
    name: string;
}
interface SignInProps {
    email: string;
    password: string;
}

export const singUp = async ({ email, password, name }: SignUpProps) => {

    try {
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
                callbackURL: "/dashboard",
            }
        });

        if (!result) {
            throw new Error("Failed to create an account.")
        }

        return result;
    }

    catch (err) {
        console.error(err);
        throw err;
    }
};

export const singIn = async ({ email, password }: SignInProps) => {

    try {
        const result = await auth.api.signInEmail({
            body: {
                email,
                password,
                callbackURL: "/dashboard",
            }
        });

        if (!result) {
            throw new Error("Sign-in failed. wrong email or password")
        }

        return result;
    }

    catch (err) {
        console.error(err);
        throw err;
    }
}

export const signInSocial = async (provider: "github" | "google") => {

    try {
        const {url} = await auth.api.signInSocial({
            body: {
                provider,
                callbackURL: "/dashboard",
            },
        });

        if (!url) {
            throw new Error(
                "Failed to initialize social authentication."
            );
        }

        return url;

    } catch (err) {
        console.error("Social authentication failed:", err);
        throw err;
    }
}



export const signOut = async () => {
    const result = await auth.api.signOut({
        headers: await headers()
    })

    return result;
}