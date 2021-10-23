import { AppContext } from '../types'
import moment from 'moment'

export default async function boot({ app }: AppContext) {
  app.config.globalProperties.$moment = moment
}
