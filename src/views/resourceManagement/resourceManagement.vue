<template>
  <!-- 资源管理 -->
  <div class="app-container">
    <div class="up">
      <div class="left">
        <div class="search">
          <el-input
            v-model="searchKey"
            placeholder="请输入搜索词"
            prefix-icon="el-icon-search"
            style="width:200px; "
          />
          <el-button
            type="primary"
            style="margin-left:10px ;"
            icon="el-icon-search"
            >搜索</el-button
          >

          <el-dropdown>
            <el-button type="primary" style="margin-left:10px ;">
              {{ typeName }}<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="setType('全部', 1)"
                >全部</el-dropdown-item
              >
              <el-dropdown-item @click="setType('课件', 2)"
                >课件</el-dropdown-item
              >
              <el-dropdown-item @click="setType('教案', 1)"
                >教案</el-dropdown-item
              >
              <el-dropdown-item @click="setType('视频', 1)"
                >视频</el-dropdown-item
              >
              <el-dropdown-item @click="setType('图片', 1)"
                >图片</el-dropdown-item
              >
              <el-dropdown-item @click="setType('音频', 1)"
                >音频</el-dropdown-item
              >
              <el-dropdown-item @click="setType('试题', 1)"
                >试题</el-dropdown-item
              >
              <el-dropdown-item @click="setType('文档', 1)"
                >文档</el-dropdown-item
              >
              <el-dropdown-item @click="setType('文档', 1)"
                >其他</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown>
            <el-button type="primary" style="margin-left:10px ;">
              {{ partName }}<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="setType('章节', 1)"
                >按章节选择</el-dropdown-item
              >
              <el-dropdown-item @click="setType('知识点', 2)"
                >按知识点选择</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <el-cascader
            v-model="value"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            placeholder="按类型选择"
          />
          <!-- 
          <el-cascader
            :options="options"
            :props="props"
            collapse-tags
            clearable
            placeholder="按类型选择"
          /> -->
        </div>
      </div>
      <div class="right">
        <el-button
          @click="drawer = true"
          type="primary"
          style="margin-left:10px ;"
          >上传文件</el-button
        >
        <el-button type="danger" style="margin-left:10px ;"
          >批量删除文件</el-button
        >
      </div>
    </div>
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        border
        highlight-current-row
        :default-sort="{ prop: 'date', order: 'descending' }"
        tooltip-effect="dark"
        style="width: 100%"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="文件格式" align="center">
          <template slot-scope="{ row }">
            <img :src="row.imgSrc" alt="" style="width: 64px; height: 64px" />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="文件名称"
          width="120"
          align="center"
        />
        <el-table-column
          prop="download"
          label="下载数"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="collection"
          label="被收藏"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="show"
          label="是否公开"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-tag v-if="row.state == true" type="success">是</el-tag>
            <el-tag v-else-if="row.state == false" type="danger"
              >否</el-tag
            ></template
          >
        </el-table-column>

        <el-table-column
          prop="operator"
          label="操作"
          align="center"
          width="300"
        >
          <template slot-scope="{ row }">
            <el-button type="primary" plain @click="onTongguo(row.id)"
              >修改</el-button
            >
            <el-button type="danger" plain @click="bohuiDialog = true"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer
      title="上传文件"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-form
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left: 50px"
      >
        <!-- 文件名称 -->
        <el-form-item label="文件名称">
          <el-input v-model="name"></el-input>
        </el-form-item>

        <!-- 文件格式 -->
        <el-form-item label="资源类型">
          <el-dropdown>
            <el-button type="primary" >
              {{ typeName }}<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="setType('课件', 2)"
                >课件</el-dropdown-item
              >
              <el-dropdown-item @click="setType('教案', 1)"
                >教案</el-dropdown-item
              >
              <el-dropdown-item @click="setType('视频', 1)"
                >视频</el-dropdown-item
              >
              <el-dropdown-item @click="setType('图片', 1)"
                >图片</el-dropdown-item
              >
              <el-dropdown-item @click="setType('音频', 1)"
                >音频</el-dropdown-item
              >
              <el-dropdown-item @click="setType('试题', 1)"
                >试题</el-dropdown-item
              >
              <el-dropdown-item @click="setType('文档', 1)"
                >文档</el-dropdown-item
              >
              <el-dropdown-item @click="setType('文档', 1)"
                >其他</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>

        <!-- 文件类型 -->
        <el-form-item label="文件类型">
          <el-input v-model="idNo"></el-input>
        </el-form-item>

        <!-- 是否公开 -->
        <el-form-item label="是否公开">
          <el-switch
            v-model="value"
        
          >
          </el-switch>
        </el-form-item>

        <!-- 描述 -->
        <el-form-item label="描述">
          <el-input
            type="textarea"
            maxlength="30"
            show-word-limit
            :autosize="{ minRows: 3, maxRows: 4 }"
            placeholder="请输入文件描述"
            v-model="fileDesc"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import {} from "../../api/resourceManagement/resourceManagement";
import image from "../../image/yunpanlogo-.png";
import image1 from "../../image/yunpanlogo-1.png";
import image2 from "../../image/yunpanlogo-2.png";
import image3 from "../../image/yunpanlogo-3.png";
import image4 from "../../image/yunpanlogo-4.png";
import image5 from "../../image/yunpanlogo-5.png";
import image6 from "../../image/yunpanlogo-6.png";
import image7 from "../../image/yunpanlogo-7.png";
import image8 from "../../image/yunpanlogo-8.png";
export default {
  name: "ResourceManagement",

  data() {
    return {
      fileDesc: "",
      searchKey: "",
      currentRow: null,
      value: [],
      drawer: false,
      typeName: "课件",
      partName: "章节",
      tableData: [
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        },
        {
          date: "2016-05-03",
          imgSrc: image6,

          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          download: 123,
          collection: 266,
          state: true
        }
      ],
      multipleSelection: [],

      props: { multiple: true },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ]
    };
  },
  methods: {
    setType(typeName, num) {
      this.typeName = typeName;
    },
    handleChange(value) {
      console.log(value);
    },
    setCurrent(row) {
      this.$refs.multipleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭上传文件吗？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style lang="less" scoped>
.up {
  display: flex;
  justify-content: space-between;

  .left {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
