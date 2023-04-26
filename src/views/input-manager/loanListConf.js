export default Object.freeze({
    options: {
        // height: 750,
        loading: true,
        useIndex: true,
        useMultiSelect: true,
    },  // table属性
    pageOptions: {}, // 分页器属性
    columns: [
        {
            label: "姓名",
            prop: "name",
            // width:"20"
        },
        {
            label: "出生日期",
            prop: "birthday",
            slot: "birthday", 
        },
        {
            label: "性别",
            prop: "sex",
            slot: "sex"
        },
        {
            label: "教育程度",
            prop: "education",
            slot: "education"
        },
        {
            label: "居住地址",
            prop: "address1"
        },
        {
            label: "手机号",
            prop: "mobile_phone",
            isHide:false,
        },
        {
            label: "申请状态",
            prop: "status",
            slot: "status",
            align: "center"
        },
        /* {
            label:'配送信息',
            children:[
                {
                    label:'地址',
                    children:[
                        { label:'省份',prop:'address1'},
                        { label:'市区',prop:'address2'},
                        { label:'地址', prop:'address3'},
                    ]
                }
            ]

        },   */
        {
            label: "操作",
            width: 400,
            prop: "opts",
            slot: "opts"
        },
        /* {
            // html字符串formatter
            label:'自定义html',
            formatter:function(prop){
             // prop内部.row是行的数据, el-table-column
                return `<div>
                        <h2>${prop.row.name}</h2>
                        <button>${prop.$index}</button>
                </div>  `
            }

        }   */
         
    ] // column的配置
})