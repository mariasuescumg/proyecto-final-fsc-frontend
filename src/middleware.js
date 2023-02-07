import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  /* return NextResponse.redirect(new URL('/about-2', request.url)) */
  const jwt = req.cookies.get("token")?.value
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if(!jwt){
      return NextResponse.redirect(new URL('/', req.nextUrl.origin))
    }
    
    try {
      const verifyTk = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET))
      console.log(verifyTk)
      const reqHeaders = new Headers(req.headers)
      reqHeaders.set("x-data", JSON.stringify(verifyTk.payload))
      return NextResponse.next({
        request: {
          headers: reqHeaders
        }
      })
    } catch (error) {
      console.log(error)      
      return NextResponse.redirect(new URL('/', req.nextUrl.origin))
    }
  }
  /* if (req.nextUrl.pathname === "/") {
    console.log(req.nextUrl.origin)
    
    if(jwt){
      console.log("llll")
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin))
    }
    return NextResponse.next()
  } */
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}