<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-form v-model="valid" ref="form">
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="taskTitle"
                label="Add Task"
                required
                :rules="requiredRules"
              ></v-text-field>
              <v-text-field
                v-model="taskDescription"
                label="Add Task Description"
                required
                :rules="requiredRules"
              ></v-text-field>
              <v-text-field
                v-model="taskInfo"
                label="Add Task info"
                required
                :rules="requiredRules"
              ></v-text-field>
              <v-checkbox
                v-model="taskFinished"
                :label="`Finished this task?`"
              ></v-checkbox>
            </v-col>
            <v-col cols="4" class="d-flex justify-center align-center">
              <v-btn
                color="success"
                class="mr-4"
                @click="addTaskOfEdit"
                v-if="showEditBtn"
              >
                edit Task
              </v-btn>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="addTask"
                v-if="!showEditBtn"
              >
                Add Task
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12" v-if="tasks.length > 0">
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>title</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>description</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>Finished</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>Created At</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>Finished At</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>controls</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item v-for="(task,index) in tasks" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ task.title }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>{{ task.description }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>
                  {{ task.finishTask ? 'Yes' : 'No' }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>{{ task.created_at }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>{{ task.finished_at }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information-outline
                      </v-icon>
                    </template>
                    <span>{{ task.info }}</span>
                  </v-tooltip>
                  <v-icon
                    color="primary"
                    class="mr-2 ml-2 cursor"
                    @click="editTask(task,index)"
                  >
                    mdi-application-edit-outline
                  </v-icon>
                  <v-icon
                    color="red"
                    class="cursor"
                    @click="deleteTask(index)"
                  >
                    mdi-delete
                  </v-icon>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="tasks.length === 0">
        <v-card>
          <h2 class="pt-7 pb-7">No Tasks Add</h2>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'toDoList',
  data: () => ({
    taskTitle: '',
    taskDescription: '',
    taskInfo: '',
    taskFinished: false,
    userLatitude: null,
    userLongitude: null,
    valid: false,
    requiredRules: [
      v => !!v || 'field is required'
    ],
    tasks: [],
    indexOfEdit: '',
    showEditBtn: false
  }),
  created () {
    const success = (position) => {
      this.userLatitude = position.coords.latitude
      this.userLongitude = position.coords.longitude
      this.axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.userLatitude}&lon=${this.userLongitude}&appid=04c1e0e56c6a29c619226e46167aa81e&units=metric`).then((response) => {
        this.$store.commit('setCurrentWeather', response.data)
      })
    }
    const error = (err) => {
      console.log(err)
    }
    navigator.geolocation.getCurrentPosition(success, error)
  },
  methods: {
    addTask () {
      const taskItem = {
        title: this.taskTitle,
        description: this.taskDescription,
        info: this.taskInfo,
        finishTask: this.taskFinished,
        created_at: new Date().toLocaleString('en-US'),
        finished_at: this.taskFinished ? new Date().toLocaleString('en-US') : 'not Yet'
      }
      this.tasks.push(taskItem)
      this.$refs.form.reset()
    },
    editTask (task, index) {
      this.taskTitle = task.title
      this.taskDescription = task.description
      this.taskInfo = task.info
      this.taskFinished = task.taskFinished
      this.indexOfEdit = index
      this.showEditBtn = true
    },
    addTaskOfEdit () {
      this.tasks.splice(this.indexOfEdit, 1, {
        title: this.taskTitle,
        description: this.taskDescription,
        info: this.taskInfo,
        finishTask: this.taskFinished,
        created_at: new Date().toLocaleString('en-US'),
        finished_at: this.taskFinished ? new Date().toLocaleString('en-US') : 'not Yet'
      })
      this.$refs.form.reset()
      this.showEditBtn = false
    },
    deleteTask (index) {
      const confirmed = confirm('do you need to delete this task ?')
      if (confirmed) {
        this.tasks.splice(index, 1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cursor {
  cursor: pointer;
}
</style>
