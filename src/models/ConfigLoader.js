// 設定読込処理定義

// 読み込んだ設定
let Config = {};

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
                Config = json;
                callback();
            });
    },
    // 設備リスト取得
    getMachineList: function() {
        return Object.keys(Config.Machines).map((key) => {
            return Config.Machines[key].Name;
        });
    },
    // 設備情報取得
    getMachineData: function(machineId) {
        return Config.Machines[machineId];
    },
    // 設備で使えるレシピ名リスト取得
    getRecipeNameForMachine: function(machineId) {
        return Config.Recipies.filter((data) => {
            return (machineId in data.Machine);
        });
    },
    // レシピ情報取得
    getRecipeData: function(recipeName) { 
        return Config.Recipes.find((data) => {
            return (data.Name == recipeName);
        });;
    },
    // 素材情報取得
    getMaterialData: function(MaterialId) {
        return Config.Materials[MaterialId];
    }
};