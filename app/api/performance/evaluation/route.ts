import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/database/dbConnect";
import { Evaluation } from "@/models/performance/evaluation";
import "@/models/employee/user";
import "@/models/performance/accomplishment";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const required = [
      "userId",
      "evaluatedBy",
      "evaluationDateStart",
      "evaluationDateEnd",
      "jobFunction1",
      "jobFunctionScore1",
      "jobFunction2",
      "jobFunctionScore2",
      "jobFunction3",
      "jobFunctionScore3",
      "jobFunction4",
      "jobFunctionScore4",
      "jobFunction5",
      "jobFunctionScore5",
      "jobFunction6",
      "jobFunctionScore6",
      "jobKnowledge",
      "worKQuality",
      "productivity",
      "versatility",
      "initiative",
      "cooperation",
      "dependatbility",
      "communication",
      "optionalCompetency",
      "accomplishmentId",
      "accomplishmentScore1",
      "accomplishmentRemarks1",
      "accomplishmentScore2",
      "accomplishmentRemarks2",
      "accomplishmentScore3",
      "accomplishmentRemarks3",
      "accomplishmentScore4",
      "accomplishmentRemarks4",
      "accomplishmentScore5",
      "accomplishmentRemarks5",
      "sectionScore1",
      "sectionPercent1",
      "sectionScore2",
      "sectionPercent2",
      "sectionScore3",
      "sectionPercent3",
      "finalScore",
      "finalPercent",
    ];

    for (const field of required) {
      if (
        body[field] === undefined ||
        body[field] === null ||
        body[field] === ""
      ) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Validate scores are 1-5
    const scoreFields = [
      "jobFunctionScore1",
      "jobFunctionScore2",
      "jobFunctionScore3",
      "jobFunctionScore4",
      "jobFunctionScore5",
      "jobFunctionScore6",
      "jobKnowledge",
      "worKQuality",
      "productivity",
      "versatility",
      "initiative",
      "cooperation",
      "dependatbility",
      "communication",
      "optionalCompetency",
      "accomplishmentScore1",
      "accomplishmentScore2",
      "accomplishmentScore3",
      "accomplishmentScore4",
      "accomplishmentScore5",
    ];

    for (const field of scoreFields) {
      const val = Number(body[field]);
      if (isNaN(val) || val < 1 || val > 5) {
        return NextResponse.json(
          { error: `Score field "${field}" must be between 1 and 5.` },
          { status: 400 },
        );
      }
    }

    const evaluation = await Evaluation.create({
      ...body,
      evaluationDateStart: new Date(body.evaluationDateStart),
      evaluationDateEnd: new Date(body.evaluationDateEnd),
    });

    return NextResponse.json({ data: evaluation }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const evaluatedBy = searchParams.get("evaluatedBy");

    const query: Record<string, string> = {};
    if (userId) query.userId = userId;
    if (evaluatedBy) query.evaluatedBy = evaluatedBy;

    const evaluations = await Evaluation.find(query)
      .populate("userId", "firstName lastName email department designation")
      .populate("evaluatedBy", "firstName lastName email")
      .populate("accomplishmentId")
      .sort({ evaluationDateStart: -1 });

    return NextResponse.json({ data: evaluations });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
