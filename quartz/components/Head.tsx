import { FullSlug, _stripSlashes, joinSegments, pathToRoot } from "../util/path"
import { JSResourceToScriptElement } from "../util/resources"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  function Head({ cfg, fileData, externalResources }: QuartzComponentProps) {
    const title = fileData.frontmatter?.title ?? "Untitled"
    const description = fileData.description?.trim() ?? "No description provided"
    const { css, js } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)

    const faviconIcoPath = joinSegments(baseDir, "static/favicons/favicon.ico")
    const favicon16Path = joinSegments(baseDir, "static/favicons/favicon-16x16.png")
    const favicon32Path = joinSegments(baseDir, "static/favicons/favicon-32x32.png")
    const appleTouchIconPath = joinSegments(baseDir, "static/favicons/apple-touch-icon.png")
    const manifestPath = joinSegments(baseDir, "static/favicons/site.webmanifest")
    const ogImagePath = `https://${cfg.baseUrl}/static/og-image.png`

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {cfg.baseUrl && <meta property="og:image" content={ogImagePath} />}
        <meta property="og:width" content="1200" />
        <meta property="og:height" content="675" />
        <link rel="icon" href={faviconIcoPath} sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32Path} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16Path} />
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIconPath} />
        <link rel="manifest" href={manifestPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {css.map((href) => (
          <link key={href} href={href} rel="stylesheet" type="text/css" spa-preserve />
        ))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
