/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // main: [{type: 'autogenerated', dirName: './main'}],

  // But you can create a sidebar manually
  // config options: https://docusaurus.io/docs/next/sidebar/items
  main: [
    {
        type: 'category',
        label: 'Basics',
        collapsible: false,
        collapsed: false,
        items: [{type: 'autogenerated', dirName: 'basics'}],
    },
    {
      type: 'category',
      label: 'Using the Website',
      collapsible: false,
      collapsed: false,
      items: [
        'using-the-website/staking',
        {
          type: 'category',
          label: 'Purchase A Bond (1, 1)',
          collapsible: true,
          collapsed: false,
          link: {
            type: 'doc',
            id: 'using-the-website/bonds/index',
          },
          items: [{type: 'doc', id: 'using-the-website/bonds/bond_example'}],
        },
        'using-the-website/staking_lp',
        'using-the-website/unstaking_lp',
        'using-the-website/migrate',
        'using-the-website/migrate_v2',
        'using-the-website/olyzaps',
      ],
    },
  ],
};

module.exports = sidebars;
