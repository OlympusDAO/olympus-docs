// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;

/** @returns {Promise<import('@docusaurus/types').Config>} */
async function createConfig() {
  const { default: math } = await import("remark-math");
  const { default: katex } = await import("rehype-katex");
  return {
    title: "Olympus Docs",
    tagline: "",
    url: "https://docs.olympusdao.finance",
    baseUrl: "/",
    // Canonicalize every page to the no-trailing-slash form. This keeps the
    // generated canonical/sitemap URLs consistent across index and named pages
    // and avoids the client-side soft-404 that index pages hit without a slash.
    // Pairs with vercel.json (trailingSlash: false) so the host 308-redirects
    // the legacy "/path/" form to the canonical "/path".
    trailingSlash: false,
    onBrokenLinks: "warn",
    favicon: "img/favicon.svg",
    markdown: {
      mermaid: true,
      hooks: { onBrokenMarkdownLinks: "warn" },
    },

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "OlympusDAO", // Usually your GitHub org/user name.
    projectName: "olympus-docs", // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: "en",
      locales: ["en"],
    },

    presets: [
      [
        "classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          blog: false,
          docs: {
            routeBasePath: "/main", // defaults to docs, but `main` maintains the gitbook paths
            sidebarPath: require.resolve("./sidebars.js"),
            // Remove this to remove the "edit this page" links.
            editUrl: "https://github.com/OlympusDAO/olympus-docs/blob/main",
            remarkPlugins: [math],
            rehypePlugins: [katex],
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
          googleTagManager: {
            containerId: "GTM-NJSWZX5",
          },
        }),
      ],
    ],
    themes: ["@docusaurus/theme-mermaid"],
    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        colorMode: {
          defaultMode: "light",
          disableSwitch: false,
          respectPrefersColorScheme: false,
        },
        navbar: {
          title: "",
          logo: {
            alt: "Olympus Docs",
            src: "img/logo.svg",
            srcDark: "img/logo_dark.svg",
          },
          items: [
            // {
            //   type: "doc",
            //   docId: "utility/index",
            //   position: "left",
            //   label: "Utility",
            // },
            // {
            //   type: "doc",
            //   docId: "mechanics/stability/index",
            //   position: "left",
            //   label: "Stability",
            // },
            // {
            //   type: "doc",
            //   docId: "mechanics/liquidity/index",
            //   position: "left",
            //   label: "Liquidity",
            // },
            // {
            //   type: "doc",
            //   docId: "mechanics/governance/index",
            //   position: "left",
            //   label: "Governance",
            // },
            // {
            //   type: "doc",
            //   docId: "technical-guides/index",
            //   position: "left",
            //   label: "Technical Docs",
            // },
            {
              href: "https://github.com/OlympusDAO/olympus-docs",
              label: "GitHub",
              position: "right",
            },
          ],
        },
        footer: {
          style: "dark",
          links: [
            {
              title: "Documentation",
              items: [
                {
                  label: "Protocol Documentation",
                  to: "/main/overview/intro",
                },
              ],
            },
            {
              title: "Community",
              items: [
                {
                  label: "Discord",
                  href: "https://discord-invite.olympusdao.finance/",
                },
                {
                  label: "Twitter",
                  href: "https://twitter.com/OlympusDAO",
                },
              ],
            },
            {
              title: "More",
              items: [
                {
                  label: "GitHub",
                  href: "https://github.com/OlympusDAO",
                },
              ],
            },
            {
              title: "Legal",
              items: [
                {
                  label: "Privacy Policy",
                  to: "/main/legal/privacy-policy",
                },
                {
                  label: "Terms of Use",
                  to: "/main/legal/terms-of-use",
                },
              ],
            },
          ],
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
          additionalLanguages: ["solidity"],
        },
      }),
  };
}
module.exports = createConfig;
