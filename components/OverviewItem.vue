<template>
  <div class="overview-item">
    <div class="row">
      <div class="col-sm-6">
        <div class="overview-item__id">[ {{ item.id }} ]</div>
        <h3 class="mb-24 mb-0-sm">{{ item.title }}</h3>
      </div>
      <div class="col-sm-6">
        <p>{{ item.description }}</p>
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
  @include respond-to(sm){
    padding: 40px 0;
  }
  &__id{
    margin-bottom: 12px;
    @include fsz(13px);
    color: rgb(var(--color-gold));
    font-weight: 500;
  }
}
</style>