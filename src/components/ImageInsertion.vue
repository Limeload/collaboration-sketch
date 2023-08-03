<template>
  <div>
    <h1>Image Insertion</h1>
    <input v-model="imageUrl" placeholder="Image URL">
    <button @click="insertImage">Insert Image</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
    };
  },
  methods: {
    insertImage() {
      // Emit an event to notify the parent component about the inserted image
      this.$emit('insert-image', this.imageUrl);
    },
  },
};
</script>
