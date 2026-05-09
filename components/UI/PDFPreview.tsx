"use client";

import { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";

interface UniversalPDFPreviewProps {
  id: string;
  apiPath: string; // The specific API route for the data
  DocumentTemplate: React.ComponentType<{ data: any }>; // The PDF Layout component
}
export function mapEvaluationData(raw: any) {
  const employeeName = raw?.userId
    ? `${raw.userId.firstName ?? ""} ${raw.userId.lastName ?? ""}`.trim()
    : "";

  const supervisorName = raw?.evaluatedBy
    ? `${raw.evaluatedBy.firstName ?? ""} ${raw.evaluatedBy.lastName ?? ""}`.trim()
    : "";

  const formatDate = (d: any) =>
    d
      ? new Date(d).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      : "";

  // Section I — each KJF row has a "function" field and a "description/remarks" field
  // Your schema stores pairs: jobFunction1+jobFunction2 = one row's two sub-fields
  // and jobFunctionScore1 = rating for that row
  const kjfMap = {
    kjf1Function: raw?.jobFunction1 ?? "",
    kjf1Comments: raw?.jobFunction2 ?? "", // second field is the description/remarks
    kjf1Score: raw?.jobFunctionScore1 ?? "",
    kjf2Function: raw?.jobFunction3 ?? "",
    kjf2Comments: raw?.jobFunction4 ?? "",
    kjf2Score: raw?.jobFunctionScore2 ?? "",
    kjf3Function: raw?.jobFunction5 ?? "",
    kjf3Comments: raw?.jobFunction6 ?? "",
    kjf3Score: raw?.jobFunctionScore3 ?? "",
    kjf4Function: raw?.jobFunction7 ?? "",
    kjf4Comments: raw?.jobFunction8 ?? "",
    kjf4Score: raw?.jobFunctionScore4 ?? "",
    kjf5Function: raw?.jobFunction9 ?? "",
    kjf5Comments: raw?.jobFunction10 ?? "",
    kjf5Score: raw?.jobFunctionScore5 ?? "",
    kjf6Function: raw?.jobFunction11 ?? "",
    kjf6Comments: raw?.jobFunction12 ?? "",
    kjf6Score: raw?.jobFunctionScore6 ?? "",
  };

  // Section II — competencies
  const compMap = {
    jobKnowledge: raw?.jobKnowledge ?? "",
    jobKnowledgeRemarks: raw?.jobKnowledgeRemarks ?? "",
    workQuality: raw?.workQuality ?? "",
    workQualityRemarks: raw?.workQualityRemarks ?? "",
    productivity: raw?.productivity ?? "",
    productivityRemarks: raw?.productivityRemarks ?? "",
    versatility: raw?.versatility ?? "",
    versatilityRemarks: raw?.versatilityRemarks ?? "",
    initiative: raw?.initiative ?? "",
    initiativeRemarks: raw?.initiativeRemarks ?? "",
    cooperation: raw?.cooperation ?? "",
    cooperationRemarks: raw?.cooperationRemarks ?? "",
    dependability: raw?.dependability ?? "",
    dependabilityRemarks: raw?.dependabilityRemarks ?? "",
    communication: raw?.communication ?? "",
    communicationRemarks: raw?.communicationRemarks ?? "",
    optionalCompetency: raw?.optionalCompetency ?? "",
    optionalCompetencyRemarks: raw?.optionalCompetencyRemarks ?? "",
    // Supervisory
    leadership: raw?.leadership ?? "",
    leadershipRemarks: raw?.leadershipRemarks ?? "",
    subordinatesDevelopment: raw?.subordinatesDevelopment ?? "",
    subordinatesDevelopmentRemarks: raw?.subordinatesDevelopmentRemarks ?? "",
  };

  // Section III — accomplishments (score + remarks per item, title comes from populated accomplishmentId)
  const accMap = {
    acc1Title:
      raw?.accomplishmentId?.accomplishment1 ??
      raw?.accomplishmentId?.title ??
      "Accomplishment 1",
    acc1Results: raw?.accomplishmentRemarks1 ?? "",
    acc1Score: raw?.accomplishmentScore1 ?? "",
    acc2Title: raw?.accomplishmentId?.accomplishment2 ?? "Accomplishment 2",
    acc2Results: raw?.accomplishmentRemarks2 ?? "",
    acc2Score: raw?.accomplishmentScore2 ?? "",
    acc3Title: raw?.accomplishmentId?.accomplishment3 ?? "Accomplishment 3",
    acc3Results: raw?.accomplishmentRemarks3 ?? "",
    acc3Score: raw?.accomplishmentScore3 ?? "",
    acc4Title: raw?.accomplishmentId?.accomplishment4 ?? "Accomplishment 4",
    acc4Results: raw?.accomplishmentRemarks4 ?? "",
    acc4Score: raw?.accomplishmentScore4 ?? "",
    acc5Title: raw?.accomplishmentId?.accomplishment5 ?? "Accomplishment 5",
    acc5Results: raw?.accomplishmentRemarks5 ?? "",
    acc5Score: raw?.accomplishmentScore5 ?? "",
  };

  // Section IV
  const scoreMap = {
    sectionIScore: raw?.sectionScore1 ?? "",
    sectionIPercent: raw?.sectionPercent1 ?? "",
    sectionIIScore: raw?.sectionScore2 ?? "",
    sectionIIPercent: raw?.sectionPercent2 ?? "",
    sectionIIIScore: raw?.sectionScore3 ?? "",
    sectionIIIPercent: raw?.sectionPercent3 ?? "",
    finalScore: raw?.finalScore ?? "",
    finalPercent: raw?.finalPercent ?? "",
    finalRating: getRatingLabel(raw?.finalPercent),
  };

  return {
    employeeName,
    position: raw?.userId?.designationId?.name ?? "",
    department: raw?.userId?.departmentId?.name ?? "",
    supervisorName,
    periodFrom: formatDate(raw?.evaluationDateStart),
    periodTo: formatDate(raw?.evaluationDateEnd),
    ...kjfMap,
    ...compMap,
    ...accMap,
    ...scoreMap,
  };
}

function getRatingLabel(percent: number): string {
  if (!percent) return "";
  if (percent >= 96) return "MASTERY AND EXCELLENCE (ME)";
  if (percent >= 88) return "HIGHLY COMMENDABLE (HC)";
  if (percent >= 81) return "PROFICIENT AND FULLY COMPETENT (PC)";
  if (percent >= 75) return "NEEDS DEVELOPMENT (ND)";
  return "UNSATISFACTORY (U)";
}

export default function UniversalPDFPreview({
  id,
  apiPath,
  DocumentTemplate,
}: UniversalPDFPreviewProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiPath}/${id}`);
        const json = await res.json();
        // Handle your standard API response structure
        const finalData = Array.isArray(json.data) ? json.data[0] : json.data;
        setData(finalData);
      } catch (err) {
        console.error("PDF Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, apiPath]);

  if (loading)
    return (
      <div className="p-10 text-center font-medium">Preparing document...</div>
    );
  if (!data)
    return <div className="p-10 text-center text-red-500">Data not found.</div>;

  return (
    /* 
       Subtracting 80px for your h-20 header. 
       Negative margins (-m-3 md:-m-6) cancel out the padding 
       from your NavBar's main content div.
    */
    <PDFViewer className="w-full h-full border-none rounded-lg">
      <DocumentTemplate data={data} />
    </PDFViewer>
  );
}
