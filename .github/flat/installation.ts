import {readJSON, writeJSON} from 'https://deno.land/x/flat/mod.ts';
import {exists} from "https://deno.land/std@0.170.0/fs/mod.ts";

const downloaded_filename = Deno.args[0];
const meta = JSON.parse(Deno.env.get("META") || "{}")
console.log(meta);
console.log("downloaded_filename: " +downloaded_filename+ " exists: "+ await exists(downloaded_filename));
//write repositories and installation meta
const installation = {...meta, ...await readJSON(downloaded_filename)};
const {id, store: {index}} = meta;
console.log("index " + index+ " exists: "+ await exists(index));

writeJSON(index, installation);

//store in global index
const global_index = await getIndexPath();
console.log("global_index " + global_index+ " exists: "+ await exists(global_index));

const global_index_content = await exists(global_index) ? await readJSON(global_index) : {};
writeJSON(global_index, {...global_index_content, [id]: installation});


async function getIndexPath() {
    const store = Deno.env.get("STORE") || "store";
    await Deno.mkdir(store, {recursive: true});
    return `${store}/index.json`;
}

 