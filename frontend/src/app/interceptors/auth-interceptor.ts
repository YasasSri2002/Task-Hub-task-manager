import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


const PUBLIC_URLS = [
  '/api/v1/user/login',
  '/api/v1/user/register',
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  const isPublic = PUBLIC_URLS.some(url => req.url.includes(url));
  if (isPublic) {
    return next(req);
  }

  const token = cookieService.get('auth-token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
