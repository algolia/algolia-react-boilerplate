// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Algolia Boilerplate',
  tagline: 'Built and maintained by Demo Engineering',
  url: 'https://monumental-melba-89d587.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
           routeBasePath: '/', // Serve the docs at the site's root
          // // Please change this to your repo.
          // // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
      
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
      // The application ID provided by Algolia
      appId: '1NMSYAIOLN',

      // Public API key: it is safe to commit it
      apiKey: '2798fa06d878074ebfc175e8423ad6d9',

      indexName: 'algolia-boilerplate',

      // Optional: see doc section below
      contextualSearch: true,
        },
      navbar: {
        title: 'Boilerplate Docs',
        logo: {
          alt: 'My Site Logo',
          src: 'https://www.gartner.com/pi/vendorimages/algolia_digital-commerce-search_1667487335343.png',
        },
        
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          // {
          //   type: 'category',
          //   id: 'boilerplate-guide-pages',
          //   label: 'Boilerplate Guide Docs',
          //   position: 'left',
          // },
          

          {
            type: 'doc',
            docId: 'Getting Started/getting-started',
            label: 'Getting Started'

          },
          {
            // type: 'doc',
            // docId: 'read-me',
            href: 'https://github.com/algolia/algolia-react-boilerplate/#readme',
            label: 'Full README',

            position: 'right',
          },
        ],
      },
      
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/algolia/algolia-react-boilerplate/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Algolia Demo Engineering, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
