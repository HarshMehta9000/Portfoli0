import type { StaticImageData } from "next/image";

export type Project = {
  title: string;
  summary: string;
  stack: string[];
  image: string | StaticImageData; // 600×360 cover in /public/projects/
  link: string; // absolute or relative URL
};

export const projects: Project[] = [
  {
    title: "UW Transportation Services Campus Parking Efficiency",
    summary:
      "Analyzed 11 M+ parking transactions; predictive models & dashboards cut search time 27 %.",
    stack: ["Python", "SQL", "Snowflake", "Tableau", "Power BI"],
    image: "/projects/parking.jpg",
    link: "https://github.com/HarshMehta9000/parking-efficiency",
  },
  {
    title: "MSBA Financial Group Cloud-Native Data Architecture",
    summary:
      "AWS S3→Glue→Redshift pipeline with SageMaker Canvas risk model (99.19 % accuracy).",
    stack: ["AWS", "Glue", "Redshift", "SageMaker Canvas"],
    image: "/projects/msba-cloud.jpg",
    link: "https://github.com/HarshMehta9000/msba-cloud-pipeline",
  },
  {
    title: "Hard Drive Data Extraction Tool",
    summary:
      "Python/JS utility exporting HDD contents to JSON, 60 % faster & cheaper.",
    stack: ["Python", "JavaScript", "PostgreSQL"],
    image: "/projects/hdd-extract.jpg",
    link: "https://github.com/HarshMehta9000/hdd-extract-tool",
  },
  {
    title: "Job Posting Analytics on Twitter",
    summary: "NLP on 100 k+ tweets to uncover hiring trends; paper in review.",
    stack: ["NLP", "Twitter API", "Data Mining"],
    image: "/projects/twitter-jobs.jpg",
    link: "https://github.com/HarshMehta9000/twitter-job-analytics",
  },
  {
    title: "MIDI → CSV Converter",
    summary: "Transforms MIDI files into analysis-ready CSV datasets (music IR).",
    stack: ["Python", "Music IR"],
    image: "/projects/midi-csv.jpg",
    link: "https://github.com/HarshMehta9000/midi-to-csv",
  },
  {
    title: "Graduate Studies: Learnings & Reflections",
    summary:
      "Key take-aways from the UW-Madison MS-Information program (analytics, ML, cloud).",
    stack: ["Data Analytics", "Machine Learning", "AWS"],
    image: "/projects/grad-reflections.jpg",
    link: "https://harshmehta.me/grad-reflections",
  },
  {
    title: "Live Audio/AV Engineer – UW Madison",
    summary:
      "End-to-end live-audio & AV support for campus concerts and events.",
    stack: ["Audio", "AV Tech"],
    image: "/projects/live-audio.jpg",
    link: "https://harshmehta.me/audio-portfolio",
  },
];
