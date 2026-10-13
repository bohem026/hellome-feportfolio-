// 빌드 시점에 이 페이지를 동적으로 렌더링하도록 설정
// 정적 프리렌더링 방지
export const dynamic = 'force-dynamic';

import { AdminPage } from "./AdminPage";

export default function Page() {
  return <AdminPage />;
}
