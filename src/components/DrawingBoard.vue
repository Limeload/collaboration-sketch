<template>
  <div>
    <canvas
      ref="canvas"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="endDrawing"
    ></canvas>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      canvas: null,
      context: null,
      isDrawing: false,
      lastX: 0,
      lastY: 0,
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d');
    this.socket = io('http://localhost:3000'); // Update with your server URL

    this.socket.on('drawing', (data) => {
      this.handleRemoteDrawing(data);
    });
  },
  methods: {
    startDrawing(e) {
      this.isDrawing = true;
      this.lastX = e.offsetX;
      this.lastY = e.offsetY;
    },
    draw(e) {
      if (!this.isDrawing) return;

      this.context.beginPath();
      this.context.moveTo(this.lastX, this.lastY);
      this.context.lineTo(e.offsetX, e.offsetY);
      this.context.stroke();

      // Emit the drawing data to other users
      this.socket.emit('drawing', {
        lastX: this.lastX,
        lastY: this.lastY,
        currentX: e.offsetX,
        currentY: e.offsetY,
      });

      this.lastX = e.offsetX;
      this.lastY = e.offsetY;
    },
    endDrawing() {
      this.isDrawing = false;
    },
    handleRemoteDrawing(data) {
      this.context.beginPath();
      this.context.moveTo(data.lastX, data.lastY);
      this.context.lineTo(data.currentX, data.currentY);
      this.context.stroke();
    },
  },
};
</script>

<style>
canvas {
  border: 1px solid #000;
}
</style>
