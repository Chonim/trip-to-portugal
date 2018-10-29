<template>
  <v-list two-line>
    <v-text-field
      v-model="link"
      label="링크"
    ></v-text-field>
    <v-text-field
      v-model="note"
      label="설명"
    ></v-text-field>
    <v-select
      :items="cityList"
      @change="selectedCity = $event"
      label="도시"
    ></v-select>
    <v-btn
      @click="addLink(link)"
    >추가</v-btn>
    <v-subheader inset>포르투</v-subheader>
    <link-list
      :obj="portoObj"
      @update="getList()"
    ></link-list>
    <v-subheader inset>리스본</v-subheader>
    <link-list
      :obj="lisbonObj"
      @update="getList()"
    ></link-list>
    <v-subheader inset>일반</v-subheader>
    <link-list
      :obj="generalObj"
      @update="getList()"
    ></link-list>
  </v-list>
</template>

<script>
import _pickBy from 'lodash/pickBy'
import firebase from '@/plugins/firebase'
import 'firebase/database'
// import CONFIG from '@/config'
import LinkList from './LinkList'

export default {
  name: 'DataTemplate',
  components: {
    LinkList
  },
  watch: {
    $route (newRoute) {
      this.getList()
      this.note = ''
      this.link = ''
    }
  },
  data () {
    return {
      ref: null,
      portoObj: {},
      lisbonObj: {},
      generalObj: {},
      cityList: ['porto', 'lisbon', 'general'],
      selectedCity: '',
      note: '',
      link: '',
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          title: 'Ali Connors',
          subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        }
      ]
    }
  },
  methods: {
    getList () {
      this.ref.orderByChild('type').equalTo(this.$route.params.type).once('value').then((snapshot) => {
        this.items = snapshot.val()
        this.portoObj = _pickBy(this.items, { city: 'porto' })
        this.lisbonObj = _pickBy(this.items, { city: 'lisbon' })
        this.generalObj = _pickBy(this.items, { city: 'general' })
      }).catch((err) => {
        console.error(err)
        this.$router.push('/login')
      })
    },
    addLink () {
      const payload = {
        city: this.selectedCity,
        note: this.note,
        isFavorite: false,
        addedDate: new Date(),
        type: this.$route.params.type,
        link: this.link
      }
      this.ref.push().set(payload)
    }
  },
  mounted () {
    this.ref = firebase.database().ref('/data')
    this.ref.on('value', () => this.getList())
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
</style>

