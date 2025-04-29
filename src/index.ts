import { Hono } from "hono";
import { Env } from "./types/env";
import { CursorDurableObject } from "./durable-objects/cursor";

export { CursorDurableObject };

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const app = new Hono();

        app.get('/ws', async (c) => {
            // Instantiate DO to handle establishing our web socket
            // connection between the client (browser) <-> game session (DO).
            const stubId = env.CURSOR_DURABLE_OBJECT.idFromName('default');
            const stub = env.CURSOR_DURABLE_OBJECT.get(stubId);
            return stub.fetch(request);
        })

        return app.fetch(request, env, ctx);
    }
} satisfies ExportedHandler<Env>;
