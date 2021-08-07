import { VercelRequest, VercelResponse } from "@vercel/node";

const UPSTREAM_BASE_URL = "https://280blocker.net/files/280blocker_domain_ag_YYYYMM.txt";

export default async (request: VercelRequest, response: VercelResponse) => {
    const now = new Date();   
    let nowYear = now.getFullYear();
    let nowMonth = `${now.getMonth() + 1}`.padStart(2, "0");

    const url = UPSTREAM_BASE_URL.replace("YYYYMM", `${nowYear}${nowMonth}`);
    console.log("redirect to:", url);

    response.redirect(302, url);
};
