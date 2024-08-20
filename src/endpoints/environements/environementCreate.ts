import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Query,
} from "@cloudflare/itty-router-openapi";
import { EnvironementType } from "../../types";
import { ClientSecretCredential } from "@azure/identity";
import {
  ContainerGroup,
  ContainerInstanceManagementClient,
} from "@azure/arm-containerinstance";
import { authorizationValidator } from "middleware/authMiddleware";

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
    const subscriptionId = env.SUBSCRIPTIONID;
    const credential = new ClientSecretCredential(
      env.TENANTID,     //tenantid
      env.CLIENTID,     // clientid
      env.CLIENTSECRET, //secret
    );
    const mgmtClient = new ContainerInstanceManagementClient(
      credential,
      subscriptionId
    );

    const containerGroup: ContainerGroup = {
      containers: [
        {
          name: "abcdefg-12345",
          command: [],
          environmentVariables: [],
          image: "gitpod/openvscode-server",
          ports: [{ port: 3000 }],
          resources: { requests: { cpu: 1, memoryInGB: 1 } },
        },
      ],
      imageRegistryCredentials: [],
      ipAddress: { type: "Public", ports: [{ port: 3000, protocol: "TCP" }] },
      location: "westeurope",
      osType: "Linux",
      sku: "Standard",
    };
    const authValidator = await authorizationValidator(request, env, ['aerospace:dothings']);
      console.log('Authenticated succesfully!');
      const result = await mgmtClient.containerGroups.beginCreateOrUpdateAndWait(
        "aerospace",
        "user-placeholder",
        containerGroup
      );
  
      console.log(result);
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
