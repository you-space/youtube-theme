import space from 'space'

export interface Filter {
  page?: number
  limit?: number
}

export interface Video {
  id: number
  source_id: string
  src: string
}

export interface ServerResponse<T = Record<string, string>> {
  meta: {
    current_page: number
    last_page: number
  }
  data: T[]
}

export async function fetchVideos(filters?: Filter) {
  const request = await space.emit('item:index', filters)

  if (!request) {
    throw new Error('Error in space emit')
  }

  return request as ServerResponse<Video>
}