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

    router.get('/profile/:id', async (ctx) => {
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
    });

    router.put('/profile', async (ctx) => {
        let q = ctx.request.body;
        if (!q.token || !q.email)
            return await setCtx(ctx, 400, 'Error: Missing parameters');
        await User.findOne({token: token, email: email});
        if (!user)
            return await setCtx(ctx, 400, 'Error: User not found');
        console.log(q);
    });

    return User;
}

module.exports = Users;