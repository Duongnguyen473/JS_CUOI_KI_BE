export interface AuthUser {
  id: string,
  email: string,
  fullname: string,
  phone: string,
  role: string,
  comparePassword: (password: string) => Promise<boolean>
}

