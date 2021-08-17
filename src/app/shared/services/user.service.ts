import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Frameworks, User} from "../../interfaces";
@Injectable({
  providedIn:'root'
})
export class UserService {
  constructor(private http:HttpClient) {}
  private url:string = 'http://localhost:5000'
  getFrameworks():Observable<Frameworks[]> {
    return this.http.get<Frameworks[]>(`${this.url}/frameworks`)
  }

  getUserByEmail(email:string) {
    return this.http.get<User[]>(`${this.url}/users?email=${email}`)
  }

  sendUserForm(user:User): Observable<User> {
    return this.http.post<User>(`${this.url}/users`, user)
  }
}
