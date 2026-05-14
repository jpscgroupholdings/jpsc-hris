"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function getRatingLabel(percent: number): string {
  if (!percent && percent !== 0) return "";
  if (percent >= 96) return "MASTERY AND EXCELLENCE (ME)";
  if (percent >= 88) return "HIGHLY COMMENDABLE (HC)";
  if (percent >= 81) return "PROFICIENT AND FULLY COMPETENT (PC)";
  if (percent >= 75) return "NEEDS DEVELOPMENT (ND)";
  return "UNSATISFACTORY (U)";
}

function getRatingColor(percent: number): string {
  if (!percent && percent !== 0) return "#1a1a2e";
  if (percent >= 96) return "#57bb8a";
  if (percent >= 88) return "#a4c073";
  if (percent >= 81) return "#f5ce62";
  if (percent >= 75) return "#e6ad61";
  return "#dd776e";
}

function getRatingInfo(score: number): { label: string; color: string } {
  if (!score && score !== 0) return { label: "", color: "#1a1a2e" };
  if (score >= 5) return { label: "Mastery & Excellence", color: "#57bb8a" };
  if (score >= 4) return { label: "Highly Commendable", color: "#a4c073" };
  if (score >= 3) return { label: "Proficient & Competent", color: "#f5ce62" };
  if (score >= 2) return { label: "Needs Development", color: "#e6ad61" };
  return { label: "Unsatisfactory", color: "#dd776e" };
}

function formatDate(d: any): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─────────────────────────────────────────────
// DATA MAPPER
// ─────────────────────────────────────────────

export function mapEvaluationData(raw: any) {
  const firstName = raw?.userId?.firstName ?? "";
  const lastName = raw?.userId?.lastName ?? "";
  const employeeName =
    (`${firstName} ${lastName}`.trim() || raw?.userId?.name) ?? "";

  const supervisorName = raw?.evaluatedBy
    ? `${raw.evaluatedBy.firstName ?? ""} ${raw.evaluatedBy.lastName ?? ""}`.trim()
    : "";

  return {
    employeeName,
    position: raw?.userId?.designationId?.name ?? "",
    department: raw?.userId?.departmentId?.name ?? "",
    supervisorName,
    evaluationDate: format(new Date(raw?.evaluationDate), "MMM dd yyyy"),
    periodFrom: format(new Date(raw?.evaluationDateStart), "MMM dd yyyy"),
    periodTo: format(new Date(raw?.evaluationDateEnd), "MMM dd yyyy"),

    kjf1a: raw?.jobFunction1 ?? "",
    kjf1b: raw?.jobFunction2 ?? "",
    kjf1Score: raw?.jobFunctionScore1 ?? "",
    kjf2a: raw?.jobFunction3 ?? "",
    kjf2b: raw?.jobFunction4 ?? "",
    kjf2Score: raw?.jobFunctionScore2 ?? "",
    kjf3a: raw?.jobFunction5 ?? "",
    kjf3b: raw?.jobFunction6 ?? "",
    kjf3Score: raw?.jobFunctionScore3 ?? "",
    kjf4a: raw?.jobFunction7 ?? "",
    kjf4b: raw?.jobFunction8 ?? "",
    kjf4Score: raw?.jobFunctionScore4 ?? "",
    kjf5a: raw?.jobFunction9 ?? "",
    kjf5b: raw?.jobFunction10 ?? "",
    kjf5Score: raw?.jobFunctionScore5 ?? "",
    kjf6a: raw?.jobFunction11 ?? "",
    kjf6b: raw?.jobFunction12 ?? "",
    kjf6Score: raw?.jobFunctionScore6 ?? "",

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
    optionalCompetencyDescription: raw?.optionalCompetencyDescription ?? "",
    optionalCompetencyRemarks: raw?.optionalCompetencyRemarks ?? "",

    leadership: raw?.leadership ?? "",
    leadershipRemarks: raw?.leadershipRemarks ?? "",
    subordinatesDevelopment: raw?.subordinatesDevelopment ?? "",
    subordinatesDevelopmentRemarks: raw?.subordinatesDevelopmentRemarks ?? "",

    acc1Title: raw?.accomplishmentRemarks1 ?? "",
    acc1Score: raw?.accomplishmentScore1 ?? "",
    acc1Remarks: "Accomplishment 1",
    acc2Title: raw?.accomplishmentRemarks2 ?? "",
    acc2Score: raw?.accomplishmentScore2 ?? "",
    acc2Remarks: "Accomplishment 2",
    acc3Title: raw?.accomplishmentRemarks3 ?? "",
    acc3Score: raw?.accomplishmentScore3 ?? "",
    acc3Remarks: "Accomplishment 3",
    acc4Title: raw?.accomplishmentRemarks4 ?? "",
    acc4Score: raw?.accomplishmentScore4 ?? "",
    acc4Remarks: "Accomplishment 4",
    acc5Title: raw?.accomplishmentRemarks5 ?? "",
    acc5Score: raw?.accomplishmentScore5 ?? "",
    acc5Remarks: "Accomplishment 5",

    sectionScore1: raw?.sectionScore1 ?? "",
    sectionPercent1: raw?.sectionPercent1 ?? "",
    sectionScore2: raw?.sectionScore2 ?? "",
    sectionPercent2: raw?.sectionPercent2 ?? "",
    sectionScore3: raw?.sectionScore3 ?? "",
    sectionPercent3: raw?.sectionPercent3 ?? "",
    finalScore: raw?.finalScore ?? "",
    finalPercent: raw?.finalPercent ?? "",
    finalRating: getRatingLabel(raw?.finalPercent),
    fileName:
      "Evaluation_Form_" +
      employeeName.replaceAll(" ", "_") +
      "(" +
      format(new Date(raw?.evaluationDateStart), "MM/dd/yyyy") +
      "-" +
      format(new Date(raw?.evaluationDateEnd), "MM/dd/yyyy") +
      ")",
  };
}

