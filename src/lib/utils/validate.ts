import type { Order } from "$lib/types";

export function validateForm(formData: Order) {
    const errors: Record<string, string> = {};

    if (!formData.customer.name.trim()) {
      errors.name = "Le nom est requis";
    }

    if (!formData.customer.phone.trim()) {
      errors.phone = "Le téléphone est requis";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.customer.phone)) {
      errors.phone = "Format de téléphone invalide";
    }

    if (!formData.customer.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer.email)) {
      errors.email = "Format d'email invalide";
    }

    if (!formData.customer.address.trim()) {
      errors.address = "L'adresse est requise";
    }

    return errors;
  }
