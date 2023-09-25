const showSuccessToast = (message: string = "success") => {
    useNuxtApp().$toast.success(message, {
        autoClose: 2000,
        position: useNuxtApp().$toast.POSITION.TOP_CENTER,
        theme: 'light',
        hideProgressBar: true,
    })
}

const showErrorToast = (message: string, durationMs: number = 3000) => {
    useNuxtApp().$toast.error(message, {
        autoClose: durationMs,
        position: useNuxtApp().$toast.POSITION.TOP_CENTER,
        theme: 'light',
        hideProgressBar: true,
    })
}

export { showSuccessToast, showErrorToast }