// ─────────────────────────────────────────────
// STYLES  (base font 11, headers scale up)
// ─────────────────────────────────────────────

const S = StyleSheet.create({
  page: {
    fontSize: 11,
    fontFamily: "Helvetica",
    paddingHorizontal: 42,
    paddingVertical: 32,
    color: "#111",
  },

  // ── Repeating page header ──
  pageHeader: { alignItems: "center", marginBottom: 6 },
  pageHeaderCompany: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },
  pageHeaderSub: { fontSize: 9, textAlign: "center", color: "#555" },
  pageHeaderTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  pageHeaderDivider: {
    borderBottom: "1.5px solid #1a1a2e",
    marginBottom: 8,
    marginTop: 4,
  },

  // ── Employee info ──
  infoRow: { flexDirection: "row", gap: 12, marginBottom: 5 },
  infoField: {
    flex: 1,
    flexDirection: "row",
    borderBottom: "0.75px solid #555",
    paddingBottom: 3,
  },
  infoLabel: { fontFamily: "Helvetica-Bold", fontSize: 9.5, marginRight: 5 },
  infoValue: { flex: 1, fontSize: 9.5, color: "#222" },

  // ── Legend ──
  legendWrap: {
    border: "0.75px solid #bbb",
    padding: "6 10",
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    backgroundColor: "#f9f9f9",
  },
  legendTitle: {
    width: "100%",
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginBottom: 4,
  },
  legendItem: { width: "48%", fontSize: 8.5 },
  legendBold: { fontFamily: "Helvetica-Bold" },
  legendSub: { width: "100%", fontSize: 8.5, marginTop: 4 },

  // ── Section header bar ──
  sectionHeader: {
    backgroundColor: "#1a1a2e",
    color: "white",
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    padding: "5 8",
    marginTop: 10,
    marginBottom: 5,
  },
  instrText: { fontSize: 9, color: "#555", marginBottom: 6, lineHeight: 1.5 },

  // ── KJF rows ──
  kjfRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #ddd",
    paddingVertical: 6,
    gap: 6,
  },
  kjfNum: { width: 18, fontFamily: "Helvetica-Bold", fontSize: 11 },
  kjfBody: { flex: 1 },
  kjfFuncBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    marginBottom: 2,
  },
  kjfFuncText: { fontSize: 10, marginBottom: 2 },
  importanceRow: {
    flexDirection: "row",
    gap: 4,
    marginTop: 2,
    marginBottom: 4,
  },
  importanceLabel: { fontFamily: "Helvetica-Bold", fontSize: 9 },
  importanceValue: { fontSize: 9, color: "#333" },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 3 },
  chip: {
    border: "0.75px solid #999",
    borderRadius: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 8,
  },
  chipActive: {
    backgroundColor: "#1a1a2e",
    borderColor: "#1a1a2e",
    color: "white",
  },
  scoreBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },
  scoreLabel: { fontFamily: "Helvetica-Bold", fontSize: 9 },
  scoreValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a2e",
    border: "0.75px solid #1a1a2e",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
  },

  // ── Competency rows ──
  compRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #ddd",
    paddingVertical: 5,
    gap: 8,
  },
  compLeft: { flex: 2 },
  compRight: { flex: 1.2 },
  compTitle: { fontFamily: "Helvetica-Bold", fontSize: 10, marginBottom: 3 },
  bulletRow: { flexDirection: "row", marginBottom: 2 },
  bulletDot: { width: 10, fontSize: 9, color: "#555" },
  bulletText: { flex: 1, fontSize: 9, color: "#444", lineHeight: 1.4 },
  remarksBox: {
    border: "0.5px solid #ccc",
    minHeight: 48,
    padding: "6 7",
    marginTop: 5,
    fontSize: 10.5,
    color: "#222",
    lineHeight: 1.5,
  },

  // ── Computation box ──
  computeBox: {
    border: "0.75px solid #bbb",
    padding: "6 10",
    marginTop: 8,
    backgroundColor: "#f9f9f9",
  },
  computeTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    marginBottom: 4,
  },
  computeRow: { flexDirection: "row", gap: 16, fontSize: 9 },
  computeItem: { flex: 1 },
  computeBold: { fontFamily: "Helvetica-Bold" },

  // ── Accomplishment rows ──
  accRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #ddd",
    paddingVertical: 6,
    gap: 6,
  },
  accNum: { width: 18, fontFamily: "Helvetica-Bold", fontSize: 11 },
  accBody: { flex: 1 },
  accTitleText: { fontFamily: "Helvetica-Bold", fontSize: 10, marginBottom: 3 },
  accRemarks: {
    border: "0.5px solid #ccc",
    minHeight: 20,
    padding: "3 5",
    fontSize: 9.5,
    color: "#222",
    marginTop: 4,
  },

  // ── Score table ──
  scoreTable: { marginTop: 8, border: "0.75px solid #ccc" },
  scoreTableHeader: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    color: "white",
  },
  scoreTableRow: { flexDirection: "row", borderBottom: "0.5px solid #ddd" },
  stCol1: {
    flex: 3,
    fontSize: 9.5,
    padding: "4 7",
    borderRight: "0.5px solid #ddd",
  },
  stCol2: {
    flex: 1,
    fontSize: 9.5,
    padding: "4 7",
    textAlign: "center",
    borderRight: "0.5px solid #ddd",
  },
  stCol3: {
    flex: 1,
    fontSize: 9.5,
    padding: "4 7",
    textAlign: "center",
    borderRight: "0.5px solid #ddd",
  },
  stCol4: { flex: 1, fontSize: 9.5, padding: "4 7", textAlign: "center" },
  stBold: { fontFamily: "Helvetica-Bold" },
  finalRow: { flexDirection: "row" },
  finalLabel: {
    flex: 4,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "white",
    padding: "5 7",
    borderRight: "0.5px solid #444",
  },
  finalValue: {
    flex: 3,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "white",
    padding: "5 7",
  },

  // ── Comments / signatures ──
  commentsBox: {
    border: "0.5px solid #ccc",
    minHeight: 40,
    padding: "5 7",
    marginTop: 5,
    fontSize: 9.5,
    color: "#222",
  },
  sigSection: { marginTop: 12 },
  sigRow: { flexDirection: "row", gap: 24, marginBottom: 12 },
  sigField: { flex: 1 },
  sigLine: { borderBottom: "0.75px solid #333", marginBottom: 4 },
  sigLabel: { fontFamily: "Helvetica-Bold", fontSize: 9.5 },
  sigDate: { fontSize: 9, color: "#555", marginTop: 2 },

  confidential: {
    fontSize: 8,
    color: "#999",
    textAlign: "center",
    marginTop: 12,
    fontStyle: "italic",
  },
});

