/*
 * @Author: your name
 * @Date: 2021-07-30 01:27:24
 * @LastEditTime: 2021-08-05 01:55:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\api\blog.js
 */
import request from "./request";
// 获取所有博客分类
// 根据文档发送请求时不带参数 mock模拟数据需要匹配路径为/api/blogtype
export async function getBlogCategory() {
    return await request.get("/api/blogtype")
}

// 按页获取博客 包含参数根据文档设定默认值 返回的响应也包含参数
// 发送请求时包含参数，此时mock模拟数据需要匹配路径为/api/blog?参数=参数值
export async function getBlogs(page = 1, limit = 10, categoryid = -1) {
    // console.log(page, limit, categoryid);
    return await request.get("/api/blog", {
        params: {
            page,
            limit,
            categoryid,
        },
    });
}

// 获取单个博客
export async function getBlog(id) {
    return await request.get(`/api/blog/${id}`)
}

// 提交评论  commentInfo:要提交的评论信息
export async function postComment(commentInfo) {
    return await request.post("/api/comment", commentInfo)
}

// 分页获取评论
export async function getComments(page = 1, limit = 10, blogid = -1, keyword = "") {
    // console.log(page, limit, categoryid);
    return await request.get("/api/comment", {
        params: {
            page,
            limit,
            blogid,
            keyword
        },
    });
}