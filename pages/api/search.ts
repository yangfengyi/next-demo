import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Client ID
// s_rK7Dda29Gy6clJ1TFNmQ

// API Key
const apiKey = 'BsUlf9wEj1H8Pk93iEnGvk0xSBewcG2dh4bn3zVP8qhb1lGbakKBfnPVuW3g7PT2Zdv2UrxPTz49RnlyPFg1U-wq6TpB3wncCE9rJSeHvakA2oLW3n-hyOuqAugMY3Yx'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { limit = 20, offset = 0, categories = '' } = req.query
  console.log(categories)
  const data = await axios.get('https://api.yelp.com/v3/businesses/search', {
    params: {
      location: 'Las Vegas',
      limit,
      offset,
      categories: categories,
    },
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'accept': 'application/json',
      'x-requested-with': 'xmlhttprequest',
      'Access-Control-Allow-Origin':'*',
    }
  })
  console.log(data.data)

  res.status(200).json({
    data: data.data
  })
}