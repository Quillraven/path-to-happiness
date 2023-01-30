import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { bucketListSchema } from "../../../components/CreateBucketList";
import { z } from "zod";
import { likeSchema } from "../../../components/BucketList";

export const bucketListRouter = createTRPCRouter({

  create: protectedProcedure
    .input(bucketListSchema)
    .mutation(({ input, ctx }) => {
      const { entries } = input;
      const { user } = ctx.session;
      return ctx.prisma.bucketList.create({
        data: {
          entries,
          user: {
            connect: { id: user.id }
          }
        }
      });
    }),

  findMany: publicProcedure
    .input(z.object({
      cursor: z.string().nullish(),
      limit: z.number().min(1).max(100).default(10)
    }))
    .query(async ({ input, ctx }) => {
      // we query one more item than the limit for the pagination logic (see below)
      const bucketLists = await ctx.prisma.bucketList.findMany({
        take: input.limit + 1,
        orderBy: {
          createdAt: "desc"
        },
        cursor: input.cursor ? { id: input.cursor } : undefined,
        include: {
          user: {
            select: {
              name: true,
              image: true,
              id: true
            }
          },
          likes: {
            select: { userId: true }
          }
        }
      });

      // if we retrieved one more item than our limit, then we know there is a next page
      let nextCursor: typeof input.cursor | undefined = undefined;
      if (bucketLists.length > input.limit) {
        const nextItem = bucketLists.pop() as typeof bucketLists[number];
        nextCursor = nextItem.id;
      }

      return {
        bucketLists,
        nextCursor
      };
    }),

  like: protectedProcedure
    .input(likeSchema)
    .mutation(({ input, ctx }) => {
      const { user } = ctx.session;

      return ctx.prisma.like.create({
        data: {
          bucketList: { connect: { id: input.bucketListId } },
          user: { connect: { id: user.id } }
        }
      });
    }),

  unlike: protectedProcedure
    .input(likeSchema)
    .mutation(({ input, ctx }) => {
      const { user } = ctx.session;

      return ctx.prisma.like.delete({
        where: {
          userId_bucketListId: {
            userId: user.id,
            bucketListId: input.bucketListId
          }
        }
      });
    }),

  findByUser: protectedProcedure
    .query(({ ctx }) => {
      const { user } = ctx.session;

      return ctx.prisma.bucketList.findUnique({
        where: {
          userId: user.id
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
              id: true
            }
          },
          likes: {
            select: { userId: true }
          }
        }
      });
    })
});