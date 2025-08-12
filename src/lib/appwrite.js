import { Client, Account, Databases } from "appwrite";

// Prefer Vite env; allow window.__APPWRITE__ overrides for local debug
const globalCfg = typeof window !== 'undefined' ? window.__APPWRITE__ : undefined;
let endpoint =
    import.meta.env.VITE_APPWRITE_ENDPOINT || (globalCfg && globalCfg.endpoint);
let projectId =
    import.meta.env.VITE_APPWRITE_PROJECT_ID || (globalCfg && globalCfg.projectId);

if (
    import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[Appwrite env]', {
        hasEndpoint: !!endpoint,
        hasProjectId: !!projectId,
        endpoint,
        projectId,
        mode: import.meta.env.MODE,
    });
}

// Temporary dev fallback to unblock if env doesn’t load
if ((!endpoint || !projectId) &&
    import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn('[Appwrite] Using DEV fallback values. Configure .env.local to remove this.')
    endpoint = endpoint || 'https://fra.cloud.appwrite.io/v1'
    projectId = projectId || '689646e50035dbb22e93'
}

if (!endpoint || !projectId) {
    throw new Error('Missing Appwrite configuration. Please set VITE_APPWRITE_ENDPOINT and VITE_APPWRITE_PROJECT_ID in starter-for-react/.env.local')
}

const client = new Client().setEndpoint(String(endpoint)).setProject(String(projectId));

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };