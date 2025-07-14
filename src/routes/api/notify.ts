import { BRAND_NAME } from "$lib/data";
import type { Order } from "$lib/types";
import { error } from "@sveltejs/kit";


const users = [
    "jshwjpaecc1sd8a", // Moh
    "2vrxe04p8d9fsob", // Ramy
] // Alertzy api

interface NotificationData {
    title: string;
    message: string;
}

export function buildNotificationData(order: Order) {
    let title = `${BRAND_NAME} | ${order.customer.name}`;
    let message = order.cart
        .map(item => `${item.name} (x${item.quantity})`)
        .join("\n");

    message += `\nPrix total: ${order.cart.reduce((total, item) => total + (item.price.new * item.quantity), 0)} ${order.cart[0].currency}`;

    return { title, message };
}
export async function notify({ title, message }: NotificationData, accountKey: string) {
    // Send notification via Alertzy API
    const response = await fetch("https://alertzy.app/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            accountKey,
            title,
            message
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to send notification:", errorData);
        throw error(500, "Failed to send notification");
    }
}

export async function broadcastNotification({ title, message }: NotificationData) {
    users.forEach(async (userKey) => {
        // Send notification to each user
        await notify({ title, message }, userKey);
    });
}
