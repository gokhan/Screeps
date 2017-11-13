require('prototype.spawn');
require('prototype.tower');
require('prototype.creep');

module.exports.loop = function () {

    for(let name in Memory.creeps){
        if(Game.creeps[name] == undefined){
            delete Memory.creeps[name];


        }
    }

    for(let name in Game.creeps){
        Game.creeps[name].runRole();
    }

    for(let spawn in Game.spawns){
        Game.spawns[spawn].createFundamentalCreeps();
    }
    // find all towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.defend();
    }
};