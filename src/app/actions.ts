'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        console.log("Starting authentication process for:", formData.get("email"));
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            console.log("AuthError caught:", error.type);
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid email or password.'
                default:
                    return 'Authentication failed.'
            }
        }
        // Redirect errors are expected and should be re-thrown
        if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
            console.log("Redirecting user after successful sign-in.");
            throw error;
        }

        console.error("Unexpected authentication error:", error);
        return 'Something went wrong.'
    }
}
