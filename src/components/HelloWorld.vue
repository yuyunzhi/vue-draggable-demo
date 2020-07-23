<template>
    <div style="display: flex;flex-direction: row">
        <div class="canvas" style="height: 600px; width: 800px; position: relative;border:1px solid red;">
            <img src="../assets/background.png" alt="" style="width:100%;position: absolute;bottom:0;left:0;z-index: 0">
            <img src="../assets/audio.png" alt="" class="audio" @click="toggleAudio">
            <img src="../assets/next.png" alt="" class="next" @click="nextQuestion">
            <div class="title">Q:{{problems}}</div>
<!--            <video src="../assets/audio.mp3" id="video" ref="video"></video>-->
            <vue-draggable-resizable
                    :on-drag-start="onDragStartCallback(element)"
                    class="draggable-wrapper"
                    class-name-active="my-active-class"
                    v-for="element in imgArray"
                    :key="element.id"
                    :x="element.left"
                    :y="element.top"
                    :w="element.width"
                    :h="element.height"
                    :resizable="true"
                    :parent="true"
                    :ref="element.id"
                    :style="setZIndex(element.zIndex)"
                    @dragstop="onDragStop"
                    @resizing="(left, top, width, height) => onResize(element.id,left, top,width,height)"
                    @dragging="(left, top) => onDrag(element.id, left, top)"
            >

                    <img
                            :class="{ 'draggable-image-wrapper':true,'active': element.isActive }"
                            :src="element.url" alt=""
                            style="width:100%;height:100%;"
                            v-if="element.url">
                <p>{{element.id}}</p>
<!--                <p> 左: {{ element.left }} / 上: {{ element.top }} </p>-->
<!--                <p>左上: {{ element.leftTop }} / 右上: {{ element.rightTop }}</p>-->
<!--                <p>左下: {{ element.leftBottom }} / 右下: {{ element.rightBottom }}</p>-->
<!--                <p>center : {{element.center}}</p>-->
<!--                <p>name : {{element.id}}</p>-->
            </vue-draggable-resizable>

            <vue-draggable-resizable
                    :on-drag-start="onDragStartCallback(element)"
                    class="draggable-wrapper"
                    class-name-active="my-active-class"
                    v-for="element in imgArray"
                    :key="element.id"
                    :x="element.left"
                    :y="element.top"
                    :w="element.width"
                    :h="element.height"
                    :resizable="true"
                    :parent="true"
                    :ref="element.id"
                    :style="setZIndex(element.zIndex)"
                    @dragstop="onDragStop"
                    @resizing="(left, top, width, height) => onResize(element.id,left, top,width,height)"
                    @dragging="(left, top) => onDrag(element.id, left, top)"
            >

                <img
                        :class="{ 'draggable-image-wrapper':true,'active': element.isActive }"
                        :src="element.url" alt=""
                        style="width:100%;height:100%;"
                        v-if="element.url">

                <input type="text" >
                <p>{{element.id}}</p>
                <!--                <p> 左: {{ element.left }} / 上: {{ element.top }} </p>-->
                <!--                <p>左上: {{ element.leftTop }} / 右上: {{ element.rightTop }}</p>-->
                <!--                <p>左下: {{ element.leftBottom }} / 右下: {{ element.rightBottom }}</p>-->
                <!--                <p>center : {{element.center}}</p>-->
                <!--                <p>name : {{element.id}}</p>-->
            </vue-draggable-resizable>
        </div>


        <div class="config">
            <Config :imgArray="imgArray"
                    :problems="problems"
                    @updateProblem="updateProblem"
                    @updateImageArrayConfig="updateImageArrayConfig"></Config>
        </div>

    </div>
</template>

