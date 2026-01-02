'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function markInquiryAsRead(inquiryId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.inquiry.update({
            where: { id: inquiryId },
            data: { status: "READ" }
        });

        revalidatePath("/dashboard");
        return { success: true };
    } catch (e) {
        console.error("Dashboard error:", e);
        return { error: "Failed to update inquiry." };
    }
}
