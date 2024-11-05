import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { id: googleId, emails, displayName: name } = profile;
      const email = emails[0].value;

      let user = await User.findUserByGoogleId(googleId);
      if (!user) {
        user = await User.createUser({ googleId, email, name, role: 'Renter' });
      }

      const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });

      done(null, { user, token });
    } catch (error) {
      done(error);
    }
  }
));
export default passport;
