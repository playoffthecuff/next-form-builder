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

export async function getForms() {
  const user = await currentUser();
  if (!user) throw new Error("user not found");
  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    }
  })
}

export async function getFormById(id: number) {
  const user = await currentUser();
  if (!user) throw new Error("user not found");
  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    }
  })
}

export async function updateFormContent(id: number, jsonContent: string) {
  const user = await currentUser();
  if (!user) throw new Error("user not found");
  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    }
  })
}

export async function publishForm(id: number) {
  const user = await currentUser();
  if (!user) throw new Error("user not found");
  return await prisma.form.update({
    data: {
      published: true,
    },
    where: {
      userId: user.id,
      id,
    }
  })
}

export async function getFormContentByUrl(formUrl: string) {

  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      }
    },
    where: {
      shareUrl: formUrl,
    }
  })
}

export async function SubmitForm(formUrl: string, content: string) {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1
      },
      FormSubmissions: {
        create: {
          content,
        }
      }
    },
    where: {
      shareUrl: formUrl,
      published: true,
    }
  })
}

export async function getSubmittedForm(id: number) {
  const user = await currentUser();
  if (!user) throw new Error("user not found");

  return await prisma.form.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        FormSubmissions: true,
      }
    }
  )
}
