import {generateApi} from "swagger-typescript-api";
import path from "node:path";

const PATH = path.resolve(process.cwd(), "./src/types");
const SWAGGERS = Object.entries({
    "https://raw.githubusercontent.com/UWE-UniHub/unihub-deliverables/refs/heads/main/openapi.yml": "domain.ts",
});

(async () => {
    for (const [url, name] of SWAGGERS) {
        await generateApi({
            name,
            url,
            output: PATH,
            generateClient: false,
            generateUnionEnums: true,
            httpClientType: 'axios',
        })
    }
})();