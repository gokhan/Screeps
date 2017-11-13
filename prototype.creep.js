var roles = {

    Harvester : require('role.harvester'),
    Builder : require('role.builder'),
    Repairer : require('role.repairer'),
    WallRepairer : require('role.wallRepairer'),
    Upgrader : require('role.upgrader'),
    Miner : require('role.miner'),
    Carrier : require('role.carrier')


};

// runRole function runs for each creep roles and it gets roles from creep memories.
Creep.prototype.runRole =
    function () {
        roles[this.memory.role].run(this);
    };

Creep.prototype.switchState =
    function(){

        // If creep's working state is true but creep has no energy switch to false
        if(this.memory.working && this.carry.energy == 0){
            this.memory.working = false;

            // If creep has false working state but it's capacity is full switch to true
        }else if(!this.memory.working && this.carry.energy == this.carryCapacity){
            this.memory.working = true;
        }
    };


Creep.prototype.getEnergy =
    function (useContainer, useSource) {

        let container;
        // if the Creep should look for containers
        if (useContainer) {
            // find closest container
            container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => (s.structureType == STRUCTURE_CONTAINER) &&
                s.store[RESOURCE_ENERGY] > 0
            });
            // if one was found
            if (container != undefined) {
                // try to withdraw energy, if the container is not in range
                if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    this.moveTo(container);
                }
            }
        }
        // if no container was found and the Creep should look for Sources
        if (container == undefined && useSource) {
            // find closest source
            var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

            // try to harvest energy, if the source is not in range
            if (this.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards it
                this.moveTo(source);
            }
        }
    };


// This function is special for Upgraders so they can get energy from storage near Room Controller.
Creep.prototype.getEnergyUpgrader =
    function(storageID){

        // Get the storage from parameter storageID.
        let storage = Game.getObjectById(storageID);

        if(storage != undefined && storage.store[RESOURCE_ENERGY] > 0){

            if(this.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                this.moveTo(storage);
            }
        }else {
            // find closest container
            let container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
            });
            // if one was found
            if (container != undefined) {
                // try to withdraw energy, if the container is not in range
                if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    this.moveTo(container);
                }
            }else{
                var energySource = this.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if(this.harvest(energySource) == ERR_NOT_IN_RANGE){
                    this.moveTo(energySource);
                }
            }
        }
    };

// getEnergyCarrier is special for Carriers which inputs parameters sourceID and targetSource.
Creep.prototype.getEnergyCarrier =
    function(sourceID){

        let container = Game.getObjectById(sourceID);
        // if the container is found

        if (container != undefined) {
            this.say("Loading...");
            //try to withdraw if near, or move to that.
            if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(container);
            }
        }else{
            var energySource = this.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(this.harvest(energySource) == ERR_NOT_IN_RANGE){
                this.moveTo(energySource);
            }
        }
    };

Creep.prototype.getEnergyHarvester =
    function(sourceID){

        let container = Game.getObjectById(sourceID);
        // if the container is found

        if (container != undefined) {
            this.say("Loading...");
            //try to withdraw if near, or move to that.
            if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(container);
            }
        }else{
            var energySource = this.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(this.harvest(energySource) == ERR_NOT_IN_RANGE){
                this.moveTo(energySource);
            }
        }
    };

Creep.prototype.getDroppedEnergy =
    function(){

        var droppedEnergy = this.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
            filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});

        if (droppedEnergy && droppedEnergy > 30) {
            if (this.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                this.moveTo(droppedEnergy)
            }
            console.log(creep.name + " has collected dropped energy.");
            return true;
        }else{
            return false;
        }
    };