/*
 Role: Carrier
 Mission: Carrier transports energy from sources(containers or other energy sources) to storage located in storage below Room Controller.
 */
module.exports = {

    run: function(creep) {

        // This function switchs creep's working state whether it will harvest or do it's duty
        creep.switchState();

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working) {
            // Since there is only one storage, carriers goes to that but this part will be updated if there will be another storage.
            var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {

                filter: (s) => {
                    return (s.structureType == STRUCTURE_STORAGE) && (s.store[RESOURCE_ENERGY] < s.storeCapacity);
                }
            });
            let container = Game.getObjectById("58f8e21892284dff079a691b");

            //If the storage is available
            if (storage != undefined) {

                // try to transfer energy, if it is not in range
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(storage);
                }
            }else if(container != undefined){
                if(creep.pos.isEqualTo(12,26)){
                    creep.drop(RESOURCE_ENERGY);
                    creep.say("Delivered");
                }else{
                    creep.say("Transporting");
                    creep.moveTo(12,26);
                }
            }

        }
        // if the carrier needs energy
        else {
            // Carriers should only use energy source DOWN
            let containerID = "59f9db3820ef0f1d82d05167";
            creep.say("NEED ENERGY");
            creep.getEnergyCarrier(containerID);

        }
    }
};