// ─────────────────────────────────────────────
// REUSABLE PAGE HEADER
// ─────────────────────────────────────────────

const PageHeader = ({
  data,
}: {
  data: ReturnType<typeof mapEvaluationData>;
}) => (
  <View>
    <View style={S.pageHeader}>
      <Text style={S.pageHeaderCompany}>JPSC GROUP HOLDINGS INC.</Text>
      <Text style={S.pageHeaderSub}>
        9G Century Spire Tower, General Luna Street, Barangay Poblacion, Makati
        City
      </Text>
      <Text style={S.pageHeaderSub}>
        Office No.: (02) 5310-5608 | Email: hr.jpsgroup2022@gmail.com
      </Text>
      <Text style={S.pageHeaderTitle}>
        Monthly Employee Performance Evaluation
      </Text>
    </View>
    <View style={S.pageHeaderDivider} />
    {/* Employee info strip — repeated on every page */}
  </View>
);

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

const RATING_OPTIONS = [
  { label: "Mastery & Excellence", value: 5 },
  { label: "Highly Commendable", value: 4 },
  { label: "Proficient & Competent", value: 3 },
  { label: "Needs Development", value: 2 },
  { label: "Unsatisfactory", value: 1 },
];

const RatingChips = ({ selected }: { selected?: number | string }) => (
  <View style={S.chipRow}>
    {RATING_OPTIONS.map((r) => {
      const isActive = Number(selected) === r.value;
      const info = getRatingInfo(r.value);
      return (
        <Text
          key={r.value}
          style={[
            S.chip,
            isActive
              ? {
                  backgroundColor: info.color,
                  borderColor: info.color,
                  color: "white",
                }
              : {},
          ]}
        >
          {r.label}
        </Text>
      );
    })}
  </View>
);

const Bullets = ({ items }: { items: string[] }) => (
  <>
    {items.map((item, i) => (
      <View key={i} style={S.bulletRow}>
        <Text style={S.bulletDot}>•</Text>
        <Text style={S.bulletText}>{item}</Text>
      </View>
    ))}
  </>
);

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────

