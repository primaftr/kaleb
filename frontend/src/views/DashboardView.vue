<template>
  <div class="flex min-h-[100dvh] items-center justify-center bg-gray-950 px-4 dark:bg-gray-950">
    <div class="w-full max-w-md space-y-6">
      <div class="space-y-2 text-center">
        <div v-if="isLoading" class="flex items-center justify-center animate-pulse">
          <div class="h-8 w-32 rounded-md bg-gray-700 dark:bg-gray-600"></div>
        </div>
        <div v-else>
          <h1 class="text-3xl font-bold text-gray-50">Hi, {{ data?.data?.username }}</h1>
        </div>
        <button
          @click="logout"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-gray-50 text-gray-950 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetUserInfo } from '@/api/user'
import { useAuthCleanup, useAuthHook } from '@/utils/authentication'
import { computed } from 'vue'
const { isAuthenticated } = useAuthHook()

const { data, isLoading } = useGetUserInfo({
  enabled: computed(() => isAuthenticated.value)
})

const logout = () => {
  useAuthCleanup()
}
</script>
