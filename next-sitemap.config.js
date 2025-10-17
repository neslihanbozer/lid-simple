/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://lebenindeutschland-prep.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://lebenindeutschland-prep.com/server-sitemap.xml',
    ],
  },
}
