<template>
  <div class="overview-item">
    <div class="row">
      <div class="col-sm-6">
        <HelperText>{{ item.id }}</HelperText>
        <h3 class="mb-24 mb-0-sm word-split">{{ item.title }}</h3>
      </div>
      <div class="col-sm-6">
        <p class="from-right lg">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.overview-item{
  padding: 80px 0;
  border-bottom: 1px solid rgb(var(--color-stroke));
  text-align: left;
  @include respond-to(sm){
    padding: 40px 0;
  }
  h3{
    margin-top: 12px;
  }
}
</style>