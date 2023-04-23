function convertTime(time) {
    return time < 10 ? "0" + time : time
}

function install(Vue) {
    Vue.filter("birthday", birthday => {
        let date = new Date(birthday);
        return date.getFullYear() + "-"
            + convertTime(date.getMonth()) + "-"
            + convertTime(date.getDate()) + " "
            + convertTime(date.getHours()) + "-"
            + convertTime(date.getMinutes()) + "-"
            + convertTime(date.getSeconds())
    })

    Vue.filter("sex", sex => {
        switch (sex) {
            case "man":
                return '男';
            case "woman":
                return '女';
            default:
                return sex
        }
    })

    Vue.filter("education", education => {
        switch (education) {
            case "college":
                return '大学';
            case "highschool":
                return '高中';
            default:
                return education
        }
    })

    Vue.filter('status', status => {
        switch (status) {
            case 0:
                return '进件'
            case 1:
                return '提交初审'
            case 2:
                return '初审通过'
            case 3:
                return '初审拒绝'
            case 4:
                return '提交终审'
            case 5:
                return '终审通过'
            case 6:
                return '终审拒绝'
            case 7:
                return '生成合同'
        }
    })

    Vue.filter('statusColor', status => {
        switch (status) {
            case 0:
                return 'success'
            case 1:
                return ''
            case 2:
                return 'success'
            case 3:
                return 'danger'
            case 4:
                return 'warning'
            case 5:
                return 'success'
            case 6:
                return 'danger'
            case 7:
                return 'success'
        }
    })

    Vue.filter("contractText", status => {
        if(status > 5){
            return "已生成合同"
        }else{
            return "未生成合同"
        }
    })

    Vue.filter('contractColor',(status)=>{
        if (status > 5) {
            return 'success'
        } else {
            return 'primary'
        }
    });

    Vue.filter('role',(type)=>{
        switch(type){
            case 'input':
                return '录入专员';
            case 'administrator':
                return '管理员';
            case 'approve':
                return '审批专员'
        }
    });

}

export default {
    install
}