<template>
  <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :color="color"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  props: {
    snackbar: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      y: 'top',
      x: null,
      mode: '',
      timeout: 2000,
      color: 'success'
    }
  },
  watch: {
    snackbar () {
      window.setTimeout(() => {
        this.$emit('close')
      }, this.timeout)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
