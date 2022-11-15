import { about } from '../../content/about-data'

export default function handle (req, res) {
  res.status(200).json(about)
}