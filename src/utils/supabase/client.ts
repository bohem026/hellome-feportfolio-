/**
 * 만약 Supabase Database 타입을 생성해둔 파일이 있다면 가져와서 지정 가능합니다.
 * import { Database } from '@/types/supabase'; 
 */
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL 또는 Anon Key 환경 변수가 설정되지 않았습니다.');
}

/**
 * Database 제네릭을 넘기면 DB 테이블 필드명이 자동 완성됩니다.
 * @returns 
 */
export const createClient = () => createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
);