import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  public isSignedIn(): boolean {
  
    // Check if trainer values are set in local storage.
    let name =  localStorage.getItem("trainerName");
    let id = localStorage.getItem("trainerId");

    if(name!==null && id!==null)
    {
      return true;
    }
    return false;
  }
}
