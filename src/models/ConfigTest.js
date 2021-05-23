import { Config } from 'models/Config'

export const runTest = function() {
    console.log('Config File Testing ...');
    const machineIds = Config.getMachineIdList();
    let fails = [];
    machineIds.forEach((machineId) => {
        const recipeNames = Config.getRecipeNameForMachine(machineId);
        recipeNames.forEach((recipeName) => {
            const recipeData = Config.getRecipeData(recipeName);
            Object.keys(recipeData.Input).forEach((key) => {
                if (!Config.getMaterialData(key)) {
                    fails.push(key);
                }
            })
            Object.keys(recipeData.Output).forEach((key) => {
                if (!Config.getMaterialData(key)) {
                    fails.push(key);
                }
            })
        })
    });
    fails = fails.filter((v,i,m) => m.indexOf(v) == i);
    fails.forEach(v => {
        console.log(v);
    })
    if (fails.length == 0) {
        console.log('-> ok.')
    }
}