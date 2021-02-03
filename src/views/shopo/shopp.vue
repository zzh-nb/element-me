<template>
  <div>
    <div class="shopp">
      <span>商品管理</span>
      <el-button type="info" @click="add">+添加商品</el-button>
    </div>
    <p></p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-select v-model="formInline.Aid" placeholder="按商品id查询">
          <el-option label="按商品id查询" value="search"></el-option>
          <el-option label="按商品名称查询" value="search"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input
          v-model="formInline.user"
          placeholder="按关键词查询"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" width="150"> </el-table-column>
      <el-table-column prop="name" label="信息" width="180"> </el-table-column>
      <el-table-column prop="price" label="价格" width="180"> </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          {{ scope.row.status == 1 ? "在售" : "已下架" }}
          <el-button type="warning" size="mini" @click="setSelect(scope.row)">{{
            scope.row.status == 2 ? "上架" : "下架"
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="set(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="detail(scope.row.id)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<style lang="scss" scoped>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.shopp {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  font-size: 30px;
}
</style>

<script>
export default {
  methods: {
    search() {
      console.log(this.formInline.Aid, this.formInline.user);
      this.$netClient
        .SEARCH(this.formInline.Aid, this.formInline.user)
        .then((res) => {
          console.log(res);
          this.list = res.data.data.list;
        });
    },

    handleCurrentChange(val) {
      console.log(val);
      this.$netClient.SHOPP(val).then((res) => {
        console.log(res);
        this.list = res.data.data.list;
        this.total = res.data.data.total;
      });
    },

    setSelect(item) {
      if (item.status == 1) {
        var a = 2;
      } else {
        var a = 1;
      }
      this.$confirm(`确认要${a == 1 ? "上架" : "下架"}该商品？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$netClient.setStatus(item.id, a).then((res) => {
            console.log(res);
            if (res.data.status == 0) {
              this.$message(res.data);
              this.$netClient.SHOPP().then((res) => {
                console.log(res);
                this.list = res.data.data.list;
              });
            }
          });
        })
        .catch(() => {});
    },

    // 查看
    detail(id) {
      this.$router.push({ path: "/shoppdetalist", query: { id } });
    },
    // 编辑
    set(id) {
      this.$router.push({ path: "/setShop", query: { id } });
    },
    // 添加
    add() {
      this.$router.push("/setShop");
    },
  },
  data() {
    return {
      list: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      formInline: {
        Aid: "",
        user: "",
      },
    };
  },
  mounted() {
    this.$netClient.SHOPP().then((res) => {
      console.log(res);
      this.list = res.data.data.list;
      this.total = res.data.data.total;
    });
  },
};
</script>