"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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
  if (percent >= 96) return "#15803d"; // ME  — deep green
  if (percent >= 88) return "#22c55e"; // HC  — lighter green
  if (percent >= 81) return "#84cc16"; // PC  — yellow-green
  if (percent >= 75) return "#f97316"; // ND  — orange
  return "#dc2626"; // U   — red
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
// DATA MAPPER  (raw API response → flat PDF data)
// ─────────────────────────────────────────────

export function mapEvaluationData(raw: any) {
  const employeeName = raw?.userId
    ? `${raw.userId.firstName ?? ""} ${raw.userId.lastName ?? ""}`.trim()
    : "";

  const supervisorName = raw?.evaluatedBy
    ? `${raw.evaluatedBy.firstName ?? ""} ${raw.evaluatedBy.lastName ?? ""}`.trim()
    : "";

  return {
    // Header
    employeeName,
    position: raw?.userId?.designationId?.name ?? "",
    department: raw?.userId?.departmentId?.name ?? "",
    supervisorName,
    periodFrom: formatDate(raw?.evaluationDateStart),
    periodTo: formatDate(raw?.evaluationDateEnd),

    // Section I — 6 KJF rows, each row has 2 job functions + 1 score
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

    // Section II — Performance Competencies
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

    // Supervisory (optional)
    leadership: raw?.leadership ?? "",
    leadershipRemarks: raw?.leadershipRemarks ?? "",
    subordinatesDevelopment: raw?.subordinatesDevelopment ?? "",
    subordinatesDevelopmentRemarks: raw?.subordinatesDevelopmentRemarks ?? "",

    // Section III — Accomplishments
    // acc titles come from populated accomplishmentId; falls back gracefully if not populated
    acc1Title: raw?.accomplishmentId?.accomplishment1 ?? "Accomplishment 1",
    acc1Score: raw?.accomplishmentScore1 ?? "",
    acc1Remarks: raw?.accomplishmentRemarks1 ?? "",

    acc2Title: raw?.accomplishmentId?.accomplishment2 ?? "Accomplishment 2",
    acc2Score: raw?.accomplishmentScore2 ?? "",
    acc2Remarks: raw?.accomplishmentRemarks2 ?? "",

    acc3Title: raw?.accomplishmentId?.accomplishment3 ?? "Accomplishment 3",
    acc3Score: raw?.accomplishmentScore3 ?? "",
    acc3Remarks: raw?.accomplishmentRemarks3 ?? "",

    acc4Title: raw?.accomplishmentId?.accomplishment4 ?? "Accomplishment 4",
    acc4Score: raw?.accomplishmentScore4 ?? "",
    acc4Remarks: raw?.accomplishmentRemarks4 ?? "",

    acc5Title: raw?.accomplishmentId?.accomplishment5 ?? "Accomplishment 5",
    acc5Score: raw?.accomplishmentScore5 ?? "",
    acc5Remarks: raw?.accomplishmentRemarks5 ?? "",

    // Section IV — Scores & Overall
    sectionScore1: raw?.sectionScore1 ?? "",
    sectionPercent1: raw?.sectionPercent1 ?? "",
    sectionScore2: raw?.sectionScore2 ?? "",
    sectionPercent2: raw?.sectionPercent2 ?? "",
    sectionScore3: raw?.sectionScore3 ?? "",
    sectionPercent3: raw?.sectionPercent3 ?? "",
    finalScore: raw?.finalScore ?? "",
    finalPercent: raw?.finalPercent ?? "",
    finalRating: getRatingLabel(raw?.finalPercent),
  };
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const S = StyleSheet.create({
  page: {
    fontSize: 8.5,
    fontFamily: "Helvetica",
    paddingHorizontal: 36,
    paddingVertical: 30,
    color: "#111",
  },

  // Header
  headerWrap: { alignItems: "center", marginBottom: 6 },
  companyName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },
  subText: { fontSize: 7.5, textAlign: "center", color: "#555" },
  formTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  divider: { borderBottom: "1.5px solid #1a1a2e", marginBottom: 8 },

  // Info fields
  infoRow: { flexDirection: "row", gap: 10, marginBottom: 4 },
  infoField: {
    flex: 1,
    flexDirection: "row",
    borderBottom: "0.75px solid #555",
    paddingBottom: 2,
  },
  infoLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    marginRight: 4,
  },
  infoValue: { flex: 1, fontSize: 8, color: "#222" },

  // Legend
  legendWrap: {
    border: "0.75px solid #bbb",
    padding: "5 8",
    marginBottom: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    backgroundColor: "#f9f9f9",
  },
  legendTitle: {
    width: "100%",
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    marginBottom: 3,
  },
  legendItem: { width: "48%", fontSize: 7 },
  legendBold: { fontFamily: "Helvetica-Bold" },
  legendSub: { width: "100%", fontSize: 7, marginTop: 3 },

  // Section header
  sectionHeader: {
    backgroundColor: "#1a1a2e",
    color: "white",
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    padding: "4 7",
    marginTop: 10,
    marginBottom: 4,
  },
  instrText: {
    fontSize: 7,
    color: "#555",
    marginBottom: 5,
    lineHeight: 1.45,
  },

  // KJF rows
  kjfRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #ddd",
    paddingVertical: 5,
    gap: 6,
  },
  kjfNum: { width: 14, fontFamily: "Helvetica-Bold", fontSize: 9 },
  kjfBody: { flex: 1 },
  kjfFuncText: { fontSize: 8, marginBottom: 1 },
  kjfFuncBold: { fontFamily: "Helvetica-Bold", fontSize: 8 },
  importanceRow: {
    flexDirection: "row",
    gap: 4,
    marginTop: 2,
    marginBottom: 3,
  },
  importanceLabel: { fontFamily: "Helvetica-Bold", fontSize: 7 },
  importanceValue: { fontSize: 7, color: "#333" },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 3 },
  chip: {
    border: "0.75px solid #999",
    borderRadius: 2,
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    fontSize: 6.5,
  },
  chipActive: {
    backgroundColor: "#1a1a2e",
    borderColor: "#1a1a2e",
    color: "white",
  },
  scoreBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 3,
  },
  scoreLabel: { fontFamily: "Helvetica-Bold", fontSize: 7 },
  scoreValue: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a2e",
    border: "0.75px solid #1a1a2e",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 2,
  },

  // Competency rows
  compRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #ddd",
    paddingVertical: 4,
    gap: 8,
  },
  compLeft: { flex: 2 },
  compRight: { flex: 1.2 },
  compTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    marginBottom: 2,
  },
  bulletRow: { flexDirection: "row", marginBottom: 1 },
  bulletDot: { width: 9, fontSize: 7, color: "#555" },
  bulletText: { flex: 1, fontSize: 7, color: "#444", lineHeight: 1.3 },
  remarksBox: {
    border: "0.5px solid #ccc",
    minHeight: 40,
    padding: "5 6",
    marginTop: 4,
    fontSize: 9,
    color: "#222",
    lineHeight: 1.5,
  },

  // Computation box
  computeBox: {
    border: "0.75px solid #bbb",
    padding: "5 8",
    marginTop: 6,
    backgroundColor: "#f9f9f9",
  },
  computeTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    marginBottom: 3,
  },
  computeRow: { flexDirection: "row", gap: 20, fontSize: 7.5 },
  computeItem: { flex: 1 },
  computeBold: { fontFamily: "Helvetica-Bold" },

  // Section III accomplishment rows
  accRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #ddd",
    paddingVertical: 5,
    gap: 6,
  },
  accNum: { width: 14, fontFamily: "Helvetica-Bold", fontSize: 9 },
  accBody: { flex: 1 },
  accTitleText: { fontFamily: "Helvetica-Bold", fontSize: 8, marginBottom: 2 },
  accRemarks: {
    border: "0.5px solid #ccc",
    minHeight: 18,
    padding: "2 4",
    fontSize: 7.5,
    color: "#222",
    marginTop: 3,
  },

  // Section IV score table
  scoreTable: { marginTop: 6, border: "0.75px solid #ccc" },
  scoreTableHeader: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    color: "white",
  },
  scoreTableRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #ddd",
  },
  stCol1: {
    flex: 3,
    fontSize: 7.5,
    padding: "3 6",
    borderRight: "0.5px solid #ddd",
  },
  stCol2: {
    flex: 1,
    fontSize: 7.5,
    padding: "3 6",
    textAlign: "center",
    borderRight: "0.5px solid #ddd",
  },
  stCol3: {
    flex: 1,
    fontSize: 7.5,
    padding: "3 6",
    textAlign: "center",
    borderRight: "0.5px solid #ddd",
  },
  stCol4: {
    flex: 1,
    fontSize: 7.5,
    padding: "3 6",
    textAlign: "center",
  },
  stBold: { fontFamily: "Helvetica-Bold" },
  finalRow: { flexDirection: "row", backgroundColor: "#1a1a2e" },
  finalLabel: {
    flex: 4,
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "white",
    padding: "4 6",
    borderRight: "0.5px solid #444",
  },
  finalValue: {
    flex: 3,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "white",
    padding: "4 6",
  },

  // Comments box
  commentsBox: {
    border: "0.5px solid #ccc",
    minHeight: 36,
    padding: "4 6",
    marginTop: 4,
    fontSize: 7.5,
    color: "#222",
  },

  // Signatures
  sigSection: { marginTop: 10 },
  sigRow: { flexDirection: "row", gap: 20, marginBottom: 10 },
  sigField: { flex: 1 },
  sigLine: { borderBottom: "0.75px solid #333", marginBottom: 3 },
  sigLabel: { fontFamily: "Helvetica-Bold", fontSize: 7.5 },
  sigDate: { fontSize: 7, color: "#555", marginTop: 1 },

  // Section VI objectives
  objRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #eee",
    paddingVertical: 3,
    gap: 6,
  },
  objNum: { width: 14, fontFamily: "Helvetica-Bold", fontSize: 9 },
  objBox: {
    flex: 1,
    minHeight: 24,
    border: "0.5px solid #ccc",
    padding: "2 4",
    fontSize: 7.5,
  },

  confidential: {
    fontSize: 6.5,
    color: "#999",
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
  },
});

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
    {RATING_OPTIONS.map((r) => (
      <Text
        key={r.value}
        style={[S.chip, Number(selected) === r.value ? S.chipActive : {}]}
      >
        {r.label}
      </Text>
    ))}
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
  {
    title: "OPTIONAL COMPETENCY",
    scoreKey: "optionalCompetency",
    remarksKey: "optionalCompetencyRemarks",
    bullets: [],
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
      "Insures that assignments are completed in a timely and accurate manner.",
      "Is accessible/responsive to staff; communicates clearly and in a timely manner.",
      "Maintains a positive work environment.",
      "Resolves disputes. Facilitates change.",
      "Encourages teamwork/shared visions and goals.",
      "Applies policies/procedures equitably to all staff.",
      "Makes efforts toward achieving a diverse workforce.",
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

  return (
    <Document>
      {/* ═══════════════════════════════════════
          PAGE 1 — Header + Legend + Section I
      ═══════════════════════════════════════ */}
      <Page size="A4" style={S.page}>
        {/* HEADER */}
        <View style={S.headerWrap}>
          <Text style={S.companyName}>JPSC GROUP HOLDINGS INC.</Text>
          <Text style={S.subText}>
            9G Century Spire Tower, General Luna Street, Barangay Poblacion,
            Makati City
          </Text>
          <Text style={S.subText}>
            Office No.: (02) 5310-5608 | Email: hr.jpsgroup2022@gmail.com
          </Text>
          <Text style={S.formTitle}>
            Monthly Employee Performance Evaluation
          </Text>
        </View>
        <View style={S.divider} />

        {/* EMPLOYEE INFO */}
        <View style={S.infoRow}>
          <View style={S.infoField}>
            <Text style={S.infoLabel}>Employee's Name:</Text>
            <Text style={S.infoValue}>{data.employeeName}</Text>
          </View>
          <View style={S.infoField}>
            <Text style={S.infoLabel}>Position:</Text>
            <Text style={S.infoValue}>{data.position}</Text>
          </View>
        </View>
        <View style={S.infoRow}>
          <View style={S.infoField}>
            <Text style={S.infoLabel}>Supervisor's Name:</Text>
            <Text style={S.infoValue}>{data.supervisorName}</Text>
          </View>
          <View style={S.infoField}>
            <Text style={S.infoLabel}>Department:</Text>
            <Text style={S.infoValue}>{data.department}</Text>
          </View>
        </View>
        <View style={[S.infoRow, { marginBottom: 8 }]}>
          <View style={S.infoField}>
            <Text style={S.infoLabel}>Period From:</Text>
            <Text style={S.infoValue}>{data.periodFrom}</Text>
          </View>
          <View style={S.infoField}>
            <Text style={S.infoLabel}>Period To:</Text>
            <Text style={S.infoValue}>{data.periodTo}</Text>
          </View>
        </View>

        {/* LEGEND */}
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
            <Text style={S.legendBold}>IMPORTANCE RANKINGS: </Text>3 – Critical
            | 2 – Very Important | 1 – Important
            {"     "}
            <Text style={S.legendBold}>RATINGS: </Text>
            ME=5 HC=4 PC=3 ND=2 U=1
          </Text>
        </View>

        {/* SECTION I */}
        <Text style={S.sectionHeader}>I. KEY JOB FUNCTION EVALUATION</Text>
        <Text style={S.instrText}>
          Evaluate key job functions based on the employee's actual performance.
          Assign an importance ranking (Critical=3, Very Important=2,
          Important=1) and a rating (ME=5, HC=4, PC=3, ND=2, U=1). Each row
          contains two related job functions sharing one score.
        </Text>

        {[1, 2, 3, 4, 5, 6].map((n) => {
          const fa = data[`kjf${n}a` as keyof typeof data] as string;
          const fb = data[`kjf${n}b` as keyof typeof data] as string;
          const score = data[`kjf${n}Score` as keyof typeof data];
          const importance = KJF_IMPORTANCE[n - 1];
          return (
            <View key={n} style={S.kjfRow}>
              <Text style={S.kjfNum}>{n}.</Text>
              <View style={S.kjfBody}>
                <Text style={S.kjfFuncBold}>{fa}</Text>
                {fb ? <Text style={S.kjfFuncText}>{fb}</Text> : null}
                <View style={S.importanceRow}>
                  <Text style={S.importanceLabel}>Importance: </Text>
                  <Text style={S.importanceValue}>{importance}</Text>
                </View>
                <RatingChips selected={score} />
                <View style={S.scoreBox}>
                  <Text style={S.scoreLabel}>Score:</Text>
                  <Text style={S.scoreValue}>{String(score)}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </Page>

      {/* ═══════════════════════════════════════
          PAGE 2a — Section II: Competencies 1–4
      ═══════════════════════════════════════ */}
      <Page size="A4" style={S.page}>
        <Text style={S.sectionHeader}>
          II. PERFORMANCE COMPETENCY EVALUATION (1 of 2)
        </Text>
        <Text style={S.instrText}>
          Evaluate performance competencies based on actual performance. Select
          the appropriate rating (ME=5, HC=4, PC=3, ND=2, U=1). Provide comments
          with specific examples. Write "N/A" if not applicable.
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

      {/* ═══════════════════════════════════════
          PAGE 2b — Section II: Competencies 5–9
      ═══════════════════════════════════════ */}
      <Page size="A4" style={S.page}>
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
      </Page>

      {/* ═══════════════════════════════════════
          PAGE 3 — Supervisory + Section III
      ═══════════════════════════════════════ */}
      <Page size="A4" style={S.page}>
        {/* SUPERVISORY — rendered regardless; scores show if filled */}
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

        {/* Supervisory computation */}
        <View style={S.computeBox}>
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
                ? String(
                    (
                      ((Number(data.leadership) || 0) +
                        (Number(data.subordinatesDevelopment) || 0)) /
                      2
                    ).toFixed(2),
                  )
                : "N/A"}
            </Text>
            <Text style={S.computeItem}>
              <Text style={S.computeBold}>Supervisory %: </Text>
              {isSupervisory
                ? String(
                    (
                      (((Number(data.leadership) || 0) +
                        (Number(data.subordinatesDevelopment) || 0)) /
                        2 /
                        5) *
                      100
                    ).toFixed(1),
                  ) + "%"
                : "N/A"}
            </Text>
          </View>
        </View>

        {/* SECTION III */}
        <Text style={[S.sectionHeader, { marginTop: 10 }]}>
          III. EVALUATION OF PERFORMANCE AND ACCOMPLISHMENTS
        </Text>
        <Text style={S.instrText}>
          List key accomplishments achieved during the evaluation period. Assign
          an importance ranking (Critical=3, Very Important=2, Important=1) and
          evaluate the level of achievement (ME=5, HC=4, PC=3, ND=2, U=1).
        </Text>

        {[1, 2, 3, 4, 5].map((n) => {
          const title = data[`acc${n}Title` as keyof typeof data] as string;
          const score = data[`acc${n}Score` as keyof typeof data];
          const remarks = data[`acc${n}Remarks` as keyof typeof data] as string;
          const importance = SECTION_III_IMPORTANCE[n - 1];
          return (
            <View key={n} style={S.accRow}>
              <Text style={S.accNum}>{n}.</Text>
              <View style={S.accBody}>
                <Text style={S.accTitleText}>{title}</Text>
                <View style={S.importanceRow}>
                  <Text style={S.importanceLabel}>Importance: </Text>
                  <Text style={S.importanceValue}>{importance}</Text>
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

      {/* ═══════════════════════════════════════
          PAGE 4 — Section IV + V + VI
      ═══════════════════════════════════════ */}
      <Page size="A4" style={S.page}>
        {/* SECTION IV */}
        <Text style={S.sectionHeader}>IV. OVERALL RATING</Text>
        <Text style={S.instrText}>
          Overall rating is based on Section I (30%), Section II (35%), and
          Section III (35%) using prescribed weights per JPSC Group Holdings
          Inc. evaluation procedures.
        </Text>

        <View style={S.scoreTable}>
          {/* Table header */}
          <View style={S.scoreTableHeader}>
            <Text
              style={[
                S.stCol1,
                { color: "white", fontFamily: "Helvetica-Bold" },
              ]}
            >
              Section
            </Text>
            <Text
              style={[
                S.stCol2,
                { color: "white", fontFamily: "Helvetica-Bold" },
              ]}
            >
              Weight
            </Text>
            <Text
              style={[
                S.stCol3,
                { color: "white", fontFamily: "Helvetica-Bold" },
              ]}
            >
              Score
            </Text>
            <Text
              style={[
                S.stCol4,
                { color: "white", fontFamily: "Helvetica-Bold" },
              ]}
            >
              Percentage
            </Text>
          </View>
          {/* Rows */}
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
                {row.pct !== "" && row.pct !== undefined && row.pct !== null
                  ? `${row.pct}%`
                  : ""}
              </Text>
            </View>
          ))}
          {/* Overall */}
          <View style={[S.scoreTableRow, { backgroundColor: "#e8e8e8" }]}>
            <Text style={[S.stCol1, S.stBold]}>Overall Score</Text>
            <Text style={S.stCol2}></Text>
            <Text style={[S.stCol3, S.stBold]}>
              {String(data.finalScore ?? "")}
            </Text>
            <Text style={[S.stCol4, S.stBold]}>
              {data.finalPercent !== "" &&
              data.finalPercent !== undefined &&
              data.finalPercent !== null
                ? `${data.finalPercent}%`
                : ""}
            </Text>
          </View>
          {/* Final Rating */}
          <View
            style={[
              S.finalRow,
              { backgroundColor: getRatingColor(Number(data.finalPercent)) },
            ]}
          >
            <Text style={S.finalLabel}>Final Performance Rating</Text>
            <Text style={[S.finalValue, { fontSize: 10 }]}>
              {data.finalRating}
            </Text>
          </View>
        </View>

        <Text style={[S.instrText, { marginTop: 6 }]}>
          Performance problems or concerns should be discussed with your Staff
          Human Resources Partner PRIOR to meeting with the employee.
        </Text>
        <View style={S.commentsBox}>
          <Text style={{ fontSize: 6.5, color: "#aaa" }}>
            Additional comments supporting the overall rating (optional):
          </Text>
        </View>

        {/* SECTION V — SIGNATURES */}
        <Text style={[S.sectionHeader, { marginTop: 10 }]}>
          V. REQUIRED SIGNATURES
        </Text>
        <Text style={S.instrText}>
          Print this form and submit with original signatures to Staff Human
          Resources.
        </Text>
        <View style={S.sigSection}>
          <View style={S.sigRow}>
            <View style={S.sigField}>
              <View style={S.sigLine} />
              <Text style={S.sigLabel}>SIGNATURE OF IMMEDIATE SUPERVISOR</Text>
              <Text style={S.sigDate}>Date: _______________</Text>
            </View>
            <View style={S.sigField}>
              <View style={S.sigLine} />
              <Text style={S.sigLabel}>SIGNATURE OF HR DIRECTOR</Text>
              <Text style={S.sigDate}>Date: _______________</Text>
            </View>
          </View>
          <View style={{ width: "48%" }}>
            <View style={S.sigLine} />
            <Text style={S.sigLabel}>EMPLOYEE SIGNATURE</Text>
            <Text style={S.sigDate}>Date: _______________</Text>
          </View>
          <Text style={[S.instrText, { marginTop: 5 }]}>
            Your signature indicates neither agreement nor disagreement with
            this evaluation, but confirms that you have read it and it has been
            discussed with you. You may attach comments if you wish.
          </Text>
        </View>

        {/* SECTION VI — ACCOMPLISHMENT SCORES & REMARKS */}
        <Text style={[S.sectionHeader, { marginTop: 10 }]}>
          VI. PERFORMANCE GOALS AND OBJECTIVES FOR NEXT MONTH
        </Text>
        <Text style={S.instrText}>
          Summary of accomplishment scores and evaluation remarks for the
          current review period.
        </Text>

        {/* Table header */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#1a1a2e",
            marginBottom: 0,
          }}
        >
          <Text
            style={{
              flex: 0.4,
              fontSize: 7.5,
              fontFamily: "Helvetica-Bold",
              color: "white",
              padding: "3 6",
              borderRight: "0.5px solid #444",
            }}
          >
            #
          </Text>
          <Text
            style={{
              flex: 3,
              fontSize: 7.5,
              fontFamily: "Helvetica-Bold",
              color: "white",
              padding: "3 6",
              borderRight: "0.5px solid #444",
            }}
          >
            Accomplishment Title
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 7.5,
              fontFamily: "Helvetica-Bold",
              color: "white",
              padding: "3 6",
              borderRight: "0.5px solid #444",
              textAlign: "center",
            }}
          >
            Score
          </Text>
          <Text
            style={{
              flex: 2.5,
              fontSize: 7.5,
              fontFamily: "Helvetica-Bold",
              color: "white",
              padding: "3 6",
            }}
          >
            Remarks
          </Text>
        </View>

        {[1, 2, 3, 4, 5].map((n) => {
          const title = data[`acc${n}Title` as keyof typeof data] as string;
          const score = data[`acc${n}Score` as keyof typeof data];
          const remarks = data[`acc${n}Remarks` as keyof typeof data] as string;
          const isEven = n % 2 === 0;
          return (
            <View
              key={n}
              style={{
                flexDirection: "row",
                borderBottom: "0.5px solid #ddd",
                borderLeft: "0.75px solid #ccc",
                borderRight: "0.75px solid #ccc",
                backgroundColor: isEven ? "#f9f9f9" : "white",
                minHeight: 28,
              }}
            >
              <Text
                style={{
                  flex: 0.4,
                  fontSize: 8,
                  fontFamily: "Helvetica-Bold",
                  padding: "4 6",
                  borderRight: "0.5px solid #ddd",
                  color: "#1a1a2e",
                }}
              >
                {n}.
              </Text>
              <Text
                style={{
                  flex: 3,
                  fontSize: 8,
                  padding: "4 6",
                  borderRight: "0.5px solid #ddd",
                }}
              >
                {title || `Accomplishment ${n}`}
              </Text>
              <View
                style={{
                  flex: 1,
                  padding: "4 6",
                  borderRight: "0.5px solid #ddd",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    fontFamily: "Helvetica-Bold",
                    color: "white",
                    backgroundColor: "#1a1a2e",
                    paddingHorizontal: 7,
                    paddingVertical: 2,
                    borderRadius: 3,
                    textAlign: "center",
                  }}
                >
                  {String(score ?? "")}
                </Text>
              </View>
              <Text
                style={{
                  flex: 2.5,
                  fontSize: 8,
                  padding: "4 6",
                  color: "#333",
                }}
              >
                {remarks || ""}
              </Text>
            </View>
          );
        })}

        {/* Bottom border */}
        <View
          style={{
            borderBottom: "0.75px solid #ccc",
            borderLeft: "0.75px solid #ccc",
            borderRight: "0.75px solid #ccc",
            height: 0,
          }}
        />

        {/* CONCURRENCE */}
        <View style={[S.sigRow, { marginTop: 10 }]}>
          <View style={S.sigField}>
            <View style={S.sigLine} />
            <Text style={S.sigLabel}>EMPLOYEE'S NAME</Text>
          </View>
          <View style={S.sigField}>
            <View style={S.sigLine} />
            <Text style={S.sigLabel}>SUPERVISOR NAME</Text>
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
