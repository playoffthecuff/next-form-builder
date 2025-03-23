"use server"

import prisma from "@/lib/prisma";
import { FormSchema, formSchema } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs/server";

export async function  GetFormStats() {
  const user = await currentUser();
  if (!user) throw new Error("user not found");

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    }
  })
  const visits = stats._sum.visits ?? 0;
  const submissions = stats._sum.submissions ?? 0;

  let submissionsRate = 0;

  if (visits > 0) submissionsRate = (submissions/ visits) * 100;
  const bounceRate = 100 - submissionsRate;

  return {visits,submissions,submissionsRate, bounceRate};
}

export async function createForm(data:FormSchema) {
  const {name,description} = data;
  const validation = formSchema.safeParse(data);
  if (!validation.success) throw new Error("form not valid");
  const user = await currentUser();
  if (!user) throw new Error("user not found");
  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    }
  });

  if (!form) throw new Error("something went wrong");

  return form.id;
}
