'use server'

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function registerUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const companyName = formData.get("companyName") as string;

    if (!email || !password) {
        return { error: "Email and password are required." };
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { error: "An account with this email already exists." };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                companyName: companyName || null,
                role: "BUYER",
                name: email.split('@')[0] // Default name from email
            }
        });

        // Registration successful
        return { success: "Account created successfully! You can now sign in." };

    } catch (e) {
        console.error("Registration error:", e);
        return { error: "Something went wrong. Please try again later." };
    }
}
