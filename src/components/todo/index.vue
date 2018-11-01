<template>
  <v-content>
    <v-container style="max-width: 500px">
      <v-text-field
        v-model="newTask"
        label="해야 할 일이 무엇인가요?"
        solo
      >
        <v-fade-transition slot="append">
          <v-icon
            v-if="newTask"
            @click="create"
          >
            add_circle
          </v-icon>
        </v-fade-transition>
      </v-text-field>
      
      <h2 class="display-1 pl-3">
        모든 할 일들:&nbsp;
        <v-fade-transition leave-absolute>
          <span :key="`tasks-${tasks.length}`">
            {{ tasks.length }} 개
          </span>
        </v-fade-transition>
      </h2>
      
      <v-divider class="mt-3"></v-divider>
      
      <v-layout
        my-1
        align-center
      >
        <strong class="mx-3 text--darken-3">
          남은 일: {{ remainingTasks }}
        </strong>
        
        <!-- Will be fixed for v1.2 -->
        <v-divider vertical></v-divider>
        
        <strong class="mx-3">
          끝낸 일: {{ completedTasks }}
        </strong>
        
        <v-spacer></v-spacer>
        
        <v-progress-circular
          :value="progress"
          class="mr-2"
        ></v-progress-circular>
      </v-layout>
      
      <v-divider class="mb-3"></v-divider>
      
      <v-card v-if="tasks.length > 0">
        <v-slide-y-transition
          class="py-0"
          group
          tag="v-list"
        >
          <template v-for="(task, i) in tasks">
            <v-divider
              v-if="i !== 0"
              :key="`${i}-divider`"
            ></v-divider>

            <v-list-tile 
              :key="`${i}-${task.text}`"
            >
              <v-list-tile-action>
                <v-checkbox
                  :input-value="task.done"
                  @change="updateTodo(task.key, !task.done)"
                  color="darken-3"
                >
                  <div
                    slot="label"
                    :class="task.done && 'grey--text' || 'text--primary'"
                    class="ml-3"
                    v-text="task.text"
                  ></div>
                </v-checkbox>
              </v-list-tile-action>

              <v-spacer></v-spacer>

              <v-scroll-x-transition>
                <v-icon
                  v-if="task.done"
                  color="success"
                >
                  check
                </v-icon>
              </v-scroll-x-transition>
              <v-scroll-x-transition>
                <v-icon
                  v-if="!task.done"
                  @click="deleteTodo(task.key)"
                  color="error"
                >
                  close
                </v-icon>
              </v-scroll-x-transition>
            </v-list-tile>
          </template>
        </v-slide-y-transition>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import 'firebase/database'
import _orderBy from 'lodash/orderBy'

export default {
  name: 'TodoList',
  data: () => ({
    ref: null,
    tasks: [],
    newTask: null
  }),
  computed: {
    completedTasks () {
      return this.tasks.filter(task => task.done).length
    },
    progress () {
      return this.completedTasks / this.tasks.length * 100
    },
    remainingTasks () {
      return this.tasks.length - this.completedTasks
    }
  },
  methods: {
    create () {
      const date = new Date().toLocaleDateString()
      const author = this.$firebase.auth().currentUser.displayName
      const payload = {
        author,
        date,
        text: this.newTask,
        done: false
      }
      this.ref.push().set(payload).then(() => {
        this.newTask = null
      })
    },
    updateTodo (key, done) {
      const ref = this.ref.child(key)
      ref.update({ done })
    },
    deleteTodo (key) {
      const ref = this.ref.child(key)
      ref.remove()
    },
    getTodos () {
      this.ref.once('value').then((snapshot) => {
        const results = snapshot.val()
        Object.keys(results).forEach((objKey) => {
          results[objKey].key = objKey
        })
        this.tasks = _orderBy(results, ['key'], ['desc'])
      })
    }
  },
  mounted () {
    this.ref = this.$firebase.database().ref('todo')
    this.ref.on('value', () => this.getTodos())
    this.getTodos()
  }
}
</script>

<style lang="scss" scoped>
</style>
