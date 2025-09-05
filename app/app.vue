<template>
  <UApp :toaster="{ position: 'top-right', duration: 3000 }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style scoped lang="scss">
@import "@/assets/css/main.css";
div {
  font-family: "Noto Sans Thai", sans-serif;
}
</style>
