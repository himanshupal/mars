import { FlickingOptions } from '@egjs/vue-flicking'

export interface CarouselModel {
  options?: FlickingOptions | Record<string, any>
  plugins?: Array<any>
}
