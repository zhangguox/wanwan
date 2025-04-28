// shuxue.js
const util = require('../../utils/util.js')

Page({
    data: {
        a: 0,
        b: 0,
        c: 0,
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
    resultFn() {
        if (isNaN(Number(this.data.a)) || isNaN(Number(this.data.a)) || isNaN(Number(this.data.a))) {
            return '题目填写错误';
        }
        if (this.data.a == 0 && this.data.b == 0) {
            if (this.data.c == 0) {
                return '无穷解';
            } else {
                return '无解';
            }
        }
        if (this.data.a == 0) {
            return `x=${-this.data.c / this.data.b}`
        }
        let derta = Math.pow(this.data.b, 2) - 4 * this.data.a * this.data.c
        if (derta < 0) {
            return '无解';
        }
        let x1 = (-this.data.b + Math.pow(derta, 1 / 2)) / (2 * this.data.a);
        let x2 = (-this.data.b - Math.pow(derta, 1 / 2)) / (2 * this.data.a);
        if (x1 == x2) {
            return `x=${x1}`
        }
        return `x=${x1}或${x2}`;
    },
    onResult() {
        this.setData({
            result: this.resultFn()
        })
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

            // if (fh == "+") {
            //     gw2 = 9 - Math.floor(Math.random() * (gw1 - 1));
            //     let swm = smax - sw1;
            //     if (gw1 + gw2 > 10 + max%10) {
            //         swm--;
            //     }
            //     sw2 = Math.floor(Math.random() * swm);
            // } else {
            //     gw2 = Math.floor(Math.random() * (9 - gw1)) + gw1 + 1;
            //     sw2 = Math.floor(Math.random() * sw1);
            // }

            if (fh == "+") {
                sw2 = Math.floor(Math.random() * (smax - sw1)); // 5
                let gwm1 = 9;
                if(smax-1 == sw1 + sw2) {
                    gwm1 = 10 + gmax - gw1; //10
                }
                gw2 = gwm1 >= 10 ? (9  - Math.floor(Math.random() * (gw1 - 1))) : gwm1;
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
    saveImage() {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.imageUrl,
            success: () => wx.showToast({ title: '保存成功' }),
            fail: (err) => wx.showToast({ title: '保存失败', icon: 'none' })
        });
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
    }
})
