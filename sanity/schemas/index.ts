import { type SchemaTypeDefinition } from "sanity";
import property from "./property";
import article from "./article";
import instagramPost from "./instagramPost";

export const schemaTypes: SchemaTypeDefinition[] = [property, article, instagramPost];
