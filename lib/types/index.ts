// After
type Params = Promise<{ id?: string; slug?: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export interface PageProps {
  params: Params;
  searchParams: SearchParams;
}
