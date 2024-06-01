import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { EnvironementType } from "../../types";

export class environementStop extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Environements"],
		summary: "Stop a running environement",
		parameters: {
			taskSlug: Path(String, {
				description: "Task slug",
			}),
		},
		responses: {
			"200": {
				description: "Returns if the task was deleted successfully",
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
		// Retrieve the validated slug
		const { taskSlug } = data.params;

		// Implement your own object deletion here

		// Return the deleted task for confirmation
		return {
			result: {
				task: {
					name: "Build something awesome with Cloudflare Workers",
					slug: taskSlug,
					description: "Lorem Ipsum",
					completed: true,
					due_date: "2022-12-24",
				},
			},
			success: true,
		};
	}
}
