# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Notes

1. [not using blog](https://docusaurus.io/docs/installation#project-structure-rundown) - we have deleted the `blog` directory & disabled the blog plugin
2. we are using typescript, which has some [uniqueness within docusaurus](https://docusaurus.io/docs/typescript-support)
3. Embedding dynamic content? We use [MDX-Embed](https://www.mdx-embed.com/?path=/docs/introduction--page)
    * docs/intro.mdx shows an example with youtube

### Installation

```sh
yarn
```

### Local Development

```sh
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

* [MDX Extension for VSCode syntax highlighting](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx)

### Build

Builds are automatic via CI/CD pipeline using fleek.

### Deployment

PRs are automatically deployed on fleek.

## Netlify CMS

- Netlify cms is available at /admin.
- it requires login with github credentials
- all changes will read against the `main` branch
- all submitted changes will be submitted as pull requests
- netlify cms ONLY READS and WRITES DATA to/from github... it does not read/write any local changes you might have on your local machine
- Netlify cms requires a "name" field for use as a file identifier within the cms.
- need to test who has "Publish" rights...
