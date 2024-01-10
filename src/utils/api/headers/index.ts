import { api_key } from ".."

const HEADER_API_KEY = {
  'Authorization': `Api-Key ${api_key}`
}

export { HEADER_API_KEY }
