export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  status: "in" | "out" | "break";
  balance: number;
  checkIn: string;
  checkOut: string;
  location: string;
  accessLevel: "Full" | "Standard" | "Limited";
};

export type Transaction = {
  id: string;
  employeeId: string;
  type: "topup" | "purchase" | "refund";
  amount: number;
  description: string;
  time: string;
};

export type AccessPoint = {
  id: string;
  name: string;
  zone: string;
  status: "locked" | "unlocked";
  lastActivity: string;
  accessCount: number;
};

export type ActivityLog = {
  id: string;
  employee: string;
  avatar: string;
  action: string;
  location: string;
  time: string;
  status: "granted" | "denied";
};

const firstNames = [
  "Aarav",
  "Maya",
  "Liam",
  "Sofia",
  "Noah",
  "Emma",
  "Ethan",
  "Olivia",
  "Lucas",
  "Ava",
  "Mason",
  "Isabella",
  "Logan",
  "Mia",
  "Jackson",
  "Charlotte",
  "Aiden",
  "Amelia",
  "Elijah",
  "Harper",
  "James",
  "Evelyn",
  "Benjamin",
  "Abigail",
  "Sebastian",
  "Emily",
  "Henry",
  "Elizabeth",
  "Alexander",
  "Sofia",
  "Daniel",
  "Avery",
  "Matthew",
  "Ella",
  "David",
  "Scarlett",
  "Joseph",
  "Grace",
  "Samuel",
  "Chloe",
  "Owen",
  "Victoria",
  "Wyatt",
  "Riley",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
];
const departments = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
];
const roles = [
  "Senior Engineer",
  "Product Manager",
  "UX Designer",
  "Marketing Lead",
  "Sales Executive",
  "Operations Manager",
  "Financial Analyst",
  "Software Architect",
  "Data Scientist",
  "HR Specialist",
];
const locations = [
  "Main Entrance",
  "East Wing",
  "Server Room",
  "Cafeteria",
  "Parking Gate",
  "Executive Floor",
  "R&D Lab",
  "Meeting Room A",
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function randTime(baseHour: number, spread: number) {
  const h = baseHour + Math.floor(12 * spread);
  const m = Math.floor(12 * 60);
  return `${pad(h)}:${pad(m)}`;
}

export const employees: Employee[] = Array.from({ length: 20 }, (_, i) => {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[(i * 3) % lastNames.length];
  const statusRand = 12;
  const status: Employee["status"] =
    statusRand > 0.7 ? "out" : statusRand > 0.6 ? "break" : "in";
  return {
    id: `EMP-${1000 + i}`,
    name: `${fn} ${ln}`,
    role: roles[i % roles.length],
    department: departments[i % departments.length],
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    status,
    balance: Math.round((12 * 500 + 20) * 100) / 100,
    checkIn: randTime(7, 3),
    checkOut: status === "out" ? randTime(16, 3) : "—",
    location: locations[i % locations.length],
    accessLevel: i % 7 === 0 ? "Full" : i % 3 === 0 ? "Limited" : "Standard",
  };
});

export const transactions: Transaction[] = Array.from(
  { length: 28 },
  (_, i) => {
    const emp = employees[i % employees.length];
    const types: Transaction["type"][] = [
      "topup",
      "purchase",
      "purchase",
      "purchase",
      "refund",
    ];
    const type = types[i % types.length];
    const descriptions = {
      topup: ["Wallet Top-up", "Payroll Credit", "Admin Credit"],
      purchase: [
        "Cafeteria Lunch",
        "Coffee Bar",
        "Vending Machine",
        "Parking Fee",
        "Gym Access",
        "Printing Service",
      ],
      refund: ["Cancelled Order", "Overcharge Refund"],
    };
    return {
      id: `TXN-${20000 + i}`,
      employeeId: emp.id,
      type,
      amount: Math.round((12 * 80 + 5) * 100) / 100,
      description: descriptions[type][i % descriptions[type].length],
      time: `${pad(Math.floor(12 * 12) + 7)}:${pad(Math.floor(12 * 60))}`,
    };
  },
);

export const accessPoints: AccessPoint[] = [
  {
    id: "AP-01",
    name: "Main Entrance",
    zone: "Lobby",
    status: "unlocked",
    lastActivity: "2 min ago",
    accessCount: 247,
  },
  {
    id: "AP-02",
    name: "Parking Gate A",
    zone: "Exterior",
    status: "locked",
    lastActivity: "5 min ago",
    accessCount: 189,
  },
  {
    id: "AP-03",
    name: "Server Room",
    zone: "Restricted",
    status: "locked",
    lastActivity: "1 hr ago",
    accessCount: 12,
  },
  {
    id: "AP-04",
    name: "Executive Floor",
    zone: "Floor 10",
    status: "locked",
    lastActivity: "12 min ago",
    accessCount: 34,
  },
  {
    id: "AP-05",
    name: "R&D Lab",
    zone: "Floor 3",
    status: "locked",
    lastActivity: "8 min ago",
    accessCount: 67,
  },
  {
    id: "AP-06",
    name: "Cafeteria",
    zone: "Floor 1",
    status: "unlocked",
    lastActivity: "Just now",
    accessCount: 312,
  },
  {
    id: "AP-07",
    name: "East Wing",
    zone: "Floor 2",
    status: "unlocked",
    lastActivity: "4 min ago",
    accessCount: 156,
  },
  {
    id: "AP-08",
    name: "Rooftop Access",
    zone: "Exterior",
    status: "locked",
    lastActivity: "2 hr ago",
    accessCount: 8,
  },
  {
    id: "AP-09",
    name: "Loading Dock",
    zone: "Exterior",
    status: "locked",
    lastActivity: "25 min ago",
    accessCount: 43,
  },
  {
    id: "AP-10",
    name: "Gym & Wellness",
    zone: "Floor 1",
    status: "unlocked",
    lastActivity: "1 min ago",
    accessCount: 89,
  },
];

export const activityLogs: ActivityLog[] = Array.from(
  { length: 18 },
  (_, i) => {
    const emp = employees[i % employees.length];
    const denied = i % 11 === 0;
    return {
      id: `LOG-${30000 + i}`,
      employee: emp.name,
      avatar: emp.avatar,
      action: denied
        ? "Access Denied"
        : i % 2 === 0
          ? "Check-in"
          : "Access Granted",
      location: locations[i % locations.length],
      time: `${pad(Math.floor(12 * 3) + 8)}:${pad(Math.floor(12 * 60))} AM`,
      status: denied ? "denied" : "granted",
    };
  },
);

export const attendanceTrend = [
  { day: "Mar 19", present: 38, absent: 4 },
  { day: "Mar 20", present: 40, absent: 2 },
  { day: "Mar 21", present: 37, absent: 5 },
  { day: "Mar 22", present: 41, absent: 1 },
  { day: "Mar 23", present: 39, absent: 3 },
  { day: "Mar 24", present: 42, absent: 0 },
  { day: "Mar 25", present: 40, absent: 2 },
  { day: "Mar 26", present: 38, absent: 4 },
  { day: "Mar 27", present: 41, absent: 1 },
  { day: "Mar 28", present: 39, absent: 3 },
  { day: "Mar 29", present: 40, absent: 2 },
  { day: "Mar 30", present: 42, absent: 0 },
  { day: "Mar 31", present: 41, absent: 1 },
  { day: "Apr 01", present: 38, absent: 4 },
];

export const peakHours = [
  { hour: "6am", accesses: 8 },
  { hour: "7am", accesses: 24 },
  { hour: "8am", accesses: 78 },
  { hour: "9am", accesses: 112 },
  { hour: "10am", accesses: 65 },
  { hour: "11am", accesses: 42 },
  { hour: "12pm", accesses: 88 },
  { hour: "1pm", accesses: 94 },
  { hour: "2pm", accesses: 51 },
  { hour: "3pm", accesses: 38 },
  { hour: "4pm", accesses: 46 },
  { hour: "5pm", accesses: 82 },
  { hour: "6pm", accesses: 54 },
  { hour: "7pm", accesses: 18 },
];

export const departmentDistribution = departments.map((d) => ({
  name: d,
  value: employees.filter((e) => e.department === d).length,
}));

export const walletUsage = [
  { category: "Cafeteria", amount: 4820 },
  { category: "Parking", amount: 2140 },
  { category: "Vending", amount: 1380 },
  { category: "Gym", amount: 890 },
  { category: "Printing", amount: 540 },
  { category: "Other", amount: 320 },
];
