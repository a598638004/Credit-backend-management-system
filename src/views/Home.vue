<template>
  <div class="home">
    <div>
      <el-row :gutter="10">
        <el-col
          :xl="6"
          :lg="6"
          :md="12"
          :sm="24"
          :xs="24"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="dashboard-item" :style="{ background: item.color }">
            <p>{{ item.title }}</p>

            <CountTo :startVal="0" :endVal="item.val" :duration="1000" />
          </div>
        </el-col>
      </el-row>

      <div class="echarts-box">
        <div class="echart1"></div>
        <div class="echart2"></div>
        <div class="echart3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import * as echarts from "echarts";

export default {
  name: "Home",
  components: {
    CountTo,
  },
  data() {
    return {
      list: [
        //
        { val: 13594, title: "最高可借金额", color: "#67ca3a" },
        { val: 9833, title: "回报率", color: "#ff6600" },
        { val: 8888, title: "业绩领跑", color: "#f56c6c" },
        { val: 6666, title: "安稳底薪战队", color: "#409eff" },
      ],
    };
  },
  methods: {
    initCharts() {
      let options1 = {
        backgroundColor: "#fff",
        color: ["#FF0000", "#FF0000", "#0F870F", "#0000FF"],

        tooltip: {
          trigger: "axis",
        },
        title: [
          {
            text: "配方：SMA13 总重：5076kg 时间：2022-12-01 00:20:46",
            right: "5%",
            bottom: "10%",
            textStyle: {
              color: "#333",
              fontSize: 12,
              fontWeight: 400,
            },
          },
          {
            text: "",
            right: "5%",
            bottom: "14%",
            textStyle: {
              color: "red",
              fontSize: 12,
              fontWeight: 400,
            },
          },
        ],
        legend: {
          data: ["上限", "下限", "目标", "当前值"],
          padding: [20, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          textStyle: {
            // color: '33FFFF',
            fontSize: 14,
          },
          itemWidth: 15,
          itemHeight: 15,
          itemGap: 35,
        },
        grid: {
          left: "1%",
          right: "5%",
          top: "16%",
          bottom: "6%",
          containLabel: true,
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#CCCCCC",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#D5D5D5",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DBDBDB",
              type: "solid",
              width: "0.5",
            },
          },

          data: [
            "0.075",
            "0.15",
            "0.3",
            "0.6",
            "1.18",
            "2.36",
            "4.75",
            "9.5",
            "13.2",
            "16",
            "19",
            "26.5",
            "31.5",
            "37.5",
          ],
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#333",
            },
          },
          name: "通过率",
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DBDBDB",
              type: "solid",
              width: "0.5",
            },
          },
          axisTick: {
            show: false,
          },

          axisLabel: {
            textStyle: {
              color: "#333",
            },
            formatter: "{value}%",
          },
          type: "value",
        },
        series: [
          {
            name: "上限",

            type: "line",
            symbolSize: 0,

            lineStyle: {
              normal: {
                color: "#FF0000",
                width: 0.5,
                type: "dotted",
              },
            },

            data: [
              18, 18, 22, 25, 25, 30, 40, 77, 100, 100, 100, 100, 100, 100,
            ],
          },
          {
            name: "下限",

            type: "line",
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: "#FF0000",
                width: 0.5,
                type: "dotted",
              },
            },
            data: [0, 5, 0, 3, 5, 10, 15, 45, 75, 100, 100, 100, 100, 100],
          },
          {
            name: "目标",

            type: "line",
            symbolSize: 0,

            lineStyle: {
              normal: {
                color: "#0F870F",
                width: 0.5,
                type: "dotted",
              },
            },
            data: [
              9.9, 11.3, 12.3, 13.4, 15.6, 19.9, 26.8, 57.7, 90.8, 100, 100,
              100, 100, 100,
            ],
          },
          {
            name: "当前值",
            // smooth: true,
            type: "line",
            symbolSize: 5,
            symbol: "circle",

            itemStyle: {
              normal: {
                color: "#0000FF",
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#0000FF",
                  },
                },
              },
            },
            lineStyle: {
              normal: {
                width: 0.8,
              },
            },
            data: [
              8.6, 10.6, 12.7, 13.8, 16.4, 21.2, 27.8, 59.4, 91.2, 100, 100,
              100, 100, 100,
            ],
          },
          {
            name: "石油比",
            type: "gauge",
            center: ["12%", "40%"],
            splitNumber: 5,
            radius: "40%",
            startAngle: 165,
            endAngle: 15,
            min: 4.45,
            max: 7.55,
            pointer: {
              length: "70%",
              width: 3,
              itemStyle: {
                color: "auto",
              },
            },

            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10,
                color: [
                  [0.25, "#343FE0"],
                  [0.75, "#237D1E"],
                  [1, "#BF4753"],
                ],
              },
            },
            axisTick: {
              // 坐标轴小标记
              length: 14, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
              },
            },
            splitLine: {
              // 分隔线
              length: 17, // 属性length控制线长

              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto",
                width: 2,
              },
            },

            detail: { show: false, formatter: "{value}%" },
            data: [
              {
                value: 6.1,
                name: "石油比" + "6.1%",
                title: {
                  offsetCenter: [0, "20%"],
                  color: "#000",
                  fontSize: 10,
                },
              },
            ],
            // data: [{ value: 5, name: '健康率' }]
          },
          {
            name: "温度",
            type: "gauge",
            center: ["12%", "70%"],
            splitNumber: 5,
            radius: "40%",
            startAngle: 165,
            endAngle: 15,
            min: 158,
            max: 208,
            pointer: {
              length: "70%",
              width: 3,
              itemStyle: {
                color: "auto",
              },
            },

            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10,
                color: [
                  [0.25, "#343FE0"],
                  [0.75, "#237D1E"],
                  [1, "#BF4753"],
                ],
              },
            },
            axisTick: {
              // 坐标轴小标记
              length: 14, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
              },
            },
            splitLine: {
              // 分隔线
              length: 17, // 属性length控制线长

              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto",
                width: 2,
              },
            },

            detail: { show: false, formatter: "{value}%" },
            data: [
              {
                value: 185,
                name: "温度" + "185%",
                title: {
                  offsetCenter: [0, "-20%"],
                  color: "#000",
                  fontSize: 12,
                },
              },
            ],
          },
        ],
      };

      const data = [1, 2, 3, 4, 5, 2, 4, 1, 3, 5, 2, 3];
      const data1 = [];
      data.forEach((item) => {
        if (item == 1) {
          data1.push({
            value: item,
            itemStyle: {
              color: "#00E400",
            },
          });
        }
        if (item == 2) {
          data1.push({
            value: item,
            itemStyle: {
              color: "#FFFF00",
            },
          });
        }
        if (item == 3) {
          data1.push({
            value: item,
            itemStyle: {
              color: "#FF7E00",
            },
          });
        }
        if (item == 4) {
          data1.push({
            value: item,
            itemStyle: {
              color: "#FF0000",
            },
          });
        }
        if (item == 5) {
          data1.push({
            value: item,
            itemStyle: {
              color: "#99004c",
            },
          });
        }
      });
      let options2 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "2022-04",
            "2022-05",
            "2022-06",
            "2022-07",
            "2022-08",
            "2022-09",
            "2022-10",
            "2022-11",
            "2022-12",
            "2023-01",
            "2023-02",
            "2023-03",
          ],
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          color: "black",
          axisLabel: {
            show: true,
            textStyle: {
              color: "black",
            },
            // 这里重新定义就可以
            formatter: function (value) {
              var texts = [];
              if (value === 0 || value === "0") {
                texts.push("");
              } else if (value === 1 || value === "1") {
                texts.push("Ⅰ类");
              } else if (value === 2 || value === "2") {
                texts.push("Ⅱ类");
              } else if (value === 3 || value === "3") {
                texts.push("Ⅲ类");
              } else if (value === 4 || value === "4") {
                texts.push("Ⅳ类");
              } else if (value === 5 || value === "5") {
                texts.push("V类");
              }
              return texts;
            },
          },
        },
        dataZoom: {
          type: "inside",
          show: true,
          height: 10,
          start: 0,
          end: 100,
        },
        series: [
          {
            name: "水质等级",
            type: "bar",
            data: data1,
            barWidth: 20,
          },
        ],
      };

      let options3 = {
        tooltip: {
          trigger: "item",
          // formatter: '{b}: {d}%',
          borderWidth: 1,
        },
        title: {
          text: "租赁情况分布",
          left: "24%",
          bottom: "48%",
          textStyle: {
            color: "#2C3E50",
            fontSize: 15,
          },
        },
        legend: {
          show: true,
          // type: 'scroll',
          orient: "vertical",
          // right: 40,
          // top: 20,
          selectedMode: false,
          // left: 30,
          width: 240,
          right: 10,
          bottom: "middle",
          icon: "circle",
          itemWidth: 15,
          itemHeight: 10,
          itemGap: 25,
          textStyle: {
            color: "#2C3E50",
            fontSize: 16,
            // marginTop: 60,
          },
          formatter: function (name) {
            let num = 10;
            // originData.map(res => {
            //     if (res.statusName == name) {
            //         num = res.num
            //     }
            // })

            let arr = ["{a|" + name + "}", "{b|" + num + "}"];
            return arr.join("");
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 16,
                color: "#2C3E50",
                verticalAlign: "bottom",
                padding: [0, 10, 0, 0],
              },
              b: {
                fontSize: 18,
                color: "#2C3E50",
                verticalAlign: "bottom",
                fontWeight: "bold",
              },
            },
          },
        },

        series: [
          {
            type: "pie",
            startAngle: 90,
            endAngle: -270,
            radius: "45%",
            center: ["30%", "50%"],
          },
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            radius: "0%",
            center: ["30%", "50%"],
            pointer: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                color: [
                  //外框颜色
                  [1, "#027383"],
                ],
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },

            axisTick: {
              distance: 0,
              length: 6,
              splitNumber: 5,
              lineStyle: {
                width: 4,
                color: "auto",
                // cap: 'round',
              },
            },
          },
          {
            type: "pie",
            radius: ["68%", "80%"],
            center: ["30%", "50%"],
            label: { show: false },
            labelLine: { show: false },
            selectedOffset: 10,
            selectedMode: true,
            itemStyle: {
              borderRadius: 0,
              normal: {
                borderColor: "#fff",
                borderWidth: 4,
              },
            },
            data: [
              { value: 179, name: "住宅" },
              { value: 735, name: "办公" },
              { value: 580, name: "工业厂房" },
              { value: 484, name: "商业-餐饮" },
              { value: 300, name: "商业-宾馆" },
              { value: 1048, name: "商业-银行" },
              { value: 735, name: "商业服务" },
              { value: 580, name: "仓库" },
              { value: 484, name: "基站" },
              { value: 300, name: "非营利性机构" },
              { value: 1048, name: "其他" },
            ],
            color: [
              "#3DB7CE",
              "#FD8D8E",
              "#9A7ED2",
              "#35B9FD",
              "#6EC4D2",
              "#CE9415",
              "#49AC88",
              "#3066E4",
              "#BD5641",
              "#00C7FA",
              "#7995BE",
              "#FFE289",
            ],
          },
        ],
      };

      this.chart1 = echarts.init(document.querySelector(".echart1"));
      this.chart2 = echarts.init(document.querySelector(".echart2"));
      this.chart3 = echarts.init(document.querySelector(".echart3"));
      this.chart1.setOption(options1);
      this.chart2.setOption(options2);
      this.chart3.setOption(options3);
    },
    resize(){
      this.chart1.resize();
      this.chart2.resize();
      this.chart3.resize();
    },
  },
  mounted() {
    this.initCharts();
    this.resizeCallback = this.resize.bind(this);
    window.addEventListener('resize', this.resizeCallback)
  },
  beforeDestroy(){
    // 移除的函数一定要是相同的
    window.removeEventListener('resize', this.resizeCallback)
  },
};
</script>
<style lang="scss" scoped>
.dashboard-item {
  height: 200px;
  font-weight: bold;
  color: #fff;
  p {
    color: black;
    height: 40px;
    // margin: 0;
  }
}

.echarts-box {
  .echart1 {
    width: 100%;
    height: 600px;
    margin-top: 20px;
  }

  .echart2,
  .echart3 {
    height: 400px;
    width: 50%;
    height: 600px;
  }

  .echart2 {
    float: left;
  }

  .echart3 {
    float: right;
  }

  overflow: hidden;
}
</style>
