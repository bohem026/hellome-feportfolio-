import { DetailPage } from "./DetailPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <DetailPage id={resolvedParams.id} />;
}
