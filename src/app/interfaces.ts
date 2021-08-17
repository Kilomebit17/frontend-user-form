export interface User {
  id?:number
  firstName:string
  lastName:string
  dateOfBirth:Date
  framework:string
  frameworkVersion:string
  email:string
  hobby:UserHobby[]

}
export interface UserHobby {
  name:string
  duration:string
}
export interface Frameworks {
  id:string
  name: string
  version: [
    FrameworksVersions
  ]
}
export interface FrameworksVersions {
  v:string
}
