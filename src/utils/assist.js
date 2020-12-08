// 判断参数是否是其中之一
export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

export function param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

export function parse_url(_url) {
    _url=_url.replace(/\s/g, '');
    const pattern = /(\w+)=:(\w+)/ig;
    let parames = {};
    _url.replace(pattern, function (a, b, c) {
        parames[b] = c;
    });
    return parames;
}

// 计算最大公约数
export function maxDivisor(a,b){
    if(a%b){
        return maxDivisor(b,a%b)
    }else{
        return b;
    }
}
// 十六进制转其他
export function hexToRgba(hex, al) {
    let hexColor = /^#/.test(hex) ? hex.slice(1) : hex,
        alp = hex === 'transparent' ? 0 : Math.ceil(al),
        r, g, b;
    hexColor = /^[0-9a-f]{3}|[0-9a-f]{6}$/i.test(hexColor) ? hexColor : 'fffff';
    if (hexColor.length === 3) {
        hexColor = hexColor.replace(/(\w)(\w)(\w)/gi, '$1$1$2$2$3$3');
    }
    r = hexColor.slice(0, 2);
    g = hexColor.slice(2, 4);
    b = hexColor.slice(4, 6);
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    // return {
    //     hex: '#' + hexColor,
    //     alpha: alp,
    //     rgba: 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (alp / 100).toFixed(2) + ')'
    // };
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (alp / 100).toFixed(2) + ')'
};

//json对比找差
export function compareJson(newJSON, oldJson) {
    const jsonA=JSON.parse(JSON.stringify(newJSON));
    const jsonB=JSON.parse(JSON.stringify(oldJson));
    let compare = {};
    Object.keys(jsonA).forEach(i => {
        //判断i是否在oldJson中
        if (jsonB[i]) {
            //判断值是否相等
            if (jsonA[i] != jsonB[i]) {
                compare[i] = jsonA[i];
            }
        } else {
            compare[i] = jsonA[i];
        }
    })
    return compare;
}

// 获取图例的实际位置
export function transfterLegPosition(position) {
    // '顶部居中','顶部居左','顶部居右','中部局左','中部局中','中部局右','底部居左','底部居中','底部居右'
    const _dirY = ['顶部', '中部', '底部'];
    const _dirX = ['居左', '居中', '居右'];
    const _directonX = ['left', 'center', 'right'];
    const _directonY = ['top', 'center', 'bottom'];
    const _y = position.substr(0, 2);
    const _x = position.substr(2, 2);
    return {
        x: _directonX[_dirX.findIndex(i => i === _x)],
        y: _directonY[_dirY.findIndex(i => i === _y)]
    }
}


// 根据数字获取坐标轴上线
export function getBoundary(num) {
    const len = Math.ceil(num).toString().length;
    if (len === 1) return Math.ceil(num);
    if (len > 1) {
        let js = new Array(len - 1);
        const cs = [1, ...js.fill(0)].join("");
        const max = Math.ceil(num / cs) * cs;
        if ((max - cs / 2) > num) {
            return max - cs / 2
        } else {
            return max
        }
    }
}
import eCharts from "echarts";
export function transfterColor(barColor){
    const color = JSON.parse(barColor);
    const q = Math.floor(color.rotate / 90);
    const val = (color.rotate % 90 / 90).toFixed(3);
    switch (q) {
        case 0:
            return new eCharts.graphic.LinearGradient(
                0, 0, val, 0,
                [
                    {offset: 0, color: color.top},
                    {offset: 1, color: color.down}
                ]
            )
            break;
        case 1:
            return new eCharts.graphic.LinearGradient(
                0, 0, 1, val,
                [
                    {offset: 0, color: color.top},
                    {offset: 1, color: color.down}
                ]
            )
            break;
        case 2:
            return new eCharts.graphic.LinearGradient(
                val, 0, 0, 0,
                [
                    {offset: 0, color: color.top},
                    {offset: 1, color: color.down}
                ]
            )
            break;
        case 3:
            return new eCharts.graphic.LinearGradient(
                0, val, 0, 0,
                [
                    {offset: 0, color: color.top},
                    {offset: 1, color: color.down}
                ]
            )
            break;
    }
}

//获取主题色
export function getTheme(){    
    let skin= JSON.parse(sessionStorage.getItem('skin'));
    if(skin===null || skin.length===0){
        skin=['#65F5F3', '#277ACE', '#8922E8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    }
    return skin
}

//JSON对象null值转''
export function NullToStrOfJson(data){
    for (let x in data) {
        if (data[x] === null) { // 如果是null 把直接内容转为 ''
            data[x] = '';
        } else {
            if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
            data[x] = data[x].map(z => {
                return NullToStrOfJson(z);
            });
            }
            if(typeof(data[x]) === 'object'){ // 是json 递归继续处理
            data[x] = NullToStrOfJson(data[x])
            }
        }
    }
    return data;
}