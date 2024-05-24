import type { APIContext } from "astro";
import { db, eq, User } from "astro:db";
import { Argon2id } from "oslo/password";
import { lucia } from "../../auth";


export async function POST(context:APIContext): Promise<Response> {

    const body = await context.request.json()

    let message = {
        invalidusername       : { message: "Invalid username"},
        invalidpassword       : { message: "Invalid password"},
        notfounduser          : { message: "Incorrect username or password"},
        notfounduser_password : { message: "Incorrect password"},
        validpassword         : { message: "Incorrect username or password"}
    }

    //Read the form data
    const username = body.username
    const password = body.password

    if (typeof username !== 'string') {
        return new Response(JSON.stringify(message.invalidusername), {status : 400});
    }

    if (typeof password !== 'string') {
        return new Response(JSON.stringify(message.invalidpassword), {status : 400});
    }

    //Search correct user
    const foundUser = (
        await db
        .select()
        .from(User)
        .where(eq(User.username, username))
    ).at(0);

    //If user not found
    if (!foundUser) {
        return new Response(JSON.stringify(message.notfounduser), {status: 400})
    }

    //check if user has password
    if (!foundUser.password) {
        return new Response(JSON.stringify(message.notfounduser_password), {status: 400})
    }

    //Validate password
    const validPassword = await new Argon2id().verify(foundUser.password, password)

    if (!validPassword) {
        return new Response(JSON.stringify(message.validpassword), { status: 400 });
      }

    //Password is valid, user can log in
    const session = await lucia.createSession(foundUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return new Response(JSON.stringify({message: "logged"}), { status: 200})
}