<template>
  <v-container>
    <h2>{{title}}</h2>
    <v-list two-line>
      <div v-show="currentType !== 'favorite'">
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
      </div>
      <div v-if="currentType !== 'lisbon'">
        <v-subheader inset>포르투</v-subheader>
        <link-list
          :obj="portoObj"
          @update="getList()"
        ></link-list>
      </div>
        <div v-if="currentType !== 'porto'">
        <v-subheader inset>리스본</v-subheader>
        <link-list
          :obj="lisbonObj"
          @update="getList()"
        ></link-list>
      </div>
      <div v-if="!(currentType === 'lisbon' || currentType === 'porto')">
        <v-subheader inset>일반</v-subheader>
        <link-list
          :obj="generalObj"
          @update="getList()"
        ></link-list>
      </div>
    </v-list>
  </v-container>
</template>

<script>
import _pickBy from 'lodash/pickBy'
import firebase from '@/plugins/firebase'
import 'firebase/database'
import CONFIG from '@/config'
import LinkList from './LinkList'

export default {
  name: 'DataTemplate',
  components: {
    LinkList
  },
  watch: {
    $route (newRoute) {
      const { type } = newRoute.params
      this.note = ''
      this.link = ''
      this.currentType = type
      this.getList()
    }
  },
  data () {
    return {
      ref: null,
      currentType: '',
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
  computed: {
    title () {
      switch (this.currentType) {
        case 'favorite': return '즐겨찾기'
        case 'porto': return '포르투'
        case 'lisbon': return '리스본'
        case 'accomodation': return '숙소'
        case 'transportation': return '교통수단'
        case 'restaurant': return '맛집'
        case 'cafe': return '카페'
        case 'desert': return '디저트'
        case 'wine': return '와인 / 맥주'
        case 'shopping': return '쇼핑'
        case 'activity': return '액티비티'
        default: return '제목없음'
      }
    }
  },
  methods: {
    getList () {
      let keyField
      let equalToVal
      switch (this.currentType) {
        case 'favorite':
          keyField = 'isFavorite'
          equalToVal = true
          break
        default:
          keyField = 'type'
          equalToVal = this.currentType
          break
      }
      this.ref.orderByChild(keyField).equalTo(equalToVal).once('value').then((snapshot) => {
        this.items = snapshot.val()
        this.portoObj = _pickBy(this.items, { city: 'porto' })
        this.lisbonObj = _pickBy(this.items, { city: 'lisbon' })
        this.generalObj = _pickBy(this.items, { city: 'general' })
      }).catch((err) => {
        console.error(err)
        this.$router.push('/login')
      })
    },
    async addLink () {
      const meta = await this.$http.get(`${CONFIG.HEROKU_URL}${this.link}`).then((res) => {
        console.log(res)
        const { meta } = res.data
        return meta
      })

      const payload = {
        meta,
        city: this.selectedCity,
        note: this.note,
        isFavorite: false,
        addedDate: new Date(),
        type: this.currentType,
        link: this.link
      }
      this.ref.push().set(payload)
    }
  },
  mounted () {
    this.ref = firebase.database().ref('/data')
    this.ref.on('value', () => this.getList())
    this.currentType = this.$route.params.type
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
</style>

