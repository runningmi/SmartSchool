<template>
  <!-- 菜单管理 -->
  <div class="app-container">
    <div class="up">
      <div class="left">
        <el-input
          v-model="name"
          style="width:200px; "
          placeholder="请输入菜单名称"
        ></el-input>
        <el-button
          type="primary"
          style="margin-left:10px ;"
          icon="el-icon-search"
          @click="getMenu"
          >搜索</el-button
        >
      </div>
      <div class="right">
        <el-button
          @click="openCreateMenuDialog"
          type="primary"
          style="margin-left:10px ;"
          icon="el-icon-plus"
          >新建菜单</el-button
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
      <el-table-column prop="name" label="菜单名" width="120" align="center" />
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
          <el-button type="primary" plain @click="modifyMenu(row.id)"
            >修改</el-button
          >
          &nbsp;
          <el-popconfirm @onConfirm="deleteMenu(row.id)" title="确定删除吗？">
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
      :total="100"
    >
    </el-pagination>

    <!-- 添加菜单弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible="createMenuDialog"
      width="40rem"
      title="新建菜单"
      :before-close="closeCreateMenuDialog"
    >
      <el-form
        :model="newMenu"
        label-position="left"
        label-width="140px"
        style="width: 400px; margin-left: 50px"
      >
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 取消按钮 -->
        <el-button
          @click="createMenuDialog = false"
          style="margin-right: 0.2rem"
          >取消</el-button
        >
        <!-- 确认按钮 -->
        <el-button type="primary" @click="createMenu">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqCreateMenu,
  reqDelMenu,
  reqEditMenu,
  reqQueryMenu
} from "../../api/systemManagement/menuManagement";
export default {
  data() {
    return {
      newMenu: {},
      page: 1,
      size: 10,
      total: 0,
      name: "",
      //添加角色弹窗状态
      createMenuDialog: false,
      roleData: [
        {
          name: "aa",
          departId: "aa",
          code: "aa"
        }
      ]
    };
  },
  mounted() {
    this.getMenu();
  },
  methods: {

    //新建菜单
    async createMenu() {
      const res = await reqCreateMenu(level,name,order,parentId,url);
      if (res.code === 0) {
        this.roleData = res.data.records;
        this.total = res.data.total;
        console.log(res.data);
        this.$message({
          type: "success",
          message: "删除成功 "
        });
      } else {
        this.$message({
          type: "error",
          message: "删除失败 "
        });
      }
    },
    //删除菜单
    async deleteMenu(menuId) {
      const res = await reqDelMenu(menuId);
      if (res.code === 0) {
        this.roleData = res.data.records;
        this.total = res.data.total;
        console.log(res.data);
        this.$message({
          type: "success",
          message: "删除成功 "
        });
      } else {
        this.$message({
          type: "error",
          message: "删除失败 "
        });
      }
    },
    //添加菜单按钮
    openCreateMenuDialog() {
      this.name = "";
      this.createMenuDialog = true;
    },
    handleCurrentChange(page) {
      this.page = page;
      console.log(`当前页: ${this.page}`);
    },
    handleSizeChange(size) {
      this.size = size;
      console.log(`每页 ${size} 条`);
    },
    //添加角色弹窗右上角❌号方法
    closeCreateMenuDialog() {
      this.createMenuDialog = false;
    },
    async getMenu() {
      const { page, size, name } = this;
      const res = await reqQueryMenu(page, size, name);
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
