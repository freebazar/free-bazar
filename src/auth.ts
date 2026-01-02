import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                console.log("Authorize attempt for email:", credentials.email);
                const email = credentials.email as string
                const password = credentials.password as string

                const user = await prisma.user.findUnique({
                    where: { email }
                })

                if (!user || !user.password) {
                    console.log("Sign-in failed: User not found or no password registered.");
                    return null;
                }

                console.log("User found, comparing passwords...");
                const isValid = await bcrypt.compare(password, user.password);

                if (isValid) {
                    console.log("Sign-in successful (bcrypt).");
                    return user;
                }

                // Fallback for demo users with plain text passwords (optional, but good for migration)
                if (user.password === password) {
                    console.log("Sign-in successful (plain text match).");
                    return user;
                }

                console.log("Sign-in failed: Password mismatch.");
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    trustHost: true,
    pages: {
        signIn: '/signin',
    },
    secret: process.env.AUTH_SECRET,
})
