# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Notes

1. [not using blog](https://docusaurus.io/docs/installation#project-structure-rundown) - we have deleted the `blog` directory & disabled the blog plugin
2. we are using typescript, which has some [uniqueness within docusaurus](https://docusaurus.io/docs/typescript-support)
3. Embedding dynamic content? We use [MDX-Embed](https://www.mdx-embed.com/?path=/docs/introduction--page)
  A. docs/intro.mdx shows an example with youtube

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

Builds are automatic via CI/CD pipeline using fleek.

### Deployment

PRs are automatically deployed on fleek.
