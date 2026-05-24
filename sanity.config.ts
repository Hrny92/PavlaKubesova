import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  basePath: "/studio",
  projectId: "3zwxs9os",
  dataset: "production",
  title: "Pavla Kubešová – Reality",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Obsah webu")
          .items([
            S.listItem()
              .title("🏠 Nemovitosti")
              .child(S.documentTypeList("property").title("Nemovitosti")),
            S.listItem()
              .title("📝 Články")
              .child(S.documentTypeList("article").title("Články")),
            S.listItem()
              .title("📸 Instagram příspěvky")
              .child(S.documentTypeList("instagramPost").title("Instagram příspěvky")),
          ]),
    }),
  ],
});
