export interface Service {
  title: string
  text?: string
  icon: string
  path?: string
}

export interface Services {
  generalServices: Array<Service>
  tailoredServices: Array<Service>
}
