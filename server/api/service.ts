import { type ApiResponse } from "~/types/api";

export default defineEventHandler(async (event) => {
  // const url = useRuntimeConfig().public.apiCurrency;
  const url = "https://api.exchangerate-api.com/v4/latest";
  const query = getQuery(event);
  const currencyList = await $fetch<ApiResponse>(url + `/${query.currency}`);

  return currencyList;
});
