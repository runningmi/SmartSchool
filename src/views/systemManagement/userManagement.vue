<template>
  <!-- 用户管理 -->
  <div class="app-container">
    <div class="filter-container head">
      <el-input
        placeholder="请输入手机号搜索"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <!-- 搜索按钮 -->
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 1rem"
        >搜索</el-button
      >
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        style="margin-left: 1rem"
        @click="openCreateUserDialog"
        >添加用户</el-button
      >
    </div>

    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" align="center"></el-table-column>
      <!-- 名称 -->
      <el-table-column label="名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <!-- 个性化名称 -->
      <el-table-column label="个性化名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>

      <!-- 学号 -->
      <el-table-column label="学号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>

      <!-- 手机号 -->
      <el-table-column label="手机号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <!-- 身份证号 -->
      <el-table-column label="身份证号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.idNo }}</span>
        </template>
      </el-table-column>

      <!-- 时间 -->
      <el-table-column label="时间" align="center">
        <template slot-scope="{ row }">
          <span
            >{{ row.createDate.year }}-{{ row.createDate.monthValue }}-{{
              row.createDate.dayOfMonth
            }}
            {{ row.createDate.hour }}-{{ row.createDate.minute }}</span
          >
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="300">
        <template>
          <el-button type="primary" plain>编辑用户</el-button>
          <el-button type="primary" plain>更改角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      style="margin-top: 1rem"
      :total="this.roleTotal * 1"
      background
      :current-page="page"
      :page-size="size"
      @current-change="roleCurrentChange"
      @size-change="roleHandleSizeChange"
      layout="total, prev, pager, next"
    ></el-pagination>

    <!-- 添加用户弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible="createUserDialog"
      width="40rem"
      title=" 添加用户"
      :before-close="closeCreateUserDialog"
    >
      <el-form
        label-position="left"
        label-width="140px"
        style="width: 400px; margin-left: 50px"
      >
        <!-- 姓名 -->
        <el-form-item label="姓名">
          <el-input v-model="name"></el-input>
        </el-form-item>

        <!-- 部门 -->
        <el-form-item label="roleIds">
          <el-input v-model="rolelds"></el-input>
        </el-form-item>

        <!-- 身份证号 -->
        <el-form-item label="身份证号">
          <el-input v-model="idNo"></el-input>
        </el-form-item>

        <!-- 学号或教职工编号 -->
        <el-form-item label="学号或教职工编号">
          <el-input v-model="no"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码">
          <el-input v-model="passCode"></el-input>
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item label="手机号">
          <el-input v-model="phone"></el-input>
        </el-form-item>

        <!-- 个性化用户名 -->
        <el-form-item label="个性化用户名">
          <el-input v-model="userName"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 取消按钮 -->
        <el-button
          @click="createUserDialog = false"
          style="margin-right: 0.2rem"
          >取消</el-button
        >

        <!-- 确认按钮 -->
        <el-button type="primary" @click="createUSer">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqQueryAllUser,
  reqCreateUser,
  reqEditUser,
  reqEditRoleOfUserditUser,
} from "../../api/systemManagement/userManagement";
export default {
  data() {
    return {
      //表格数据
      list: [],

      //添加角色
      //名字
      name: "",

      //部门
      rolelds: "",

      //身份证号
      idNo: "",

      //学号或教职工编号
      no: "",

      //密码
      passCode: "",

      //手机号
      phone: "",

      //个性化用户名
      userName: "",

      //添加角色弹窗状态
      createUserDialog: false,

      //分页
      roleTotal: "",

      //页码
      page: 1,

      //条数
      size: 10,
    };
  },
  mounted() {
    this.queryAllUser();
  },
  methods: {
    //   请求所有数据
    async queryAllUser() {
      var res = await reqQueryAllUser(this.page, this.size, "", "", "", "", "");
      console.log(res);
      if (res.code == 0) {
        this.list = res.data.records;
        this.roleTotal = res.data.total;
      } else {
        this.$message.error("未获取到数据，请退出或刷新重试");
      }
    },

    //页码数量切换时触发
    roleHandleSizeChange(size) {
      this.size = size;
    },
    //页码切换时触发,删除后触发
    roleCurrentChange(page) {
      this.page = page;
      // console.log(page);
      this.queryDepart();
    },

    //添加角色按钮
    openCreateUserDialog() {
      this.createUserDialog = false;
      this.name = "";
      this.roleIds = "";
      this.idNo = "";
      this.no = "";
      this.passCode = "";
      this.phone = "";
      this.userName = "";
      this.createUserDialog = true;
    },

    //添加角色方法
    async createUSer() {
      console.log(this.name, "this.name");
      console.log(this.rolelds, "this.rolelds");
      console.log(this.idNo, "this.idNo");
      console.log(this.no, "this.no");
      console.log(this.passCode, "this.passCode");
      console.log(this.phone, "this.phone");
      console.log(this.userName, "this.userName");
      var res = await reqCreateUser(
        this.name,
        this.rolelds,
        this.idNo,
        this.no,
        this.passCode,
        this.phone,
        this.userName
      );
      if (res.code == 0) {
        this.createUserDialog = false;
        this.$message("添加成功");
        this.name = "";
        this.roleIds = "";
        this.idNo = "";
        this.no = "";
        this.passCode = "";
        this.phone = "";
        this.userName = "";
      } else {
        this.$message.error("添加失败");
      }
    },

    //添加角色弹窗右上角❌号方法
    closeCreateUserDialog() {
      this.createUserDialog = false;
    },
  },
};
</script>
<style lang="less" scoped>
</style>