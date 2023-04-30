import {readJSON, writeJSON} from 'https://deno.land/x/flat/mod.ts';

const store = await ensureStoreDir();

const downloaded_filename = Deno.args[0];
const installations = await getInstallations();

for (const installation of installations ) {
    const {store: {meta}} = installation;
    writeJSON(meta, installation);
}

writeJSON(downloaded_filename, installations);

async function getInstallations() {
    const installations = await readJSON(downloaded_filename);
    return installations.map((installation: { id: string }) => {
        const store = getInstallationStore(installation);
        return { ...installation, store };
    });
}

async function ensureStoreDir() {
    const store = Deno.env.get("STORE") || "store/installations"
    await Deno.mkdir(store, {recursive: true});
    return store;
}

 function getInstallationStore(installation: { id :string }) {
    const installationDir = `${store}/${installation.id}`;
     Deno.mkdirSync(installationDir, {recursive: true});
     return {
         meta: `${installationDir}/meta.json`,
         repositories: `${installationDir}/repositories.json`,
         index: `${installationDir}/index.json`
     };
}