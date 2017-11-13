/*
 Role: Harvester
 Mission: The harvester collects energy from the energy sources or containers and transfers that energy to only MY_STRUCTURES that are spawn,extension and tower.
 */

//Harvester can also work as carrier when the spawn, extensions and tower is full of energy.
var roleCarrier = require("role.carrier");
module.exports = {

    run: function(creep){
        // This function switchs creep's working state whether it will harvest or do it's duty
        creep.switchState();

        if(creep.memory.working == true){
            //find only my structures to feed
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {



                filter: (s) => (s.structureType == STRUCTURE_SPAWN ||s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity
            });

            if(structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);

                }

            }else{
                // Harvester also helps carrying energy for upgraders' storage when the energy in spawn, extensions and tower is full.
                roleCarrier.run(creep);
                creep.say("Carrying...");
            }
        }
        else {

            // find and collect the dropped energy if available because we love the efficiency :)
            var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});

            if (droppedEnergy && droppedEnergy.energy > 40) {
                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy)
                }
                console.log(creep.name + " has collected dropped energy");
            }else {
                let containerID ="59f9d9d26ddace287bb40c1c";
                creep.getEnergyHarvester(containerID);
            }
        }
    }

};