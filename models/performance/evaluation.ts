import mongoose, { models, Schema } from "mongoose";
import { User } from "@/models/employee/user";
import "@/models/admin/department";
import "@/models/admin/designation";
import "@/models/employee/user";
import "@/models/admin/company";

export interface Evaluation {
  // basic info
  _id: string;
  userId: User; //employee evaluated
  evaluatedBy: User; // manager
  evaluationDate: Date;
  evaluationDateStart: Date;
  evaluationDateEnd: Date;

  //Section 1
  jobFunction1: string;
  jobFunction2: string;
  jobFunctionScore1: number;
  jobFunction3: string;
  jobFunction4: string;
  jobFunctionScore2: number;
  jobFunction5: string;
  jobFunction6: string;
  jobFunctionScore3: number;
  jobFunction7: string;
  jobFunction8: string;
  jobFunctionScore4: number;
  jobFunction9: string;
  jobFunction10: string;
  jobFunctionScore5: number;
  jobFunction11: string;
  jobFunction12: string;
  jobFunctionScore6: number;

  //Section 2
  jobKnowledge: number;
  jobKnowledgeRemarks: string;
  workQuality: number;
  workQualityRemarks: string;
  productivity: number;
  productivityRemarks: string;
  versatility: number;
  versatilityRemarks: string;
  initiative: number;
  initiativeRemarks: string;
  cooperation: number;
  cooperationRemarks: string;
  dependability: number;
  dependabilityRemarks: string;
  communication: number;
  communicationRemarks: string;
  optionalCompetencyDescription: string;
  optionalCompetency: number;
  optionalCompetencyRemarks: string;

  //Section 2.5??? (managerial only)
  leadership: number;
  leadershipRemarks: string;
  subordinatesDevelopment: number;
  subordinatesDevelopmentRemarks: string;

  //Section 3
  accomplishmentScore1: number;
  accomplishmentRemarks1: string;
  accomplishmentScore2: number;
  accomplishmentRemarks2: string;
  accomplishmentScore3: number;
  accomplishmentRemarks3: string;
  accomplishmentScore4: number;
  accomplishmentRemarks4: string;
  accomplishmentScore5: number;
  accomplishmentRemarks5: string;

  //section 4
  sectionScore1: number;
  sectionPercent1: number;

  sectionScore2: number;
  sectionPercent2: number;

  sectionScore3: number;
  sectionPercent3: number;

  finalScore: number;
  finalPercent: number;
}

const EvaluationSchema = new Schema<Evaluation>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  evaluatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  evaluationDate: { type: Date, required: true },
  evaluationDateStart: { type: Date, required: true },
  evaluationDateEnd: { type: Date, required: true },

  jobFunction1: { type: String, trim: true, required: true, maxLength: 255 },
  jobFunction2: { type: String, trim: true, required: true, maxLength: 255 },
  jobFunctionScore1: { type: Number, required: true },
  jobFunction3: { type: String, trim: true, required: true, maxLength: 255 },
  jobFunction4: { type: String, trim: true, required: true, maxLength: 255 },
  jobFunctionScore2: { type: Number, required: true },
  jobFunction5: { type: String, trim: true, required: true, maxLength: 255 },
  jobFunction6: { type: String, trim: true, required: true, maxLength: 255 },
  jobFunctionScore3: { type: Number, required: true },
  jobFunction7: { type: String, trim: true, required: true, maxLength: 255 },
  jobFunction8: { type: String, trim: true, required: true, maxLength: 255 },
  jobFunctionScore4: { type: Number, required: true },
  jobFunction9: { type: String, trim: true, required: true, maxLength: 255 },
  jobFunction10: { type: String, trim: true, required: true, maxLength: 255 },
  jobFunctionScore5: { type: Number, required: true },
  jobFunction11: { type: String, trim: true, required: true, maxLength: 255 },
  jobFunction12: { type: String, trim: true, required: true, maxLength: 255 },
  jobFunctionScore6: { type: Number, required: true },

  jobKnowledge: { type: Number, required: true },
  jobKnowledgeRemarks: { type: String, trim: true },
  workQuality: { type: Number, required: true },
  workQualityRemarks: { type: String, trim: true },
  productivity: { type: Number, required: true },
  productivityRemarks: { type: String, trim: true },
  versatility: { type: Number, required: true },
  versatilityRemarks: { type: String, trim: true },
  initiative: { type: Number, required: true },
  initiativeRemarks: { type: String, trim: true },
  cooperation: { type: Number, required: true },
  cooperationRemarks: { type: String, trim: true },
  dependability: { type: Number, required: true },
  dependabilityRemarks: { type: String, trim: true },
  communication: { type: Number, required: true },
  communicationRemarks: { type: String, trim: true },
  optionalCompetency: { type: Number, required: true },
  optionalCompetencyDescription: { type: String, trim: true },
  optionalCompetencyRemarks: { type: String, trim: true },

  leadership: { type: Number },
  leadershipRemarks: {
    type: String,
    trim: true,
    maxLength: 255,
  },
  subordinatesDevelopment: { type: Number },
  subordinatesDevelopmentRemarks: {
    type: String,
    trim: true,
    maxLength: 225,
  },

  accomplishmentScore1: { type: Number, required: true },
  accomplishmentRemarks1: { type: String, required: true, trim: true },
  accomplishmentScore2: { type: Number, required: true },
  accomplishmentRemarks2: { type: String, required: true, trim: true },
  accomplishmentScore3: { type: Number, required: true },
  accomplishmentRemarks3: { type: String, required: true, trim: true },
  accomplishmentScore4: { type: Number, required: true },
  accomplishmentRemarks4: { type: String, required: true, trim: true },
  accomplishmentScore5: { type: Number, required: true },
  accomplishmentRemarks5: { type: String, required: true, trim: true },

  sectionScore1: { type: Number, required: true },
  sectionPercent1: { type: Number, required: true },

  sectionScore2: { type: Number, required: true },
  sectionPercent2: { type: Number, required: true },
  sectionScore3: { type: Number, required: true },
  sectionPercent3: { type: Number, required: true },

  finalScore: { type: Number, required: true },
  finalPercent: { type: Number, required: true },
});

export const Evaluation =
  models.Evaluation || mongoose.model("Evaluation", EvaluationSchema);
