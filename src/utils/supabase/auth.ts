import { createClient } from '@/utils/supabase/client';

export async function signInWithGithub() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      // 레포지토리 읽기 권한 Scope 요청 (public & private repo 접근)
      scopes: 'repo read:user',
      redirectTo: `${window.location.origin}/api/auth/github/callback?next=/admin`,
    },
  });

  if (error) {
    console.error('GitHub 연동 오류:', error.message);
    alert('GitHub 연동 요청에 실패했습니다.');
  }
}