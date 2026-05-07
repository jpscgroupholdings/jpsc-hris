import { Accomplishment } from "@/models/production/accomplishment";
import AccomplishmentForm from "../../_form";
import { notFound } from "next/navigation";

interface EditProps {
  params: Promise<{ id: string }>;
}

export default async function EditAccomplishmentPage({ params }: EditProps) {
  const { id } = await params;

  // 1. Fetch the data from MongoDB
  const data = await Accomplishment.findById(id).lean();

  // 2. If no data exists, show 404
  if (!data) {
    notFound();
  }

  return (
    <div className="p-6">
      {/* 3. Pass the data to the form. 
          JSON.parse(JSON.stringify()) fixes ObjectId/Date serialization issues */}
      <AccomplishmentForm initialData={JSON.parse(JSON.stringify(data))} />
    </div>
  );
}
