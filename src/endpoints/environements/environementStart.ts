import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { EnvironementType } from "../../types";

export class environementStart extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Environements"],
		summary: "Start a stopped environement",
		requestBody: EnvironementType,
		responses: {
			"200": {
				description: "Returns the created task",
				schema: {
					success: Boolean,
					result: {
						task: EnvironementType,
					},
				},
			},
		},
	};

	async handle(
		request: Request,
		env: any,
		context: any,
		data: Record<string, any>
	) {
		// Retrieve the validated request body
		const taskToCreate = data.body;

		// Implement your own object insertion here

		// return the new task
		return {
			success: true,
			task: {
				name: taskToCreate.name,
				slug: taskToCreate.slug,
				description: taskToCreate.description,
				completed: taskToCreate.completed,
				due_date: taskToCreate.due_date,
			},
		};
	}
}
