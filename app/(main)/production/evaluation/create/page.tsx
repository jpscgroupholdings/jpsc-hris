import EvaluationForm from "../_pages/_form";

export default function CreateEvaluationPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 px-4">
        <h1 className="text-3xl font-black text-gray-900">
          New Performance Evaluation
        </h1>
        <p className="text-gray-500">
          Fill out the sections below to conduct a new employee review.
        </p>
      </div>

      {/* Rendering without initialData triggers "Create Mode" */}
      <EvaluationForm />
    </div>
  );
}
