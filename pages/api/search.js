// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sanityClient } from "../../sanity"

export default async function handler(req, res) {
  if("search" in req.query) {
    const query = `*[_type == "report" && (title match \"*${req.query.search}*\" || \"${req.query.search}\" in tags)][0..5]{title, image, slug, _id}`
    let reports = await sanityClient.fetch(query)
    res.status(200).json({ result: reports })
  } else {
    res.status(200).json({ result: "error"})
  }
  
}
