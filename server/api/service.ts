import { type ApiResponse } from "~/types/api";

export default defineEventHandler(async (event) => {
  const url = useRuntimeConfig().public.apiCurrency;
  const query = getQuery(event);
  const currencyList = await $fetch<ApiResponse>(`${url}/${query.currency}`);

  return currencyList;
});
