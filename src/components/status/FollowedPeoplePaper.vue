<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="md-star" /> 你关注的用户 {{ user.name }} 发表了文章
      </p>
      <div slot="extra">
        <p v-if="type === 'arxiv'">来自 arXiv&nbsp;&nbsp;&nbsp;<Icon type="ios-more" /></p>
      </div>
      <h3><a :href="url">{{ title }}</a></h3>
      <div>{{ abstractStriped }}</div>
      <div>
        <Button v-for="t in tags" :key="t" type="text" icon="md-pricetag">{{ t }}</Button>
      </div>
      <div>
        <img style="margin-top: 10px; width: 100%;" :src="thumbnailUrl" alt="Paper Thumbnails" />
      </div>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'FollowedPeoplePaper',
    props: [
        'type',
        'user',
        'title',
        'authors',
        'abstract',
        'tags',
        'url',
        'keywords',
        'thumbnailUrl'
    ],
    data () {
      return {
        //
      }
    },
    computed: {
      abstractStriped () {
        if (this.abstract.length <= 280) {
          return this.abstract
        } else {
          return this.abstract.slice(0, 280) + '...'
        }
      }
    }
  };
</script>

<style scoped>

</style>