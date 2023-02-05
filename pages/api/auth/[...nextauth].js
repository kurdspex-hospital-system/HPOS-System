import NextAuth from "next-auth";
import Providers from "next-auth/providers/credentials";
import { isSame } from "../../../scripts/auth";
import database from "../../../scripts/mysqlAsyncPoolConnection";

export default NextAuth({
    session: {
        jwt: true,
        maxAge: 60 * 60 * 24
    },
    providers: [
        Providers({
            async authorize(credentials, req) {
                try {
                    const {data: user} = await database.query('SELECT * FROM users WHERE username = ?', [credentials.username]);

                    if(user.length === 0) {
                        throw new Error('user not found');
                    }

                    const result = await isSame(credentials.password, user[0].user_password);

                    if(!result) {
                        throw new Error('incorect password');
                    }

                    if(user[0].code === 'Disabled'){
                        throw new Error('Your Account Has Been Disabled');
                    }

                    return {name: {
                        id: user[0].id,
                        access: user[0].code
                    }};
                } catch(err) {
                    throw err;
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
          session.accessToken = token.accessToken
          return session
        }
    },
    secret: 'lwUCdF537BBBtVodKzCU0eyhK42puAq8',
});