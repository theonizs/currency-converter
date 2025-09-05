<script setup lang="ts">
import { type CurrencyListTable } from "~/types/currency";
import type { TableColumn } from "@nuxt/ui";
import { StatusCode } from "~/types/enum";

const selectedCurrency = defineModel("firstCurrency") as Ref<string | null>;
const columns: TableColumn<CurrencyListTable>[] = [
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "rate",
    header: "Rate",
  },
];

const globalFilter = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const { data, error, execute, status } = await useLazyFetch("/api/service", {
  method: "GET",
  immediate: false,
  query: {
    currency: selectedCurrency,
  },
});

watch(
  () => selectedCurrency.value,
  () => {
    if (selectedCurrency.value) {
      isLoading.value = true;
      execute().finally(() => {
        isLoading.value = false;
      });
    }
  },
  { immediate: true }
);

const tableList = computed((): CurrencyListTable[] => {
  if (data.value && data.value.rates) {
    const rates = data.value.rates;
    return Object.entries(rates)
      .map(([key, value]) => ({
        currency: key,
        rate: Number(value),
      }))
      .filter((item) => item.currency !== selectedCurrency.value);
  }
  return [];
});

watch(
  () => error.value,
  () => {
    if (error.value) {
      const toast = useToast();
      toast.add({
        title: `Error ${error.value.statusCode}`,
        // server message if available otherwise generic message
        description: !error.value.statusMessage
          ? error.value.statusCode === StatusCode.BAD_REQUEST
            ? "Invalid base currency"
            : error.value.statusCode === StatusCode.NOT_FOUND
            ? "Service not found"
            : "Cannot fetch currency data"
          : error.value.statusMessage,
        color: "error",
      });
    }
  }
);
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="border-gray-200 border rounded p-4 flex flex-col">
      <div class="mb-2 text-sm">
        Selected Currency:
        <span class="font-bold text-lg pl-1">{{ selectedCurrency }}</span>
      </div>
      <UInput v-model="globalFilter" class="max-w-sm" placeholder="Filter..." />

      <UTable
        ref="table"
        :data="tableList"
        :columns="columns"
        v-model:global-filter="globalFilter"
        :loading="isLoading"
        sticky
        class="flex-1 md:w-full max-h-[320px] mt-2"
      >
        <template #currency-header="{ column }">
          <span class="font-bold flex justify-center">
            {{ column.columnDef.header }}</span
          >
        </template>
        <template #rate-header="{ column }">
          <span class="font-bold flex justify-center">
            {{ column.columnDef.header }}</span
          >
        </template>
      </UTable>
    </div>
  </div>
</template>
