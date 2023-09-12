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
        "prose prose-sm sm:prose-base lg:prose-base xl:prose-xl m-5 focus:outline-none px-20 min-w-fit max-w-[100%]",
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
      class="border-b-[1px] p-3 border-slate-200 bg-slate-50 sticky top-[9%] z-[104]"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold'), 'editor-button': true }"
      >
        bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{
          'is-active': editor.isActive('italic'),
          'editor-button': true,
        }"
      >
        italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{
          'is-active': editor.isActive('strike'),
          'editor-button': true,
        }"
      >
        strike
      </button>
      <button
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{
          'is-active': editor.isActive('underline'),
          'editor-button': true,
        }"
      >
        toggleUnderline
      </button>
      <button
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code'), 'editor-button': true }"
      >
        code
      </button>

      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{
          'is-active': editor.isActive('paragraph'),
          'editor-button': true,
        }"
      >
        paragraph
      </button>
      <select
        v-model="selectedHeadingLevel"
        @change="setHeadingLevel"
        class="editor-select"
      >
        <!-- <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="3">Heading 3</option>
      <option value="4">Heading 4</option>
      <option value="5">Heading 5</option>
      <option value="6">Heading 6</option> -->
        <option value="2">Heading 1</option>
        <option value="3">Heading 2</option>
        <option value="4">Heading 3</option>
        <option value="5">Heading 4</option>
        <option value="6">Heading 5</option>
      </select>
      <select
        v-model="selectedTextAlign"
        @change="setTextAlign"
        class="editor-select"
      >
        <option value="left">text left</option>
        <option value="right">text right</option>
        <option value="center">text center</option>
        <option value="justify">text justify</option>
      </select>

      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{
          'is-active': editor.isActive('bullet list'),
          'editor-button': true,
        }"
      >
        bullet list
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{
          'is-active': editor.isActive('ordered list'),
          'editor-button': true,
        }"
      >
        ordered list
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{
          'is-active': editor.isActive('code block'),
          'editor-button': true,
        }"
      >
        code block
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{
          'is-active': editor.isActive('blockquote'),
          'editor-button': true,
        }"
      >
        blockquote
      </button>
      <button
        @click="editor.chain().focus().setHorizontalRule().run()"
        :class="{ 'editor-button': true }"
      >
        horizontal rule
      </button>
      <!-- <button

      @click="editor.chain().focus().setHardBreak().run()"
      :class="{ 'editor-button': true }"
    >
      hard break
    </button> -->
      <button @click="addImage" :class="{ 'editor-button': true }">
        setImage
      </button>
      <button
        @click="editor.chain().undo().run()"
        :disabled="!editor.can().chain().undo().run()"
        :class="{ 'editor-button': true }"
      >
        undo
      </button>
      <button
        @click="editor.chain().redo().run()"
        :disabled="!editor.can().chain().redo().run()"
        :class="{ 'editor-button': true }"
      >
        redo
      </button>
    </div>
    <editor-content :editor="editor" class="min-h-[80vh]" />
  </div>
</template>

<style scoped>
/* Basic editor styles */
.editor-select {
  @apply px-[0.8em] py-[0.3em] border rounded-md transition-colors duration-100 ease-in-out text-sm lg:text-base;
  /* Add other styling as needed */
}
.editor-select option {
  @apply px-[0.8em] py-[0.3em] border rounded-md transition-colors duration-100 ease-in-out text-sm lg:text-base;
}

button,
select {
  margin: 4px;
}
.editor-button {
  /* @apply px-2 py-1 border rounded-md transition-colors duration-100 ease-in-out bg-white text-sm lg:text-base; */
  @apply px-[0.8em] py-[0.3em] border rounded-md transition-colors duration-100 ease-in-out bg-white text-sm lg:text-base;
}

.editor-button.is-active {
  @apply bg-blue-500 text-white;
}

.editor-button:hover {
  @apply bg-blue-200;
}
</style>
