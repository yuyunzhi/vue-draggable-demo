<template>
    <div>
        <div>
            <h3>题目参数配置</h3>
            <div>标题 : <input type="text"
                             @input="updateProblemsConfig"
                             :value="problems" ></div>
        </div>
        <hr>
        <h3>图片参数配置</h3>
        <div v-for="(ele,index) in copyImageArray" :key="index">
            <div>name:{{ele.id}}</div>

            <div>高度 : <input type="text"
                             @keyup="(e)=>handleKeyDown(e,index,'height')"
                             @change="(e)=>setImageConfig(e,index,'height')"
                             :value="copyImageArray[index].height" ></div>
            <div>宽度 : <input type="text"
                             @keyup="(e)=>handleKeyDown(e,index,'width')"
                             @change="(e)=>setImageConfig(e,index,'width')"
                             :value="copyImageArray[index].width"></div>
            <div>层级 : <input type="text"
                             @keyup="(e)=>handleKeyDown(e,index,'zIndex')"
                             @change="(e)=>setImageConfig(e,index,'zIndex')"
                             :value="copyImageArray[index].zIndex"></div>
            <div>距左 : <input type="text"
                               @keyup="(e)=>handleKeyDown(e,index,'left')"
                               @change="(e)=>setImageConfig(e,index,'left')"
                               :value="copyImageArray[index].left"></div>
            <div>距上 : <input type="text"
                               @keyup="(e)=>handleKeyDown(e,index,'top')"
                               @change="(e)=>setImageConfig(e,index,'top')"
                               :value="copyImageArray[index].top"></div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Config",
        props:{
            imgArray:{
                type:Array,
            },
            problems:{
                type:String,
            }
        },
        data(){
            return{
                aPairOfDots:[
                    {
                        height:0,
                        width:0,
                        zIndex:0,
                        top:0,
                        left:0,
                        id:'1'
                    },
                    {
                        height:0,
                        width:0,
                        zIndex:0,
                        top:0,
                        left:0,
                        id:'1-1'
                    }
                ],
                copyImageArray:[]
            }
        },
        mounted(){
            this.copyImageArray = JSON.parse(JSON.stringify(this.imgArray))
            this.$emit('updateImageArrayConfig',this.copyImageArray)
        },
        methods:{
            handleKeyDown (e,index,type) {
                console.log('e.keyCode',e.keyCode);
                switch(e.keyCode) {
                    case 38: // Up
                        if(type === 'width'){
                            this.copyImageArray[index].width ++
                        }

                        if(type === 'height'){
                            this.copyImageArray[index].height ++

                        }

                        if(type === 'top'){
                            this.copyImageArray[index].top ++

                        }

                        if(type === 'left'){
                            this.copyImageArray[index].left ++

                        }

                        if(type === 'zIndex'){
                            this.copyImageArray[index].zIndex ++
                        }
                        this.$emit('updateImageArrayConfig',this.copyImageArray)
                        break
                    case 40: // Down
                        if(type === 'width'){
                            this.copyImageArray[index].width --
                        }

                        if(type === 'height'){
                            this.copyImageArray[index].height --

                        }

                        if(type === 'top'){
                            this.copyImageArray[index].top --

                        }

                        if(type === 'left'){
                            this.copyImageArray[index].left --

                        }

                        if(type === 'zIndex'){
                            this.copyImageArray[index].zIndex --
                        }
                        this.$emit('updateImageArrayConfig',this.copyImageArray)
                        break
                    default:
                        break
                }
            },
            setImageConfig(e,index,type){
                console.log('eeeeee',e.target.value);
                if(type === 'width'){
                    this.copyImageArray[index].width = e.target.value
                }

                if(type === 'height'){
                    this.copyImageArray[index].height = e.target.value

                }

                if(type === 'top'){
                    this.copyImageArray[index].top = e.target.value
                }

                if(type === 'left'){
                    this.copyImageArray[index].left = e.target.value


                }
                if(type === 'zIndex'){
                    this.copyImageArray[index].zIndex = e.target.value
                }
                this.$emit('updateImageArrayConfig',this.copyImageArray)
            },
            updateProblemsConfig(e){
                console.log('[updateProblemsConfig]',e.target.value);
                this.$emit('updateProblem',e.target.value)
            }
        }
    }
</script>

<style scoped>

</style>
