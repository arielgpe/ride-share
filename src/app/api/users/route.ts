import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const name = searchParams.get('name');

  const user = await prisma.user.findUnique({
    where: {
      name: name,
    }
  })
  return Response.json(user);
};
