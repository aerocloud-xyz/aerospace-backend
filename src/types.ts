import { DateTime, Str } from "@cloudflare/itty-router-openapi";
import { Container, IpAddress, Volume } from "@azure/arm-containerinstance";

export type EnvironementAzureResonseReassignement = {
	containers: Container[] | undefined,
	ipAdress: IpAddress | undefined,
	location: string | undefined,
	id: string | undefined,
	name: string | undefined,
	osType: string | undefined,
	provisioningState: string | undefined,
	volumes: Volume[] | undefined,
};

export const EnvironementType = {
	name: new Str({ example: "lorem" }),
	slug: String,
	description: new Str({ required: false }),
	completed: Boolean,
	due_date: new DateTime(),
};
