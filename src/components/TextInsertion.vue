<template>
  <div>
    <h1>Text Insertion</h1>
    <textarea v-model="text" rows="4" cols="50"></textarea>
    <button @click="insertText">Insert Text</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    };
  },
  methods: {
    insertText() {
      // Emit an event to notify the parent component about the inserted text
      this.$emit('insert-text', this.text);
    },
  },
};
</script>
