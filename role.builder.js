/*
 Role: Builder
 Mission: Builder constructs construction sites. If there is nothing to build, it becomes an upgrader.
 */
var roleUpgrader = require('role.upgrader');
// Upgrader role imported, if there is nothing to build, the builder will work as upgrader.
module.exports = {

    run: function(creep){

        // This function switchs creep's working state whether it will harvest or do it's duty
        creep.switchState();

        if(creep.memory.working == true){
            creep.say("Building...");
            // Find construction sites to build up
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }
            }else{
                // If there is nothing to build, work as upgrader.
                roleUpgrader.run(creep);
            }
        }
        else{
            // Find and collect dropped energy
            var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: (d) => {
                    return (d.resourceType == RESOURCE_ENERGY)}}
            );
            // Only collect dropped energy if it is more than 30
            if (droppedEnergy && droppedEnergy > 30) {
                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy)
                }
                console.log(creep.name + " collected dropped energy.");
            }else{
                creep.getEnergy(true,true);
            }
        }
    }
};