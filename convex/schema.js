import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users:defineTable({
        name:v.string(),
        email:v.string(),
        tokenIdentifier:v.string(),
        image:v.optional(v.string())
    })
    .index("tokenIdentifier", ["tokenIdentifier"], { unique: true })
    .index("email", ["email"], { unique: true })
    .searchIndex("search_name", {searchField:"name"})
    .searchIndex("search_email", {searchField:"email"})
})
//i jsut saved it here and in an instant we had a table created in convex dashboard named users with the specified fields