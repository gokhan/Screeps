/*
 Role: Repairer
 Mission: Repairer repairs the structures such as roads, containers etc.
 */
var roleBuilder = require('role.builder');
module.exports =  {

    run:function(creep){
        // This function switchs creep's working state whether it will harvest or do it's duty
        creep.switchState();

        if(creep.memory.working == true){

            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL}
            );
            if(structure != undefined){
                if(creep.repair(structure) != ERR_NOT_IN_RANGE){
                    creep.moveTo(structure);
                }
            }
            else{
                // Repairer works as builder when there is nothing to repair.
                roleBuilder.run(creep);
            }
        }
        else {
            var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});

            if (droppedEnergy && droppedEnergy.energy > 30) {
                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy)
                }
                console.log(creep.name + " has collected dropped energy.");
            }else {
                creep.getEnergy(true,true);
            }
        }
    }
};