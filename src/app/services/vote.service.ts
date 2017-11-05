import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { UserService } from '../services/user.service';

@Injectable()
export class VoteService
{
  public checkUrl = this.userService.baseApiUrl + "/photos/checkvoted";
  public voteUrl = this.userService.baseApiUrl + "/photos/vote";

  constructor(private http: Http, private userService: UserService) {}

  public CheckIfVoted(photoId: string, userId: string): Observable<IVoted>
  {
    return this.http.post(this.checkUrl, {"photoId": photoId, "userId": userId})
    .map(data => data.json() as IVoted);
  }

  public SendVote(photoId: string, value: number, userId: string, token: string): Observable<IVoted>
  {
    return this.http.post(this.voteUrl, {"photoId": photoId, "userId": userId, "value": value, "token": token})
    .map( data => data.json() as IVoted );
  }

}

export interface IVoted
{
  message: string;
  voted: string;
  token: string;
}
