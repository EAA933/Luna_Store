
import { describe, it, expect } from "vitest";
import { formatCurrency } from "../lib/utils";
describe("formatCurrency", () => { it("formats MXN", () => { expect(formatCurrency(1499)).toContain("$"); }); });
