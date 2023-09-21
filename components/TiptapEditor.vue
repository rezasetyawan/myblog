<script setup lang="ts">
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor, EditorContent } from "@tiptap/vue-3";

interface Props {
  text: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["onchange"]);
const showMobileMenu = ref<boolean>(false);

const editor = useEditor({
  extensions: [
    StarterKit,
    Document,
    Dropcursor,
    Image,
    Underline,
    TextAlign.configure({
      types: ["heading", "paragraph", "image"],
    }),
  ],
  editorProps: {
    attributes: {
      class:
        "prose prose-base  max-w-none mx-2 text-black font-rubik my-5 prose-pre:max-w-fit prose-h2:text-xl prose-h2:font-extrabold prose-li:marker:text-black focus:outline-none",
    },
  },
  content: props.text,
  onUpdate: () => {
    emit("onchange", editor.value?.getHTML());
  },
});

const addImage = () => {
  const url = window.prompt("URL");

  if (url) {
    editor.value
      ?.chain()
      .focus()
      .insertContent({
        type: "image",
        attrs: {
          src: url,
          alt: "Description of the image",
        },
      })
      .run();
  }
};

const selectedHeadingLevel = ref<string>("2");

type Level = 2 | 3 | 4 | 5 | 6;

const setHeadingLevel = () => {
  const headingLevel = parseInt(selectedHeadingLevel.value) as Level;

  if (!isNaN(headingLevel)) {
    editor.value?.chain().focus().toggleHeading({ level: headingLevel }).run();
  }
};

const selectedTextAlign = ref<string>("left");

