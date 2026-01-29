export enum ApiQueryTypes {
  GET = 'get',
  POST = 'post',
}

export const BASE_STALE_TIME = 15 * 60 * 1000; // 15 minutes
export const GC_TIME = 30 * 60 * 1000; // 30 minutes

export const TANKSTANK_DEFAULT_OPTIONS = {
  staleTime: BASE_STALE_TIME,
  gcTime: GC_TIME,
  retry: false,
};
