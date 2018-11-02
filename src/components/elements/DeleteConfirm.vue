<template>
  <v-dialog
      v-model="dialog"
      max-width="290"
    >
    <v-card>
      <v-card-title class="headline">삭제 확인</v-card-title>

      <v-card-text>
        정말 삭제할까요?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="green darken-1"
          flat="flat"
          @click="$emit('cancel')"
        >
          아니오
        </v-btn>

        <v-btn
          color="green darken-1"
          flat="flat"
          @click="$emit('confirm')"
        >
          네
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteConfirm',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isOpen (newVal) {
      this.dialog = newVal
    },
    dialog (dialog) {
      if (dialog) return
      this.$emit('cancel')
    }
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
