
// POST (get formData from body), and fetch the Web3Forms API to submit the form data

import type { Order } from "$lib/types";
import type { Actions } from "@sveltejs/kit";

import { sendMail } from "../mail";
import { buildNotificationData, broadcastNotification } from "../notify";

export const actions = {
    default: async ({ request }) => {
        const form = await request.formData();
        const order: Order = {
            cart: JSON.parse(form.get("cart") as string),
            customer: JSON.parse(form.get("customer") as string),
        }

        await broadcastNotification(
            buildNotificationData(order)
        );

        await sendMail(order);

        // Return success response
        return {
            success: true,
        }
    }
} satisfies Actions;
