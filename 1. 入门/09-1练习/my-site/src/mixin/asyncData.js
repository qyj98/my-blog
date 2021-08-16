/*
 * @Author: your name
 * @Date: 2021-07-29 15:41:34
 * @LastEditTime: 2021-08-07 01:11:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\mixin\asyncData.js
 */

export default function (dataType = null) {
    return {
        data() {
            return {
                data: dataType,
                isLoading: true,
            }
        },
        async created() {
            this.data = await this.asyncData();
            this.isLoading = false;
        },
    }
}