(function() {

    'use strict';

    angular.module('OilGasWatch')
        .service('LocationStore', function() {

            this.filteredLocations = [];

            this.locations = [];

            this.filterLocations = function($item) {

                console.log('LocationStore.filterLocations.$item', $item);

                var matches;

                var collection = $item.category;

                switch (collection) {

                    case 'organization':

                        matches = this.locations.filter(function(datum) {

                            return datum.organizations.indexOf($item.name) >= 0;

                        });

                        break;

                    case 'geography':

                        matches = this.locations.filter(function(datum) {

                            return datum.geographies.indexOf($item.name) >= 0;

                        });

                        break;

                    case 'practice':

                        matches = this.locations.filter(function(datum) {

                            return datum.practices.indexOf($item.name) >= 0;

                        });

                        break;

                    case 'project':

                        matches = this.locations.filter(function(datum) {

                            return datum.name === $item.name;

                        });

                        break;

                    case 'project status':

                        matches = this.locations.filter(function(datum) {

                            return datum.workflow_state === $item.name;

                        });

                        break;

                    default:

                        break;

                }

                this.filteredLocations = matches;

                console.log('LocationStore.filterLocations.organization.matches', matches);

                return matches;

            };

            this.createSet = function(a, b) {

                var primaryIndex = [],
                    secondaryIndex = [],
                    mergedIndex = [],
                    set = [];

                //
                // Create indices of numeric project identifiers
                //

                a.forEach(function(datum) {

                    primaryIndex.push(datum.id);

                });

                console.log('LocationStore.createSet.primaryIndex', primaryIndex);

                b.forEach(function(datum) {

                    secondaryIndex.push(datum.id);

                });

                console.log('LocationStore.createSet.secondaryIndex', secondaryIndex);

                //
                // Merge the arrays
                //

                a.concat(b);

                //
                // Populate a new array with facilities
                // whose numeric identifiers appear in
                // both indices.
                //

                a.forEach(function(datum) {

                    if ((primaryIndex.indexOf(datum.id) >= 0 &&
                        secondaryIndex.indexOf(datum.id) >= 0) &&
                        mergedIndex.indexOf(datum.id) < 0) {

                        mergedIndex.push(datum.id);

                        set.push(datum);

                    }

                });

                return set;

            };

            this.filterAll = function(list) {

                var a,
                    b;

                if (!list || list.length < 1) {

                    this.reset();

                    return;

                }

                if (list.length === 1) {

                    this.filterLocations(list[0]);

                } else {

                    a = this.filterLocations(list[0]);

                    console.log('LocationStore.filterAll.a', a);

                    b = this.filterLocations(list[1]);

                    console.log('LocationStore.filterAll.b', b);

                    this.filteredLocations = this.createSet(a, b);

                }

            };

            this.setLocations = function(list) {

                this.locations = list;

                this.filteredLocations = list;

            };

            this.reset = function() {

                this.filteredLocations = this.locations.slice(0);

            };

        });
}());