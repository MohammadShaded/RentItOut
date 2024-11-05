import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { id: googleId, emails, displayName: name } = profile;
      const email = emails[0].value;

      // Find or create the user in the database
      let user = await User.findUserByGoogleId(googleId);
      if (!user) {
        user = await User.createUser({ googleId, email, name, role: 'Renter' });
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
