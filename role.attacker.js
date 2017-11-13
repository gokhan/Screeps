
module.exports = {

    run: function(attacker){


        /*

         let attacker = Game.creeps.finf(FIND_MY_CREEPS, {
         filter: (c) => {
         return (c.getActiveBodyparts(ATTACK) > 0);
         }}
         );
         */

        let flag = Game.flags.f1;


        if(flag){


                if (attacker.pos.roomName == flag.pos.roomName) {
                    let spawn = attacker.room.find(FIND_HOSTILE_SPAWNS)[0];
                    let outcome = attacker.attack(spawn);
                    if (outcome == ERR_NOT_IN_RANGE) {
                        attacker.moveTo(spawn);
                        console.log("WE ARE IN IF");
                    }
                }else{

                    console.log("WE ARE IN ELSE");
                    var targetPosition = new RoomPosition(28,7, "E96N18");
                   // attacker.moveTo(RoomPosition(28,7,"E96N18"));
                   attacker.moveTo(flag);

                }

        }else{
            attacker.moveTo(30,43);
        }

    }
};