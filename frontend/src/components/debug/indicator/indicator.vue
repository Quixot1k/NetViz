<!--
 * @Author: your name
 * @Date: 2021-04-11 17:59:31
 * @LastEditTime: 2022-02-10 15:42:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frontend\src\components\layout\utils\indicator.vue
-->

<template>
    <div :class="['indicator']">
        <div :class="['indicator-section']">
        </div>
        <div :class="['circle-id']"> {{id_}} </div>
        <div :class="['indicator-footer']">
            <div :class="['progress']">
                <div :class="['progressBar']">
                    <el-progress :text-inside="true" :stroke-width="21" :percentage= percentage></el-progress>
                </div>
                <div :class="['button-container']">
                    <el-button type="success" icon="el-icon-check" @click="prun_()" :class="['button']"></el-button>
                </div>
            </div>
            <div :class="['display-container']">
                <div :class="['display-svg-container']">
                    <svg id="displayBrushed" :class="['display-svg']"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { createNamespacedHelpers } from 'vuex'
import methods from './indicator.method'
const {mapGetters:mapLayoutGetters,mapMutations: mapLayoutMutations, mapActions: mapLayoutActions} = createNamespacedHelpers('layout')
const { mapActions: mapIndicatorActions,mapGetters:mapIndicatorGetters,mapMutations: mapIndicatorMutations,} = createNamespacedHelpers('indicator')
const {mapGetters:mapModelViewGetters,mapMutations: mapModelViewMutations, mapActions: mapModelViewActions} = createNamespacedHelpers('modelView')
export default {
    data () {
        return{
            id_: '',
            percentage:0,
            indicator:undefined,
            kernelSize:0,
            brushed:[]
        }
    },
    computed:{
        // ...mapLayoutGetters(["getTarget","getTrainStep","getKernelData"]),
        ...mapIndicatorGetters(["get_finish_state","get_indicator","get_targetVertex"]),
        ...mapModelViewGetters(['getTrainStep','getTargetVertex'])
        
    },
    mounted() {
        this.height = document.getElementsByClassName('indicator')[0].clientHeight -20
        this.width = document.getElementsByClassName('indicator')[0].clientWidth
    },
    watch:{
        get_indicator:function(val) {
          this.indicator = val
        },
        get_finish_state:function(val) {
          if(val["rank"] && val["sensitivity"]) {
            this.set_indicator()
            val["rank"] = false
            val["sensitivity"] = false
          }
        },
        indicator(val) {
            this.paramData = val
            this.drawBubble()
        },
        brushed(val) {
            this.percentage = this.kernelSize == 0?0:val.length/this.kernelSize*100
            this.drawDisplay()
        },
        getTrainStep:{
            immediate: true,
            handler(val){
                if(val != undefined) {
                    let conv = this.getTargetVertex
                    this.fetch_sensitivity({"Id":conv,"step":val})
                    this.fetch_rank({"Id":conv,"step":val})
                }
            }
        }
    },
    methods:{
        ...mapModelViewMutations([
            'setPrunContent'
        ]),
        ...mapLayoutMutations([
          "setKernelDataDetail",
        ]),
        ...mapIndicatorMutations([
          "set_indicator",
          "set_prun_tag"
        ]),
        ...mapIndicatorActions([
          'fetch_rank',
          'fetch_sensitivity',
          'directive_prun'
        ]),
        ...methods
    }
}
</script>

<style lang="less" scoped>
@import 'indicator.less';
</style>