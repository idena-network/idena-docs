/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Build with Idena',
  tagline: 'Cryptoidentity is the building block for Web 3.0',
  url: 'https://idena.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Idena',
  projectName: 'idena-docs',
  themeConfig: {
    navbar: {
      title: 'IdenaDocs',
      logo: {
        alt: 'Idena Logo',
        src: 'img/idena_black.svg',
      },
      items: [
        {
          to: 'docs/node/general/',
          activeBasePath: 'docs',
          label: 'Documentation',
          position: 'left',
        },

        {
          href: 'https://api.idena.io',
          label: 'Indexer API',
          position: 'right',
        },
        {
          href: 'http://rpc.idena.io',
          label: 'Node RPC',
          position: 'right',
        },
        {
          href: 'https://github.com/idena-network',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Resources',
          items: [
            {
              label: 'Indexer API',
              href: 'https://api.idena.io',
            },
            {
              label: 'Node RPC',
              href: 'http://rpc.idena.io',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/IdenaNetworkPublic',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/8BusRj7',
            },
            {
              label: 'Reddit',
              href: 'https://www.reddit.com/r/Idena/',
            },
          ],
        },
        {
          title: 'Follow us',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/IdenaNetwork',
            },
            {
              label: 'Medium',
              href: 'https://medium.com/idena/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Idena-Network',
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/idena-network/idena-docs/edit/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/idena-network/idena-docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