<script>
    import Config from './Config'

    export default {
        props:{
            isEditState:{ // 是否是编辑题目状态
                type:Boolean,
                default:true
            }
        },
        data () {
            return {
                canResetPositionImageItem:null, // 拖拽到某个图可以覆盖的对象值
                problems:null,// 标题
                videoPlayState:false,
                imgArray: [ //拖拽图的数据
                    {
                        height: 100,
                        width: 50,
                        zIndex: 1,
                        top: 40,
                        left: 50,
                        url: require('../assets/word1.png'),
                        id: '1',
                        area: 400,
                        canCover: false, // 当前图是否可以被覆盖定位
                        center: [0, 0],
                        leftTop: [0, 0],
                        rightTop: [0, 0],
                        leftBottom: [0, 0],
                        rightBottom: [0, 0],
                        isActive:false, // 是否被激活高亮图片
                    },
                    {
                        height: 50,
                        width: 50,
                        zIndex: 0,
                        top: 352,
                        left: 457,
                        url: require('../assets/blank.png'),
                        id: '1-1',
                        area: 400,
                        userDisabledMove:false,
                        canCover: true,
                        center: [0, 0],
                        leftTop: [0, 0],
                        rightTop: [0, 0],
                        leftBottom: [0, 0],
                        rightBottom: [0, 0],
                    },
                    {
                        height: 50,
                        width: 50,
                        zIndex: 1,
                        top: 300,
                        left: 300,
                        url: require('../assets/word2.png'),
                        isActive:false,
                        id: '2',
                        area: 400,
                        center: [0, 0],
                        leftTop: [0, 0],
                        rightTop: [0, 0],
                        leftBottom: [0, 0],
                        rightBottom: [0, 0],
                        canCover: false,
                    },
                    {
                        height: 50,
                        width: 50,
                        zIndex: 0,
                        top: 531,
                        left: 200,
                        url: require('../assets/blank.png'),
                        id: '2-2',
                        canCover: true,
                        userDisabledMove:true,
                        area: 400,
                        center: [0, 0],
                        leftTop: [0, 0],
                        rightTop: [0, 0],
                        leftBottom: [0, 0],
                        rightBottom: [0, 0],
                    }
                ]
            }
        },

        components: {
            Config
        },
        mounted() {
            this.imgArray.forEach((item, index) => {
                this.updateImagePositionData(index, item.left, item.top, item.width, item.height)
            })
        },
        methods: {
            onDragStartCallback(element){
                if(element.userDisabledMove) return false
            },
            initActiveState(){
                this.canResetPositionImageItem = null
                this.imgArray.forEach((item) => {
                    item.isActive = false
                })
            },
            toggleAudio(){
                let myVideo=document.getElementById("video");
                if(this.videoPlayState ){
                    myVideo.pause()
                }else{
                    myVideo.play()
                }
                this.videoPlayState = !this.videoPlayState
            },
            setZIndex(zIndex) {
                return {
                    'z-index': zIndex
                }
            },
            onResize(id, left, top, width, height) {
                this.imgArray.forEach((item, index) => {
                    if (item.id === id) {
                        this.updateImagePositionData(index, left, top, width, height)
                    }
                })


            },
            collectEnterImagePublicArea(targetImage) {
                this.areaResult = []
                this.imgArray.forEach((imageItem) => {
                    if (imageItem.id !== targetImage.id) {
                        console.warn(`--------判断 ${targetImage.id} 是否接触进入 ${imageItem.id}----------`)

                        // 计算拖拽的图片与当前循环的某个图片多少个点相遇，meetingPoints：0, 1, 2 ,4 四种情况
                        let {meetingPoints, inPictureRange} = this.computedDragImageMeetPoints(targetImage, imageItem)

                        // 根据相遇点的情况，计算拖拽图片与某个图片的公共面积 返回值
                        const singleImagePublicAreaPercent = this.computedPublicAreaAndPercent(targetImage, imageItem, meetingPoints, inPictureRange)

                        // push到一个集合，该集合是这次拖拽所有遇到的图片含有公共面积的对象
                        this.areaResult.push(singleImagePublicAreaPercent)
                    }
                })
            },

            onDrag(id, left, top) {
                this.imgArray.forEach((item, index) => {
                    if (item.id === id) {

                        this.updateImagePositionData(index, left, top, this.imgArray[index].width, this.imgArray[index].height)
                        // 收集进入当前循环图片的公共面积及百分比
                        this.collectEnterImagePublicArea(item)

                    }
                })

                // 编辑状态不高亮
                if(this.isEditState) return
                //高亮图片
                this.highLightWhichPictureCanSetPosition()
            },
            highLightWhichPictureCanSetPosition(){

                // 选出占自身百分之0%以上以及占imageItem面积最大的图片可高亮

                const percentMoreThenFifty = this.areaResult.filter((item)=>{
                    return item.percentInSelf > 0
                })

                if(percentMoreThenFifty.length === 0){
                    this.initActiveState()
                    return
                }

                let maxPercent = percentMoreThenFifty[0].percentInOther
                let maxIndex = 0
                percentMoreThenFifty.forEach((item, index) => {
                    if (index > 0 && item.percentInOther > maxPercent) {
                        maxPercent = item.percentInOther
                        maxIndex = index
                    }
                })

                this.canResetPositionImageItem = percentMoreThenFifty[maxIndex]
                // 可以高亮的图片为 percentMoreThenFifty[maxIndex].imageItem.id
                const { imageItem } = percentMoreThenFifty[maxIndex]

                // 改变class切换高亮
                this.imgArray.forEach((item) => {
                    if (item.id === imageItem.id && item.canCover) {
                        item.isActive = true
                    }else{
                        item.isActive = false
                    }
                })
            },
            onDragStop() {
                if(this.isEditState) return

                if(!this.canResetPositionImageItem) return

                if(!this.canResetPositionImageItem.imageItem.canCover) return

                console.warn('[onDragStop],可高亮的image,id:',this.canResetPositionImageItem.imageItem.id)
                console.warn('[onDragStop],可高亮的image,占自己面积为:',this.canResetPositionImageItem.percentInSelf)
                console.warn('[onDragStop],可高亮的image,占当前覆盖的图片面积为:',this.canResetPositionImageItem.percentInOther)

                const {targetImage ,imageItem } = this.canResetPositionImageItem
                // 重新定位图片位置
                this.resetTargetPosition(targetImage,imageItem)
                // 记录答案
                this.recordAnswer(targetImage,imageItem)
            },
            recordAnswer(targetImage,imageItem) {
                const string = '拖拽匹配：' + targetImage.id + '拖拽到' + imageItem.id
                alert(string)
            },
            resetTargetPosition(targetImage,imageItem) {
                this.imgArray.forEach((item, index) => {
                    if (item.id === targetImage.id) {
                        this.updateImagePositionData(index, imageItem.left, imageItem.top, targetImage.width, targetImage.height)
                    }
                })
            },
            nextQuestion(){
                alert('下一题')
            },
            updateImageArrayConfig(imageConfig) {
                this.imgArray = imageConfig
            },
            updateProblem(problems){
                console.log(problems);
                this.problems = problems
            },
            computedPublicAreaAndPercent(targetImage, imageItem, meetingPoints, inPictureRange) {
                const {
                    leftTop: targetLeftTop,
                    rightTop: targetRightTop,
                    leftBottom: targetLeftBottom,
                    rightBottom: targetRightBottom
                } = targetImage

                const {leftTop, rightTop, rightBottom, leftBottom} = imageItem
                // 计算面积
                let publicArea = 0
                if (meetingPoints === 0) {
                    // 是否全部包裹 图片，根据边界左上，右下判断
                    const isContainsImage = targetLeftTop[0] <= leftTop[0] && targetLeftTop[1] <= leftTop[1] && targetRightBottom[0] >= rightBottom[0] && targetRightBottom[1] >= rightBottom[1]
                    if (isContainsImage) {
                        // 全包裹
                        publicArea = imageItem.width * imageItem.height
                        console.log(`${targetImage.id} 的【全包裹】 了 ${imageItem.id}。，公共面积：`,publicArea,'占比',publicArea/imageItem.area)

                    } else {
                        // 半包裹 6种情况，可画图

                        // 图片右方进入目标图片
                        // x方向
                        // targetLeftTop[0]<= rightTop[0] <= targetRightTop[0]
                        // leftTop[0] <= targetLeftTop[0]
                        // y方向
                        // rightTop[1] >= targetRightTop[1]
                        // rightBottom[1] <= targetRightBottom[1]

                        const imgEnterTargetFromRightInX = targetLeftTop[0] <= rightTop[0] && rightTop[0] <= targetRightTop[0] && leftTop[0] <= targetLeftTop[0]
                        const imgEnterTargetFromRightInY = rightTop[1] >= targetRightTop[1] && rightBottom[1] <= targetRightBottom[1]

                        if (imgEnterTargetFromRightInX && imgEnterTargetFromRightInY) {
                            publicArea = imageItem.height * (rightTop[0] - targetLeftTop[0])
                            console.log(`${targetImage.id} 的【右侧嵌入】 了 ${imageItem.id}。，公共面积：`,publicArea,'占比',publicArea/imageItem.area)

                        }

                        // 图片上方进入目标图片
                        // x方向
                        // leftBottom[0] >= targetLeftTop[0]
                        // rightBottom[0] <= targetRightTop[0]
                        // y方向
                        //  targetRightTop[1]<= rightBottom[1] <= targetRightBottom[1]
                        // rightTop[1] <=  targetRightTop[1]
                        const imgEnterTargetFromTopInX = leftBottom[0] >= targetLeftTop[0] && rightBottom[0] <= targetRightTop[0]
                        const imgEnterTargetFromTopInY = rightTop[1] <= targetRightTop[1] && targetRightTop[1] <= rightBottom[1] && rightBottom[1] <= targetRightBottom[1]

                        if (imgEnterTargetFromTopInX && imgEnterTargetFromTopInY) {
                            publicArea = imageItem.width * (rightBottom[1] - targetRightTop[1])
                            console.log(`${targetImage.id} 的【上侧嵌入】 了 ${imageItem.id}。，公共面积：`,publicArea,'占比',publicArea/imageItem.area)

                        }

                        // 图片下方进入目标图片
                        // x方向
                        // leftTop[0] >= targetLeftBottom[0]
                        // rightTop[0] <= targetRightBottom[0]
                        // y方向
                        // targetRightTop[1] <= rightTop[1] <= targetRightBottom[1]
                        // rightBottom[1] >= targetRightBottom[1]
                        const imgEnterTargetFromBottomInX = leftTop[0] >= targetLeftBottom[0] && rightTop[0] <= targetRightBottom[0]
                        const imgEnterTargetFromBottomInY = targetRightTop[1] <= rightTop[1] && rightTop[1] <= targetRightBottom[1] && rightBottom[1] >= targetRightBottom[1]

                        if (imgEnterTargetFromBottomInX && imgEnterTargetFromBottomInY) {
                            publicArea = imageItem.width * (targetRightBottom[1] - rightTop[1])
                            console.log(`${targetImage.id} 的【下侧嵌入】 了 ${imageItem.id}。，公共面积：`,publicArea,'占比',publicArea/imageItem.area)
                        }

                        // 图片左方进入目标图片
                        // x方向
                        // targetLeftTop[0] <= leftTop[0] <= targetRightTop[0]
                        // rightTop[0] >= targetRightTop[0]
                        // y方向
                        // leftTop[1] >= targetLeftTop[1]
                        // leftBottom[1] <= targetLeftBottom[1]
                        const imgEnterTargetFromLeftInX = rightTop[0] >= targetRightTop[0] && targetLeftTop[0] <= leftTop[0] && leftTop[0] <= targetRightTop[0]
                        const imgEnterTargetFromLeftInY = leftTop[1] >= targetLeftTop[1] && leftBottom[1] <= targetLeftBottom[1]

                        if (imgEnterTargetFromLeftInX && imgEnterTargetFromLeftInY) {
                            publicArea = imageItem.height * (targetRightTop[0] - leftTop[0])
                            console.log(`${targetImage.id} 的【左侧嵌入】 了 ${imageItem.id}。，公共面积：`,publicArea,'占比',publicArea/imageItem.area)

                        }

                        //水平贯穿拖拽的图片
                        // x方向
                        // leftTop[0]<= targetLeftTop[0] && targetRightTop[0] <= rightTop[0]
                        // y方
                        // leftTop[1] >= targetLeftTop[1] && leftBottom[1] <= targetLeftBottom[1]
                        const imgEnterTargetFromHorizontalInX = leftTop[0] <= targetLeftTop[0] && targetRightTop[0] <= rightTop[0]
                        const imgEnterTargetFromHorizontalInY = leftTop[1] >= targetLeftTop[1] && leftBottom[1] <= targetLeftBottom[1]

                        if (imgEnterTargetFromHorizontalInX && imgEnterTargetFromHorizontalInY) {
                            publicArea = imageItem.height * targetImage.width
                            console.log(`${imageItem.id} 【水平贯穿】 了 ${targetImage.id} 。，公共面积：`,publicArea,'占比',publicArea/imageItem.area)

                        }

                        //垂直贯穿拖拽的图片
                        // x方向
                        // targetLeftTop[0] <= leftTop[0] && rightTop[0] <= targetRightTop[0]
                        // y方向
                        // targetLeftTop[1] >= leftTop[1] && targetLeftBottom[1] <= leftBottom[1]

                        const imgEnterTargetFromVerticalInX = targetLeftTop[0] <= leftTop[0] && rightTop[0] <= targetRightTop[0]
                        const imgEnterTargetFromVerticalInY = targetLeftTop[1] >= leftTop[1] && targetLeftBottom[1] <= leftBottom[1]

                        if (imgEnterTargetFromVerticalInX && imgEnterTargetFromVerticalInY) {
                            publicArea = imageItem.width * targetImage.height
                            console.log('[publicArea] ' + imageItem.id + '垂直贯穿拖拽的图片,公共面积为', publicArea);
                            console.log(`${imageItem.id} 【垂直贯穿】 了 ${targetImage.id} 。，公共面积：`,publicArea,'占比',publicArea/imageItem.area)
                        }
                    }
                }

                if (meetingPoints === 1) {
                    // 1个点相遇
                    if (inPictureRange[0] === 1) {
                        // targetLeftTop
                        // rightBottom
                        publicArea = (rightBottom[0] - targetLeftTop[0]) * (rightBottom[1] - targetLeftTop[1])

                    }
                    if (inPictureRange[1] === 1) {
                        // targetRightTop
                        // LeftBottom
                        publicArea = (targetRightTop[0] - leftBottom[0]) * (leftBottom[1] - targetRightTop[1])

                    }
                    if (inPictureRange[2] === 1) {
                        // targetRightBottom
                        // leftTop
                        publicArea = Math.abs((leftTop[0] - targetRightBottom[0]) * (leftTop[1] - targetRightBottom[1]))

                    }
                    if (inPictureRange[3] === 1) {
                        // targetLeftBottom
                        // rightTop
                        publicArea = Math.abs((rightTop[0] - targetLeftBottom[0]) * (rightTop[1] - targetLeftBottom[1]))

                    }
                    console.log(`与  ${imageItem.id} 1 个点相遇。，公共面积：`,publicArea,'占比',publicArea/imageItem.area)

                }

                if (meetingPoints === 2) {
                    // 两个点相遇
                    if (inPictureRange[0] === 1 && inPictureRange[1] === 1) {
                        // 上方进入
                        // leftBottom[1] - TargetLeftTop[1]
                        publicArea = Math.abs(targetImage.width * (leftBottom[1] - targetLeftTop[1]))
                    }

                    if (inPictureRange[1] === 1 && inPictureRange[2] === 1) {
                        // 右方进入
                        // targetRightTop[0] - leftTop[0]
                        publicArea = Math.abs(targetImage.height * (targetRightTop[0] - leftTop[0]))

                    }

                    if (inPictureRange[2] === 1 && inPictureRange[3] === 1) {
                        // 下方进入
                        // targetRightBottom[1] - rightTop[1]
                        publicArea = Math.abs(targetImage.width * (targetRightBottom[1] - rightTop[1]))

                    }

                    if (inPictureRange[3] === 1 && inPictureRange[0] === 1) {
                        // 左方进入
                        // rightTop[0] - targetLeftTop[0]
                        publicArea = Math.abs(targetImage.height * (rightTop[0] - targetLeftTop[0]))

                    }
                    console.log(`与  ${imageItem.id} 2 个点相遇。，公共面积：`,publicArea,'占比',publicArea/imageItem.area)

                }

                if (meetingPoints === 4) {
                    // 3个点就是整个目标图片全部进入其他大的图片
                    let publicArea = targetImage.width * targetImage.height
                    console.log('[publicArea] 全部进入', imageItem.id, publicArea);
                    console.log(` ${imageItem.id} 4个点相遇 【全包裹】了 ${targetImage.id} 。，公共面积：`,publicArea,'占比',publicArea/imageItem.area)

                }

                return {
                    percentInSelf: publicArea /  targetImage.area,
                    percentInOther: publicArea / imageItem.area,
                    imageItem,
                    targetImage
                }
            },
            updateImagePositionData(index, left, top, width, height) {
                this.imgArray[index].left = left
                this.imgArray[index].top = top
                this.imgArray[index].width = width
                this.imgArray[index].height = height
                this.imgArray[index].area = height * width
                this.imgArray[index].center = [parseInt(left + width / 2), parseInt(top + height / 2)]
                this.imgArray[index].leftTop = [left, top]
                this.imgArray[index].rightTop = [left + width, top]
                this.imgArray[index].rightBottom = [left + width, top + height]
                this.imgArray[index].leftBottom = [left, top + height]

            },
            computedDragImageMeetPoints(targetImage, imageItem) {
                const {
                    leftTop: targetLeftTop,
                    rightTop: targetRightTop,
                    leftBottom: targetLeftBottom,
                    rightBottom: targetRightBottom
                } = targetImage

                const {leftTop, rightBottom} = imageItem

                let meetingPoints = 0
                const inPictureRange = [0, 0, 0, 0] // 左上，右上，右下，左下

                // 判断目标图片左上角targetLeftTop是否进入其他图片
                if (targetLeftTop[0] >= leftTop[0] && targetLeftTop[0] <= rightBottom[0] && targetLeftTop[1] >= leftTop[1] && targetLeftTop[1] <= rightBottom[1]) {
                    console.log(`${targetImage.id} 的【左上角】 进入了 ${imageItem.id}。`)
                    inPictureRange[0] = 1
                    meetingPoints++
                }

                // 判断目标图片右上角targetRightTop是否进入其他图片
                if (targetRightTop[0] >= leftTop[0] && targetRightTop[0] <= rightBottom[0] && targetRightTop[1] >= leftTop[1] && targetRightTop[1] <= rightBottom[1]) {
                    console.log(`${targetImage.id} 的【右上角】 进入了 ${imageItem.id}。`)

                    inPictureRange[1] = 1
                    meetingPoints++
                }

                // 判断目标图片右下脚是否进入其他图片
                if (targetRightBottom[0] >= leftTop[0] && targetRightBottom[0] <= rightBottom[0] && targetRightBottom[1] >= leftTop[1] && targetRightBottom[1] <= rightBottom[1]) {
                    console.log(`${targetImage.id} 的【右下角】 进入了 ${imageItem.id}。`)
                    inPictureRange[2] = 1
                    meetingPoints++
                }

                // 判断目标图片左下角是否进入其他图片
                if (targetLeftBottom[0] >= leftTop[0] && targetLeftBottom[0] <= rightBottom[0] && targetLeftBottom[1] >= leftTop[1] && targetLeftBottom[1] <= rightBottom[1]) {
                    console.log(`${targetImage.id} 的【左下角】 进入了 ${imageItem.id}。`)
                    inPictureRange[3] = 1
                    meetingPoints++

                }

                if(meetingPoints>0){
                    console.log('【几个点相遇到】',meetingPoints)
                }

                return {
                    meetingPoints,
                    inPictureRange
                }

            },
        }
    }
</script>

<style type="scss" scoped>
    .audio {
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 1;
        width: 30px;
    }

    .title {
        font-size: 26px;
        font-weight: 500;
        text-align: justify;
        color: #222222;
        line-height: 37px;
        letter-spacing: 0px;
        position: absolute;
        top: 22px;
        left: 67px;
        z-index: 0
    }
    .next{
        position: absolute;
        bottom:0;
        right: 0px;
        z-index: 1;
        width: 98px;
    }
        .draggable-image-wrapper.active{
            border:1px solid red
        }


</style>
