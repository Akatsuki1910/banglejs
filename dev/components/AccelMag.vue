<template lang="pug">
div
  button(ref="btnConnect") Connect
  div
    p accel
    p(v-for="i in accel" :key="i")
      span.bar
        span(:ref="i")
  div
    p mag
    p(v-for="i in mag" :key="i")
      span.bar
        span(:ref="i")

</template>

<script lang="ts">
import bangle from './bangle.js'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AccelMag extends Vue {
  accel = ['accelX', 'accelY', 'accelZ', 'accelDiff', 'accelMag']
  mag = ['magX', 'magY', 'magZ', 'magdX', 'magdY', 'magdZ', 'magH']

  mounted() {
    bangle(this.$refs.btnConnect, this.onLine)
  }

  // methods()
  onLine(line: string) {
    const d = line.split(',')
    if (d[0] == 'A') {
      this.accel.forEach((e, i) => {
        this.setBarPos(e, parseInt(d[i + 1]))
      })
    }
    if (d[0] == 'M') {
      this.mag.forEach((e, i) => {
        this.setBarPos(e, parseInt(d[i + 1]))
      })
    }
  }

  setBarPos(id: string, d: number) {
    const s = (this.$refs[id] as HTMLElement[])[0].style
    if (d > 150) d = 150
    if (d < -150) d = -150
    if (d >= 0) {
      s.left = '150px'
      s.width = d + 'px'
    } else {
      // less than 0
      s.left = 150 + d + 'px'
      s.width = -d + 'px'
    }
  }
}
</script>

<style lang="stylus" scoped>
.bar
  width 300px
  height 24px
  background-color #d0d0d0
  position relative
  display inline-block
  span
    width 1px
    height 20px
    background-color red
    position absolute
    display inline-block
    left 150px
    top 2px
</style>
