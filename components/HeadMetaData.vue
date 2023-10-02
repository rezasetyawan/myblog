<script setup lang="ts">
const config = useRuntimeConfig();

interface Props {
  title?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  pathname?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Blogs",
  metaDescription: "Blog Website that talk about technology and daily life",
  ogImageUrl:
    "https://cdn.discordapp.com/attachments/1156055860448067637/1156066554115526687/My_Blog.png?ex=65139e61&is=65124ce1&hm=d15e9c052fc59964e765f28f2655f67506ab61ef1b08c13ca3a7e4ceb996148f&",
  pathname: "/",
});

const { title, metaDescription, ogImageUrl, pathname } = toRefs(props);

const defaultTitle = "My Blog";
const baseUrl = config.public.siteUrl;
const pageUrl = baseUrl + pathname.value;

useServerSeoMeta({
  title: title.value + " | " + defaultTitle,
  ogTitle: title.value + " | " + defaultTitle,
  description: metaDescription.value,
  ogDescription: metaDescription.value,
  titleTemplate: title.value + " | " + defaultTitle,
  ogImage: ogImageUrl.value,
  ogImageUrl: ogImageUrl.value,
  twitterTitle: title.value + " | " + defaultTitle,
  twitterDescription: metaDescription.value,
  twitterImage: ogImageUrl.value,
  ogUrl: pageUrl,
  ogType: "website",
  twitterCard: "summary_large_image",
});

useHead({
  meta: [
    {
      name: "google-site-verification",
      content: "isXAGr5a6Hby5euUgrk9eeLnRKlA2hfeQrUmC1jk_y0",
    },
  ],
});
</script>
