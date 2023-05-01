import {readJSON, writeJSON} from 'https://deno.land/x/flat/mod.ts';

const downloaded_filename = Deno.args[0];
const meta = JSON.parse(Deno.env.get("META"));

//merge repositories and installation meta
const repositories = await readJSON(downloaded_filename);
const installation = {...meta, ...repositories};
const {id, store: {index}} = meta;
writeJSON(index, installation);

//store in global index
const global_index = await getIndexPath();
writeJSON(global_index, {...await readJSON(global_index), [id]: installation});


async function getIndexPath() {
    const store = Deno.env.get("STORE") || "store";
    await Deno.mkdir(store, {recursive: true});
    return `${store}/index.jsonl`;
}

 