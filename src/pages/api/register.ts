import type { APIContext } from "astro";
import { db, User, eq } from "astro:db";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { lucia } from "../../auth";

export async function POST(context:APIContext): Promise<Response> {

    const body = await context.request.json()
    
    //Read the form data
    const username = body.username
    const password = body.password
    
    let message = {
        both         : { message: "Username and password are required"},
        username     : { message: "Username must be at least 4 characters long"},
        password     : { message: "Password must be at least 4 characters long"},
        notfounduser : { message: "This username is already taken"}
    }
    
    if (!username || !password) {
        return new Response(JSON.stringify(message.both), {status: 400});
    }
    
    if (typeof username !== 'string' || username.length < 4) {
        return new Response(JSON.stringify(message.username), {status: 400});
    }
    
    if (typeof password !== 'string' || password.length < 4) {
        return new Response(JSON.stringify(message.password), {status: 400});
        
    }


    const foundUser = (
        await db
        .select()
        .from(User)
        .where(eq(User.username, username))
    ).at(0);

    console.log(foundUser);
    //If user not found
    if (foundUser !== undefined) {
        return new Response(JSON.stringify(message.notfounduser), {status: 400})
    }

    
    //Insert user in DB
    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password)
    console.log("MDRRRR")
    await db.insert(User).values({
        id: userId,
        username: username,
        password: hashedPassword
    })
    
    //Generate session
    const session = await lucia.createSession(userId, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);

    context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );


    // return new Response(JSON.stringify({message: "lol"}))
    return context.redirect("/"), new Response(JSON.stringify({message: "logged"}), { status: 200})
}