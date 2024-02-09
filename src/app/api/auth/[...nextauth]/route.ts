import NextAuth, { Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

const handler = NextAuth({
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: 'Credentials',
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          name: {label: 'Full Name', type: 'text', placeholder: ''},
          role: {label: 'Role', type: 'text'},
        },
        async authorize(credentials, req) {
          let user = await prisma.user.findUnique({
            where: {
              name: credentials?.name,
            }
          });
          if (!user && credentials) {
            user = await prisma.user.create({
              data: {
                name: credentials?.name,
                role: credentials?.role
              },
            });
          }

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        },

      }),
    ],
    jwt: {
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
      async session(session: Session, user: AdapterUser, token: JWT) {
        if (user !== null) {

          session.user = user;
        }
        return session;
      },

      async jwt({token, user}) {
        return token;
      },
    },
  },
);
export { handler as GET, handler as POST };
