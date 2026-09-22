import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

/** Tek reader — blog, sayfalar, singleton’lar */
export const reader = createReader(process.cwd(), keystaticConfig);
