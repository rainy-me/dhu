<template>
  <syllabus-layout class="course">
    <h1 class="syllabus-page-title">
      {{ $page.course.title }}
      <span class="course-title-code">{{ $page.course.id }}</span>
    </h1>

    <p class="course-teacher">
      <g-link :to="`/teacher/${$page.course.teacher.id}`">
        {{ $page.course.teacher.name }}
      </g-link>
    </p>

    <div class="syllabus-page-statistics-wrapper">
      <h2 class="syllabus-page-statistics-title course-margin">Tags</h2>

      <syllabus-button :link="link" v-for="(link, id) in tags" :key="id" />

      <syllabus-section
        title="Requirements"
        :content="$page.course.requirements"
      />
      <syllabus-section
        title="requirements Adjusted"
        :content="$page.course.requirementsAdjusted"
      />
      <syllabus-section title="Contact" :content="$page.course.contact" />
      <syllabus-section title="Purpose" :content="$page.course.purpose" />
      <syllabus-section title="Target" :content="$page.course.target" />
      <!-- <syllabus-section
        title="Teaching Style"
        :content="$page.course.teachingStyle"
      /> -->
      <syllabus-section title="Contents" :content="$page.course.contents" />
      <syllabus-section title="References" :content="$page.course.references" />
      <syllabus-section title="Final Test" :content="$page.course.task" />
      <syllabus-section title="Task" :content="$page.course.finalTest" />
      <syllabus-section
        title="Grade Policy"
        :content="$page.course.gradePolicy"
      />
      <syllabus-section title="Message" :content="$page.course.message" />
    </div>
  </syllabus-layout>
</template>

<page-query>
query Course($id: ID!) {
  course: course(id: $id) {
    id
    title
    start
    practicalTeacher
    credit
    time

    target
    purpose
    requirements
    requirementsAdjusted
    gradePolicy
    finalTest
    task
    contents

    task
    # textbooks
    thingsToPrepare
    references
    message
    contact
    category {
      id
      name
    }
    field {
      name
      id
    }
    year {
      name
    }
    teacher {
      id
      name
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.course.title,
    };
  },
  computed: {
    tags() {
      const course = this.$page.course;
      return [
        {
          name: course.credit,
          url: `#`,
        },

        {
          name: course.start,
          url: `#`,
        },
        {
          name: course.time,
          url: `#`,
        },
        {
          name: course.location,
          url: `#`,
        },
        {
          name: course.type,
          url: `#`,
        },
        {
          name: course.category.name,
          url: `/category/${course.category.id}`,
        },
        {
          name: course.field.name,
          url: `/field/${course.field.id}`,
        },
        {
          name:
            course.year.name === "不明" ? "年: 不明" : course.year.name + "年",
          url: `#`,
        },
        {
          name: course.compulsory,
          url: `#`,
        },
      ].filter((tag) => tag.name && tag.name !== "不明");
    },
  },
};
</script>

<style lang="scss" scoped>
.course {
  &-title {
    &-sub {
      text-align: center;
      color: $theme-green;
      font-size: 1.4rem;
    }
    &-code {
      background-color: #f2f6f5;
      padding: 2px 5px;
      font-size: 1rem;
      display: inline-block;
      border-radius: 5px;
      width: fit-content;
      font-size: 0.9rem;
      margin-left: 15px;
      font-weight: normal;
      &:before {
        content: "#";
      }
    }
  }

  &-teacher {
    font-size: 1.6rem;
    color: $theme-grey;
    text-align: center;
  }
}
@media screen and (max-width: 640px) {
  .course {
    &-txt {
      padding-left: 0;
      font-size: 1.1rem;
    }
  }
}
</style>
