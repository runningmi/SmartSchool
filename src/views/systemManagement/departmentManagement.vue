<template>
  <!-- 部门管理 -->
  <div class="app-container">
    <div class="filter-container head">
      <el-input
        placeholder="请输入名称搜索"
        style="width: 200px"
        class="filter-item"
        clearable
        v-model="name"
      />
      <!-- 搜索按钮 -->
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 1rem"
        @click="queryDepart"
        >搜索</el-button
      >
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        style="margin-left: 1rem"
        @click="openAddDepartment"
        >添加部门</el-button
      >
    </div>

    <el-table :data="list" border fit row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" highlight-current-row style="width: 100%">
      <el-table-column type="index" align="center"></el-table-column>
      <!-- 部门名字 -->
      <el-table-column label="部门名字" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <!-- 部门类型 -->
      <el-table-column label="部门类型" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.orgType == 1">平台级</span>
          <span v-else-if="row.orgType == 2">学校级</span>
          <span v-else-if="row.orgType == 3">下级部门</span>
        </template>
      </el-table-column>


      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="{ row }">
          <el-button type="primary" plain>编辑</el-button>
          <el-button type="primary" plain @click="onDelDepart(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加部门 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible="addDepartmentDialog"
      width="40rem"
      title="添加部门"
      :before-close="closeAddDepartmentDialog"
    >
      <el-form
        label-position="left"
        label-width="140px"
        style="width: 400px; margin-left: 50px"
      >
        <!-- 部门名字 -->
        <el-form-item label="部门名字">
          <el-input v-model="addDepartmentName"></el-input>
        </el-form-item>

        <el-form-item label="活动区域">
          <el-select v-model="orgTypeValue" placeholder="请选择">
            <el-option
              v-for="(item, index) in orgTypeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 取消按钮 -->
        <el-button
          @click="addDepartmentDialog = false"
          style="margin-right: 0.2rem"
          >取消</el-button
        >

        <!-- 确认按钮 -->
        <el-button type="primary" @click="addDepartment">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqQueryDepart,
  reqCreateDepart,
  reqEditDepart,
  reqDelDepart,
} from "../../api/systemManagement/departmentManagement";
export default {
  data() {
    return {
      list: [],

      //添加部门弹窗状态
      addDepartmentDialog: false,

      //搜索文本框
      name:"",

      //部门名字
      addDepartmentName: "",

      orgTypeOptions: [
        {
          value: "1",
          label: "平台级",
        },
        {
          value: "2",
          label: "学校级",
        },
        {
          value: "3",
          label: "下级部门",
        },
      ],
      orgTypeValue: "",
    };
  },
  methods: {
    //获取全部数据以及搜索
    async queryDepart() {
      var res = await reqQueryDepart(1, 10 , this.name);
      if (res.code == 0) {
        this.list = res.data.records;
      } else {
        this.$message.error("获取数据失败,请重新登录或刷新重试");
      }
    },

    // 添加部门按钮
    openAddDepartment() {
      this.addDepartmentDialog = true;
    },

    //添加部门方法
    async addDepartment() {
      var res = await reqCreateDepart(this.addDepartmentName,this.orgTypeValue,"");
      if(res.code == 0){
          this.addDepartmentDialog = true;
          this.$message("添加成功")
      }else{
          this.$message.error("添加失败请稍后重试")
      }
    },

    //添加部门弹窗右上角❌号方法
    closeAddDepartmentDialog() {
      this.addDepartmentDialog = false;
    },

    //删除部门
    onDelDepart(id) {
      this.$confirm("此操作会删除此部门?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          status = 0;
          var res = await reqDelDepart(id);
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "删除部门成功!",
            });
            this.queryDepart();
          } else {
            this.$message({
              type: "error",
              message: "删除部门失败!",
            });
            this.queryDepart();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除部门",
          });
          this.queryDepart();
        });
    },

  },
  mounted() {
    this.queryDepart();
  },
};
</script>
<style lang="less" scoped>
</style>