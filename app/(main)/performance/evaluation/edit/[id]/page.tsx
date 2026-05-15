import EvaluationForm from "../../_pages/_form";
import dbConnect from "@/lib/database/dbConnect";
import { Evaluation } from "@/models/performance/evaluation";

interface EditEvaluationPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEvaluationPage({
  params,
}: EditEvaluationPageProps) {
  const { id } = await params;

  await dbConnect();

  const evaluation = await Evaluation.findById(id)
    .populate({
      path: "userId",
      select: "firstName lastName email departmentId designationId",
      populate: [
        { path: "departmentId", select: "name" },
        { path: "designationId", select: "name" },
      ],
    })
    .populate("evaluatedBy", "firstName lastName")
    .lean();

  if (!evaluation) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-black text-red-500">
          Evaluation not found.
        </h1>
        <p className="text-gray-500 mt-2">Could not retrieve record {id}.</p>
      </div>
    );
  }

  const evaluationData = JSON.parse(JSON.stringify(evaluation));

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
