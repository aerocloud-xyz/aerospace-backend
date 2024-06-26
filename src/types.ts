import { DateTime, Str } from "@cloudflare/itty-router-openapi";

export const EnvironementType = {
	name: new Str({ example: "lorem" }),
	slug: String,
	description: new Str({ required: false }),
	completed: Boolean,
	due_date: new DateTime(),
};
