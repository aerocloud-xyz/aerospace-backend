import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { environementStart } from "./endpoints/environements/environementStart";
import { environementStop } from "./endpoints/environements/environementStop";
import { environementPause } from "./endpoints/environements/environementPause";
import { environementCreate } from "./endpoints/environements/environementCreate";
import { environementResume } from "./endpoints/environements/environementResume";
import { environementRemove } from "./endpoints/environements/environementRemove";

export const router = OpenAPIRouter({
	docs_url: "/",
});
//environement calls
router.get("/api/environements/start/", environementStart);
router.get("/api/environements/stop/", environementStop);
router.get("/api/environements/pause/", environementPause);
router.get("/api/environements/resume/", environementResume);
router.get("/api/environements/create", environementCreate);
router.get("/api/environements/remove", environementRemove);
//billing calls

//statistics calls

//other calls



// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

export default {
	fetch: router.handle,
};
/*
ok so todo:
//environements
- create an environement X
- start an environement X 
- stop an environement X
- pause an environement X
- resume an environement X
- remove an environement X
//other env stuff
- get logs
- attach
- get files
- post files
//other settings
- save a dockerfile
- add extensions
- statistics
//misc
- billing
*/