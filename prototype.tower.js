/*
 This is a defend function for Towers.
 */
StructureTower.prototype.defend =
    function () {

        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        var woundedCreep = Game.rooms.W14N3.find( FIND_MY_CREEPS, { filter: (creep) => {return ( creep.hits < creep.hitsMax ); } } );



        if(target != undefined) {

            // If any target in range, attack!
            this.attack(target);
        }
        if(woundedCreep[0] != undefined){

            this.heal(woundedCreep[0]);

        }
    };