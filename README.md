## Getting Started

First, install the npm modules (using Node v18.17.5)
```bash
npm install or npm ci
```

then initiate the postgres db with the prisma migrations (only do this if the db has not been initialized)

```bash
npm run prisma-migrate
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Production site hosted at [https://ride-share-ten.vercel.app/](https://ride-share-ten.vercel.app/)


## Tech Stack

The app is build with Nextjs, Mapbox for the map layer, Prisma for the ORM, Postgres, Mui and Tailwindcss for the styling and swr for data-fetching.

For this app I decided to go with Prisma and Vercel Postgres from the get go, which was probably not a great idea since I needed the real time data,
Supabase or firebase would have been better alternatives. Currently, the app is handling the freshness of the data with SWR pooling, which works fine for an app of this small scale but still.

I used Mapbox since I was already familiar with it. ~~Sadly, the Directions controls are not compatible with react-mapbox-gl so I had to use standard mapbox-gl library, with more time, 
I probably would have made a directions library for react-mapbox-gl.
This mapbox issue sadly causes the app to redraw every time there's a direction change, since it cannot update based on states.~~ Updated with Directions component on Feb 7th.

There's no authentication per se, but the app does force you to set a name and a role, keep in mind that the role + name selection only matters the first time, you cannot change your role.

I kept the design very simple, ideally I would have liked to have all the app functionality as controls on top of mapbox but time constraints didn't permit it.

It took me about 7-8hrs of development time to complete the task Tuesday Jan 30, to Thursday Feb 1.
