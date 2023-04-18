import { pretty, request } from "@/utils/request";
export default {
	methods: {
		beforeInit() {
			return false;
	},
	// 数据初始化
	async init() {
			// 需要url ,需要请求参数loadingTag
			// 判断是否设置了参数
			if (!await this.beforeInit()) { // 3.验证并执行beforeInit方法
					return;
			}
			// 4.使用beforeInit方法传递的值
			let [res, err] = await pretty(request({
					url: this.url,
					...this.customField,
					params:this.getApiPager()
			}));
			if (err) return this.$message('请求失败')

			this.tableData = res?.data?.data?.data?.data;
			// 设置total
			this.setTotal(res?.data?.data?.rows);
	}
	}
}