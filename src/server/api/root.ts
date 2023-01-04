import { createTRPCRouter } from "./trpc";
import { bucketListRouter } from "./routers/bucketList";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  bucketList: bucketListRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
