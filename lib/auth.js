// lib/auth.js  

import CredentialsProvider from 'next-auth/providers/credentials';  
import bcrypt from 'bcryptjs';  
import { connectMongoDB } from './mongodb';  
import User from './models/user';  

export const authOptions = {  
  providers: [  
    CredentialsProvider({  
      name: 'Credentials',  
      credentials: {  
        email: { label: 'Email', type: 'email' },  
        password: { label: 'Password', type: 'password' },  
      },  
      async authorize(credentials) {  
        await connectMongoDB();  

        const user = await User.findOne({ email: credentials.email });  
        if (!user) throw new Error('No user found');  

        const isValid = await bcrypt.compare(credentials.password, user.password);  
        if (!isValid) throw new Error('Incorrect password');  

        return { id: user._id, name: user.name, email: user.email };  
      },  
    }),  
    // เพิ่ม providers อื่นๆ หากต้องการ  
  ],  
  callbacks: {  
    async session({ session, token }) {  
      if (session.user) {  
        session.user.id = token.uid;  
      }  
      return session;  
    },  
    async jwt({ token, user }) {  
      if (user) {  
        token.uid = user.id;  
      }  
      return token;  
    },  
  },  
  // ตั้งค่าอื่นๆ ตามต้องการ  
};