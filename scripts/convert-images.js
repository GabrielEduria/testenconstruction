/* Converts raw-images/<project>/[before|during|after]/* -> public/projects/<project>/<stage>/*.webp (+ -thumb).
   Usage: npm run images   (optional: RAW_DIR=path npm run images)
   - max 1600px wide, quality 78, thumbs 600px, no upscaling, metadata (GPS) stripped.
   - A project folder with no stage subfolders: all images are treated as "after". */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const RAW = path.resolve(process.env.RAW_DIR || path.join(__dirname, "..", "raw-images"));
const OUT = path.join(__dirname, "..", "public", "projects");
const EXT = /\.(jpe?g|png|webp|heic|heif|tiff?)$/i;
const STAGES = ["before", "during", "after"];

const slug = (s) => s.toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function load(file) {
  if (/\.hei[cf]$/i.test(file)) {
    // sharp's prebuilt libvips has no HEVC decoder, so decode HEIC via heic-convert.
    const convert = require("heic-convert");
    const jpeg = await convert({ buffer: fs.readFileSync(file), format: "JPEG", quality: 1 });
    return sharp(Buffer.from(jpeg));
  }
  return sharp(file);
}

async function convertOne(file, destDir, name) {
  fs.mkdirSync(destDir, { recursive: true });
  const meta = await (await load(file)).metadata();
  for (const [suffix, width] of [["", 1600], ["-thumb", 600]]) {
    // .rotate() applies EXIF orientation; sharp drops all other metadata (incl. GPS) by default.
    await (await load(file)).rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(destDir, `${name}${suffix}.webp`));
  }
  return meta;
}

async function main() {
  if (!fs.existsSync(RAW)) { console.error(`No raw-images folder at ${RAW}`); process.exit(1); }
  const projects = fs.readdirSync(RAW, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const p of projects) {
    const dir = path.join(RAW, p.name);
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const stageDirs = entries.filter((e) => e.isDirectory() && STAGES.includes(e.name.toLowerCase()));
    const jobs = [];
    if (stageDirs.length === 0) {
      entries.filter((e) => e.isFile() && EXT.test(e.name)).forEach((e) => jobs.push(["after", path.join(dir, e.name)]));
    } else {
      for (const s of stageDirs)
        fs.readdirSync(path.join(dir, s.name)).filter((f) => EXT.test(f)).sort()
          .forEach((f) => jobs.push([s.name.toLowerCase(), path.join(dir, s.name, f)]));
    }
    const counters = {};
    for (const [stage, file] of jobs) {
      counters[stage] = (counters[stage] || 0) + 1;
      const name = String(counters[stage]);
      await convertOne(file, path.join(OUT, slug(p.name), stage), name);
      console.log(`${p.name}/${stage}/${path.basename(file)} -> projects/${slug(p.name)}/${stage}/${name}.webp`);
    }
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
