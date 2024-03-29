import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

let userAccount = null;
const bcrypt = require("bcrypt");

const confirmPasswordHash = (plainPassword, hashedPassword) => {
  return new Promise((resolve) => {
    bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
      resolve(res);
    });
  });
};

export default NextAuth({
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            return null;
          }

          const correctPassword = await confirmPasswordHash(
            credentials.password,
            user.password
          );

          if (!correctPassword) {
            return null;
          }

          userAccount = {
            id: user.id,
            email: user.email,
            isActive: user.isActive,
          };
          return userAccount;
        } catch (err) {
          console.error("Authorize error:", err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      try {
        user = user.user;
        if (user.id) {
          if (user.isActive === "1") {
            return user;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (err) {
        console.error("Signin callback error:", err);
      }
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/",
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
