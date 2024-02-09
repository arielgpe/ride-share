import prisma from '@/lib/prisma';
import { Trip } from '@/interfaces/TripSlice';

export async function POST(request: Request) {
  const body = await request.json() as Trip;

  // driver pay percentage;
  const driverPay = 0.6;

  const bookingFee = 5;
  const cancellationFee = 2;

  body.cost = bookingFee + cancellationFee + (body.distance / 1609);
  body.driverPay = body.cost * driverPay;

  const newTrip = await prisma.trip.create({data: body});
  return Response.json(newTrip);
}

export async function PUT(request: Request) {
  const {id, ...others} = await request.json() as any;
  const updatedUser = await prisma.trip.update({
    where: {
      id,
    },
    data: others,
    include: {
      driver: true,
      user: true
    }
  });
  return Response.json(updatedUser);
}

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);

  const status = searchParams.get('status');
  const userId = searchParams.get('userId');
  const role = searchParams.get('role');
  if (status) {
    const trip = await prisma.trip.findMany({
      where: {
        status: status,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    return Response.json(trip);
  } else if (userId) {
    const where: any = role === 'DRIVER' ? {
      driverId: Number(userId),
      status: 'ongoing'
    } : {
      OR: [
        {
          userId: Number(userId),
          status: 'open'
        },
        {
          userId: Number(userId),
          status: 'ongoing'
        }
      ]
    };

    const trip = await prisma.trip.findFirst({
      where,
      include: {
        driver: true,
        user: true
      },
    });
    return Response.json(trip);
  }

}
