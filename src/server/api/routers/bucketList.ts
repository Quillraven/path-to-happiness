import { createTRPCRouter, protectedProcedure } from "../trpc";
import { bucketListSchema } from "../../../components/CreateBucketList";

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
    })
});