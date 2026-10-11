import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // 인증 후 돌아갈 리다이렉트 위치 (기본값: /admin)
  const next = searchParams.get("next") ?? "/admin";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch {
              // Server Component / Route Handler 쿠키 설정 예외 처리
            }
          },
        },
      },
    );

    // GitHub 인증 코드를 세션 쿠키(provider_token 포함)로 교환
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else {
        const forwardedHost = request.headers.get("x-forwarded-host");
        const isCustomDomain =
          forwardedHost && !forwardedHost.includes("localhost");
        if (isCustomDomain) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      }
    }
  }

  // 에러 발생 시 관리자 페이지로 경고 파라미터와 함께 리다이렉트
  return NextResponse.redirect(`${origin}/admin?error=github_auth_failed`);
}
