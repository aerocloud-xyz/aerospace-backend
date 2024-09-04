import { DateTime, Str } from "@cloudflare/itty-router-openapi";


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
