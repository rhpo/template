import type { Order } from "$lib/types";
import { error } from "@sveltejs/kit";

// Replace with your actual Web3Forms access key
const WEB3FORMS_ACCESS_KEY = "20d50002-3eec-46ff-bb9a-3c7bbb3a8ff9";

function formFromOrder(order: Order) {
    let formData = new FormData();

    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    Object.entries(order.customer).forEach(([key, value]) => {
        if (value) {
            formData.append(`Customer ${key}`, value);
        }
    });

    order.cart.forEach((item, index) => {
        formData.append(
            `Produit ${index + 1}:`,
            `  Nom: ${item.name} (${item.quantity}\n` +
            `  Prix du produit: ${item.price.new} ${item.currency}\n` +
            `  Quantité: ${item.quantity}\n` +
            `  Prix (Produit) total: ${item.price.new * item.quantity} ${item.currency}`
        );
    });

    formData.append("total", order.cart.reduce((total, item) => total + (item.price.new * item.quantity), 0).toString() + ` ${order.cart[0].currency}`);

    formData.append("subject", `New Order from ${order.customer.name}`);
    formData.append("from_name", "DestoLuxe");
    formData.append("replyto", "noreply@destoluxe.shop");

    return formData;
}

export async function sendMail(order: Order) {
    const formData = formFromOrder(order);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw error(500, "Failed to send email");
    }
}
