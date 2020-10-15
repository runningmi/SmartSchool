<template>
  <!-- 部门管理 -->
  <div class="app-container">
    <div class="filter-container head">
      <el-input
        placeholder="请输入名称搜索"
        style="width: 200px"
        class="filter-item"
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

    <el-table
      :data="list"
      border
      fit
      row-key="id"
      :tree-props="{ children: 'children' }"
      highlight-current-row
      style="width: 100%"
    >
      <!-- <el-table-column type="index" align="center"></el-table-column> -->
      <!-- 部门名称 -->
      <el-table-column label="部门名称" align="center">
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
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button type="primary" plain @click="onEditDepart(row)"
            >编辑</el-button
          >
          <el-popconfirm
            style="margin-left: 2rem"
            title="确定删除此部门吗？"
            @onCancel="cancelDelDepart"
            @onConfirm="onDelDepart(row.id)"
          >
            <el-button type="danger" slot="reference" plain>删除</el-button>
          </el-popconfirm>
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
        <!-- 部门名称 -->
        <el-form-item label="部门名称">
          <el-input clearable v-model="addDepartmentName"></el-input>
        </el-form-item>

        <!-- 部门类型 -->
        <el-form-item label="部门类型">
          <el-select
            v-model="orgTypeValue"
            @change="orgTypeChange"
            clearable
            placeholder="请选择部门类型"
          >
            <el-option
              v-for="(item, index) in orgTypeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 选择上级 -->
        <el-form-item v-if="parentIdState == true" label="选择上级">
          <el-cascader
            v-model="parentIdValue"
            :options="parentIdValueOptions"
            props.checkStrictly="true"
            :props="{ value: 'id', label: 'name', checkStrictly: true }"
            @change="parentIdValueChange"
          ></el-cascader>
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

    <!-- 编辑部门 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible="editTemplateDialog"
      width="40rem"
      title="编辑部门"
      :before-close="closeEditTemplateDialog"
    >
      <el-form
        label-position="left"
        label-width="140px"
        style="width: 400px; margin-left: 50px"
      >
        <!-- 部门名称 -->
        <el-form-item label="部门名称">
          <el-input clearable v-model="editDepartDataName"></el-input>
          <span>仅支持修改部门名称，部门类型和上级部门不做显示</span>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 取消按钮 -->
        <el-button
          @click="editTemplateDialog = false"
          style="margin-right: 0.2rem"
          >取消</el-button
        >
        <!-- 确认按钮 -->
        <el-button type="primary" @click="editDepart(row.id)">确定</el-button>
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
      name: "",

      //添加部门名称
      addDepartmentName: "",

      //添加部门类型级联选择值
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

      //添加部门类型值
      orgTypeValue: "",

      //添加上级部门select状态
      parentIdState: false,

      // 添加上级部门值
      parentIdValue: "",

      //因为children会把选择的路径上的所有value，这个地方是存用户选择的最后一项的值
      parentIdValueID: "",

      // 添加上级部门类型级联选择值
      parentIdValueOptions: [],

      // 编辑部门弹窗状态
      editTemplateDialog: false,

      //编辑部门的数据
      editDepartDataName: "",

      //分页
      roleTotal: "",

      //页码
      page: 1,

      //条数
      size: 10,
    };
  },
  methods: {
    //获取全部数据以及搜索
    async queryDepart() {
      var res = await reqQueryDepart(this.page, this.size, this.name);
      if (res.code == 0) {
        this.list = res.data.records;
        this.roleTotal = res.data.total;
      } else {
        this.$message.error("获取数据失败,请重新登录或刷新重试");
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

    // 添加部门按钮
    openAddDepartment() {
      this.addDepartmentName = "";
      this.orgTypeValue = "";
      this.parentIdValueOptions = [];
      this.parentIdValueID = "";
      this.addDepartmentDialog = true;
      this.parentIdState = false;
    },

    //部门类型change方法
    async orgTypeChange() {
      if (this.orgTypeValue == "3") {
        this.parentIdState = true;
        var res = await reqQueryDepart(1, 10, "");
        if (res.code == 0) {
          this.parentIdValueOptions = res.data.records;
          this.getTreeData(res.data.records);
        }
      }
    },

    //选择上级部门change方法
    parentIdValueChange() {
      var res = this.parentIdValue.length - 1;
      this.parentIdValueID = this.parentIdValue[res];
    },

    //children为空时会有一个空白的选择区域，这个方法是去掉那个空白区域的方法，从网上扒下来的 网址是https://blog.csdn.net/qq_36410795/article/details/97492512
    getTreeData(data) {
      // 循环遍历json数据
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },

    //添加部门方法
    async addDepartment() {
      var res = await reqCreateDepart(
        this.addDepartmentName,
        this.orgTypeValue,
        this.parentIdValueID
      );
      if (res.code == 0) {
        this.addDepartmentDialog = false;
        this.addDepartmentName = "";
        this.orgTypeValue = "";
        this.$message("添加成功");
      } else {
        this.$message.error("添加失败请稍后重试");
      }
    },

    //添加部门弹窗右上角❌号方法
    closeAddDepartmentDialog() {
      this.addDepartmentDialog = false;
      this.addDepartmentName = "";
      this.orgTypeValue = "";
    },

    // 编辑部门按钮
    onEditDepart(row) {
      this.editTemplateDialog = true;
      this.editDepartDataName = row.name;
    },

    //删除部门
    async onDelDepart(id) {
      var res = await reqDelDepart(id);
      if (res.code == 0) {
        this.$message("删除成功");
        this.queryDepart();
      } else {
        this.$message.error("删除失败");
        this.queryDepart();
      }
    },

    //取消删除部门
    cancelDelDepart() {
      this.$message.info("取消删除");
    },

    //编辑部门弹窗右上角❌号方法
    closeEditTemplateDialog() {
      this.editTemplateDialog = false;
    },

    //编辑部门方法
    async editDepart(id) {
      var res = await reqEditDepart(id, this.editDepartDataName);
      if (res.code == 0) {
        thsi.$message("编辑成功");
        this.editTemplateDialog = false;
      } else {
        this.$message.error("编辑失败，请关闭或稍后重试");
      }
    },
  },
  mounted() {
    this.queryDepart();
  },
};
</script>
<style lang="less" scoped>
</style>