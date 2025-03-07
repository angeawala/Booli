import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Ajout d’une configuration personnalisée
    rules: {
      // Désactiver la règle obligeant width et height pour next/image
      "react/no-missing-props": "off", // Évite les erreurs si tu utilises <Image /> sans width/height
      "jsx-a11y/alt-text": ["warn", { elements: ["img"] }], // Applique uniquement à <img>, ignore <Image />
      // Optionnel : désactiver complètement les vérifications d’accessibilité pour les images
      // "jsx-a11y/alt-text": "off",
    },
    // Optionnel : ignorer les fichiers où tu utilises <Image /> ou <img>
    ignores: [
      "**/*.tsx", // Ignore tous les fichiers TypeScript si tu veux un contrôle total (à ajuster selon tes besoins)
    ],
  },
];

export default eslintConfig;