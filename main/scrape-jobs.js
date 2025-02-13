import puppeteer from "puppeteer";
import { configDotenv } from "dotenv";


configDotenv();

async function login(page) {
    await page.goto("https://www.linkedin.com/login", { waitUntil: "load" });

    // Preenche email e senha
    await page.type("#username", process.env.LINKEDIN_EMAIL);
    await page.type("#password", process.env.LINKEDIN_PASSWORD);

    // Clica no botão de login
    await page.click("[type=submit]");
    await page.waitForNavigation();
}

async function findJobs(page) {
    await page.goto(process.env.LINKEDIN_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector(".job-card-container__link", { timeout: 5000 });

    // Extrai as vagas
    const jobs = await page.evaluate(() => {
        return [...document.querySelectorAll(".job-card-container__link")].map((job) => ({
            title: job.innerText.trim() || "Sem título",
            link: job.href || "#",
        }));
    });

    return jobs;
}

export async function scrapeJobs() {
    console.log("Iniciando busca de vagas...");

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await login(page);
    const jobs = await findJobs(page);

    await browser.close();
    console.log(`Foram encontradas ${jobs.length} vagas.`);
    return jobs;
}
