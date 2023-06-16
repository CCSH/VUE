<template>
  <div class="manage">
    <el-dialog
      :title="modalType === 0 ? '新增数据' : '编辑数据'"
      :visible.sync="dialog"
      width="50%"
    >
      <common-form ref="commonForm" :formObj="formObj" :formData="formData" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialogOK">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addOperation" icon="el-icon-plus"
        >新增</el-button
      >
      <div class="search-content">
        <el-input
          v-model="keyWord"
          placeholder="请输入"
          size="small"
        ></el-input>
        <el-button type="primary" @click="searchClick">查询</el-button>
      </div>
    </div>
    <common-table
      :tableData="tableData"
      :columnObj="columnObj"
      :tableObj="tableObj"
      :pageObj="pageObj"
      @currentChange="currentChange"
      @sizeChange="sizeChange"
    >
    </common-table>
  </div>
</template>

<script>
import CommonForm from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import Vue from 'vue'
export default {
  components: {
    CommonTable,
    CommonForm,
  },

  data() {
    return {
      dialog: false, //弹出框
      modalType: 0, // 0 新增、1 编辑
      // form 配置项
      formObj: [
        {
          input: true, //是input
          label: '姓名', //字段
          prop: 'name', //字段名
          placeholder: '请输入姓名', //提示内容
          width: 12, //参考el-col
          disabled: false, //是否禁用
          rules: [
            {
              required: true,
              message: '请输入姓名',
            },
          ],
        },
        {
          input: true, //是input
          label: '年龄', //字段
          prop: 'age', //字段名
          placeholder: '请输入年龄', //提示内容
          width: 12, //参考el-col
          disabled: false, //是否禁用
          rules: [
            {
              required: true,
              message: '请输入年龄',
            },
          ],
        },
        {
          select: true,
          label: '性别',
          prop: 'sex',
          placeholder: '选择性别',
          width: 12, //参考el-col
          disabled: false,
          options: [
            {
              label: '男',
              value: 1,
            },
            {
              label: '女',
              value: 0,
            },
          ],
          rules: [
            {
              required: true,
              message: '请选择性别',
            },
          ],
        },
        {
          datePicker: true,
          label: '生日',
          prop: 'date',
          placeholder: '请选择',
          width: 12, //参考el-col
          disabled: false,
          options: '',
          rules: [
            {
              required: true,
              message: '请选择生日',
            },
          ],
        },
        {
          input: true, //是input
          label: '地址', //字段
          prop: 'address', //字段名
          placeholder: '请输入', //提示内容
          // width: 24, //参考el-col
          disabled: false, //是否禁用
          rules: [
            {
              required: true,
              message: '请输入地址',
            },
          ],
        },
      ],
      formData: {
        id: '',
        name: '',
        age: '',
        sex: '',
        date: '',
        address: '',
      },

      // page 配置项
      pageObj: {
        position: 'right',
        pageData: {
          currentPage: 1,
          pageSize: 10,
        },
      },

      // table配置选项
      tableObj: {
        rowKey: 'id',
        fit: true,
      },
      // 列配置选项
      columnObj: {
        // 选择框
        selection: false,
        // 选择框根据条件是否可选
        selectable: (row, index) => {
          if (row.switchs) {
            return true
          }
        },
        //column列,columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
        //prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
        columnData: [
          {
            text: true,
            prop: 'name',
            label: '姓名',
            width: '',
            align: 'center',
          },
          {
            text: true,
            prop: 'age',
            label: '年龄',
            width: '',
            align: 'center',
          },
          {
            text: true,
            prop: 'date',
            label: '生日',
            width: '',
            align: 'center',
          },
          {
            ownDefined: true,
            prop: 'sex',
            label: '性别',
            width: '',
            align: 'center',
            sortable: false,
            ownDefinedReturn: (row, $index) => {
              if (row.sex === 1) {
                return '男'
              }
              return '女'
            },
          },
          {
            text: true,
            prop: 'address',
            label: '地区',
            width: '',
            align: 'center',
            sortable: false,
            ownDefinedReturn: (row, $index) => {
              return row.address
            },
          },
          {
            isOperation: true,
            label: '操作',
            width: '180',
            align: 'center',
            sortable: false,
            operation: [
              {
                // type: 'primary',
                label: '编辑',
                icon: '',
                // size: 'mini',
                buttonClick: this.editOperation,
                isShow: (row, $index) => {
                  return true
                },
              },
              {
                type: 'danger',
                label: '删除',
                icon: '',
                // size: 'mini',
                buttonClick: this.deleteOperation,
                isShow: (row, $index) => {
                  return true
                },
              },
            ],
          },
        ],
      },
      tableData: [],
      keyWord: '',
    }
  },
  watch: {
    //dialog监听
    dialog(newVal, oldVal) {
      if (!newVal) {
        this.$refs.commonForm.resetForm() //窗口关闭清空表单
      }
    },
  },
  methods: {
    //dialog确认
    dialogOK() {
      //判断表单验证是否通过
      if (this.$refs.commonForm.submitForm()) {
        console.log('success')
        console.log(this.formData)
        if (this.modalType === 0) {
          this.addData(this.formData)
        } else {
          this.editData(this.formData)
        }
        this.dialog = false
      } else {
        console.log('error')
      }
    },
    //添加操作
    addOperation() {
      this.modalType = 0
      this.dialog = true
    },
    //编辑操作
    editOperation(row, $index) {
      console.log(row, $index)
      var item = JSON.parse(JSON.stringify(row))
      this.formData = item
      this.modalType = 1
      this.dialog = true
    },
    //删除操作
    deleteOperation(row, $index) {
      console.log(row, $index)
      let newSet = new Set(this.tableData)
      newSet.delete(row)
      this.tableData = [...newSet]
    },
    //添加数据
    addData(data) {
      data.id = 'add' + this.tableData.length
      var item = JSON.parse(JSON.stringify(data))
      this.tableData.unshift(item)
    },
    //编辑数据
    editData(data) {
      const index = this.tableData.findIndex((item) => item.id === data.id)
      console.log('ccsh', index)
      data.id = 'edit' + this.tableData.length
      var item = JSON.parse(JSON.stringify(data))
      Vue.set(this.tableData, index, item)
    },
    //删除数据
    deleteData(data) {},
    //页码变化
    currentChange(e) {
      this.pageObj.pageData.currentPage = e
      //计算应该展示多少条
      var count =
        this.pageObj.pageData.currentPage * this.pageObj.pageData.pageSize <=
        this.pageObj.total
          ? this.pageObj.pageData.pageSize
          : this.pageObj.total % this.pageObj.pageData.pageSize
      console.log('ccsh', count)
      this.tableData = this.getData(e, count)
    },
    //条数变化
    sizeChange(e) {
      this.pageObj.pageData.pageSize = e
      this.pageObj.pageData.currentPage = 1
      this.tableData = this.getData(1, e)
    },
    //模拟获取数据
    getData(page, count) {
      var list = []
      var name = this.keyWord ? '搜索：' + this.keyWord + '_' : ''
      for (let index = 0; index < count; index++) {
        var data = {
          id: index,
          name: name + '第' + page + '页-名字' + index,
          date: '201' + Math.floor(Math.random() * 10) + '-05-02',
          address: '地址' + Math.floor(Math.random() * 2000) + '号',
          sex: Math.floor(Math.random() * 2),
          age: 10 + Math.floor(Math.random() * 90),
        }
        list.push(data)
      }
      return list
    },
    //初始化数据
    initData() {
      let count = this.pageObj.pageData.pageSize
      this.tableData = this.getData(1, count)
      this.pageObj.total = 100
    },
    //搜索点击
    searchClick() {
      if (this.keyWord.length) {
        var count = Math.floor(Math.random() * 100)
        this.tableData = this.getData(1, count / 10)
        this.pageObj.total = count
        this.currentChange(1)
      } else {
        // 没内容展示所有
        this.initData()
      }
    },
  },
  mounted() {
    //初始化数据
    this.initData()
  },
}
</script>

<style lang="less" scoped>
.manage {
  overflow: auto;
  margin-bottom: -100%;
  .manage-header {
    height: 40px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-content {
      display: flex;
      align-items: center;
      .el-input {
        margin-right: 15px;
        height: 60%;
      }
    }
  }
}
</style>
