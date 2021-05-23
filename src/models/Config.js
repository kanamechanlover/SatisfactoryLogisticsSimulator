
// 読み込んだ設定と設定情報
export const Config = {
    json: null,
    update: function(config) {
        this.json = config;
    },
    isLoaded: function() {
        return !!this.json;
    },
    isLoadedWithWarning: function() {
        if (!this.isLoaded()) {
            console.warn('まだ設定が読込終わっていません。');
        }
        return true;
    },
    // 設備 id リスト取得
    getMachineIdList: function() {
        if (!this.isLoadedWithWarning()) return;
        return Object.keys(this.json.Machines);
    },
    // 設備名リスト取得
    getMachineNameList: function() {
        if (!this.isLoadedWithWarning()) return;
        return Object.keys(this.json.Machines).map((key) => {
            return this.json.Machines[key].Name;
        });
    },
    // 設備名から id 逆引き
    getMachineIdFromName: function(name) {
        if (!this.isLoadedWithWarning()) return;
        return Object.keys(this.json.Machines).find((key) => {
            return this.json.Machines[key].Name == name
        });
    },
    // 設備情報取得
    getMachineData: function(machineId) {
        if (!this.isLoadedWithWarning()) return;
        return this.json.Machines[machineId];
    },
    // 設備で使えるレシピ名リスト取得
    getRecipeNameForMachine: function(machineId) {
        if (!this.isLoadedWithWarning()) return;
        return this.json.Recipes.filter((data) => {
            return (data.Machine.indexOf(machineId) != -1);
        }).map(v => v.Name);
    },
    // レシピ情報取得
    getRecipeData: function(recipeName) {
        if (!this.isLoadedWithWarning()) return;
        return this.json.Recipes.find((data) => {
            return (data.Name == recipeName);
        });;
    },
    // 素材情報取得
    getMaterialData: function(MaterialId) {
        if (!this.isLoadedWithWarning()) return;
        return this.json.Materials[MaterialId];
    }
}