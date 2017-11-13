/*
 Role: Wall Repairer
 Mission: Wall repairer only repairs walls and ramparts.
 */
var roleBuilder = require('role.builder');

module.exports = {

    run: function(creep) {


        creep.switchState();

        // if the wall repairers repair walls
        if (creep.memory.working == true) {
            // find all walls in the room
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) =>
                s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART
            });

            var target = undefined;

            // loop with increasing percentages in order to make all walls "hits" increasing equally.
            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                // find a wall with less than percentage hits
                for (let wall of walls) {
                    if(wall.structureType == STRUCTURE_RAMPART && wall.hits < wall.hitsMax / 10){
                        target = wall;
                        break;
                    }else{
                    if (wall.hits / wall.hitsMax < percentage) {
                        target = wall;
                        break;
                    }
                }
                }

                // if there is one
                if (target != undefined) {
                    // break the loop
                    break;
                }
            }

            // if a wall found needs to be repaired
            if (target != undefined) {
                // try to repair it, if not in range
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(target);
                }
            }
            // if we can't fine one work as builder because we love efficiency :)
            else {
                // look for construction sites
                roleBuilder.run(creep);
            }
        }
        // if creep is supposed to get energy
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