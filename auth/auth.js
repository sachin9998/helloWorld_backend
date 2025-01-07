import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Person } from "../models/person.model.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // console.log('Received credentials:', username, password);
      const user = await Person.findOne({ username });
      
      if (!user) return done(null, false, { message: "Incorrect username." });

      const isPasswordMatch = await user.comparePassword(password);

      if (isPasswordMatch) return done(null, user);

      else return done(null, false, { message: "Incorrect password." });
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;
