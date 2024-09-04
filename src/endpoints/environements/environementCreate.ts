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

export class environementCreate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Environements"],
    summary: "Create an environement",
    parameters: {
      name: Query(String, {
        description: "The name of the environement, set by the user or automatically generated. maximum length of 63 characters!",
        default: "Placeholder"
      name: Query(String, {
        description: "The name of the environement, set by the user or automatically generated. maximum length of 63 characters!",
        default: "Placeholder"
      }),
      platform: Query(String, {
        description: "The platform for the container (linux; debian; ubuntu etc)",
        default: "Linux"
      }),
      location: Query(String, {
        description: "The resource geographic location",
        default: "westeurope"
      }),
      resourcesMemory: Query(Number, {
        description: "Number of gigabytes of memory",
        default: 1
      }),
      resourcesCPU: Query(Number, {
        description: "Number of CPU cores",
        default: 1
      platform: Query(String, {
        description: "The platform for the container (linux; debian; ubuntu etc)",
        default: "Linux"
      }),
      location: Query(String, {
        description: "The resource geographic location",
        default: "westeurope"
      }),
      resourcesMemory: Query(Number, {
        description: "Number of gigabytes of memory",
        default: 1
      }),
      resourcesCPU: Query(Number, {
        description: "Number of CPU cores",
        default: 1
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

    // Retrieve the validated parameters
    const { name, platform, location, resourcesMemory, resourcesCPU } = data.query;

    // Retrieve the validated parameters
    const { name, platform, location, resourcesMemory, resourcesCPU } = data.query;

    const containerGroup: ContainerGroup = {
      containers: [
        {
          name: name,
          name: name,
          command: [],
          environmentVariables: [],
          image: "gitpod/openvscode-server",
          ports: [{ port: 3000 }],
          resources: { requests: { cpu: resourcesCPU, memoryInGB: resourcesMemory } },
          resources: { requests: { cpu: resourcesCPU, memoryInGB: resourcesMemory } },
        },
      ],
      imageRegistryCredentials: [{
        server: "index.docker.io",
        username: env.DOCKER_USERNAME,
        password: env.DOCKER_PASSWORD,
      }],
      imageRegistryCredentials: [{
        server: "index.docker.io",
        username: env.DOCKER_USERNAME,
        password: env.DOCKER_PASSWORD,
      }],
      ipAddress: { type: "Public", ports: [{ port: 3000, protocol: "TCP" }] },
      location: location,
      osType: platform,
      location: location,
      osType: platform,
      sku: "Standard",
    };
      //perform authentication
      //perform authentication
      console.log('Authenticated succesfully!');
      const result = await mgmtClient.containerGroups.beginCreateOrUpdateAndWait(
        "aerospace",
        "insert-email-md5-hash",
        containerGroup 
        "insert-email-md5-hash",
        containerGroup 
      );
  
      console.log(result);
      // Implement your own object list here
 
      const responseBuld = {
        containers: result.containers,
        ipAdress: result.ipAddress,
        location: result.location,
        id: result.id,
        name: result.name,
        osType: result.osType,
        provisioningState: result.provisioningState,
        volumes: result.volumes
      }
 
      const responseBuild = {
        containers: result.containers,
        ipAdress: result.ipAddress,
        location: result.location,
        id: result.id,
        name: result.name,
        osType: result.osType,
        provisioningState: result.provisioningState,
        volumes: result.volumes
      }
      return {
        success: true,
        environement: responseBuild
        environement: responseBuild
      };
  }
}