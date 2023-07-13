import passport from 'passport';
import local from 'passport-local'
import {createHash, isValidPassword} from '../utils/bcrypt.js';
import {userM, userModelodel} from '../DAO/models/users.model.js';

const LocalStrategy = local.Strategy;

export function iniPassport(){
    passport.use(
		"login",
		new LocalStrategy(
			{ usernameField: "email"},
			async ( username, password, done) => {
				try {
					const user = await userModel.findOne({ email: username });
					if (!user) {
						console.log("User Not Found with email " + username);
						return done(null, false);
					}
					if (!isValidPassword(password, user.password)) {
						req.session.errorMsg = "Contraseña incorrecta.";
						console.log("Invalid Password");
						return done(null, false);
					}

					return done(null, user);
				} catch (err) {
					return done(err);
				}
			}
		)
	);

    
    
    passport.use(
		"register",
		new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: "email",
			},
			async (req, username, password, done) => {
				try {
					const { email, firstName, lastName, age, admin } = req.body;
					const user = await userModel.findOne({ email: username });
					if (user) {
						console.log("User already exists");
						return done(null, false);
					}

					if (!password) {
						throw new Error("No password provided");
					}

					const newUser = {
						age,
						email,
						firstName,
						lastName,
						admin,
						password: createHash(password),
					};
					const userCreated = await userModel.create(newUser);
					console.log("User Registration succesful");
					return done(null, userCreated);
				} catch (e) {
					console.log("Error in register");
					return done(e);
				}
			}
		)
	);


    passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(async (id, done) => {
		let user = await userModel.findById(id);
		done(null, user);
	});


}