const KJF_IMPORTANCE = [
  "Critical",
  "Critical",
  "Very Important",
  "Very Important",
  "Important",
  "Important",
];

const COMPETENCIES = [
  {
    title: "JOB KNOWLEDGE",
    scoreKey: "jobKnowledge",
    remarksKey: "jobKnowledgeRemarks",
    bullets: [
      "Understands the duties and responsibilities of the job.",
      "Has knowledge of subject area and related policies, procedures, and technical expertise.",
      "Uses information, materials, equipment, and techniques accurately and appropriately.",
      "Keeps up-to-date with new policies, procedures, techniques.",
    ],
  },
  {
    title: "QUALITY OF WORK",
    scoreKey: "workQuality",
    remarksKey: "workQualityRemarks",
    bullets: [
      "Shows attention to detail, accuracy, follow-through and thoroughness.",
      "Complies with work and health and safety rules and procedures.",
      "Exercises good judgment and discretion in sensitive or confidential matters.",
    ],
  },
  {
    title: "PRODUCTIVITY",
    scoreKey: "productivity",
    remarksKey: "productivityRemarks",
    bullets: [
      "Consistently manages assigned workload.",
      "Establishes and manages priorities effectively.",
      "Uses time efficiently.",
      "Maintains an organized, functional workspace.",
    ],
  },
  {
    title: "ADAPTABILITY AND FLEXIBILITY",
    scoreKey: "versatility",
    remarksKey: "versatilityRemarks",
    bullets: [
      "Adapts to changes in the work environment.",
      "Performs well under pressure.",
      "Learns and retains new information, policies, procedures.",
    ],
  },
  {
    title: "INITIATIVE AND PROBLEM-SOLVING",
    scoreKey: "initiative",
    remarksKey: "initiativeRemarks",
    bullets: [
      "Is a self-starter.",
      "Generates innovative ideas, approaches, and solutions.",
      "Seeks new challenges, self-development, and learning opportunities.",
      "Anticipates and recognizes potential problems.",
      "Generates alternative solutions when solving problems.",
    ],
  },
  {
    title: "COOPERATION AND TEAMWORK",
    scoreKey: "cooperation",
    remarksKey: "cooperationRemarks",
    bullets: [
      "Maintains effective working relationships.",
      "Works cooperatively in team situations.",
      "Offers assistance and support to others.",
      "Admits to and learns from own mistakes.",
      "Participates constructively in team efforts.",
    ],
  },
  {
    title: "DEPENDABILITY",
    scoreKey: "dependability",
    remarksKey: "dependabilityRemarks",
    bullets: [
      "Is punctual and regularly in attendance.",
      "Follows instructions.",
      "Works independently.",
      "Completes assignments and meets commitments and deadlines.",
    ],
  },
  {
    title: "COMMUNICATION AND INTERPERSONAL SKILLS",
    scoreKey: "communication",
    remarksKey: "communicationRemarks",
    bullets: [
      "Communicates clearly and accurately both verbally and in writing.",
      "Keeps others informed.",
      "Interacts effectively with a wide diversity of individuals and work styles.",
      "Maintains a pleasant and professional demeanor in all interpersonal relationships.",
      "Capable of resolving conflicts.",
      "Receptive to feedback.",
    ],
  },
];

const SUPERVISORY_COMPETENCIES = [
  {
    title: "MANAGEMENT / LEADERSHIP",
    scoreKey: "leadership",
    remarksKey: "leadershipRemarks",
    bullets: [
      "Sets realistic expectations/standards.",
      "Encourages and acknowledges productive performance.",
      "Ensures assignments are completed in a timely and accurate manner.",
      "Is accessible/responsive to staff; communicates clearly and in a timely manner.",
      "Maintains a positive work environment.",
      "Resolves disputes. Facilitates change.",
      "Encourages teamwork/shared visions and goals.",
      "Applies policies/procedures equitably to all staff.",
    ],
  },
  {
    title: "DEVELOPMENT OF SUBORDINATES",
    scoreKey: "subordinatesDevelopment",
    remarksKey: "subordinatesDevelopmentRemarks",
    bullets: [
      "Encourages professional development of staff.",
      "Provides timely, ongoing feedback and coaching to staff.",
      "Provides feedback in a constructive/helpful manner.",
      "Completes annual written evaluations of career staff.",
      "Utilizes capabilities of people and resources.",
      "Distributes work appropriately/fairly considering abilities and time constraints of staff.",
    ],
  },
];

