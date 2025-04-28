// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
    data: {
        motto: 'Hello 丫子',
        userInfo: {
            avatarUrl: defaultAvatarUrl,
            nickName: '',
            password: '',
        },
        hasUserInfo: false,
        canIUseGetUserProfile: wx.canIUse('getUserProfile'),
        canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    },
    onChooseAvatar(e) {
        const { avatarUrl } = e.detail
        const { nickName } = this.data.userInfo
        this.setData({
            "userInfo.avatarUrl": avatarUrl,
            hasUserInfo: avatarUrl && avatarUrl !== defaultAvatarUrl,
        })
        const logs = wx.getStorageSync('logs') || []
        logs.unshift({ time: Date.now(), avatarUrl: avatarUrl })
        wx.setStorageSync('logs', logs)
    },
    onInputChange(e) {
        const nickName = e.detail.value
        const { avatarUrl } = this.data.userInfo
        this.setData({
            "userInfo.nickName": nickName,
            hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
        })
    },
    onPasswordChange(e) {
        const nickName = e.detail.value
        const { avatarUrl } = this.data.userInfo
        this.setData({
            "userInfo.nickName": nickName,
            hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
        })
    },
    onLogin(e) {
        var pathMap = {
            'log': '../logs/logs',
            'shuxue': '../shuxue/shuxue',
            'fangcheng': '../fangcheng/fangcheng'
        }
        wx.navigateTo({
            url: pathMap[e.target.id],
        })
    },
    onGetUserInfo(e) {
        if (e.detail.userInfo) {
            const userInfo = e.detail.userInfo; // 包含昵称、头像等基础信息
            console.log(userInfo);
        } else {
            console.log("用户拒绝授权");
        }
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            },
            fail: (err) => {
                console.log(err)
            }
        })
    },
})
