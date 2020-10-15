<template>
  <!-- 角色管理 -->

  <div class="app-container">
    <div class="up">
      <div class="left">
        <span
          >公司代码:
          <el-input
            v-model="companyCode"
            style="width:200px; "
            placeholder="请输入公司代码"
          ></el-input
        ></span>
        <span style="marginLeft:20px"
          >角色名:
          <el-input
            v-model="name"
            style="width:200px; "
            placeholder="请输入角色名"
          ></el-input
        ></span>
        <el-button
          type="primary"
          style="margin-left:10px ;"
          icon="el-icon-search"
          @click="getRoles"
          >搜索</el-button
        >
      </div>
      <div class="right">
        <el-button
          @click="openCreateUserDialog"
          type="primary"
          style="margin-left:10px ;"
          icon="el-icon-plus"
          >新建角色</el-button
        >
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="roleData"
      stripe
      border
      highlight-current-row
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="name" label="角色名" width="120" align="center" />
      <el-table-column
        prop="departId"
        label="部门id"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="code"
        label="角色编码"
        align="center"
        show-overflow-tooltip
      />

      <el-table-column prop="operator" label="操作" align="center" width="300">
        <template slot-scope="{ row }">
          <el-button type="primary" plain @click="modifyRoles(row.id)"
            >修改</el-button
          >
          &nbsp;
          <el-popconfirm @onConfirm="deleteRoles(row.id)" title="确定删除吗？">
            <el-button slot="reference" type="danger" plain>删除</el-button>
          </el-popconfirm></template
        >
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 非屏幕主体内容 -->
    <!-- 添加角色弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible="createUserDialog"
      width="40rem"
      title="添加角色"
      :before-close="closeCreateUserDialog"
    >
      <el-form
        :model="newRoles"
        :rules="rules"
        label-position="left"
        label-width="140px"
        style="width: 400px; margin-left: 50px"
      >
        <!-- 角色编码 -->
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="newRoles.code"></el-input>
        </el-form-item>

        <!-- 部门id -->
        <el-form-item label="部门id" prop="departId">
          <el-input v-model="newRoles.departId"></el-input>
        </el-form-item>

        <!-- 角色名 -->
        <el-form-item label="角色名" prop="name">
          <el-input v-model="newRoles.name"></el-input>
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
        <el-button type="primary" @click="createUser">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqBindFunction,
  reqBindMenu,
  reqCreateRole,
  reqDelRole,
  reqEditRole,
  reqQueryRole
} from "../../api/systemManagement/roleManagement";
export default {
  data() {
    return {
      //分页数据
      page: 1,
      size: 10,
      total: 0,
      //角色名
      name: "",
      //公司名
      companyCode: "",
      //角色表格数据
      roleData: [
        {
          name: "aa",
          departId: "aa",
          code: "aa"
        }
      ],

      newRoles: {
        //角色编码，唯一
        code: "",
        //部门id
        departId: "",
        //角色名
        name: ""
      },
      //新建用户验证规则
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入角色编码", trigger: "blur" }],
        departId: [{ required: true, message: "请输入部门id", trigger: "blur" }]
      },
      //添加角色弹窗状态
      createUserDialog: false
    };
  },
  mounted() {
    // this.getRoles();
  },
  methods: {
    //删除角色按钮
    async deleteRoles(roleId) {
      const res = await reqDelRole(roleId);
      if (res.code === 0) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
      } else {
        this.$message({
          type: "error",
          message: "删除失败 "
        });
      }
    },
    //修改角色按钮
    modifyRoles(roleId) {
      this.$prompt("请输入角色名", "角色名修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "角色名不能为空"
      })
        .then(async ({ roleName }) => {
          const res = await reqEditRole(roleId, roleName);
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "修改的名称为: " + roleId
            });
          } else {
            this.$message({
              type: "error",
              message: "修改失败 "
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
        });
    },
    handleCurrentChange(page) {
      this.page = page;
      console.log(`当前页: ${this.page}`);
    },
    handleSizeChange(size) {
      this.size = size;
      console.log(`每页 ${size} 条`);
    },
    //添加角色按钮
    openCreateUserDialog() {
      this.newRoles.name = "";
      this.newRoles.code = "";
      this.newRoles.departId = "";
      this.createUserDialog = true;
    },
    //查询角色
    async getRoles() {
      const { page, size, companyCode, name } = this;
      const res = await reqQueryRole(page, size, companyCode, name);
      if (res.code === 0) {
        this.roleData = res.data.records;
        this.total = res.data.total;
        console.log(res.data);
      } else {
        this.$message({
          type: "error",
          message: "加载失败 "
        });
      }
    },

    //添加角色弹窗右上角❌号方法
    closeCreateUserDialog() {
      this.createUserDialog = false;
    },
    //添加角色方法
    async createUser() {
      const { code, name, departId } = this.newRoles;
      const res = await reqCreateRole(code, departId, name);
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
