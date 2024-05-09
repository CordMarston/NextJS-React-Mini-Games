import NextAuth, { type DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      name:string,
      nicknameAsked:boolean,
      nickname:string,
    } & DefaultSession["user"]
  }

  interface User {
    nicknameAsked:boolean,
    nickname:string
  } 
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  callbacks: {
    session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          nicknameAsked: user.nicknameAsked,
        },
      }
    },
  },
})

