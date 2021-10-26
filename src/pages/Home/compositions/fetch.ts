import space from 'space'

export interface Filter {
  page?: number
  limit?: number
  id?: string
  search?: string
  orderBy?: string
  orderDesc?: boolean
}

export interface Video {
  id: number
  source_id: string
  title: string
  description: string
  src: string
  thumbnail: {
    src: string
  }
  tags: string[]
}

export interface ServerResponse<T = Record<string, string>> {
  meta: {
    current_page: number
    last_page: number
  }
  data: T[]
}

export async function fetchVideos(filters?: Filter) {
  const request = await space.emit('item:index', {
    type: 'youtube-videos',
    ...filters,
  })

  if (!request) {
    throw new Error('Error in space emit')
  }

  return request as ServerResponse<Video>
}
