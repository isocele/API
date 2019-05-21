const bcrypt = require('bcrypt');
const crypter = require('crypto');
const nodemailer = require('nodemailer');
const env = require('../../Globals/env');

/// Sets the context's body and status
async function setCtx(ctx, status, body) {
	ctx.response.status = status;
	ctx.response.body = body;
	return ctx;
}

/// Creates a random token
async function createToken() {
	let token = await crypter.randomBytes(20);
	return await token.toString('hex');
}

/// Sends an email, using nodemailer's API (need to change that)
async function sendEmail(content) {
	if (env.mail) {
		const transporter = await nodemailer.createTransport({
			auth: {
				user: 'epicare.epitech@gmail.com',
				pass: 'epicare2018'
			},
			service: 'gmail'
		});
		var mailOptions = {
			from: 'epicare.epitech@gmail.com',
			to: content.email,
			subject: '[EpiCare] ' + content.subject,
			html: content.html
		};
		await transporter.sendMail(mailOptions);
	}
}

async function Users(router, User) {

	var Users = this;

	/// Register route: requires name, lastname, email and password
	/// Password confirmation must be done on the FRONT-END
	router.post('/register', async (ctx) => {
		let q = ctx.request.body;
		if (!q.name || !q.last_name || !q.email || !q.password)
			return await setCtx(ctx, 400, 'Error: Missing parameters');
		const user = await User.findOne({ email: q.email });
		if (user)
			return await setCtx(ctx, 400, 'Error: Email already used');
		let token = await createToken();
		let newUser = await new User({
			name: q.name,
			last_name: q.last_name,
			email: q.email,
			password: bcrypt.hashSync(q.password, 10),
			token: token,
			active: false
		});
		await newUser.save();
		await sendEmail({
			email: q.email,
			subject: 'Confirm your account',
			html: 	
			'<h1>Welcome to EpiCare!</h1> \
			<p>Click on this link to confirm your account!</p> \
			<form action="http://epicare.fr:8080/confirm?token=' + token + '" method="post">			\
			<button type="submit" name="token" value="Click me!" class= "btn-link">Click me to confirm!</button>	\
			</form>'
		});
		return await setCtx(ctx, 200, 'OK');
	});

	/// Login route: requires name and password sent as query
	router.post('/login', async (ctx) => {
		let q = ctx.request.body;
		if (!q.email || !q.password)
			return await setCtx(ctx, 400, 'Error: Missing parameters');
		let email = q.email;
		let password = q.password;
		const user = await User.findOne({ email: email });
		if (!user)
			return await setCtx(ctx, 400, 'Error: Unknown user');
		if (!user.active && process.env.NODE_ENV != 'test' && process.env.NODE_ENV != 'dev')
			return await setCtx(ctx, 400, 'Error: Confirm your email');
		if (!await bcrypt.compareSync(password, user.password))
			return await setCtx(ctx, 400, 'Error: Unknown user');
		return await setCtx(ctx, 200, {token: user.token});
	});

	/// Confirm route: requires the token
	router.post('/confirm', async (ctx) => {
		let q = ctx.query;
		if (!q.token)
			return await setCtx(ctx, 400, 'Error: Missing parameters');
		let user = await User.findOne({ token: q.token });
		if (!user || user.token != q.token)
			return await setCtx(ctx, 400, 'Error: Wrong token');
		user.active = true;
		await user.save();
		return await setCtx(ctx, 200, 'OK');
	});

	/// Get route: sends an email to reset the password
	router.get('/reset', async (ctx) => {
		let q = ctx.request.body;
		if (!q.email)
			return await setCtx(ctx, 400, 'Error: Missing parameters');
		let user = await User.findOne({ email: q.email });
		if (!user) return await setCtx(ctx, 400, 'Error: User not found');
		await sendEmail({
			email: q.email,
			subject: 'Reset your password',
			html: 	
			'<h1>EpiCare</h1> \
			<p>Click on this link to reset your password</p> \
			<form action="http://epicare.fr/reset?id=' + user._id + '" method="get"> \
			<button type="submit" name="token" value="Click me!" class= "btn-link">Click me to be redirected!</button>	\
			</form>'
		});
		return await setCtx(ctx, 200, 'Email sent');
	});

	/// Reset POST route: asks the token + email + new password
	router.post('/reset', async (ctx) => {
		let q = ctx.request.body;
		let query = ctx.query;
		if (!query.id || !q.email || !q.password)
			return await setCtx(ctx, 400, 'Error: Missing parameters');
		let token = await createToken();
		let password = await bcrypt.hashSync(q.password, 10);
		await User.findOneAndUpdate({ _id: query.id, email: q.email }, { password: password, token: token }, async (err, user) => {
			if (err || !user) return await setCtx(ctx, 400, 'Error: User not found');
			return await setCtx(ctx, 200, token);
		});
	});

	return Users;
};

module.exports = Users;