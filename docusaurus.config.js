// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Idena documentation',
  tagline: 'Proof of Personhood is the building block for Web 3.0',
  url: 'https://docs.idena.io',
  favicon: '/img/favicon.ico',
  baseUrl: '/',
  organizationName: 'Idena',
  projectName: 'idena-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/idena-network/idena-docs/edit/main/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/content.png',
      metadata: [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@IdenaNetwork' },
        { name: 'twitter:url', content: 'https://docs.idena.io' },
        { name: 'twitter:creator', content: '@IdenaNetwork' },
        {
          name: 'twitter:title',
          content: 'Idena Proof of Person blockchain',
        },
        {
          name: 'twitter:description',
          content: 'Build with Idena the first Proof of Person blockchain',
        },

        {
          property: 'og:description',
          content: 'Build with Idena the first Proof of Person blockchain',
        },
        { property: 'og:title', content: 'Idena Proof of Person blockchain' },
        { property: 'og:url', content: 'https://docs.idena.io' },
      ],
      navbar: {
        title: 'Idena Docs',
        hideOnScroll: true,
        logo: {
          alt: 'Idena Logo',
          src: 'img/idena_black.svg',
          srcDark: 'img/idena_white.svg',
        },
        items: [
          {
            to: 'docs/wp/summary/',
            activeBasePath: 'docs/wp',
            label: 'Whitepaper',
            position: 'left',
          },
          {
            to: 'docs/category/idena-app/',
            activeBasePath: 'docs/developer',
            label: 'Developers',
            position: 'left',
          },
          {
            to: 'docs/community/resources/',
            activeBasePath: 'docs/community',
            label: 'Community',
            position: 'left',
          },
          {
            to: 'docs/iip/iips/',
            activeBasePath: 'docs/iip',
            label: 'IIPs',
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
            className: 'header-github-link',
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
              {
                label: 'Contracts examples',
                href: 'https://github.com/idena-network/idena-contract-examples',
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
                href: 'https://discord.gg/idena-community-634481767352369162',
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
        copyright: `Idena Docs ${new Date().getFullYear()}`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: 'javascript',
      },
    }),
};

module.exports = config;
