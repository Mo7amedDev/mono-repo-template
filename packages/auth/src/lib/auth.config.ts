import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { prisma } from "@repo/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials,'zzzzzzzzzzzz');
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findFirst({
          where: {
            email: {
              equals: credentials.email,
              mode: "insensitive",
            },
          },
        })

        console.log(user,'zzzzzzzzzzzz');
        
        if (!user || !user.password) return null

        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!valid) return null
        
        // Return a User object that matches your custom User interface
        return {
          id: user.id,
          name: user.name || undefined, // Convert null to undefined
          email: user.email || undefined, // Convert null to undefined
          role: user.role || undefined, // Make sure role is either string or undefined
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        // Pass the role from user to token
        if (user.role) {
          token.role = user.role
        }
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        // Add role to session
        if (token.role) {
          session.user.role = token.role as string
        }
      }
      return session
    },
  },
}