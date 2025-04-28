// shuxue.js
Page({
    data: {
        max: 50,
        result: "",
        showAnswer: false,
        items: []
    },
    inputValueChange(e) {
        if (e.target.id == 'max') {
            let value = Number(e.detail.value);
            this.setData({ max: value > 100 ? 100 : value < 20 ? 20 : value });
        } else {
            this.setData({ [e.target.id]: e.detail.value });
        }
    },
    showAnswerFn() {
        this.setData({ showAnswer: !this.data.showAnswer });
    },

    createItems() {
        let items = [];
        let max = this.data.max;
        let gmax = max % 10;
        let smax = Math.floor(max / 10);
        function randomNum(beishu, fh) {
            let first = Math.floor(Math.random() * beishu) + 1;
            let max = Math.floor((beishu - 10) / 10) * 10 + 9;
            let min = 10;
            if ((first % 10 == 9 || first < min) && fh == "-" || (first % 10 == 0 || first > max) && fh == "+") {
                return randomNum(beishu, fh);
            }
            return first;
        }
        for (let index = 0; index < 48; index++) {
            let fh = Math.random() > 0.5 ? "+" : "-";
            let first = randomNum(max, fh);
            let sw1 = Math.floor(first / 10);  //3
            let gw1 = first % 10;  //9
            let sw2, gw2;

            if (fh == "+") {
                sw2 = Math.floor(Math.random() * (smax - sw1)); // 5
                let gwm1 = 9;
                if (smax - 1 == sw1 + sw2) {
                    gwm1 = 10 + gmax - gw1; //10
                }
                gw2 = gwm1 >= 10 ? (9 - Math.floor(Math.random() * (gw1 - 1))) : gwm1;
            } else {
                sw2 = Math.floor(Math.random() * sw1);  //2
                gw2 = Math.floor(Math.random() * (9 - gw1)) + gw1 + 1;
            }
            let gs = `${sw1 || ''}${gw1}${fh}${sw2 || ''}${gw2}=`;
            console.log(gs, sw2, gw2)
            let da = sw1 * 10 + gw1 + (fh == "+" ? (sw2 * 10 + gw2) : -(sw2 * 10 + gw2));
            items.push({
                text: gs,
                da: da
            });
        }
        this.setData({
            items: items,
            showAnswer: false
        })
    },
    saveToCanvas() {
        this.createSelectorQuery()
            .select("#targetDom")
            .node()
            .exec(res => {
                const node = res[0].node;
                node.takeSnapshot({
                    type: 'arraybuffer', // 可以是 'arraybuffer' 或 'file'
                    format: 'png', // 可以是 'png' 或 'rgba'
                    success: (res) => {
                        const f = `${wx.env.USER_DATA_PATH}/hello.png`
                        const fs = wx.getFileSystemManager();
                        fs.writeFileSync(f, res.data, 'binary')
                        wx.showToast({
                            title: '保存成功'
                        })
                        console.log(f)
                        wx.saveImageToPhotosAlbum({
                            filePath: f,
                            success: () => wx.showToast({ title: '保存成功' }),
                            fail: (err) => wx.showToast({ title: '保存失败', icon: 'none' })
                        });
                    },
                    fail(res) {
                        console.error('截图失败', res);
                    }
                });
            });
    },
    saveImage() {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.imageUrl,
            success: () => wx.showToast({ title: '保存成功' }),
            fail: (err) => wx.showToast({ title: '保存失败', icon: 'none' })
        });
    }
})
