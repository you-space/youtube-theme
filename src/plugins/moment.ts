import { AppContext } from '../types'
import moment from 'moment'

export default async function boot({ app }: Pick<AppContext, 'app'>) {
  app.config.globalProperties.$moment = moment
}
