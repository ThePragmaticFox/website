export async function getSourceSynch(url: RequestInfo): Promise<String> {
  const { data } = await useFetch(url);
  return String(data.value);
}
