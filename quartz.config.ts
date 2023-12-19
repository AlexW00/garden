import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "アレックスの庭",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "https://alexw00.github.io/garden",
    ignorePatterns: [
      "**/private/**",
      "templates",
      ".obsidian",
      "6_PRIVATE",
      "2_ARBEIT",
      "**/How to Win Friends and Influence People/**",
      "**/MUI/**",
      "**/Bachelor Thesis/**",
    ],
    defaultDateType: "created",
    theme: {
      typography: {
        header: "Noto Serif JP",
        body: "Feijoa",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff", // main background remains white
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#636363",
          dark: "#2b2b2b",
          secondary: "#808c27", // changed to a green shade
          tertiary: "#6a7326", // changed to a lighter green
          highlight: "rgba(118, 185, 71, 0.10)", // less intense green-tinted highlight
        },

        darkMode: {
          light: "#171717",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#6daa6c", // changed to a green shade
          tertiary: "#76b947", // consistent with light mode tertiary
          highlight: "rgba(137, 112, 153, 0.25)", // green-tinted highlight
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"], // you can add 'git' here for last modified from Git but this makes the build slower
      }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
