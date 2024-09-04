import { DateTime, Str } from "@cloudflare/itty-router-openapi";
import { Container, IpAddress, Volume } from "@azure/arm-containerinstance";
import { kStringMaxLength } from "buffer";

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
	containers: [{
		name: String,
		image: String,
		command: String[0],
		ports: Number[0],
		environementVariables: String[0],
		instanceView: Object,
		resources: Object,
	}],
	ipAdress: String,
	location: String,
	id: String,
	name: String,
	osType: String,
	provisioningState: String,
};
