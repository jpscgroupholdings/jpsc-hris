import EvaluationForm from "../../_pages/_form";

interface EditEvaluationPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEvaluationPage({
  params,
}: EditEvaluationPageProps) {
  const { id } = await params;

  // Ensure this matches your actual server URL (especially for local dev)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Updated path to /production/evaluation/ based on your JSON
  const res = await fetch(`${baseUrl}/api/production/evaluation/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-black text-red-500">
          Evaluation not found.
        </h1>
        <p className="text-gray-500 mt-2">Could not retrieve record {id}.</p>
      </div>
    );
  }

  const json = await res.json();

  // Since your JSON shows "data" is an array, we take the first index [0]
  const evaluationData = Array.isArray(json.data) ? json.data[0] : json.data;

  if (!evaluationData) {
    return <div>No evaluation data found.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 px-4">
        <h1 className="text-3xl font-black text-gray-900">
          Edit Performance Evaluation
        </h1>
        <p className="text-gray-500">
          Updating record for {evaluationData.userId?.firstName}{" "}
          {evaluationData.userId?.lastName}
        </p>
      </div>

      <EvaluationForm initialData={evaluationData} />
    </div>
  );
}
