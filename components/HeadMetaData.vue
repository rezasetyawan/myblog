<script setup lang="ts">
const config = useRuntimeConfig()

interface Props {
    title?: string;
    metaDescription?: string;
    ogImageUrl?: string;
    pathname?: string;
}

const props = withDefaults(defineProps<Props>(), {
    title: "Blogs",
    metaDescription: "",
    ogImageUrl: "https://cdn.discordapp.com/attachments/1156055860448067637/1156066554115526687/My_Blog.png?ex=65139e61&is=65124ce1&hm=d15e9c052fc59964e765f28f2655f67506ab61ef1b08c13ca3a7e4ceb996148f&",
    pathname: "/",
})

const { title, metaDescription, ogImageUrl, pathname } = toRefs(props)

const defaultTitle = "My Blog"
const baseUrl = config.public.siteUrl
const pageUrl = baseUrl + pathname.value

useHead({
    meta: [
        { property: 'og:title', content: title.value },
        { property: 'og:description', content: title.value },
        { property: 'og:image', content: ogImageUrl.value }
    ]
})

</script>
<template>
    <Head>
        <Title>{{ defaultTitle + ' | ' + title }}</Title>
        <Meta name="description" :content="`${defaultTitle} | ${title}`" />

        <!-- Facebook Meta Tags -->
        <Meta property="og:url" :content="pageUrl" />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" :content="`${defaultTitle} | ${title}`" />
        <Meta property="og:description" :content="metaDescription" />
        <Meta property="og:image" :content="ogImageUrl" />

        <!-- Twitter Meta Tags -->
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta property="twitter:domain" content="rezasetyawan-myblog.vercel.app" />
        <Meta property="twitter:url" :content="pageUrl" />
        <Meta name="twitter:title" :content="`${defaultTitle} | ${title}`" />
        <Meta name="twitter:description" :content="metaDescription" />
        <Meta name="twitter:image" :content="ogImageUrl" />
    </Head>
</template>