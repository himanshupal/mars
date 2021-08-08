export interface Route {
  path: string
  text: string
}

export interface HeaderModel {
  menu: Boolean
  routes?: Array<Route>
}
