import CredentialsProvider from "next-auth/providers/credentials"; // Import CredentialsProvider from next-auth/providers
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";

// Models
import { connectMongo } from "@/db/connectDb";

import { compare } from "bcryptjs";
import User from "@/db/models/User";

const options = {
  session: {
    strategy: "jwt" as const,
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  callbacks: {
    jwt: async ({
      token,
      user,
      session,
    }: {
      token: any;
      user: any;
      session: any;
    }) => {
      if (user) {
        token.gender = user?.gender;
        token._id = user?._id?.toString();
        token.role = user?.role
      }
      return Promise.resolve(token);
    },
    session: async (session: any, user: any) => {
      return Promise.resolve(session);
    },
  },
  //Specify Provider
  providers: [
    CredentialsProvider({
      credentials: {}, // Add the 'credentials' property with an empty object
      async authorize(credentials, req): Promise<any> {
        await connectMongo();

        const user = await User.findOne({
          email: (credentials as { email: string })?.email,
        });

        // @ts-ignore
        if (user.password == null) return null;

        const checkPassword = await compare(
          (credentials as { password: string })?.password ?? "",
          // @ts-ignore
          user.password
        );

        if (user && checkPassword) {
          return {
            name: user.fullName,
            email: user.email,
            image: "",
            gender: user?.gender,
            _id: user?._id?.toString(),
            role: user?.role,
          };
        } else {
          return null;
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,

      async profile(profile, tokens): Promise<any> {
        // You can use the tokens, in case you want to fetch more profile information
        // For example several OAuth providers do not return email by default.
        // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
        try {
          await connectMongo();
          const result = await User.findOne({
            email: profile.email,
          });
          if (!result) {
            await User.create({
              fullName: profile.name,
              email: profile.email,
              isSocialMedia: true,
              password: 123,
            });
          }

          if (result && !result.isSocialMedia) {
            return {
              id: "Error: И-мейла съществува",
              email:
                "Error: И-мейла е регистриран. Свържете се с нас за повече информация",
            };
          }
          return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            gender: result?.gender,
          };
        } catch (e) {
          console.log(e);
        }
      },
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_ID as string,
      clientSecret: process.env.INSTAGRAM_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      async profile(profile, tokens): Promise<any> {
        // You can use the tokens, in case you want to fetch more profile information
        // For example several OAuth providers do not return email by default.
        // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
        try {
          let user;

          await connectMongo();
          const result = await User.findOne({
            email: profile.email,
          });
          user = result;

          if (!result) {
            user = await User.create({
              fullName: profile.name,
              email: profile.email,
              isSocialMedia: true,
            });
          }
          if (result && !result?.isSocialMedia) {
            return {
              // @ts-ignore
              id: user.id,
              // @ts-ignore
              email: user.email,
              // @ts-ignore
              name: user.fullName,
              image: profile.picture,
              gender: user?.gender,
              _id: user?._id?.toString(),
              role: user?.role,
            };
          }

          return {
            // @ts-ignore
            id: user._id,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            gender: user?.gender,
            _id: user?._id?.toString(),
            role: user?.role

          };
        } catch (e) {
          console.log(e);
        }
      },
    }),
  ],
};

export default options;
