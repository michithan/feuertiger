/* eslint-disable @typescript-eslint/no-var-requires */
const {
    gitlab: { repositoryUrl, repositoryEditUrl }
} = require('@feuertiger/config');

module.exports = {
    title: 'Feuertiger',
    tagline: 'Open Source Feuerwehrsoftware',
    url: 'https://docs.feuertiger.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    favicon: 'img/favicon.ico',
    organizationName: 'feuertiger',
    projectName: 'feuertiger',
    themeConfig: {
        navbar: {
            title: 'Feuertiger',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg'
            },
            items: [
                {
                    to: 'docs',
                    activeBasePath: 'docs',
                    label: 'Doku',
                    position: 'left'
                },
                {
                    to: 'docs/dev',
                    activeBasePath: 'docs/dev',
                    label: 'Development',
                    position: 'left'
                },
                {
                    to: 'blog',
                    activeBasePath: 'blog',
                    label: 'Blog',
                    position: 'left'
                },
                {
                    href: repositoryUrl,
                    label: 'GitLab',
                    position: 'right'
                }
            ]
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Nutzer Dokumentation',
                            to: 'docs/'
                        },
                        {
                            label: 'Entwickler Dokumentation',
                            to: 'docs/dev'
                        }
                    ]
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'GitLab',
                            href: repositoryUrl
                        }
                    ]
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Blog',
                            to: 'blog'
                        },
                        {
                            label: 'GitLab',
                            href: repositoryUrl
                        }
                    ]
                }
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Michael Thanei.`
        }
    },
    plugins: [
        [
            '@docusaurus/plugin-content-blog',
            {
                showReadingTime: true,
                editUrl: repositoryEditUrl
            }
        ],
        [
            '@docusaurus/plugin-content-docs',
            {
                routeBasePath: 'docs',
                sidebarPath: require.resolve('./sidebar'),
                editUrl: repositoryEditUrl
            }
        ],
        [
            '@docusaurus/theme-classic',
            {
                customCss: require.resolve('./src/css/custom.css')
            }
        ],
        '@docusaurus/plugin-content-pages'
    ]
};