const setTextAlign = () => {
  editor.value?.chain().focus().setTextAlign(selectedTextAlign.value).run();
};
</script>
<template>
  <div class="mx-0 border-[1px] border-slate-200 rounded-md">
    <div
      v-if="editor"
      class="border-b-[1px] p-3 border-slate-200 bg-slate-50 z-[104] flex flex-wrap items-center sticky top-16"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold'), 'editor-button': true }"
        class="group"
      >
        <Icon name="octicon:bold-16" class="w-4 h-4" />
        <span class="tooltip">bold</span>
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{
          'is-active': editor.isActive('italic'),
          'editor-button': true,
        }"
        class="group"
      >
        <Icon name="mingcute:italic-fill" class="w-4 h-4" />
        <span class="tooltip">italic</span>
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{
          'is-active': editor.isActive('strike'),
          'editor-button': true,
        }"
        class="group"
      >
        <Icon name="mingcute:strikethrough-fill" class="w-4 h-4" />
        <span class="tooltip">strikethrough</span>
      </button>
      <button
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{
          'is-active': editor.isActive('underline'),
          'editor-button': true,
        }"
        class="group"
      >
        <Icon name="mingcute:underline-fill" class="w-4 h-4" />
        <span class="tooltip">underline</span>
      </button>
      <button
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code'), 'editor-button': true }"
        class="group"
      >
        <Icon name="mingcute:paragraph-fill" class="w-4 h-4" />
        <span class="tooltip">paragraph</span>
      </button>
      <div class="group inline-block relative leading-6">
        <select
          v-model="selectedHeadingLevel"
          @change="setHeadingLevel"
          class="editor-select"
        >
          <option value="2">H1</option>
          <option value="3">H2</option>
          <option value="4">H3</option>
          <option value="5">H4</option>
          <option value="6">H5</option>
        </select>
        <span class="tooltip whitespace-nowrap">heading</span>
      </div>
      <div class="group inline-block relative">
        <select
          v-model="selectedTextAlign"
          @change="setTextAlign"
          class="editor-select"
        >
          <option value="left">left</option>
          <option value="right">right</option>
          <option value="center">center</option>
          <option value="justify">justify</option>
        </select>
        <span class="tooltip whitespace-nowrap">text align</span>
      </div>
      <button
        @click="editor.chain().undo().run()"
        :disabled="!editor.can().chain().undo().run()"
        :class="{ 'editor-button': true }"
        class="group"
      >
        <Icon name="material-symbols:undo" class="w-5 h-5" />
        <span class="tooltip whitespace-nowrap">undo</span>
      </button>
      <button
        @click="editor.chain().redo().run()"
        :disabled="!editor.can().chain().redo().run()"
        :class="{ 'editor-button': true }"
        class="group"
      >
        <Icon name="material-symbols:redo" class="w-5 h-5" />
        <span class="tooltip whitespace-nowrap">redo</span>
      </button>

      <div class="max-md:inline-block max-md:ml-auto max-md:relative">
        <button
          @click="() => (showMobileMenu = !showMobileMenu)"
          class="md:hidden"
        >
          <Icon name="pepicons-pencil:dots-y" size="24" />
        </button>
        <div
          class="max-md:absolute max-md:p-3 max-md:z-20 max-md:transition-all max-md:duration-[200ms] max-md:top-9 max-md:bg-white right-0 max-md:shadow-md mobile-menu flex flex-wrap max-md:w-40"
          :class="{ hidden: !showMobileMenu }"
        >
          <button
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{
              'is-active': editor.isActive('bullet list'),
              'editor-button': true,
            }"
            class="group"
          >
            <Icon name="fluent:text-bullet-list-24-filled" class="w-4 h-4" />
            <span class="tooltip whitespace-nowrap">bullet list</span>
          </button>
          <button
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{
              'is-active': editor.isActive('ordered list'),
              'editor-button': true,
            }"
            class="group"
          >
            <Icon name="mingcute:list-ordered-fill" class="w-4 h-4" />
            <span class="tooltip whitespace-nowrap">ordered list</span>
          </button>
          <button
            @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{
              'is-active': editor.isActive('blockquote'),
              'editor-button': true,
            }"
            class="group"
          >
            <Icon name="tabler:blockquote" class="w-4 h-4" />
            <span class="tooltip whitespace-nowrap">blockquote</span>
          </button>
          <button
            @click="addImage"
            :class="{ 'editor-button': true }"
            class="group"
          >
            <Icon name="bi:image" size="24" class="w-4 h-4" />
            <span class="tooltip whitespace-nowrap">set image</span>
          </button>
          <button
            @click="editor.chain().focus().toggleCode().run()"
            :disabled="!editor.can().chain().focus().toggleCode().run()"
            :class="{
              'is-active': editor.isActive('code'),
              'editor-button': true,
            }"
            class="group"
          >
            <Icon name="mingcute:code-fill" class="w-4 h-4" />
            <span class="tooltip">code</span>
          </button>
          <button
            @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{
              'is-active': editor.isActive('code block'),
              'editor-button': true,
            }"
            class="group"
          >
            <Icon
              name="material-symbols:code-blocks-outline-rounded"
              class="w-4 h-4"
            />
            <span class="tooltip whitespace-nowrap">code block</span>
          </button>
          <button
            @click="editor.chain().focus().setHorizontalRule().run()"
            :class="{ 'editor-button': true }"
            class="group"
          >
            <Icon
              name="material-symbols:horizontal-rule-rounded"
              class="w-4 h-4"
            />
            <span class="tooltip whitespace-nowrap">horizontal rule</span>
          </button>
        </div>
      </div>
    </div>
    <editor-content :editor="editor" spellcheck="false" />
  </div>
</template>

<style scoped>
.editor-select {
  @apply px-[0.4em] py-[0.4em] border rounded-md transition-colors duration-100 ease-in-out text-sm lg:text-base font-medium;
}
.editor-select option {
  @apply px-[0.4em] py-[0.3em] border rounded-md transition-colors duration-100 ease-in-out text-sm lg:text-base font-medium bg-white;
}

button,
select {
  margin: 2px;
}
.editor-button {
  @apply px-[0.8em] py-[0.3em] border rounded-md transition-colors duration-100 ease-in-out bg-white text-sm lg:text-base relative;
}

.mobile-menu .editor-button {
  @apply max-md:block;
}

.tooltip {
  @apply hidden bg-gray-200 group-hover:inline group-hover:absolute right-0 top-8 z-20 px-[0.8em] py-[0.4em] rounded-sm text-black whitespace-nowrap;
}

.editor-button.is-active {
  @apply bg-blue-500 text-white;
}

.editor-button:hover {
  @apply bg-blue-200;
}

.toolbar {
  position: sticky;
  top: 10%;
}
</style>
