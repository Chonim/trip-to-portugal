<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 lg5 mb-3>
        <v-textarea
          name="input-7-4"
          label="새 노트"
          v-model="newNote"
          auto-grow
        ></v-textarea>
        <v-btn
          @click="addNote()"
        >새 노트 추가</v-btn>
        <div class="note-gap"></div>
        <div
          v-for="(item, index) in notes"
          :key="item + index"
        >
          <div
            class="icon-wrapper"
          >
            <v-icon
              @click="deleteNote(item.key)"
            >delete</v-icon>
          </div>
          <v-textarea
            box
            :readonly="item.readonly"
            name="input-7-4"
            light
            :background-color="item.author && item.author.includes('치호') ? '#aec6cf' : '#ff6961'"
            auto-grow
            :label="`By ${item.author} on ${item.date}`"
            :value="item.content"
          >
          </v-textarea>
        </div>
      </v-flex>

    </v-layout>
    <snack-bar
      :snackbar="snackbar"
      text="추가 완료!"
      @close="snackbar = false"
    ></snack-bar>
  </v-container>
</template>

<script>
import 'firebase/database'
import _orderBy from 'lodash/orderBy'
import SnackBar from '@/components/elements/SnackBar'
import { createPayload } from '@/utils/firebase'

export default {
  name: 'NoteIndex',
  components: {
    SnackBar
  },
  data () {
    return {
      ref: null,
      snackbar: false,
      notes: [],
      newNote: ''
    }
  },
  methods: {
    getNotes () {
      this.ref.once('value').then((snapshot) => {
        const results = snapshot.val()
        Object.keys(results).forEach((objKey) => {
          results[objKey].key = objKey
          results[objKey].readonly = true
        })
        this.notes = _orderBy(results, ['key'], ['desc'])
      })
    },
    addNote () {
      const payload = createPayload({
        content: this.newNote
      })
      this.ref.push().set(payload).then(() => {
        this.snackbar = true
        this.newNote = ''
      })
    },
    deleteNote (key) {
      const ref = this.ref.child(key)
      ref.remove()
    }
  },
  mounted () {
    this.ref = this.$firebase.database().ref('note')
    this.ref.on('value', () => this.getNotes())
    this.getNotes()
  }
}
</script>

<style lang="scss" scoped>
.note-gap {
  width: 2px;
  height: 20px;
}
.icon-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
