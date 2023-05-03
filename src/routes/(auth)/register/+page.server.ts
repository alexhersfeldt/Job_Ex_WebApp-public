import type { Action, Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt';
import { db } from '$lib/database';

enum Roles {
    Admin = 'ADMIN',
    User = 'USER',
}

export const load: PageServerLoad = async ( {locals} ) => {
    if (locals.user) {
        throw redirect(302, '/job')
      }
};

const register: Action = async ({ request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    console.log({ username, password });
    

    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        !username ||
        !password
    ) {
        return fail(400, { message: 'Invalid username or password' });
    }

    const user = await db.user.findUnique({
        where: { username },
    });

    if (user) {
        return fail(400, { message: 'Username already taken' });
    }

    await db.user.create({
        data: {
            username,
            passwordHash: await bcrypt.hash(password, 10),
            userAuthToken: crypto.randomUUID(),
            role: {connect: {name: Roles.User}},
        },
    });

    throw redirect(303, '/login');
};

export const actions: Actions = { register };