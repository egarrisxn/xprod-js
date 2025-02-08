import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateUserSession(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const user = await supabase.auth.getUser();

  // if (request.nextUrl.pathname.startsWith("/profile") && user.error) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  // if (request.nextUrl.pathname.startsWith("/profile/edit") && user.error) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  // if (request.nextUrl.pathname.startsWith("/dashboard") && user.error) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  // if (request.nextUrl.pathname === "/sign-in" && !user.error) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // if (request.nextUrl.pathname === "/sign-up" && !user.error) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  return response;
}
