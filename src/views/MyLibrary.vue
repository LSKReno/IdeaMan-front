<template>
  <div>
    <Row :gutter="8">
      <Col :span="rightOpen ? 16 : 24">
        <input id ="uploadbibfile" type="file" value="" style="visibility:hidden" @change="uploads"></input>
        <Table border stripe ref="selection" :columns="paperTableColumns" :data="nowData"
               class="box-in-detail" :show-header="true" @on-selection-change='selectionClick' ></Table>
        <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" @on-page-size-change="_nowPageSize" show-total show-sizer show-elevator/>
      </Col>
      <Col v-if="rightOpen" :span="8">
      <br>
        <Card class="box-in-detail" v-show="!modifyMode" dis-hover>
          <div slot="title">
            <Row style="width: 100%;">
              <Col :span="12"><a style="color: black;" @click="closeDetail">
                <Icon type="md-close"/>
              </a></Col>
              <Col :span="12" style="text-align: right;"><a
                  style="color: black;">编辑
                <Icon type="md-create"/>
              </a></Col>
            </Row>
          </div>
          <h3>{{ nowData[currentIndex].title }}</h3>
          <p style="margin-top: 10px;">{{
            authorsLine(nowData[currentIndex].authors) }}</p>
          <p style="margin-top: 10px;">
            <Icon type="md-pricetag" style="margin-right: 10px;"/>
            <Tag v-for="t in nowData[currentIndex].tags" :key="t">{{ t }}</Tag>
          </p>
          <p style="margin-top: 10px;">{{ nowData[currentIndex].abstract }}</p>
          <img :src="samplePaper" alt="Paper Thumbnails"
               style="max-width: 100%; margin-top: 10px;"/>
          <p style="margin-top: 10px;">关键词：{{
            keywordsLine(nowData[currentIndex].keywords)
            }}</p>
          <Divider/>
          <p>引用数据：</p>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import paperSample from '@/assets/1806.07822v2.pdf.jpg'

  export default {
    name: 'MyLibrary',
    beforeMount() {
      this.$http.get('/my_library').then(response => {
        this.papers = response.data;
        this._getData()
      })

    },
    data() {
      return {

        //分页
        nowData : [],
        pageSize: 10,//每页显示多少条
        dataCount: 0,//总条数
        pageCurrent: 1,//当前页
        //删除
        paper_id:[],

        currentIndex: 0,
        modifyMode: false,
        samplePaper: paperSample,
        papers: [],
        paperTableColumns: [
          //多选
          {
                    type: 'selection',
                    width: '50',
          },

          {
            key: 'title',
            render: (h, {row, column, index}) => h('div', {
                  style: {
                    margin: '5px 0',
                  },
                },
                [
                  h('h4', [
                    h('a', {
                          on: {
                            click: ()=>{
                              this.showDetail(index)
                            },
                          },
                          style: {
                            color: 'black',
                          },
                        },
                        [
                          row.title,
                        ]),
                  ]),
                  h('p', [
                    this.authorsLine(row.authors),
                  ]),
                ].concat(row.tags.map(t => h('Tag', [t])))),
            renderHeader: h => h('div', {
                  style: {
                    margin: '10px 0',
                  },
                },
                [
                  h('Button', {
                        props: {
                          type: 'success',
                        },
                        on:{
                          click:()=>{
                            uploadbibfile.click()
                          }
                        }
                      },
                      ['添加...'],
                  ),
                  h('Button', {
                        props: {
                          type: 'error',
                        },
                        style: {
                          'margin-left': '10px',
                        },
                        on:{
                          click:()=>{
                            this.deletelibrary();
                          }
                        }
                      },
                      ['删除'],
                  ),
                  h('Button', {
                        props: {
                          type: 'primary',
                        },
                        style: {
                          'margin-left': '10px',
                        },
                        on:{
                          click:()=>{
                            this.export_click()
                          },
                        },
                      },
                      ['导出'],
                  ),
                  h('Input',{
                    props:{
                      type:'text',
                      placeholder:'查找……',
                      icon:'ios-search',
                     },

                    style:{
                      'margin-left': '10px',
                      'width':'200px',
                    },
                    on:{
                      'on-change':()=>{
                        let tmpword=""+event.target.value
                        this.filter(tmpword);
                      }
                    }
                  }),
                ]),
          },
        ],

      }
    },
    methods: {
      authorsLine(authors) {
        return authors.map(a => a.name).join(', ')
      },
      keywordsLine(keywords) {
        return keywords.join(', ')
      },
      showDetail(index) {
        this.currentIndex = index
      },
      closeDetail() {
        this.currentIndex = -1
      },
      filter(str){
        if(str==""){
          this._getData();
          this.changepage(1);

        }else{
          var searchkeyword = new RegExp(str);
          let tmppapers=this.papers;
          this.papers = [];
          for (let i = 0; i < this.dataCount; i++) {
            var title = ""+tmppapers[i].title;
            if(searchkeyword.test(title)){
              this.papers.push(tmppapers[i]);
            }
          }
          this._getData();
          this.changepage(1);
          this.papers= tmppapers;
        }
      },
      //删除
      deletelibrary(){
        let url = "/my_library/delete"
        let data = {
            paper_id: this.paper_id
        }

        this.$http.post(url, data)
        .then((res) => {
            this.$http.get('/my_library').then(response => {
              this.papers = response.data;
              this._getData();
              this.changepage(1);
            })
            console.log(res) //返回的数据
        })
        .catch((err) => {
            console.log(err) //错误信息
        })
      },
      selectionClick(row) {
        this.paper_id=[];
        for(var i = 0;i<row.length;i++){
          this.paper_id.push(row[i].id);
        }
      },
      export_click(){
        // 发送一个 POST 请求
        let url = "/my_library/download"
        let data = {
            paper_id: this.paper_id
        }

        this.$http.post(url, data)
        .then((res)=>{
          this.download(res);
        })
        .catch((err)=>{
          console.log(err) //错误信息
        })
      },
      download (resp) {
        if (!resp.data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([resp.data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'log.bib')

        document.body.appendChild(link)
        link.click()
      },
      uploads(e){
        const file=e.target.files[0];//获取到当前文件对象

        let URL=window.URL||window.webkitURL; // 与上传没有关系（可选）
        // 传递一个 FormData 对象 即可
        let formData=new FormData();
        formData.append('file',file); // 'file' 可变 相当于 input 表单的name 属性
        // 服务器只需按照正常的上传程序代码即可
        this.$http.post('/my_library',formData).then(rs=>{
          this.$Message.success(
            "添加成功!"
            );
          this.$http.get('/my_library').then(response => {
              this.papers = response.data;
              this._getData()
            })
        }).catch(err=>{
          console.log(err)
        })
      },

      _getData() {
        //分页显示所有数据总数
        this.dataCount = this.papers.length;
        //循环展示页面刚加载时需要的数据条数
        for (let i = 0; i < this.pageSize; i++) {
          this.nowData.push(this.papers[i]);
        }
      },
      changepage(index) {
        //需要显示开始数据的index,(因为数据是从0开始的，页码是从1开始的，需要-1)
        let _start = (index - 1) * this.pageSize;
        //需要显示结束数据的index
        let _end = index * this.pageSize;
        //截取需要显示的数据
        this.nowData = this.papers.slice(_start, _end);
        //储存当前页
        this.pageCurrent = index;
        //刷新页面

        this.showDetail(0);
      },
       _nowPageSize(index) {
        //实时获取当前需要显示的条数
        this.pageSize = index;
      },
    },
    computed: {
      rightOpen() {
        return this.currentIndex !== -1
      },
    },
  }
</script>

<style scoped>
  @import "../styles/commons.css";

  .top-button {
    margin-left: 10px;
  }
  .paging{
      float:left;
      margin-top:10px;
  }
</style>