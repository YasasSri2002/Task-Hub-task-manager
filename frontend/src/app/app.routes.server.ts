import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'detailed-task/:taskId',
    renderMode: RenderMode.Client  
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
