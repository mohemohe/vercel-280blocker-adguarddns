import { VercelRequest, VercelResponse } from "@vercel/node";

const UPSTREAM_BASE_URL = {
    DNS: "https://280blocker.net/files/280blocker_domain_ag_YYYYMM.txt",
    ABP: "https://280blocker.net/files/280blocker_adblock_YYYYMM.txt",
};

export default async (request: VercelRequest, response: VercelResponse) => {
    const now = new Date();   
    let nowYear = now.getFullYear();
    let nowMonth = `${now.getMonth() + 1}`.padStart(2, "0");

    const type = Array.isArray(request.query.type) ? request.query.type.pop() : request.query.type;
    let baseUrl;
    switch (type) {
        case "abp":
            baseUrl = UPSTREAM_BASE_URL.ABP;
            break;
        default:
            baseUrl = UPSTREAM_BASE_URL.DNS;
            break;
    }

    const url = baseUrl.replace("YYYYMM", `${nowYear}${nowMonth}`);
    console.log("redirect to:", url);

    response.redirect(302, url);
};
