<template>
  <!-- 回收站 -->
  <div class="app-container">
    <div class="head">
      <!-- 搜索框 -->
      <el-input
        placeholder="请输入文件名称搜索"
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

      <!-- <el-select v-model="value" placeholder="全部文件" style="margin-left: 1rem">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          clearable
        >
        </el-option>
      </el-select> -->
      <el-button class="filter-item" type="primary" style="margin-left: 1rem">
        批量还原</el-button
      >
    </div>

    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; margin-top: 1rem"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>

      <!-- 文件格式 -->
      <el-table-column label="文件格式" align="center">
        <template slot-scope="{ row }">
          <img :src="row.imgSrc" alt="" style="width: 64px; height: 64px" />
        </template>
      </el-table-column>

      <!-- 文件名称 -->
      <el-table-column label="文件名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.orgType }}</span>
        </template>
      </el-table-column>

      <!-- 文件简介 -->
      <el-table-column label="文件简介" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.parentId }}</span>
        </template>
      </el-table-column>

      <!-- 删除时间 -->
      <el-table-column label="删除时间" align="center">
        <template>
          <span>2020.10.14 16:12</span>
        </template>
      </el-table-column>

      <!-- 状态 -->
      <!-- <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <el-tag type="success" v-if="row.state == 1">审核通过</el-tag>
          <el-tag type="info" v-else-if="row.state == 2">待审核</el-tag>
          <el-tag type="danger" v-else-if="row.state == 3">审核失败</el-tag>
        </template>
      </el-table-column> -->

      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="{ row }">
          <el-button type="success" plain @click="onXiangqing(row.id)"
            >详情</el-button
          >
          <el-button type="primary" plain @click="onHuanyuan(row.id)"
            >还原</el-button
          >
          <el-button type="danger" plain @click="onChedishanchu(row.id)"
            >彻底删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :close-on-click-modal="false"
      :visible="bohuiDialog"
      width="40rem"
      title="驳回"
      :before-close="closeBohuiDialog"
    >
      <el-form
        label-position="left"
        label-width="140px"
        style="width: 400px; margin-left: 50px"
      >
        <!-- 驳回理由 -->
        <el-form-item label="驳回理由">
          <el-input
            type="textarea"
            v-model="addDepartmentName"
            placeholder="请输入驳回理由,选填"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 取消按钮 -->
        <el-button @click="bohuiDialog = false" style="margin-right: 0.2rem"
          >取消</el-button
        >

        <!-- 确认按钮 -->
        <el-button type="primary" @click="bohuiDialog = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {} from "../../api/recycle/recycle";
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
  data() {
    return {
      list: [
        {
          name: "TXT",
          imgSrc: image6,
          orgType: "华东师大版七年级体育与健康 5.3游泳类运动的特点与价值 教案",
          parentId: "无",
          state: "1",
        },
        {
          name: "PPT",
          imgSrc: image1,
          orgType: "华东师大版七年级体育与健康 5.3游泳类运动的特点与价值 教案",
          parentId: "无",
          state: "2",
        },
        {
          name: "WORD",
          imgSrc: image2,
          orgType: "华东师大版七年级体育与健康 5.3游泳类运动的特点与价值 教案",
          parentId: "无",
          state: "1",
        },
        {
          name: "EXCEL",
          imgSrc: image,
          orgType: "华东师大版七年级体育与健康 5.3游泳类运动的特点与价值 教案",
          parentId: "无",
          state: "3",
        },
        {
          name: "PDF",
          imgSrc: image8,
          orgType: "华东师大版七年级体育与健康 5.3游泳类运动的特点与价值 教案",
          parentId: "无",
          state: "2",
        },
        {
          name: "MP3",
          imgSrc: image3,
          orgType: "华东师大版七年级体育与健康 5.3游泳类运动的特点与价值 教案",
          parentId: "无",
          state: "1",
        },
        {
          name: "MP4",
          imgSrc: image5,
          orgType: "华东师大版七年级体育与健康 5.3游泳类运动的特点与价值 教案",
          parentId: "无",
          state: "2",
        },
        {
          name: "IMG",
          imgSrc: image7,
          orgType: "华东师大版七年级体育与健康 5.3游泳类运动的特点与价值 教案",
          parentId: "无",
          state: "2",
        },
        {
          name: "ZIP",
          imgSrc: image4,
          orgType: "华东师大版七年级体育与健康 5.3游泳类运动的特点与价值 教案",
          parentId: "无",
          state: "3",
        },
      ],
      options: [
        {
          value: "选项1",
          label: "审核通过",
        },
        {
          value: "选项2",
          label: "待审核",
        },
        {
          value: "选项3",
          label: "审核驳回",
        },
      ],
      value: "",
      checked: false,
      bohuiDialog: false,
      addDepartmentName: "",
    };
  },
  methods: {
    onHuanyuan(id) {
      this.$confirm("是否还原此资源?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message.success("还原成功!");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消还原",
          });
        });
    },

    onChedishanchu(id) {
      this.$confirm("是否彻底删除此资源?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message.error("彻底删除成功!");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消彻底删除",
          });
        });
    },

    closeBohuiDialog() {
      this.bohuiDialog = false;
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>