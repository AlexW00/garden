// script called by npm run build to prepend base url to all links in css files,
// that start with /static/

import fs from "fs"
import path from "path"
import * as glob from "glob"

const BASE_URL = process.env.BASE_URL || ""
if (!BASE_URL) {
  console.warn("Skipping patching css files, because BASE_URL is not set")
  process.exit(0)
}
// check format of BASE_URL
if (!BASE_URL.endsWith("/")) {
  console.warn("BASE_URL should end with /, but is: ", BASE_URL)
  process.exit(1)
}
if (!BASE_URL.startsWith("/")) {
  console.warn("BASE_URL should start with /, but is: ", BASE_URL)
  process.exit(1)
}

const files = glob.sync("public/*.css")
console.log(`Patching ${files.length} css files`)

files.forEach((file) => {
  const filePath = path.resolve(file)
  const fileContent = fs.readFileSync(filePath, "utf8")
  const newFileContent = fileContent.replace(/\/static\//g, `${BASE_URL}static/`)
  fs.writeFileSync(filePath, newFileContent)
})

console.log("Successfully patched css files")
