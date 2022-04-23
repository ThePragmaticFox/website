export async function getSourceSynch(url) {
  const { data } = await useFetch(url);
  return data.value;
}
