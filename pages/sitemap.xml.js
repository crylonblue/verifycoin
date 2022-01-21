import { sanityClient } from '../sanity'

export default function SiteMap(props) {
    return ""
}


export const getServerSideProps = async ({req, res}) => {
    const query = `*[_type == "report"] | order(title) {title, tags, image, slug}`
    const reports = await sanityClient.fetch(query)
    const pages = ["index", "explore"]
    let host = req.headers.host.indexOf("localhost") != -1 ? "http://" + req.headers.host : "https://" + req.headers.host
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${
            pages.map((page) => {
                return `
                <url>
                    <loc>${host}/${page}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url>
                `
            })
        }
        ${
            reports.map((report) => {
                return `
                <url>
                    <loc>${host}/reports/${report.slug.current}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url>
                `
            })
        }
    </urlset>
    `
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap)
    res.end()

    return {
        props: {},
    };
}