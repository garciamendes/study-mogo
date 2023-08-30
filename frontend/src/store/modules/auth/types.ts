export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string,
  id?: string
  email: string,
  name?: {
    first?: string,
    last?: string
  }
  created?: string
  modified?: string
}

export interface IRegisterResquest {
  email: string,
  password: string
  name?: {
    first?: string,
    last?: string
  }
}