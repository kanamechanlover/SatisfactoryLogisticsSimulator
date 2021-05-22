// 設定読込処理定義

import { Config } from 'models/Config'

const FileName = 'assets/config.json';

export default {
    // 設定を読込
    loadConfig: function(callback) {
        fetch(FileName)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                Config.update(json);
                callback();
            });
    }
};