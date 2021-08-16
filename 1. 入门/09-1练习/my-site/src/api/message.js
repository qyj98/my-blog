import request from "./request";

// 分页获取评论
export async function getMessages(page = 1, limit = 10) {
    // console.log(page, limit, categoryid);
    return await request.get("/api/message", {
        params: {
            page,
            limit,
        },
    });
}

// 提交留言  commentInfo:要提交的留言信息
export async function postMessage(messageInfo) {
    return await request.post("/api/message", messageInfo)
}

