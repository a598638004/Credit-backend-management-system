<template>
    <div id="approve">
        <GSearchQuery @setValue="setQueryName"></GSearchQuery>
        <GTable :options="conf.options" :pageOptions="frontPageOptions" :data="tableData" :loadingTag="loadingTag"
            :columns="conf.columns" @handleCurrentChange="currentPageChange" @size-change="sizeChange">

            <template #birthday="col">
                <el-table-column width="170" :prop="col.prop" :label="col.label">
                    <template v-slot="{ row }">
                        <span>{{ row.birthday | birthday }}</span>
                    </template>
                </el-table-column>
            </template>


            <template v-slot:opts="col">
                <el-table-column :label="col.label" :width="col.width">
                    <template v-slot="{ row }">
                        <el-button @click="showInfo(row)" type="primary">查看</el-button>
                        <el-button type="success">通过</el-button>
                        <el-button type="danger">拒绝</el-button>
                    </template>
                </el-table-column>
            </template>
        </GTable>


        <el-dialog title="贷款审批-查看详情" :visible.sync="dialogVisible" width="30%">
            <GFormCreator :nonCheck="true" :conf="editConf" :key="Math.random()">
                <template>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </template>

            </GFormCreator>
        </el-dialog>
    </div>
</template>

<script>
import conf from './conf';
import { pager, crud } from '@/mixins';

import { convertBirthday } from '@/filters';
import Vue from 'vue';
export default {
    mixins: [pager, crud],
    methods: {
        showInfo(row) {
            this.dialogVisible = true;
            // 取出过滤器
            let filterFn1 = Vue.filter('birthday');
            let filterFn2 = Vue.filter('sex');
            let filterFn3 = Vue.filter('education');
            this.editConf = {
                items: [
                    [{ key: 'id', label: 'id', value: row.id }],
                    [{ key: 'name', label: '姓名', value: row.name }],
                    [{ key: 'birthday', label: '出生日期', value: filterFn1(row.birthday) }],
                    [{ key: 'sex', label: '性别', value: filterFn2(row.sex) }],
                    [{ key: 'education', label: '教育程度', value: filterFn3(row.education) }],
                    [{ key: 'address1', label: '地址', value: row.address1 }],
                    [{ key: 'mobile_phone', label: '手机号', value: row.mobile_phone }],
                    [{ key: 'identity_card', label: '身份证', value: row.identity_card }]

                ].map(rowArr => rowArr.map(item => ({ ...item, type: 'input', colspan: 24, attrs:{ disabled:true }  })))
            }
        },
        beforeInit() {
            this.url = "/approve/first/list";
            this.customField = {
                loadingTag: this.loadingTag
            };
            return true;
        },
    },
    created() {
        this.init();
    },
    data() {
        return {
            conf: conf,
            loadingTag: 'tab2',
            tableData: [],
            dialogVisible: false,
            editConf: {}
        }
    }
}
</script>

<style scoped>
</style>