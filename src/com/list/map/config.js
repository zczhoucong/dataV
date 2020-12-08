/**
 * Created by 高春超 on 2018/4/28.
 * 地图相关配置
 */

export const traffic = {
    base_url: config.map.bdBase,
    center: [118.8, 32.08],
    zoom: 14,
    minZoom: 1,
    maxZoom: 19,
    zoomBackground: false,
    view: {
        projection: 'EPSG:4326'
    }
}