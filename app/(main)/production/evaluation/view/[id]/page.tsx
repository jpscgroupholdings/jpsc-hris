// app/(main)/production/evaluation/view/[id]/page.tsx

import PDFPreview from "@/components/UI/PDFPreview";
import { EvaluationPDF } from "@/docs/EvaulationPDF";
interface PageProps {
  params: Promise<{ id: string }>;
}

// This is a SERVER COMPONENT
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 h-full overflow-hidden">
      <PDFPreview
        id={id}
        apiPath="/api/production/evaluation"
        DocumentTemplate={EvaluationPDF}
      />
    </div>
  );
}
