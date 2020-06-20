<template>
  <div>
    <Card>
      <p slot="title"><Icon type="ios-flame" /> 与你相关的热点研究领域</p>
      <div slot="extra">
        <Button type="text"><Icon type="ios-more" /></Button>
      </div>
      <Row>
        <Col span="8" style="text-align: center">
          <Button type="text" style="display: inline-block"><Icon type="md-add" /> {{ areas[0] }}</Button>
        </Col>
        <Col span="8" style="text-align: center">
          <Button type="text" style="display: inline-block"><Icon type="md-add" /> {{ areas[1] }}</Button>
        </Col>
        <Col span="8" style="text-align: center">
          <Button type="text" style="display: inline-block"><Icon type="md-add" /> {{ areas[2] }}</Button>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'TrendingArea',
    props: [
      'areas',
    ],
    data () {
      return {
        //
      }
    }
  };
</script>

<style scoped>
  /**/
</style>
