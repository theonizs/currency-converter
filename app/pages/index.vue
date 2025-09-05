<script setup lang="ts">
import { StatusCode } from "~/types/enum";
import { type ApiResponse } from "~/types/api";
// githubpages does not support server middleware so using public api directly
const apiUrl = useRuntimeConfig().public.apiCurrency;
const InitialBaseCurrency = "THB";
const { data: result, error } = await useFetch<ApiResponse>(
  `${apiUrl}/${InitialBaseCurrency}`
);

const toast = useToast();
onMounted(() => {
  if (error.value && error.value?.statusCode !== StatusCode.SUCCESS) {
    toast.add({
      title: `Error ${error.value.statusCode}`,
      // server message if available otherwise generic message
      description: error.value.statusMessage
        ? "Cannot fetch currency data"
        : error.value.statusMessage,
      color: "error",
    });
  }
});

const parentCurrency = ref<string | null>(null);
</script>

<template>
  <div class="index-page p-4">
    <div class="p-4 bg-gray-100 rounded-lg shadow-sm w-fit">
      <exchange-converter
        :currencyList="result?.rates"
        @updateCurrency="parentCurrency = $event"
      />
    </div>
    <div class="p-4">
      <dashboard-currency-table v-model:firstCurrency="parentCurrency" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-page {
  font-size: 20px;
  color: #333;
  text-align: center;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
</style>
