<template>
  <div class="flex min-h-[100dvh] items-center justify-center bg-gray-950 px-4 dark:bg-gray-950">
    <div class="w-full max-w-md space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold text-gray-50">Welcome back</h1>
        <p class="text-gray-400">Enter your username and password to sign in</p>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="space-y-2" v-if="loginError">
          <span class="text-red-500 text-sm">{{ loginError }}</span>
        </div>
        <div class="space-y-4">
          <div class="space-y-2">
            <InputText
              placeholder="Username"
              label="username"
              type="text"
              :error="error?.username"
              v-model:modelValue="formValue.username"
            />
          </div>
          <div class="space-y-2">
            <InputText
              placeholder="At least 8 characters"
              label="password"
              type="password"
              :error="error?.password"
              v-model="formValue.password"
            />
          </div>

          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-gray-50 text-gray-950 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>

      <div class="text-center text-sm text-gray-400">
        Don't have an account?
        <RouterLink
          class="font-medium underline underline-offset-4 hover:text-gray-50 dark:hover:text-gray-50"
          to="/register"
          >Register</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import { useAuthHook } from '@/utils/authentication'
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import z from 'zod'

type FormSchemaType = z.infer<typeof formSchema>

const formValue = reactive({
  username: '',
  password: ''
})

const { login, loginError } = useAuthHook()

const formSchema = z.object({
  username: z.string().min(1, { message: 'This field must be filled.' }),
  password: z.string().min(1, { message: 'This field must be filled.' })
})

const error = ref<z.ZodFormattedError<FormSchemaType>>()

const onSubmit = () => {
  const validSchema = formSchema.safeParse(formValue)
  if (!validSchema.success) {
    error.value = validSchema.error.format()
  } else {
    error.value = { _errors: [] }
    login({ username: formValue.username, password: formValue.password })
  }
}
</script>
