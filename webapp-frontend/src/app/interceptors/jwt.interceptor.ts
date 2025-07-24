import { HttpInterceptorFn } from '@angular/common/http';
import { LOCAL_STORAGE_KEYS } from '../core/constants/keys';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    let parsedData: any = null;
    const storedUserData = localStorage.getItem(LOCAL_STORAGE_KEYS.user);

    try {
        if (storedUserData) {
            parsedData = JSON.parse(storedUserData);
        }
    } catch (err) {
        console.warn('No JWT exists in the local storage.', err);
    }

    const accessToken = parsedData?.accessToken;

    const excludedUrls = ['/auth/login', '/auth/register'];
    const shouldSkip = excludedUrls.some(url => req.url.includes(url));

    if (accessToken && !shouldSkip) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return next(cloned);
    }

    return next(req);
};
