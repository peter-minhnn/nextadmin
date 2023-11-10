import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { User } from "@/lib/model";
import bcrypt from "bcrypt";
import { connectToDB } from "@/lib/utils";
import { z } from 'zod';

const login = async ({ email, password }: Record<string, string>) => {
    try {
        connectToDB();
        const user = await User.findOne({ username: email });

        if (!user || !user.isAdmin) throw new Error("Wrong credentials!");

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) throw new Error("Wrong credentials!");

        return user;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to login!");
    }
};

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const parsedCredentials = z
                        .object({ email: z.string().email(), password: z.string().min(6) })
                        .safeParse(credentials);

                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;
                        const user = await login({ email, password });
                        return user;
                    }
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    // ADD ADDITIONAL INFORMATION TO SESSION
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.email = user.email;
                token.img = user.img;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token) {
                session.user.email = token.email;
                session.user.img = token.img;
            }
            return session;
        },
    },
});
