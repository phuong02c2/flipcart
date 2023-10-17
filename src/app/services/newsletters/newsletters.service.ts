import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { Newsletter } from 'src/app/models/newsletters/newsletter';

@Injectable({
  providedIn: 'root',
})
export class NewslettersService {
  constructor(private readonly httpClient: HttpClient) {}

  getNewsletters(): Observable<Newsletter[]> {
    const url = `https://gzh93wa0qf.execute-api.us-east-1.amazonaws.com/dev/newsletters`;
    //const url = 'https://localhost:7052/newsletters';
    return this.httpClient
      .get<Newsletter[]>(url)
      .pipe(map((response) => plainToClass(Newsletter, response)));
  }
}
