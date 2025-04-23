import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(), // N'étend rien (aucune config par défaut comme "next")
  {
    ignores: ["**/*"], // Ignore tous les fichiers (optionnel, mais radical)
    rules: {
      // Liste ici quelques règles communes à désactiver — tu peux les désactiver toutes globalement
    },
    linterOptions: {
      // Pour ESLint v9+, mais utile dans certains cas pour ignorer les erreurs globalement
      noInlineConfig: false,
      reportUnusedDisableDirectives: false,
    },
  },
];

export default eslintConfig;
