import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

console.log("MIDDLEWARE RUNNING");

export async function middleware(request: NextRequest) {
  console.log('middleware invoked');
  const sessionCookie =await getSessionCookie(request);
   console.log(sessionCookie)
  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth/sign-up", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog/:path*', '/Create', '/Create/:path*'],
};
