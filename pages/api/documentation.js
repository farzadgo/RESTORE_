import { documentation } from '../../content/documentation-data'

export default function handle (req, res) {
  res.status(200).json(documentation)
}