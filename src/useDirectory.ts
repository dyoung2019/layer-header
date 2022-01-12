import { Accessor, createSignal } from 'solid-js';

interface TRoute {
  path: any[];
  handler: (subPath: any, params: any, snapshot?: any) => void;
}

type TDirectoryEntry = { [key:string]: TRoute }

export interface TRouteDirectory {
  redirects: Accessor<TDirectoryEntry>;
  add(routes: TRoute[]): void;
  recognize(path: any[]): TRoute;
}

export default function useDirectory(): TRouteDirectory {
  const [redirects, setRedirects] = createSignal<TDirectoryEntry>({});

  const getSiloPath = (path: any[]): string => {
    return path[0]
  }

  const add = (routes: TRoute[]) => {
    if (routes.length > 0) {
      const clone: any = {...redirects()};

      routes.forEach(route => {
        const silo = getSiloPath(route.path)
        clone[silo] = route
      })

      setRedirects(clone);
    }
  }

  const recognize = (path: any[]) => {
    const silo = getSiloPath(path)
    return redirects()[silo]
  } 

  return {
    redirects,
    add,
    recognize
  }
}