<template>
  <mt-datetime-picker class="needclick" ref="birthDatePicker" @touchmove.stop.prevent
                      :startDate="new Date(new Date().getFullYear()-70, 1, 1)"
                      :endDate="new Date(new Date().getFullYear()-10, 1, 1)" type="date" year-format="{value} 年"
                      month-format="{value} 月"
                      date-format="{value} 日" @confirm="saveBirthDate"></mt-datetime-picker>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      saveBirthDate(e) {
        let d = new Date(e)
        let month = (d.getMonth() + 1).toString().padStart(2, '0'),
          date = d.getDate().toString().padStart(2, '0')
        let birthDate = `${d.getFullYear()}-${month}-${date}`
        this.$emit('birthdatechange', birthDate)
      },
      open() {
        this.$refs.birthDatePicker.open()
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
