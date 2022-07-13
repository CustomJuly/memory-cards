<template>
  <Dropdown :offset-x="-16" class="ccd">
    <AppLabel
      v-for="(country, index) in countries"
      :key="index"
      class="ccd__label"
      @click="$emit('input', country)"
    >
      <svg-icon :name="country.icon" class="ccd__icon" />
      <p class="ccd__code">
        {{ country.code }}
      </p>
    </AppLabel>
  </Dropdown>
</template>

<script>
export default {
  name: 'CountryCodesDropdown',
  data () {
    return {
      countries: [
        {
          code: '+7',
          icon: 'ru'
        },
        {
          code: '+1',
          icon: 'us'
        },
        {
          code: '+381',
          icon: 'rs'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.ccd {
  max-height: 240px;
  overflow-y: auto;

  &__label {
  }

  &__icon {
    width: 21px;
    height: 16px;
    margin-right: 4px;
  }

  &__code {
    color: $color-black;
    font-size: 16px;
    line-height: 16px;
  }
}
</style>
