export default {
    options: {
        useIndex: false,
        useMultiSelect: false,
    },  // table属性
    columns: [
        {
            label: "姓名",
            prop: "name",
            // width:"20",
            disabled: true
        },
        {
            label: "出生日期",
            prop: "birthday",
            slot:'birthday',
            disabled: true
        },
        { label: "身份证", prop: "identity_card",disabled: true },
        {
            label: "操作",
            width: 1000,
            prop: "opts",
            slot: "opts",
            disabled: true
        },

    ] // column的配置
}