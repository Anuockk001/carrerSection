import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from 'rxjs/internal/Observable';
import {environment} from './environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {

  }

  getAllConsumerCities(query: any): Observable<any[]> {
    const params = new HttpParams()
      .set('query', query);
    return this.http.get<any[]>(`${environment.url}consumer/city`, {params});
  }

    getSkillsConsumer(): Promise<any[]> {
        return this.http.get<any[]>(`${environment.url}consumer/skills-type`).toPromise().then(data => data || []);
    }

  careerPosts(page: number, size: number, query: string, experienceRange: any, jobType: string[], workLocation: string[]): Observable<any> {
    const url = `${environment.url}/admin/public/jobs/search?page=${page}&size=${size}`;
    const payload = {
      query: query,
      experience: experienceRange,
      jobType: jobType,
      workLocation: workLocation,
    };
    return this.http.post<any>(url, payload);
  }

  careerPost(id:number): Observable<any> {
    const url = `${environment.url}job/${id}`;
    return this.http.get<any>(url);
  }

  uploadResume(file: File): Observable<any> {
    const url =`${environment.url}document`
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(url, formData)
  }
}
