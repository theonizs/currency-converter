<script setup lang="ts">
import { type currencyRates } from "~/types/currency";

const props = defineProps<{
  currencyList: currencyRates | null | undefined;
}>();

const emit = defineEmits<{
  (e: "updateCurrency", value: string | null): void;
}>();

const firstCurrency = ref<string | null>(null);
const secondCurrency = ref<string | null>(null);
const firstTotal = ref<number | null>(null);
const secondTotal = ref<number | null>(null);
const itemList = computed(() => Object.keys(props.currencyList ?? {}));
const calculateCurrency = (source: "first" | "second") => {
  if (!firstCurrency.value || !secondCurrency.value || !props.currencyList) {
    return;
  }

  const rateFirst =
    props.currencyList[firstCurrency.value as keyof currencyRates];
  const rateSecond =
    props.currencyList[secondCurrency.value as keyof currencyRates];

  // Exit if rates are not available
  if (!rateFirst || !rateSecond) {
    return;
  }

  if (source === "first") {
    if (firstTotal.value) {
      secondTotal.value = parseFloat(
        ((firstTotal.value * rateSecond) / rateFirst).toFixed(2)
      );
    } else {
      secondTotal.value = null;
    }
  } else if (source === "second") {
    if (secondTotal.value) {
      firstTotal.value = parseFloat(
        ((secondTotal.value * rateFirst) / rateSecond).toFixed(2)
      );
    } else {
      firstTotal.value = null;
    }
  }

  emit("updateCurrency", firstCurrency.value);
};
</script>

<template>
  <div>Please select currency you want to convert</div>
  <div class="sm:flex justify-center items-center mt-4">
    <UButtonGroup>
      <UTooltip
        :text="
          !firstCurrency || !secondCurrency
            ? 'Select first and second currency before entering amount'
            : ''
        "
      >
        <UInput
          v-model="firstTotal"
          placeholder="Amount"
          :ui="{
            leading: 'pointer-events-none',
          }"
          :disabled="!firstCurrency || !secondCurrency"
          @update:modelValue="calculateCurrency('first')"
          @keydown="allowOnlyNumbers"
        >
        </UInput>
      </UTooltip>

      <USelectMenu
        v-model="firstCurrency"
        :items="itemList"
        class="w-20"
        @update:modelValue="calculateCurrency('first')"
      />
    </UButtonGroup>

    <div class="mx-2 text-sm">to</div>

    <UButtonGroup>
      <UTooltip
        :text="
          !firstCurrency || !secondCurrency
            ? 'Select first and second currency before entering amount'
            : ''
        "
      >
        <UInput
          v-model="secondTotal"
          placeholder="Amount"
          :ui="{
            leading: 'pointer-events-none',
          }"
          :disabled="!firstCurrency || !secondCurrency"
          @update:modelValue="calculateCurrency('second')"
          @keydown="allowOnlyNumbers"
        >
        </UInput>
      </UTooltip>

      <USelectMenu
        v-model="secondCurrency"
        :items="itemList"
        class="w-20"
        @update:modelValue="calculateCurrency('second')"
      />
    </UButtonGroup>
  </div>

  <div
    v-if="firstTotal && firstCurrency && secondTotal && secondCurrency"
    class="mt-4"
  >
    <div class="w-fit bg-gray-100 p-4 rounded mx-auto font-bold">
      {{
        firstTotal.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      }}
      {{ firstCurrency }} =
      {{
        secondTotal.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      }}
      {{ secondCurrency }}
    </div>
  </div>
</template>
