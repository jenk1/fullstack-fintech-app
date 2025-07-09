import { NextResponse } from "next/server";
import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    '/'
])

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        const { userId } = await auth();
        if (!userId) {
            const signInUrl = new URL('/sign-in', req.url);
            signInUrl.searchParams.set('redirect_url', req.url);
            return NextResponse.redirect(signInUrl);
        }
    }

    return NextResponse.next();
});


export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};