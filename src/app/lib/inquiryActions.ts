'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function submitInquiry(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "You must be signed in to send inquiries." };
    }

    const productId = formData.get("productId") as string;
    const receiverId = formData.get("receiverId") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!subject || !message || !receiverId) {
        return { error: "Please fill in all required fields." };
    }

    try {
        await prisma.inquiry.create({
            data: {
                subject,
                message,
                senderId: session.user.id,
                receiverId,
                productId: productId || null,
                status: "UNREAD"
            }
        });

        revalidatePath(`/product/${productId}`);
        revalidatePath("/dashboard");
        return { success: "Your inquiry has been sent successfully!" };
    } catch (e) {
        console.error("Inquiry error:", e);
        return { error: "Failed to send inquiry. Please try again." };
    }
}
