import { scrapeJobs } from "./scrape-jobs.js";
import { writeExcel } from "./write-excel.js";


const jobs = await scrapeJobs();
writeExcel(jobs);