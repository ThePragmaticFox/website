import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';
import { c as buildAssetsDir } from './server.mjs';
import 'unenv/runtime/polyfill/fetch.node';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'defu';

const assets = {
  "/_nuxt/entry-81aad56e.mjs": {
    "type": "application/javascript",
    "etag": "\"1d559-izKSmyCXEjNoSTnDKZXefAwR65Q\"",
    "mtime": "2022-04-10T11:11:38.461Z",
    "path": "../public/_nuxt/entry-81aad56e.mjs"
  },
  "/_nuxt/entry.d8a37e10.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1efa-KHW5rth1wEyi7E+r93ENbKTqUwk\"",
    "mtime": "2022-04-10T11:11:38.461Z",
    "path": "../public/_nuxt/entry.d8a37e10.css"
  },
  "/_nuxt/index-705b0e81.mjs": {
    "type": "application/javascript",
    "etag": "\"e3-NVGdRKFOaV9+OxAzYbpBGfWC4Tg\"",
    "mtime": "2022-04-10T11:11:38.461Z",
    "path": "../public/_nuxt/index-705b0e81.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"1c1-g09PPYhUwgR/m2w3tYQlZkP4qVo\"",
    "mtime": "2022-04-10T11:11:38.461Z",
    "path": "../public/_nuxt/manifest.json"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));

function readAsset (id) {
  return promises.readFile(resolve(mainDir, getAsset(id).path))
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const TWO_DAYS = 2 * 60 * 60 * 24;
const STATIC_ASSETS_BASE = "/_nuxt/home/dogo/website/dist" + "/" + "1649589096";
async function serveStatic(req, res) {
  if (!METHODS.includes(req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  const isBuildAsset = id.startsWith(buildAssetsDir());
  if (!asset) {
    if (isBuildAsset && !id.startsWith(STATIC_ASSETS_BASE)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    res.statusCode = 304;
    return res.end("Not Modified (etag)");
  }
  const ifModifiedSinceH = req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      res.statusCode = 304;
      return res.end("Not Modified (mtime)");
    }
  }
  if (asset.type) {
    res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    res.setHeader("Last-Modified", asset.mtime);
  }
  if (isBuildAsset) {
    res.setHeader("Cache-Control", `max-age=${TWO_DAYS}, immutable`);
  }
  const contents = await readAsset(id);
  return res.end(contents);
}

export { serveStatic as default };
