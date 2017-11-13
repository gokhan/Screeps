var roleList = ['Harvester','Builder','Carrier','Upgrader','Repairer','WallRepairer','Miner'];

StructureSpawn.prototype.createFundamentalCreeps =
    function (){

        let spawn = Game.spawns.Town;
        let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);

        // check for minimum creep numbers in the spawn memory whether they are defined or not

        let numOfCreeps = {};
        for (let role of roleList) {
            numOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
            //console.log(role+ ":" + numOfCreeps[role]);
        }

        // Max energy available
        let maxEnergy = this.room.energyCapacityAvailable;
        let creepName = undefined;


        // If there is no harvester available, create harvester with maximum energy available
        if(numOfCreeps['Harvester'] == 0){

            creepName = this.createCustomHarvester(this.room.energyAvailable, 'Harvester');
        }else{
            // Check the miners are available and working
            let sources = spawn.room.find(FIND_SOURCES);

            for(let source of sources){

                if(! _.some(creepsInRoom, creep => creep.memory.role == 'Miner' && creep.memory.sourceId == source.id)){

                    let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    });

                    if(containers.length > 0){

                        creepName = this.createMiner(source.id);
                        break;
                    }
                }
            }
        }

        /* Minimum creep numbers in the Spawn memory
         minHarvester = 2;
         minBuilder = 1;
         minUpgrader = 3;
         minMiner = 2;
         minCarrier = 1;
         minRepairer = 1;
         minWallRepairer = 1;
         */


        if(creepName == undefined){
            for(let role of roleList){
                /*
                 */
                let _role = "min".concat(role);

                console.log("Number of "+role+" : "+ numOfCreeps[role] +" --------- "+ this.memory[_role] + " : "+ _role);

                if(numOfCreeps[role] < this.memory[_role]){

                    if(role == "Harvester"){
                        creepName = this.createHarvester(1,8,6);    //1   8   5
                    }else if(role == "Upgrader"){
                        creepName = this.createUpgrader(8,6,1);     // 5 6 1
                    }else if(role == "Repairer"){
                        creepName = this.createRepairer(3,4,4); //  3 4 4 
                    }else if(role == "WallRepairer"){
                        creepName = this.createWallRepairer(8,7,6); // 4 4 3 
                    }else if(role == "Carrier"){
                        creepName = this.createCarrier(12,12); // 9 9 
                    }else if(role == "Builder"){
                        creepName = this.createBuilder(6,4,5); // 6 4 5 
                    }else {
                        creepName = -1;
                    }

                }
            }
            console.log(" ");

        }
        if(creepName != undefined && _.isString(creepName)){

            console.log(this.name +" has spawned new: " +Game.creeps[creepName].memory.role + "| "+ creepName);

        }
    };

StructureSpawn.prototype.createCustomCreep =
    function (energy, roleName) {
        // create creep with balanced body
        var numberOfParts = Math.floor(energy / 200);
        // creep should be less than 50 parts because it is the limit
        numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
        var body = [];
        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }

        // create creep with the created body and the given role
        return this.createCreep(body, undefined, { role: roleName, working: false });
    };

StructureSpawn.prototype.createCustomHarvester =
    function (energy, roleName) {
        // create creep with balanced body
        var numberOfParts = Math.floor(energy / 200);
        // creep should be less than 50 parts because it is the limit
        numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
        var body = [];
        for (let i = 0; i < 1; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }

        // create creep with the created body and the given role
        return this.createCreep(body, undefined, { role: roleName, working: false });
    };



StructureSpawn.prototype.createMiner =
    function (sourceId) {
        // Parameter sourceId is an id of energy sources

        return this.createCreep([WORK,WORK,WORK,WORK,WORK,MOVE], undefined, { 'role': 'Miner', 'sourceId': sourceId});
    };
StructureSpawn.prototype.createBuilder =
    function (workCount,carryCount,moveCount) {
        var body = [];

        for(var i=0; i<workCount; i++){
            body.push(WORK);
        }
        for(var i=0; i<carryCount; i++){
            body.push(CARRY);
        }
        for(var i=0; i<moveCount; i++){
            body.push(MOVE);
        }


        return this.createCreep(body, undefined, { 'role': 'Builder', 'working': false});
    };
StructureSpawn.prototype.createUpgrader =
    function (workCount,carryCount,moveCount) {

        var body = [];

        for(var i=0; i<workCount; i++){
            body.push(WORK);
        }
        for(var i=0; i<carryCount; i++){
            body.push(CARRY);
        }
        for(var i=0; i<moveCount; i++){
            body.push(MOVE);
        }


        return this.createCreep(body, undefined, { 'role': 'Upgrader', 'working': false});
    };
StructureSpawn.prototype.createHarvester =
    function (workCount,carryCount,moveCount) {
        var body = [];

        for(var i=0; i<workCount; i++){
            body.push(WORK);
        }
        for(var i=0; i<carryCount; i++){
            body.push(CARRY);
        }
        for(var i=0; i<moveCount; i++){
            body.push(MOVE);
        }

        return this.createCreep(body, undefined, { 'role': 'Harvester', 'working': false});
    };
StructureSpawn.prototype.createRepairer =
    function (workCount,carryCount,moveCount) {
        var body = [];

        for(var i=0; i<workCount; i++){
            body.push(WORK);
        }
        for(var i=0; i<carryCount; i++){
            body.push(CARRY);
        }
        for(var i=0; i<moveCount; i++){
            body.push(MOVE);
        }

        return this.createCreep(body, undefined, { 'role': 'Repairer', 'working': false});
    };

StructureSpawn.prototype.createWallRepairer =
    function (workCount,carryCount,moveCount) {
        var body = [];

        for(var i=0; i<workCount; i++){
            body.push(WORK);
        }
        for(var i=0; i<carryCount; i++){
            body.push(CARRY);
        }
        for(var i=0; i<moveCount; i++){
            body.push(MOVE);
        }

        return this.createCreep(body, undefined, { 'role': 'WallRepairer', 'working': false});
    };

StructureSpawn.prototype.createCarrier =
    function (carryCount,moveCount) {
        var body = [];

        for(var i=0; i<carryCount; i++){
            body.push(CARRY);
        }
        for(var i=0; i<moveCount; i++){
            body.push(MOVE);
        }


        return this.createCreep(body, undefined, { 'role': 'Carrier', 'working': false});
    };
StructureSpawn.prototype.createAttacker =
    function (toughCount,RangedAttackCount,moveCount) {
        var body = [];

        for(var i=0; i<toughCount; i++){
            body.push(TOUGH);
        }
        for(var i=0; i<RangedAttackCount; i++){
            body.push(RANGED_ATTACK);
        }for(var i=0; i<moveCount; i++){
            body.push(MOVE);
        }


        return this.createCreep(body, undefined, { 'role': 'Attacker', 'working': false});
    };