import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { bucketListSchema } from "../../../components/CreateBucketList";
import { z } from "zod";

export const bucketListRouter = createTRPCRouter({

  create: protectedProcedure
    .input(bucketListSchema)
    .mutation(({ input, ctx }) => {
      const { entries } = input;
      const { user } = ctx.session;
      return ctx.prisma.bucketList.create({
        data: {
          entries,
          author: {
            connect: { id: user.id }
          }
        }
      });
    }),

  findMany: publicProcedure
    .input(z.object({
      cursor: z.string().optional(),
      limit: z.number().min(1).max(100).default(10)
    }))
    .query(async ({ input, ctx }) => {
      const bucketLists = await ctx.prisma.bucketList.findMany({
        take: input.limit,
        orderBy: {
          createdAt: "desc"
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
              id: true
            }
          }
        }
      });

      return {
        bucketLists
      };
    })
});