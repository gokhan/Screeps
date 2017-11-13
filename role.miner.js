/*
 Role: Miner
 Mission: Miner mines energy sources and the sources and drops it to the container underlying
 */
module.exports = {

    run: function (creep) {

        // get the source id from the miner creep's memory
        let source = Game.getObjectById(creep.memory.sourceId);
        let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER
        })[0];

        // check if the miner is on top of container, otherwise move to that
        if(creep.pos.isEqualTo(container)){
            creep.harvest(source);
        }else{
            creep.moveTo(container);
        }
    }

};