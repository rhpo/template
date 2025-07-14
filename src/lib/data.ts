import { Home, Info, Pen, Phone } from "lucide-svelte";

export let BRAND_NAME = "Site Name";
export let BRAND_DESCRIPTION =
  "Votre partenaire de beauté, de style et de luxe.";

export let navigation = [
  {
    name: "Home",
    href: "/",
    id: "home",
    icon: Home,
  },
  {
    name: "Nos réalisations",
    href: "/#",
    id: "realizations",
    icon: Pen,
  },
  {
    name: "À propos",
    href: "/#",
    id: "about",
    icon: Info,
  },
  {
    name: "Contact",
    href: "/#",
    id: "contact",
    icon: Phone,
  },
];

export let footer = {
  links: [
    {
      name: "À propos",
      content: [
        { name: "Notre histoire", href: "/#" },
        { name: "Équipe", href: "/#" },
        { name: "Carrières", href: "/#" },
      ],
    },
    {
      name: "Aide",
      content: [
        { name: "FAQ", href: "/#" },
        { name: "Contact", href: "/#" },
        { name: "Support", href: "/#" },
      ],
    },
    {
      name: "Politique",
      content: [
        { name: "Confidentialité", href: "/#" },
        { name: "Conditions d'utilisation", href: "/#" },
        { name: "Retours", href: "/#" },
      ],
    },
  ],
};
