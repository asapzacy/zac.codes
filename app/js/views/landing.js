import { findArea } from '../utils'

export default function runLandingPage() {

  findArea()
  window.addEventListener('resize', findArea)

}
