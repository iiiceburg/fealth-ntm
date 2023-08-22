import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


export const foodRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ 
      name: z.string(),
      calories: z.number(),
      fat: z.number(),
      carbs: z.number(),
      protein: z.number(),
      image: z.string().optional(), // Make image optional since it's nullable in the schema
    }))
    .mutation(async ({ input, ctx }) => { 
      const food = await ctx.prisma.foodNutrition.create({
        data: {
          name: input.name,
          calories: input.calories,
          fat: input.fat,
          carbs: input.carbs,
          protein: input.protein,
          image: input.image,
        }
      });
      return food;
    }),
    
    getAll: protectedProcedure.query(({ ctx }) => {
      return ctx.prisma.example.findMany();
    }),
    
});
