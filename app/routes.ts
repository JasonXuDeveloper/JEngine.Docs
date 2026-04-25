import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  index('routes/redirect-root.tsx'),
  route(':lang', 'routes/home.tsx'),
  route(':lang/docs/:version/*', 'routes/docs.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
