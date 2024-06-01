import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Query,
} from "@cloudflare/itty-router-openapi";
import { EnvironementType } from "../../types";
import { error } from "console";

export class environementCreate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Environements"],
    summary: "Create an environement",
    parameters: {
      page: Query(Number, {
        description: "Page number",
        default: 0,
      }),
      isCompleted: Query(Boolean, {
        description: "Filter by completed flag",
        required: false,
      }),
    },
    responses: {
      "200": {
        description: "Environement created succesfully and now starting",
        schema: {
          success: Boolean,
          environement: EnvironementType,
        },
      },
      "401": {
        description: "Client provided wrong credentials",
        schema: {
          success: Boolean,
          result: {
            error: String,
          },
        },
      },
      "403": {
        description:
          "Client does not have permission to create an environement",
        schema: {
          success: Boolean,
          result: {
            error: String,
          },
        },
      },
      "500": {
        description: "Internal server error",
        schema: {
          success: Boolean,
          result: {
            error: String,
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
    // Retrieve the validated parameters
    const { page, isCompleted } = data.query;

    // Implement your own object list here

    return {
      success: true,
      tasks: {
        name: "Clean my room",
        slug: "clean-room",
        description: null,
        completed: false,
        due_date: "2025-01-05",
      },
    };
  }
}
