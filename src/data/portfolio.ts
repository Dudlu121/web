import { Code2, Lock, Server } from "lucide-react";

export const PROJECTS = [
  {
    id: 1,
    title: "AI Video Detector",
    stack: "Python // OpenCV // MediaPipe",
    desc: "Heuristic pipeline to detect AI-generated videos using facial dynamics and dense optical flow without pre-trained weights.",
    link: "https://github.com/AyushMohaptra/ai_video_detector",
  },
  {
    id: 2,
    title: "Smart PII Scrubber",
    stack: "Python // spaCy // SQLite // Microsoft Presidio",
    desc: "Modular four-stage pipeline for compliance-grade redaction of 14 PII entity classes across multiple file formats.",
    link: "https://github.com/AyushMohaptra/Smart_PII_scrubber",
  },
  {
    id: 3,
    title: "AI Token Manager",
    stack: "Python // LLM // CLI",
    desc: "A utility tool for managing and optimising AI API tokens, tracking usage, and enforcing budget limits across LLM providers.",
    link: "https://github.com/AyushMohaptra/AI-Token-Manager",
    comingSoon: true,
  },
  {
    id: 4,
    title: "Bad Apple Effect",
    stack: "Python // OpenCV // MoviePy",
    desc: "Turn any two videos into the iconic Bad Apple!! silhouette effect. Drop your clips, tune the threshold sliders, hit render. That's it.",
    link: "https://github.com/Dudlu121/Bad_Apple",
  }
];

export const EXPERIENCE = [
  {
    id: 1,
    title: "Community Ambassador",
    org: "TryHackMe",
    date: "2026 - Present",
  },
  {
    id: 2,
    title: "Student Coordinator and Lead",
    org: "IET [REDACTED]",
    date: "2025 - Present",
  }
];

export const CTFS = [
  {
    title: "HTB Cyber Apocalypse",
    org: "Hack The Box",
    date: "Jul 2026",
    rank: "241 / 6,744",
    desc: "Organized and captained a team placing 241st out of 6,744 teams worldwide.",
  },
  {
    title: "BRONCO CTF",
    org: "BRONCO",
    date: "Jul 2026",
    rank: "Rank #3",
    desc: "Achieved Global Rank #3 in competitive CTF.",
  }
];

export const HIGHLIGHT_CERTS = [
  { name: "AI Security (AI1)", org: "TryHackMe", id: "6a22b923d299b87dce981424", date: "Jun 2026" },
  { name: "SOC Level 1", org: "TryHackMe", id: "THM-C24HWNF6G9", date: "Mar 2026" },
  { name: "Jr Penetration Tester", org: "TryHackMe", id: "THM-RSCCF0SCMB", date: "Jan 2026" },
  { name: "Analyze Speech and Language with Google APIs", org: "Google", id: "Skill Badge", date: "Nov 2025" }
];

export const PRO_CERTS = [
  { name: "AI Security (AI1)", org: "TryHackMe", id: "6a22b923d299b87dce981424", date: "Jun 2026" }
];

export const HIGH_VALUE_CERTS = [
  { name: "AI Security", org: "TryHackMe", id: "THM-1R2XOJHCI6", date: "Apr 2026" },
  { name: "SOC Level 1", org: "TryHackMe", id: "THM-C24HWNF6G9", date: "Mar 2026" },
  { name: "Jr Penetration Tester", org: "TryHackMe", id: "THM-RSCCF0SCMB", date: "Jan 2026" },
  { name: "Web Fundamentals", org: "TryHackMe", id: "THM-YCEN5GQ2UX", date: "Jan 2026" },
  { name: "loveatfirstbreach CTF", org: "TryHackMe", id: "THM-GJOMSS8S4S", date: "Feb 2026" }
];

export const COMPLETION_CERTS = [
  { name: "AOC-2025", org: "TryHackMe", id: "THM-TZEGOTPIQ1", date: "Dec 2025" },
  { name: "Cyber Security 101", org: "TryHackMe", id: "THM-SIZ2FCL5KT", date: "Dec 2025" },
  { name: "Analyze Speech and Language with Google APIs", org: "Google", id: "Skill Badge", date: "Nov 2025" },
  { name: "Pre Security", org: "TryHackMe", id: "THM-BIRC68JU0J", date: "Nov 2025" },
  { name: "Kaggle (Pandas)", org: "Kaggle", id: "1000029725", date: "Aug 2025" },
  { name: "Google Cloud Computing Foundations", org: "Google", id: "13102443", date: "Dec 2024" },
  { name: "Get Started with Pub/Sub", org: "Google", id: "12679552", date: "Nov 2024" },
  { name: "Develop GenAI Apps with Gemini and Streamlit", org: "Google", id: "12678732", date: "Nov 2024" },
  { name: "Prompt Design in Vertex AI", org: "Google", id: "12659920", date: "Nov 2024" },
  { name: "Analyze Images with the Cloud Vision API", org: "Google", id: "12637827", date: "Nov 2024" },
  { name: "Networking Fundamentals on Google Cloud", org: "Google", id: "12583562", date: "Nov 2024" },
  { name: "Introduction to Generative AI", org: "Google", id: "12487486", date: "Oct 2024" },
  { name: "Monitoring in Google Cloud", org: "Google", id: "12303992", date: "Oct 2024" },
  { name: "Cloud Speech : 3 Ways", org: "Google", id: "12289461", date: "Oct 2024" },
  { name: "CLOUD FUNCTIONS: 3 WAYS", org: "Google", id: "12236254", date: "Oct 2024" },
  { name: "APP ENGINE : 3 WAYS", org: "Google", id: "12257520", date: "Oct 2024" },
  { name: "Get Started with Dataplex (Introductory)", org: "Google", id: "12134331", date: "Oct 2024" },
  { name: "Smart Analytics", org: "Google", id: "12098540", date: "Oct 2024" },
  { name: "Get Started With API Gateway", org: "Google", id: "12091730", date: "Oct 2024" },
  { name: "Get Started With Cloud Storage", org: "Google", id: "12015528", date: "Oct 2024" },
  { name: "The Basics of Google Cloud Compute", org: "Google", id: "12002019", date: "Oct 2024" },
  { name: "SQL (Advanced)", org: "HackerRank", id: "Certificate", date: "Oct 2024" },
  { name: "SQL (Intermediate)", org: "HackerRank", id: "Certificate", date: "Oct 2024" },
  { name: "SQL (Basic)", org: "HackerRank", id: "Certificate", date: "Oct 2024" },
  { name: "Python (Problem Solving Intermediate)", org: "HackerRank", id: "Certificate", date: "Oct 2024" },
  { name: "Python Problem Solving (Basic)", org: "HackerRank", id: "Certificate", date: "Sep 2024" },
  { name: "Python (Basic)", org: "HackerRank", id: "Certificate", date: "Aug 2024" }
];

export const TECH_STACK = [
  {
    category: "Languages & Frameworks",
    icon: Code2,
    skills: ["Python", "C/C++", "JavaScript", "SQL", "React"]
  },
  {
    category: "Offensive & Defensive Security",
    icon: Lock,
    skills: ["Wireshark", "Burp Suite", "Metasploit", "Nmap", "Microsoft Presidio", "Splunk", "Ghidra", "Hashcat", "Active Directory"]
  },
  {
    category: "Infrastructure & Machine Learning",
    icon: Server,
    skills: ["Linux", "Docker", "AWS", "OpenCV", "MediaPipe", "spaCy"]
  }
];
