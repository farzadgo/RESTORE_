import { opencall } from '../../content/opencall-data'

export default function handle (req, res) {
  res.status(200).json(opencall)
}