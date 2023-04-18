<script>
export default {
  // 不需要响应式，节省性能
  name: "GFormCreator",
  props: {
    conf: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  created() {
    const { items, rules, cards } = this.conf;
    if (!rules) throw new Error("请传入表单校验规则");
    this.rulesHandler(rules);
    if (items) {
      this.reaciveFileds(items);
    }
  },
  methods: {
    reaciveFileds(items) {
      items.forEach((rowArr) => {
        rowArr.forEach((item) => {
          this.$set(this.form, item.key, item.value);
        });
      });
    },
    rulesHandler(rules) {
      // 改变自定义验证器的this指向
      for (let key in rules) {
        let valArr = rules[key];
        valArr.forEach((element) => {
          if (element.validator) {
            element.validator = element.validator.bind(this);
          }
        });
      }
    },
    renderItem(item) {
      switch (item.type) {
        case "input":
        case "password":
        case "textarea":
          return (
            <el-input type={item.type} v-model={this.form[item.key]}></el-input>
          );
        case "radio":
          return item.options.map((opt, i) => {
            return (
              <el-radio key={i} v-model={this.form[item.key]} label={opt.label}>
                {opt.text}
              </el-radio>
            );
          });
        case "select":
          return (
            <el-select attrs={item.attrs} v-model={this.form[item.key]}>
              {item.options.map((opt) => {
                return (
                  <el-option
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                  ></el-option>
                );
              })}
            </el-select>
          );
        case "datetime":
          return (
            <el-date-picker
              v-model={this.form[item.key]}
              type={item.type}
            ></el-date-picker>
          );
      }
    },
    renderColums(rowArr) {
      return rowArr.map((row) => {
        return (
          <el-col xl={row.colspan} lg={row.colspan} md={12} sm={24} xs={24}>
            <el-form-item label={row.label} prop={row.key}>
              {this.renderItem(row)}
            </el-form-item>
          </el-col>
        );
      });
    },
    renderRows(rowsItems) {
      return rowsItems.map((rowArr) => {
        return <el-row>{this.renderColums(rowArr)}</el-row>;
      });
    },
    doSumbit() {
      let { submit } = this.$listeners; // 方式1
      this.validate(submit);
      // this.$emit('submit',this.deepClone(this.form)); // 方式2
    },
    validate(fn) {
      // 1.验证，通过传递参数给fn
      // 2.验证失败，返回false或者null
      this.$refs.form.validate((valid) => {
        if (valid) {
          fn(this.getData());
        } else {
          fn(false);
        }
      });
    },
    getData() {
      return this.deepClone(this.form);
    },
    deepClone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    reset() {
      this.$refs.form.resetFields();
    },
    renderCards(cards) {
      return cards.map((card) => {
        return (
          <el-card class="box-card">
            <div slot="header">
              <span>{card.name}</span>
            </div>
            {card.children && this.renderRows(card.children)}
          </el-card>
        );
      });
    },
  },
  render(h) {
    const { items, rules, title, cards } = this.conf;
    const { form } = this;
    return (
      <div class="form-box">
        <h1>{title}</h1>
        {title && <hr />}

        {/* 表单区域: JSX不能直接传递model属性  */}
        <el-form
          ref="form"
          attrs={{ model: form }}
          label-width="80px"
          rules={rules}
        >
          {items ? this.renderRows(items) : this.renderCards(cards)}
        </el-form>

        <div class="btns">
          {/* 仅仅填DOM */}
          {this.$slots.default ? this.$slots.default : (
            <div>
              <el-button type="primary" onClick={(e) => this.doSumbit()}>
                提交
              </el-button>
              <el-button onClick={(e) => this.reset()}>重置</el-button>
            </div>
          )}
          {/* 仅仅填DOM,给父传递参数this.$scopedSlots.default(data) */}
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.el-select,.el-input {
    width: 100%;
}
.btns {
  text-align: center;
}

.box-card {
  margin-bottom: 10px;
  > div {
    > div {
      text-align: left;
    }
  }
}
</style>