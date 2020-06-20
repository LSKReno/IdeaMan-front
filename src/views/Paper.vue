<template>
  <div>
    <Row>
      <Col span="24">
        <h1>{{ paper.title }}</h1>
        <p>Authors:
          <Button v-for="a in paper.authors" :key="a.id" type="text">{{ a.name }}
          </Button>
        </p>
      </Col>
    </Row>
    <Divider/>
    <Row class="row-distance" style="min-height: 100px">
      <Col span="18">
        <p>Tags:
          <Button v-for="t in paper.tags" :key="t" type="text" icon="md-pricetag">{{ t
            }}
          </Button>
        </p>
        <p>Keywords: {{ keywordsLine }}</p>
      </Col>
      <Col span="6">
        <div class="operation-buttons">
          <div class="button-box">
            <Button class="button-width-fixed" icon="md-cloud-download">
              Download
            </Button>
          </div>
          <div class="button-box">
            <Button class="button-width-fixed" icon="md-star">Favorite</Button>
          </div>
          <div class="button-box">
            <Button class="button-width-fixed" icon="ios-paper">Feedback
            </Button>
          </div>
        </div>
      </Col>
    </Row>
    <Row class="row-distance">
      <Col span="24">
        <h1>Abstract</h1>
        <Divider/>
        <p>{{ paper.abstract }}</p>
        <img style="margin-top: 10px" :src="thumbnailURL"
             alt="Paper Thumbnails"/>
      </Col>
    </Row>
    <Row class="row-distance">
      <Col span="24">
        <h1>Recommendations</h1>
        <div class="box-in-detail">
          Available after login.
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import paperSample from '@/assets/1806.07822v2.pdf.jpg'

  export default {
    name: 'Paper',
    beforeCreate() {
      this.$http.get('/paper/' + this.$route.params.paperId).then(response => {
        this.paper = response.data
      })
    },
    data() {
      return {
        paper: {},
        thumbnailURL: paperSample,
      }
    },
    computed: {
      keywordsLine() {
        return this.paper.keywords.join(', ')
      },
      authorsLine() {
        return this.paper.authors.map(a => a.name).join(', ')
      },
    },
  }
</script>

<style scoped>
  @import "../styles/commons.css";

  .operation-buttons {
    position: absolute;
    right: 0;
  }

  .button-box {
    margin-bottom: 5px;
  }

  .button-width-fixed {
    width: 100%;
  }
</style>