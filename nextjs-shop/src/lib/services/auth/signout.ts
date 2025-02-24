import { ApiContext } from '@/types'
import { fetcher } from '@/utils/fetch/fetcher'

const signout = async (context: ApiContext): Promise<{ message: string }> => {
  return await fetcher(`${context.apiRootUrl})/auth/signout`, {
    method: 'POST',
  })
}

export default signout
