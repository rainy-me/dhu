<template>
  <div class="syllabus-list-wrapper">
    <h2 class="syllabus-page-statistics-title">Subjects</h2>
    <ul class="syllabus-list">
      <li class="syllabus-list-item" v-for="item in items" :key="item.id">
        <g-link class="syllabus-button-link" :to="item.url">
          {{ item.name }}
          <span class="syllabus-list-item-code">{{ item.id }}</span>
        </g-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["items"],
};
</script>

<style lang="scss">
.syllabus-list {
  &-wrapper {
    padding: 0 2rem;
  }
  &-item {
    transition: 0.3s all ease-in-out;
    font-size: 1.2rem;
    border-bottom: 1px solid $theme-pale-green;
    display: flex;
    justify-content: space-between;
    a {
      display: block;
      padding: 1rem;
      width: 100%;
    }
    &-code {
      background-color: #f2f6f5;
      padding: 2px 5px;
      font-size: 1rem;
      border-radius: 5px;
      float: right;
      &:before {
        content: "#";
      }
    }
    &:hover {
      background-color: $theme-pale-green;
    }
  }
}
@media screen and (max-width: 640px) {
  .syllabus-list {
    &-wrapper {
      padding: 0;
    }
  }
}
</style>