const SECTION_III_IMPORTANCE = [
  "Critical",
  "Critical",
  "Very Important",
  "Very Important",
  "Important",
];

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export const EvaluationPDF = ({ data: raw }: { data: any }) => {
  const data = mapEvaluationData(raw);
  const isSupervisory = !!raw?.leadership;
  const hasOptional = !!data.optionalCompetencyDescription?.trim();

  return (
    <Document title={data.fileName}>
      {/* ═══════════════ PAGE 1 — Header + Legend + Section I ═══════════════ */}
      <Page size="A4" style={S.page}>
        <PageHeader data={data} />

        {/* LEGEND */}
        <View style={S.infoRow}>
          <View style={S.infoField}>
            <Text style={S.infoLabel}>Employee:</Text>
            <Text style={S.infoValue}>{data.employeeName}</Text>
          </View>
          <View style={S.infoField}>
            <Text style={S.infoLabel}>Position:</Text>
            <Text style={S.infoValue}>{data.position}</Text>
          </View>
          <View style={S.infoField}>
            <Text style={S.infoLabel}>Supervisor:</Text>
            <Text style={S.infoValue}>{data.supervisorName}</Text>
          </View>
        </View>
        <View style={[S.infoRow, { marginBottom: 8 }]}>
          <View style={S.infoField}>
            <Text style={S.infoLabel}>Department:</Text>
            <Text style={S.infoValue}>{data.department}</Text>
          </View>
          <View style={S.infoField}>
            <Text style={S.infoLabel}>Period From:</Text>
            <Text style={S.infoValue}>{data.periodFrom}</Text>
          </View>
          <View style={S.infoField}>
            <Text style={S.infoLabel}>Period To:</Text>
            <Text style={S.infoValue}>{data.periodTo}</Text>
          </View>
        </View>
        <View style={S.legendWrap}>
          <Text style={S.legendTitle}>
            Use the following codes to complete Sections I–III:
          </Text>
          {[
            ["MASTERY AND EXCELLENCE (ME)", "96% – 100%"],
            ["HIGHLY COMMENDABLE (HC)", "88% – 95%"],
            ["PROFICIENT AND FULLY COMPETENT (PC)", "81% – 87%"],
            ["NEEDS DEVELOPMENT (ND)", "75% – 80%"],
            ["UNSATISFACTORY (U)", "74% and below"],
          ].map(([label, range]) => (
            <Text key={label} style={S.legendItem}>
              <Text style={S.legendBold}>{label}</Text>
              {"  :  "}
              {range}
            </Text>
          ))}

          <Text style={S.legendSub}>
            <Text style={S.legendBold}>IMPORTANCE: </Text>3 – Critical | 2 –
            Very Important | 1 – Important
            {"     "}
            <Text style={S.legendBold}>RATINGS: </Text>ME=5 HC=4 PC=3 ND=2 U=1
          </Text>
        </View>

        {/* SECTION I */}
        <Text style={S.sectionHeader}>I. KEY JOB FUNCTION EVALUATION</Text>

        <Text style={S.instrText}>
          Evaluate key job functions based on the employee's actual performance.
          Each row contains two related job functions sharing one score. Assign
          an importance ranking and rating using the codes above.
        </Text>

        {[1, 2, 3, 4, 5, 6].map((n) => {
          const fa = data[`kjf${n}a` as keyof typeof data] as string;
          const fb = data[`kjf${n}b` as keyof typeof data] as string;
          const score = data[`kjf${n}Score` as keyof typeof data];
          return (
            <View key={n} style={S.kjfRow}>
              <Text style={S.kjfNum}>{n}.</Text>
              <View style={S.kjfBody}>
                <Text style={S.kjfFuncBold}>{fa}</Text>
                {fb ? <Text style={S.kjfFuncText}>{fb}</Text> : null}
                <View style={S.importanceRow}>
                  <Text style={S.importanceLabel}>Importance: </Text>
                  <Text style={S.importanceValue}>{KJF_IMPORTANCE[n - 1]}</Text>
                </View>
                {(() => {
                  const info = getRatingInfo(Number(score));
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 4,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: info.color,
                          borderRadius: 3,
                          paddingHorizontal: 10,
                          paddingVertical: 3,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontFamily: "Helvetica-Bold",
                            color: "white",
                          }}
                        >
                          {String(score)}
                        </Text>
                      </View>
                      {info.label ? (
                        <Text
                          style={{
                            fontSize: 9.5,
                            fontFamily: "Helvetica-Bold",
                            color: info.color,
                          }}
                        >
                          {info.label}
                        </Text>
                      ) : null}
                    </View>
                  );
                })()}
              </View>
            </View>
          );
        })}
      </Page>

      {/* ═══════════════ PAGE 2a — Section II Competencies 1–4 ═══════════════ */}
      <Page size="A4" style={S.page}>
        <PageHeader data={data} />
        <Text style={S.sectionHeader}>
          II. PERFORMANCE COMPETENCY EVALUATION (1 of 2)
        </Text>
        <Text style={S.instrText}>
          Evaluate performance competencies based on actual performance. Select
          the appropriate rating and provide comments with specific examples.
          Write "N/A" if not applicable.
        </Text>

        {COMPETENCIES.slice(0, 4).map((comp) => (
          <View key={comp.title} style={S.compRow}>
            <View style={S.compLeft}>
              <Text style={S.compTitle}>{comp.title}</Text>
              <Bullets items={comp.bullets} />
            </View>
            <View style={S.compRight}>
              <RatingChips
                selected={data[comp.scoreKey as keyof typeof data] as number}
              />
              <View style={S.remarksBox}>
                <Text>
                  {(data[comp.remarksKey as keyof typeof data] as string) ?? ""}
                </Text>
              </View>
              <View style={S.scoreBox}>
                <Text style={S.scoreLabel}>Score:</Text>
                <Text style={S.scoreValue}>
                  {String(data[comp.scoreKey as keyof typeof data] ?? "")}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Page>

      {/* ═══════════════ PAGE 2b — Section II Competencies 5–8 + Optional ═══════════════ */}
      <Page size="A4" style={S.page}>
        <PageHeader data={data} />
        <Text style={S.sectionHeader}>
          II. PERFORMANCE COMPETENCY EVALUATION (2 of 2)
        </Text>
        <Text style={S.instrText}>
          Continued — competency evaluation for the remaining performance
          factors.
        </Text>

        {COMPETENCIES.slice(4).map((comp) => (
          <View key={comp.title} style={S.compRow}>
            <View style={S.compLeft}>
              <Text style={S.compTitle}>{comp.title}</Text>
              <Bullets items={comp.bullets} />
            </View>
            <View style={S.compRight}>
              <RatingChips
                selected={data[comp.scoreKey as keyof typeof data] as number}
              />
              <View style={S.remarksBox}>
                <Text>
                  {(data[comp.remarksKey as keyof typeof data] as string) ?? ""}
                </Text>
              </View>
              <View style={S.scoreBox}>
                <Text style={S.scoreLabel}>Score:</Text>
                <Text style={S.scoreValue}>
                  {String(data[comp.scoreKey as keyof typeof data] ?? "")}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* Optional Competency — only render description if filled */}
        <View
          style={[
            S.compRow,
            {
              borderColor: hasOptional ? "#a3e4c1" : "#ddd",
              borderWidth: hasOptional ? 0.75 : 0.5,
              borderRadius: 2,
              marginTop: 4,
            },
          ]}
        >
          <View style={S.compLeft}>
            <Text style={S.compTitle}>OPTIONAL COMPETENCY</Text>
            {hasOptional ? (
              <Text
                style={{
                  fontSize: 10,
                  color: "#333",
                  marginTop: 3,
                  lineHeight: 1.4,
                }}
              >
                {data.optionalCompetencyDescription}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 9,
                  color: "#aaa",
                  fontStyle: "italic",
                  marginTop: 3,
                }}
              >
                Not used for this evaluation.
              </Text>
            )}
          </View>
          <View style={S.compRight}>
            {hasOptional ? (
              <>
                <RatingChips selected={data.optionalCompetency as number} />
                <View style={S.remarksBox}>
                  <Text>{data.optionalCompetencyRemarks ?? ""}</Text>
                </View>
                <View style={S.scoreBox}>
                  <Text style={S.scoreLabel}>Score:</Text>
                  <Text style={S.scoreValue}>
                    {String(data.optionalCompetency ?? "")}
                  </Text>
                </View>
              </>
            ) : (
              <Text
                style={{
                  fontSize: 9,
                  color: "#aaa",
                  fontStyle: "italic",
                  marginTop: 3,
                }}
              >
                N/A
              </Text>
            )}
          </View>
        </View>
      </Page>

      {/* ═══════════════ PAGE 3 — Supervisory + Section III ═══════════════ */}
      <Page size="A4" style={S.page}>
        <PageHeader data={data} />

        <Text style={S.sectionHeader}>SUPERVISORY PERFORMANCE REVIEW</Text>
        <Text style={S.instrText}>
          Complete this section only for employees who supervise other staff. If
          not supervisory, this section may be left blank.
        </Text>

        {SUPERVISORY_COMPETENCIES.map((comp) => (
          <View key={comp.title} style={S.compRow}>
            <View style={S.compLeft}>
              <Text style={S.compTitle}>{comp.title}</Text>
              <Bullets items={comp.bullets} />
            </View>
            <View style={S.compRight}>
              <RatingChips
                selected={data[comp.scoreKey as keyof typeof data] as number}
              />
              <View style={S.remarksBox}>
                <Text>
                  {(data[comp.remarksKey as keyof typeof data] as string) ?? ""}
                </Text>
              </View>
              <View style={S.scoreBox}>
                <Text style={S.scoreLabel}>Score:</Text>
                <Text style={S.scoreValue}>
                  {String(data[comp.scoreKey as keyof typeof data] ?? "")}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* <View style={S.computeBox}>
          <Text style={S.computeTitle}>
            SUPERVISORY PERFORMANCE COMPUTATION
          </Text>
          <View style={S.computeRow}>
            <Text style={S.computeItem}>
              <Text style={S.computeBold}>Total Score: </Text>
              {isSupervisory
                ? String(
                    (Number(data.leadership) || 0) +
                      (Number(data.subordinatesDevelopment) || 0),
                  )
                : "N/A"}
            </Text>
            <Text style={S.computeItem}>
              <Text style={S.computeBold}>Competencies Rated: </Text>2
            </Text>
            <Text style={S.computeItem}>
              <Text style={S.computeBold}>Supervisory Score (÷2): </Text>
              {isSupervisory
                ? (
                    ((Number(data.leadership) || 0) +
                      (Number(data.subordinatesDevelopment) || 0)) /
                    2
                  ).toFixed(2)
                : "N/A"}
            </Text>
            <Text style={S.computeItem}>
              <Text style={S.computeBold}>Supervisory %: </Text>
              {isSupervisory
                ? (
                    (((Number(data.leadership) || 0) +
                      (Number(data.subordinatesDevelopment) || 0)) /
                      2 /
                      5) *
                    100
                  ).toFixed(1) + "%"
                : "N/A"}
            </Text>
          </View>
        </View> */}
      </Page>
      <Page size="A4" style={S.page}>
        <PageHeader data={data} />
        <Text style={[S.sectionHeader, { marginTop: 12 }]}>
          III. EVALUATION OF PERFORMANCE AND ACCOMPLISHMENTS
        </Text>
        <Text style={S.instrText}>
          List key accomplishments achieved during the evaluation period. Assign
          an importance ranking and evaluate the level of achievement.
        </Text>

        {[1, 2, 3, 4, 5].map((n) => {
          const title = data[`acc${n}Title` as keyof typeof data] as string;
          const score = data[`acc${n}Score` as keyof typeof data];
          const remarks = data[`acc${n}Remarks` as keyof typeof data] as string;
          return (
            <View key={n} style={S.accRow}>
              <Text style={S.accNum}>{n}.</Text>
              <View style={S.accBody}>
                <Text style={S.accTitleText}>{title}</Text>
                <View style={S.importanceRow}>
                  <Text style={S.importanceLabel}>Importance: </Text>
                  <Text style={S.importanceValue}>
                    {SECTION_III_IMPORTANCE[n - 1]}
                  </Text>
                </View>
                <RatingChips selected={score} />
                <View style={S.accRemarks}>
                  <Text>{remarks ?? ""}</Text>
                </View>
                <View style={S.scoreBox}>
                  <Text style={S.scoreLabel}>Score:</Text>
                  <Text style={S.scoreValue}>{String(score ?? "")}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </Page>

      {/* ═══════════════ PAGE 4 — Section IV + V + VI ═══════════════ */}
      <Page size="A4" style={S.page}>
        <PageHeader data={data} />

        <Text style={S.sectionHeader}>IV. OVERALL RATING</Text>
        <Text style={S.instrText}>
          Overall rating is based on Section I (30%), Section II (35%), and
          Section III (35%) using prescribed weights.
        </Text>

        <View style={S.scoreTable}>
          <View style={S.scoreTableHeader}>
            {["Section", "Weight", "Score", "Percentage"].map((h) => (
              <Text
                key={h}
                style={[
                  h === "Section"
                    ? S.stCol1
                    : h === "Weight"
                      ? S.stCol2
                      : h === "Score"
                        ? S.stCol3
                        : S.stCol4,
                  { color: "white", fontFamily: "Helvetica-Bold" },
                ]}
              >
                {h}
              </Text>
            ))}
          </View>
          {[
            {
              label: "I – Key Job Functions",
              weight: "30%",
              score: data.sectionScore1,
              pct: data.sectionPercent1,
            },
            {
              label: "II – Performance Competencies",
              weight: "35%",
              score: data.sectionScore2,
              pct: data.sectionPercent2,
            },
            {
              label: "III – Performance Objectives",
              weight: "35%",
              score: data.sectionScore3,
              pct: data.sectionPercent3,
            },
          ].map((row) => (
            <View key={row.label} style={S.scoreTableRow}>
              <Text style={[S.stCol1, S.stBold]}>{row.label}</Text>
              <Text style={S.stCol2}>{row.weight}</Text>
              <Text style={S.stCol3}>{String(row.score ?? "")}</Text>
              <Text style={S.stCol4}>
                {row.pct != null && row.pct !== "" ? `${row.pct}%` : ""}
              </Text>
            </View>
          ))}
          <View style={[S.scoreTableRow, { backgroundColor: "#e8e8e8" }]}>
            <Text style={[S.stCol1, S.stBold]}>Overall Score</Text>
            <Text style={S.stCol2} />
            <Text style={[S.stCol3, S.stBold]}>
              {String(data.finalScore ?? "")}
            </Text>
            <Text style={[S.stCol4, S.stBold]}>
              {data.finalPercent != null && data.finalPercent !== ""
                ? `${data.finalPercent}%`
                : ""}
            </Text>
          </View>
          <View
            style={[
              S.finalRow,
              { backgroundColor: getRatingColor(Number(data.finalPercent)) },
            ]}
          >
            <Text style={S.finalLabel}>Final Performance Rating</Text>
            <Text style={[S.finalValue, { fontSize: 11 }]}>
              {data.finalRating}
            </Text>
          </View>
        </View>

        <View style={S.commentsBox}>
          <Text style={{ fontSize: 8, color: "#aaa" }}>
            Additional comments supporting the overall rating (optional):
          </Text>
        </View>

        {/* SECTION V */}
        <Text style={[S.sectionHeader, { marginTop: 12 }]}>
          V. REQUIRED SIGNATURES
        </Text>
        <View style={S.sigSection}>
          <View style={S.sigRow}>
            <View style={S.sigField}>
              <Text>{data.supervisorName}</Text>
              <Text style={S.sigLabel}>NAME OF IMMEDIATE SUPERVISOR</Text>
              <Text style={S.sigDate}>Date: {data.evaluationDate}</Text>
            </View>
            <View style={S.sigField}>
              <Text>Jonillo Enero</Text>
              <Text style={S.sigLabel}>NAME OF HR DIRECTOR</Text>
              <Text style={S.sigDate}>Date: {data.evaluationDate}</Text>
            </View>
          </View>
          <View style={{ width: "48%" }}>
            <Text>{data.employeeName}</Text>
            <Text style={S.sigLabel}>NAME OF EMPLOYEE</Text>
            <Text style={S.sigDate}>Date: {data.evaluationDate}</Text>
          </View>
          <Text style={[S.instrText, { marginTop: 6 }]}>
            *This document is computer-generated and does not require the
            Company’s stamp or an authorized signatory's signature in order to
            be considered valid and binding. It has been produced by the system
            in the ordinary course of business.*
          </Text>
        </View>

        {/* SECTION VI */}
        <Text style={[S.sectionHeader, { marginTop: 12 }]}>
          VI. ACCOMPLISHMENT SCORES & REMARKS
        </Text>
        <Text style={S.instrText}>
          Summary of accomplishment scores and evaluation remarks for the
          current review period.
        </Text>

        <View style={{ flexDirection: "row", backgroundColor: "#1a1a2e" }}>
          {[
            ["#", 0.4],
            ["Accomplishments", 3],
            ["Score", 1],
          ].map(([label, flex]) => (
            <Text
              key={label as string}
              style={{
                flex: flex as number,
                fontSize: 9,
                fontFamily: "Helvetica-Bold",
                color: "white",
                padding: "4 6",
                borderRight: "0.5px solid #444",
              }}
            >
              {label as string}
            </Text>
          ))}
        </View>
        {[1, 2, 3, 4, 5].map((n) => {
          const title = data[`acc${n}Title` as keyof typeof data] as string;
          const score = data[`acc${n}Score` as keyof typeof data];
          return (
            <View
              key={n}
              style={{
                flexDirection: "row",
                borderBottom: "0.5px solid #ddd",
                borderLeft: "0.75px solid #ccc",
                borderRight: "0.75px solid #ccc",
                backgroundColor: n % 2 === 0 ? "#f9f9f9" : "white",
                minHeight: 30,
              }}
            >
              <Text
                style={{
                  flex: 0.4,
                  fontSize: 10,
                  fontFamily: "Helvetica-Bold",
                  padding: "5 6",
                  borderRight: "0.5px solid #ddd",
                  color: "#1a1a2e",
                }}
              >
                {n}.
              </Text>
              <Text
                style={{
                  flex: 3,
                  fontSize: 10,
                  padding: "5 6",
                  borderRight: "0.5px solid #ddd",
                }}
              >
                {title || `Accomplishment ${n}`}
              </Text>
              <View
                style={{
                  flex: 1,
                  padding: "5 6",
                  borderRight: "0.5px solid #ddd",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Helvetica-Bold",
                    color: "white",
                    backgroundColor: "#1a1a2e",
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 3,
                    textAlign: "center",
                  }}
                >
                  {String(score ?? "")}
                </Text>
              </View>
            </View>
          );
        })}
        <View
          style={{
            borderBottom: "0.75px solid #ccc",
            borderLeft: "0.75px solid #ccc",
            borderRight: "0.75px solid #ccc",
            height: 0,
          }}
        />

        <View style={[S.sigRow, { marginTop: 12 }]}>
          <View style={S.sigField}>
            <View style={S.sigLine} />
            <Text style={S.sigLabel}>EMPLOYEE'S NAME & SIGNATURE</Text>
          </View>
          <View style={S.sigField}>
            <View style={S.sigLine} />
            <Text style={S.sigLabel}>SUPERVISOR'S NAME & SIGNATURE</Text>
          </View>
        </View>

        <Text style={S.confidential}>
          This performance evaluation is a confidential document intended for
          internal use only. Unauthorized disclosure is strictly prohibited.
        </Text>
      </Page>
    </Document>
  );
};
