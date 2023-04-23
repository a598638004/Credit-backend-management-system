export default {
    data(){
        return {
            currentPage: 1,
            pageSizes: [10, 20, 30, 40],
            pageSize: 10,
            total: 0,
            query: "",
        }
    },
    computed: {
        frontPageOptions(){
            return {
                currentPage: this.currentPage,
                pageSize:this.pageSize,
                pageSizes:this.pageSizes,
                query:this.query,
                total:this.total
            }
        }
    },
    methods: {
        // 提供后端数据访问的参数
        getApiPager(){
            let params =  {
                pageNo:this.currentPage,
                pageSize:this.pageSize,
            }
            if (this.query && this.query.trim() !== "") {
                params.name = this.query;
            }
            return params;
        },
        setQueryName(query) {
            this.query = query;
            this.currentPage = 1;
            this.init()
        },
        setTotal(total){
            this.total = total; 
        },
        sizeChange(size) {
            console.log("onSizeChange:", size);
            this.pageSize = size;
            this.init()
        },
        currentPageChange(page) {
            this.currentPage = page;
            // this.loadLoanByPage();
            this.init()
        },
    }
}