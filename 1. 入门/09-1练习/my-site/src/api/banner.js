import request from "./request";
export async function getBanner() {
    return await request.get("/api/banner")
}

// 测试
// getBanner().then(r=>{
//     console.log(r);
// })