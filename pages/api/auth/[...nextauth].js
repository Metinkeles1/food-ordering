import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import clientPromise from "../../../util/mongo"
import { MongoDBAdapter } from "@auth/mongodb-adapter"

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
    })],
    pages: {
        signIn: "/auth/login"
    },
})