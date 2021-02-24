// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs")
const path = require("path")

const translations = path.resolve(__dirname, "..", "translations")

const base = JSON.parse(
  fs.readFileSync(path.resolve(translations, "en.json"), "utf-8"),
)

const files = fs.readdirSync(translations)
for (const file of files) {
  const strings = JSON.parse(
    fs.readFileSync(path.resolve(translations, file), "utf-8"),
  )

  /** @type {Record<string, unknown>} */
  const synced = {}

  for (const key of Object.keys(base)) {
    synced[key] = Object.prototype.hasOwnProperty.call(strings, key)
      ? strings[key]
      : base[key]
  }

  fs.writeFileSync(
    path.resolve(translations, file),
    `${JSON.stringify(synced, undefined, 2)}\n`,
    { encoding: "utf-8" },
  )
}
