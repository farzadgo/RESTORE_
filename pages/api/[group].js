// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

import { opencall } from '../../data'

export default function handle ({ query: {group} }, res) {
  const filtered = opencall.filter(e => e.group === group)

  if (filtered.length > 0) {
    res.status(200).json(filtered)
  } else {
    res
      .status(404)
      .json({ message: `requested group of ${group} is not found`})
  }
}