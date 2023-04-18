<script>
export default {
  name: "GTable",
  props: {
    options: {
      type: Object,
      default() {
        return this.gOptions;
      },
    },
    pageOptions: {
      type: Object,
      default() {
        return this.gPageOptions;
      },
    },
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    showPagination: {
      type: Boolean,
      default: () => true,
    },
    loadingTag: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      // multiSelect:true, // 第一列复选框
      // index:true, // 第一列是行号
      gOptions: {
        // height: 600, // 表格高度
        stripe: true, // 是否为斑马纹 table
        border: false, // 是否带有纵向边框
        fit: true, // 列宽度撑开,
        showHeader: true, // 显示表头
        rowKey: "id",
        useIndex: true, // 行索引
        useMultiSelect: false, // 是否多选
      },
      gPageOptions: {
        currentPage: 1,
        pageSizes: [100, 200, 300, 400],
        pageSize: 100,
        total: 400,
      },
    };
  },
  computed: {
    // 监视外部属性的改变, 合并本来的配置
    g_options() {
      return Object.assign({}, this.gOptions, this.options);
    },
    g_pageOptions() {
      return Object.assign({}, this.gPageOptions, this.pageOptions);
    },
  },
  methods: {
    renderTable() {
      const {
        columns,
        g_options,
        data,
        loadingTag,
        $store: {
          state: { loadings },
        },
      } = this;
      const { useIndex } = g_options;
      const { useMultiSelect } = g_options;
      // console.log(loadings);
      // jsx中的指令使用v-loading.gbox="true"
      const directives = [
        {
          name: "loading",
          modifiters: {
            gbox: true,
          },
          // value:g_options.loading
          value: loadings[loadingTag],
        },
        {
          name: "drag",
        },
      ];
      return (
        <el-table
          id="gbox"
          onSelection-change={(e) => this.$emit("selection-change", e)}
          data={data}
          attrs={g_options}
          {...{ directives }}
        >
          {useIndex && this.renderIndex()}
          {useMultiSelect && this.renderMultiSelect()}
          {/* {this.renderTableColumns(columns)} */}

          {
            {
              /* TODO */
            }
          }
          {columns &&
            columns.map((column, i) => {
              return (
                <GColumn
                  key={i}
                  column={column}
                  scopedSlots={this.$scopedSlots}
                />
              );
            })}
        </el-table>
      );
    },
    renderIndex() {
      return (
        <el-table-column
          type="index"
          label="序号"
          width="55"
          align="center"
        ></el-table-column>
      );
    },
    renderMultiSelect() {
      return (
        <el-table-column
          reserve-selection={true}
          type="selection"
          width="55"
        ></el-table-column>
      );
    },
    // renderTableColumns(columns) {
    //   return columns.map((col, i) => {
    //     return (
    //       <el-table-column
    //         label={col.label}
    //         prop={col.prop}
    //         width={col.width}
    //       >
    //         {col.children &&
    //           col.children.length > 0 &&
    //           this.renderTableColumns(col.children)}
    //       </el-table-column>
    //     );
    //   });
    // },
    renderPagination(options) {
      // jsx中@size-change形式修改为onSize-change
      return (
        <el-pagination
          onSize-change={(e) => this.$emit("size-change", e)}
          onCurrent-change={this.handleCurrentChange}
          attrs={options}
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      );
    },
    handleCurrentChange(page) {
      this.$emit("handleCurrentChange", page);
    },
  },
  render(h) {
    return (
      <div>
        {this.renderTable()}
        {this.showPagination && this.renderPagination(this.g_pageOptions)}
      </div>
    );
  },
};
</script>

<style>
</style>