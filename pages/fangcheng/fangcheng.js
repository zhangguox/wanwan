// shuxue.js
Page({
    data: {
        a: 0,
        b: 0,
        c: 0,
        result: "",
        x1: 0,
        y1: 0,
        z1: 0,
        x2: 0,
        y2: 0,
        z2: 0,
        result2: ""
    },
    inputValueChange(e) {
        if (e.target.id == 'max') {
            let value = Number(e.detail.value);
            this.setData({ max: value > 100 ? 100 : value < 20 ? 20 : value });
        } else {
            console.log(e);
            this.setData({ [e.target.id]: e.detail.value });
        }
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
    resultFn2() {
        let d = this.data.x2 * this.data.y1 - this.data.x1 * this.data.y2;
        if (d == 0) {
            if ((this.data.y1 * this.data.x2 - this.data.y2 * this.data.x1)
                || (this.data.x1 * this.data.z2 - this.data.x2 * this.data.z1)) {
                return '无解';
            } else {
                return `无穷解`;
            }
        }
        let y = (this.data.x2 * this.data.z1 - this.data.x1 * this.data.z2) / d;
        let x = (this.data.y1 * this.data.z2 - this.data.y2 * this.data.z1) / d;
        return `x=${x}, y=${y}`;
    },
    onResult() {
        this.setData({
            result: this.resultFn()
        })
    },
    onResult2() {
        this.setData({
            result2: this.resultFn2()
        })
    }
})
