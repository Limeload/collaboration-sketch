<template>
  <div class="whiteboard">
    <h1>Welcome to the Whiteboard App</h1>
    <div class="whiteboard-canvas">
      <canvas ref="whiteboardCanvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"></canvas>
    </div>
    <button @click="clearCanvas">Clear</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawing: false,
      context: null,
    };
  },
  mounted() {
    // Initialize canvas and context
    this.context = this.$refs.whiteboardCanvas.getContext("2d");
    this.context.strokeStyle = "black";
    this.context.lineWidth = 2;
  },
  methods: {
    startDrawing(event) {
      this.drawing = true;
      this.context.beginPath();
      this.context.moveTo(event.clientX - this.$refs.whiteboardCanvas.offsetLeft, event.clientY - this.$refs.whiteboardCanvas.offsetTop);
    },
    draw(event) {
      if (!this.drawing) return;
      this.context.lineTo(event.clientX - this.$refs.whiteboardCanvas.offsetLeft, event.clientY - this.$refs.whiteboardCanvas.offsetTop);
      this.context.stroke();
    },
    stopDrawing() {
      this.drawing = false;
    },
    clearCanvas() {
      this.context.clearRect(0, 0, this.$refs.whiteboardCanvas.width, this.$refs.whiteboardCanvas.height);
    },
  },
};
</script>


<style scoped>
.whiteboard {
  text-align: center;
}

.whiteboard-canvas {
  border: 1px solid #000;
}

button {
  margin-top: 10px;
}
</style>
