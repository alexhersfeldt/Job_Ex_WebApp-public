import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { Action, Actions, PageServerLoad } from './$types'

import { db } from '$lib/database'


export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(302, '/job')
      }
  }


const login: Action = async ({ request, cookies }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')


    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        !username ||
        !password
    ) {
        return fail(400, {invalid: true })
    }

    const user = await db.user.findUnique({
        where: { username },
    })

    if (!user) {
        return fail(400, {credentials: true })
    }

    const userPassword = await bcrypt.compare(password, user.passwordHash)

    if (!userPassword) {
        return fail(400, {credentials: true })
    }

    const authenticatedUser = await db.user.update({
        where: { username: user.username },
        data: { userAuthToken: crypto.randomUUID() }
    })

    cookies.set('session', authenticatedUser.userAuthToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 1 week
        sameSite: 'lax',
        httpOnly: true,
        })

    throw redirect(303, '/job')
}

export const actions: Actions = { login }
