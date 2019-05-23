'use strict';

async function setCtx(ctx, status, body) {
	ctx.response.status = status;
	ctx.response.body = body;
	return ctx;
}

//// /users => Prend l'ID de l'user
//// /profile => User actuel, prend juste son token

async function Users(router, User) {
    var Users = this;

    /// Middleware to check if the user is authenticated;
    async function checkToken(ctx, next) {
        let token = ctx.query.token;
        if (!token) {
            return await setCtx(ctx, 403, 'Error: You need to be authenticated');
        }
        let user = await User.findOne({token: token});
        if (!user)
            return await setCtx(ctx, 403, 'Error: Wrong token');
        else {
            ctx.user = user;
            return next();
        }
    }

/*     router.get('/user/:id', async (ctx) => {
        let q = ctx.request.body;
        if (!q.email)
            return await setCtx(ctx, 400, 'Error: Missing parameters');
        let user = await User.find({email: q.email});
        if (!user)
            return await setCtx(ctx, 400, 'Error: User does not exist');
        else {
            let returnedUser = {
                name: user.name,
                last_name:user.last_name,
                email: user.email,
                type: user.type
            };
            return await setCtx(ctx, 200, returnedUser);
        }
    }); */

    /// Gets the user's personnal informations
    router.get('/profile', checkToken, async (ctx) => {
        let user = ctx.user;
        let returnedUser = {
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            type: user.type,
            contacts: user.contacts,
            id: user._id
        };
        return await setCtx(ctx, 200, returnedUser);
    });

    /// Modifies the user's personnal informations, requires authentication
    router.put('/profile', checkToken, async (ctx) => {
        let user = ctx.user;
        let body = ctx.request.body;
        await User.updateOne({_id: user._id}, {name: body.name, last_name: body.last_name, email: body.email});
        let modifiedUser = await User.findOne({_id: user._id});
        return await setCtx(ctx, 200, modifiedUser);
    });

	/// Deletes the user's account, requires authentication
	router.post('/delete', checkToken, async (ctx) => {
		let q = ctx.request.body;
		if (!q.email)
			return await setCtx(ctx, 400, "Error: Missing parameters");
		let user = await User.findOne({ email: q.email });
		if (!user)
			return await setCtx(ctx, 400, 'Error: User does not exist');
		await User.deleteOne({ email: q.email });
		return await setCtx(ctx, 200, 'User removed!');
	});

    return User;
}

module.exports = Users;