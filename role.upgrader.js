/*
 Role: Upgrader
 Mission: The upgrader upgrades Room Controller regularly.
 */
module.exports = {

    run: function(creep){
        // This function switchs creep's working state whether it will harvest or do it's duty
        creep.switchState();

        // If the upgrader is ready to upgrade the room controller
        if(creep.memory.working == true){
            // upgrade controller if in range, if not move to that.
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
                creep.say('upgrading');
            }
        }
        else {
            creep.getEnergyUpgrader("59fb2212ff79180453a5588f");

        }
    }
};