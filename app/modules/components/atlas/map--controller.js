'use strict';

/**
 * @ngdoc function
 * @name OilGasWatch.controller:MapInterfaceviewController
 * @description
 * # MapInterfaceviewController
 * Controller of the OilGasWatch
 */
angular.module('OilGasWatch')
    .controller('MapController',
        function(environment, Account, Notifications, $rootScope, $http, MapInterface, $routeParams,
                 $scope, $location, mapbox, $window, $timeout,
                 Utility, $interval, AtlasDataManager, AtlasLayoutUtil, ipCookie, ZoomUtil,
                 LayerUtil, SourceUtil, PopupUtil, MapUtil, LabelLayer,
                 DataLayer, GeographyService, User,
                 EsriLayerService) {

            var self = this;

            mapboxgl.accessToken = mapbox.accessToken;

            self.queryFeatures = [];

            self.showAllFeatures = false;

            $rootScope.viewState = {
                'atlas': true
            };

            $rootScope.toolbarState = {
                'dashboard': true
            };

            self.layers = [
                {
                    id: 'esri.race_pop',
                    name: 'ACS Race and Hispanic Origin Variables - Boundaries - Tract',
                    selected: false
                },
                {
                    id: 'esri.poverty_by_age',
                    name: 'ACS Poverty Status Variables - Boundaries - Tract',
                    selected: false
                },
                {
                    id: 'esri.total_pop',
                    name: 'ACS Population Variables - Boundaries - Tract',
                    selected: false
                },
                {
                    id: 'esri.class1',
                    name: 'Mandatory Class 1 Areas, US EPA, OAR, OAQPS',
                    selected: false
                },
                {
                    id: 'esri.ozone',
                    name: 'Nonattainment Areas for the 2008 8-hour Ozone Standards',
                    selected: false
                }
            ];

            self.featureCollection = {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "properties": {
                        "id": 741,
                        "name": "50 Buttes Gas Plant"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-105.77927, 43.85124]
                    }
                },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 742,
                            "name": "Agrium US Borger Nitrogen Operations"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-101.422777, 35.641666]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1093,
                            "name": "TBD"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-91.26882696, 30.325742]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 959,
                            "name": "Mermentau Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.691765, 30.126082]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 960,
                            "name": "Methanol Process Unit"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.02955, 30.013686]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 961,
                            "name": "Middlebourne III Compressor"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.963581, 39.41656]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 962,
                            "name": "Middlebourne IV Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.90999, 39.47547]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 963,
                            "name": "Middlebourne V Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.84175, 39.51774]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 964,
                            "name": "Milford Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-83.564683, 42.543602]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 965,
                            "name": "Miller Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.622056, 39.709852]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 966,
                            "name": "Minto Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-148.637, 65.213]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 967,
                            "name": "MMA Manufacturing Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.997983, 30.207114]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 968,
                            "name": "Mockingbird Hill Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.502128, 39.543405]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 969,
                            "name": "Monroe Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.86384, 39.42065]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 970,
                            "name": "Mont Belvieu Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.912219, 29.857292]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 971,
                            "name": "Mont Belvieu Fractionation Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.899946, 29.84055]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 972,
                            "name": "Mont Belvieu Fractionator"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.896099, 29.850984]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 973,
                            "name": "Mont Belvieu NGL Fractionation Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.890113, 29.860226]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 974,
                            "name": "Mont Belvieu Plastics Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.916054, 29.874817]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 975,
                            "name": "Morehead Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-83.436432, 38.249505]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 976,
                            "name": "Mosaic Faustina Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.913262, 30.083004]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 977,
                            "name": "Motiva Enterprises Polyethylene Manufacturing Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.950844, 29.887951]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 978,
                            "name": "Mountaineer Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.52488, 40.24278]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 979,
                            "name": "Mountain Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.951858, 39.352356]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 980,
                            "name": "Mount Olive Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.674254, 38.737833]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 981,
                            "name": "Mt. Airy Terminal "
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.642429, 30.053883]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 982,
                            "name": "Nacero Penwell Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-102.5778, 31.76333]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 983,
                            "name": "Nash Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-98.05596596, 36.606835]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 984,
                            "name": "Natrium Extraction and Fractionation Processing Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.84889, 39.74806]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 985,
                            "name": "Natrium Power Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.86101, 39.75996]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 986,
                            "name": "Natural Gas to Gasoline Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.055312, 30.030489]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 987,
                            "name": "Nederland LPG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.999326, 29.989254]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 988,
                            "name": "Nederland Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.990839, 30.008583]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 989,
                            "name": "Nichols Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.869506, 39.292576]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 990,
                            "name": "Nitrogen Fertilizer Manufacturing Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-87.915665, 37.921775]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 991,
                            "name": "Nopetro LNG Production Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-85.31111669, 29.821383]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 992,
                            "name": "North Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.201254, 47.972008]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 992,
                            "name": "North Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.980178, 30.069539]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 993,
                            "name": "North Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.201254, 47.972008]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 993,
                            "name": "North Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.980178, 30.069539]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 994,
                            "name": "North Randlett Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-109.8992926, 40.22067]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 995,
                            "name": "Nutrien Lima Nitrogen Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-84.136881, 40.710166]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 996,
                            "name": "Oak Grove Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.6959, 39.8758]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 997,
                            "name": "Odessa Petrochemical Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-102.3292, 31.8236]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 998,
                            "name": "Olefins Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.591388, 27.806666]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 999,
                            "name": "Oxford Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-73.123537, 41.481624]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1000,
                            "name": "Oxychem Ingleside Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.245153, 27.894913]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1001,
                            "name": "Paint Lick Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-84.459703, 37.579603]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1002,
                            "name": "Pallas Nitrogen Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.666276, 40.591182]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1003,
                            "name": "Pasadena Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.19083, 29.71722]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1004,
                            "name": "Payne Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.69913, 39.81179]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1005,
                            "name": "Pendleton Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-78.794223, 43.084276]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1006,
                            "name": "Petrochemicals Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.336211, 40.667899]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 739,
                            "name": "3 Bear Libby Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.525728, 32.542358]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1007,
                            "name": "PetroLogistics PDH Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.195144, 29.276442]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1008,
                            "name": "Pine Bend Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.038026, 44.753207]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1009,
                            "name": "Pioneer Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.59156, 40.14333]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1010,
                            "name": "Plaquemine NGL Fractionation Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-91.240171, 30.234815]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1011,
                            "name": "Plaquemines Liquids Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-89.97523333, 29.669156]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1012,
                            "name": "Plaquemines LNG Plant & Pipelines"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-89.8972, 29.594392]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1013,
                            "name": "Plastics-to-Fuel Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-85.04942841, 41.530423]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1014,
                            "name": "Pleasants County Methanol Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.353048, 39.33832]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1015,
                            "name": "Point Comfort Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-96.54722, 28.68889]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1016,
                            "name": "Point Thomson Production Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-146.256845, 70.17205]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1017,
                            "name": "Port Allen Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-91.20696, 30.48949]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1018,
                            "name": "Port Arthur Ethane Cracker"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.887862, 29.95801]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1019,
                            "name": "Port Arthur LNG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.958604, 29.786741]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1020,
                            "name": "Port Arthur Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.958333, 29.883333]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1021,
                            "name": "Port Neal Nitrogen Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-96.37879, 42.330554]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1022,
                            "name": "Praxair Clear Lake Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.066606, 29.625159]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1023,
                            "name": "Propylene Manufacturing Unit"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.25106, 29.705991]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1024,
                            "name": "PTTCG Petrochemical Complex "
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.775029, 39.918022]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1025,
                            "name": "Rabideux Creek Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-150.214, 62.174]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1026,
                            "name": "Ramsey Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-104.022203, 31.922873]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1027,
                            "name": "Ray River Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-150.175, 66.137]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1028,
                            "name": "Red Hills Gas Processing Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.523889, 32.210556]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1029,
                            "name": "Redhook Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.128056, 39.918311]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1030,
                            "name": "Red Mountain Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-91.922055, 31.877322]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1030,
                            "name": "Red Mountain Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-107.99889, 32.256944]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1031,
                            "name": "Red Mountain Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-91.922055, 31.877322]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1031,
                            "name": "Red Mountain Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-107.99889, 32.256944]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1032,
                            "name": "Reunion Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.55580733, 28.261665]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1033,
                            "name": "Revolution Cryogenic Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.349167, 40.41194]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1034,
                            "name": "REX Cheyenne Hub Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-104.797818, 40.954386]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1035,
                            "name": "Ridgeline Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.55879, 39.776224]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1036,
                            "name": "Rincon Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.300503, 32.281775]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1037,
                            "name": "Rio Bravo Pipeline Booster Station 2"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.80692, 27.186805]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1038,
                            "name": "Rio Bravo Pipeline Compressor Station 1"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-98.039412, 27.459947]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1039,
                            "name": "Rio Grande LNG and Rio Bravo Pipeline Compressor"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.254722, 26.026111]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1040,
                            "name": "Riverside Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-102.827073, 48.054184]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1041,
                            "name": "Roadrunner Gas Processing Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-104.1075, 32.265833]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1042,
                            "name": "Robstown Fractionator"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.594281, 27.814964]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1042,
                            "name": "Robstown Fractionator"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.6248, 27.7588]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1043,
                            "name": "Robstown Fractionator"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.594281, 27.814964]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1043,
                            "name": "Robstown Fractionator"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.6248, 27.7588]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1044,
                            "name": "Rock Springs Fertilizer Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-109.12746, 41.53841]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1045,
                            "name": "Rose Valley and Hopeton Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-98.75314, 36.66771]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1046,
                            "name": "RoughRider Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-102.878902, 48.198744]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1047,
                            "name": "Sabine Pass LNG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.867416, 29.748915]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1048,
                            "name": "Sagwon Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-148.763, 69.286]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1049,
                            "name": "Salt Lake City Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-111.924305, 40.827603]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1050,
                            "name": "Sanderson Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-104.041311, 48.127456]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1051,
                            "name": "Sand Hill Compression Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.55586, 39.98754]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1052,
                            "name": "Sandstrom Water Treatment Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.8931, 39.26922]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1053,
                            "name": "Sasol Lake Charles Chemical Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.284084, 30.253945]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1054,
                            "name": "Saturn Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.82726, 39.324154]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1055,
                            "name": "Sawtooth NGL Storage Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-112.564406, 39.498704]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 740,
                            "name": "3 Brothers Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.38033472, 40.331198]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 743,
                            "name": "Albany Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-84.250549, 31.541712]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 744,
                            "name": "Alexandria Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.232628, 31.437263]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 745,
                            "name": "Altamont Main Gas Processing Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-110.328596, 40.357599]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 746,
                            "name": "Ammonia Production Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.269073, 29.959537]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 747,
                            "name": "Ammonia Production Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.396868, 31.558481]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 748,
                            "name": "Anhydrous Ammonia Fertilizer Manufacturing Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-119.289834, 35.123377]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 749,
                            "name": "Anhydrous Ammonia Production Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.579731, 40.53924]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 750,
                            "name": "Annova LNG Brownsville"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.2675, 26.00556]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 751,
                            "name": "Armagh Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-79.083326, 40.432091]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 752,
                            "name": "Aurora Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-105.1378, 42.98845]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 753,
                            "name": "Axis (Mobile) Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-88.029904, 30.978994]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 754,
                            "name": "BASF FINA NAFTA Region Olefins Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.883961, 29.953919]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 755,
                            "name": "Basile Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.540658, 30.453275]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 756,
                            "name": "Baton Rouge Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-91.20555, 30.55888]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 757,
                            "name": "Bay City Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-96.02004543, 28.862886]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 758,
                            "name": "Bayou Cogeneration Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.0458, 29.6225]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 759,
                            "name": "Baytown Olefins Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.009625, 29.759067]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 760,
                            "name": "Beaumont Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.058096, 30.059865]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 761,
                            "name": "Beaumont Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.079458, 30.060237]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 762,
                            "name": "Beaumont Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.994483, 29.988527]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 763,
                            "name": "Beauregard Parish Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.212333, 30.443392]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 764,
                            "name": "Bennington Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-96.0189, 33.98282]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 765,
                            "name": "Bentonville LNG Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-78.263662, 35.330697]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 766,
                            "name": "Big Lake Fuels Methanol Plant (formerly G2X Plant)"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.306783, 30.107396]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 767,
                            "name": "Big Lizard Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.6199, 32.307633]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 768,
                            "name": "Billings Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-108.493962, 45.779833]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 769,
                            "name": "Bishop Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.816542, 27.572982]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 770,
                            "name": "Blake Ridge Compression Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.68181, 39.67678]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 771,
                            "name": "Blue Marlin Offshore Port"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.0046, 28.433408]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 772,
                            "name": "Blue Moon Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-79.994868, 40.081596]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 773,
                            "name": "Bluewater SMP Deepwater Port"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-96.651156, 27.889361]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 774,
                            "name": "Bluewing Phase III Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.37606, 25.96422]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 775,
                            "name": "Borger Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-101.36305, 35.699444]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 776,
                            "name": "BP Cherry Point Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-122.734717, 48.883773]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 777,
                            "name": "Bradshaw Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.533971, 39.532725]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 778,
                            "name": "Brightmark Plastics to Fuel Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.896372, 30.009645]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 779,
                            "name": "Buckeye South Texas Gateway Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.192777, 27.826944]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 780,
                            "name": "Buckeye Texas Hub"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.504166, 27.831111]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 781,
                            "name": "Bucking Horse Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-105.47106, 42.74399]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 782,
                            "name": "Buffalo Compression Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.52167, 40.19667]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 783,
                            "name": "Buffalo Creek Gas Processing Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-99.826, 35.374]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 784,
                            "name": "Bulk Plant #302"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.866619, 39.638215]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 785,
                            "name": "Cadiz Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.023151, 40.259447]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 786,
                            "name": "Calcasieu Pass LNG Plant & Pipelines"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.332487, 29.774026]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 787,
                            "name": "Calumet Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-98.11393, 35.50656]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 788,
                            "name": "Calvert City Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-88.330191, 37.048656]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 789,
                            "name": "Cameron LNG "
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.339263, 30.035156]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 790,
                            "name": "Canton North Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.68345, 39.40425]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 791,
                            "name": "Carpenter Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.48247262, 40.113642]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 792,
                            "name": "Casper Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-106.24328, 42.85877]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 793,
                            "name": "Catlettsburg Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-82.59857, 38.374597]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 794,
                            "name": "Cedar Bayou Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.923369, 29.823097]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 795,
                            "name": "Celestine Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-86.777358, 38.378645]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 796,
                            "name": "Centerville Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-91.44554, 29.74094]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 797,
                            "name": "Central Delivery Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-102.87526, 47.803169]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 798,
                            "name": "Centurion Brownsville Condensate Splitter Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.35528, 25.96111]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 799,
                            "name": "Channelview Chemical Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.11642146, 29.83079998]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 800,
                            "name": "Channing Compressor"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.779517, 39.755442]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 801,
                            "name": "Chaplin Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-72.159025, 41.817495]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 802,
                            "name": "Chemical Orange Polyethylene Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.7811, 30.04806]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 803,
                            "name": "Chicot Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.246844, 30.861406]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 804,
                            "name": "Chocolate Bayou PDH Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.279436, 29.242752]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 805,
                            "name": "Chocolate Bayou Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.192963, 29.226668]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 806,
                            "name": "Clear Lake Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.066829, 29.621261]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 807,
                            "name": "Cleveland Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.362503, 38.749952]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 808,
                            "name": "Coldfoot Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-150.167, 67.268]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 809,
                            "name": "Commonwealth LNG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.333214, 29.766675]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 810,
                            "name": "Compressor Station 100/410"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-88.189649, 30.39572]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 811,
                            "name": "Compressor Station 105"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-86.170351, 32.896463]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 812,
                            "name": "Compressor Station 165"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-79.336596, 36.831313]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 813,
                            "name": "Compressor Station 175"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-78.423557, 37.838686]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 814,
                            "name": "Compressor Station 261"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-72.633315, 42.035058]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 815,
                            "name": "Compressor Station 301 Wharton"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-96.124722, 29.402222]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 816,
                            "name": "Compressor Station 304"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.428888, 32.408333]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 817,
                            "name": "Compressor Station 348"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.88258, 29.762961]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 818,
                            "name": "Compressor Station 529"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-89.70083, 29.84861]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 819,
                            "name": "Compressor Station 607"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-76.22439, 41.299705]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 820,
                            "name": "Compressor Station 610"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-76.643296, 41.024784]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 821,
                            "name": "Compressor Station 620"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-76.473615, 40.676298]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 822,
                            "name": "Compressor Station 79"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-87.786554, 35.77876]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 823,
                            "name": "Compressor Station 84"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-88.380759, 32.053512]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 824,
                            "name": "Compressor Station 95"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-87.329309, 32.433734]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 825,
                            "name": "Condensate Splitter Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.506679, 27.817729]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 825,
                            "name": "Condensate Splitter Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.43859, 27.82591]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 826,
                            "name": "Condensate Splitter Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.506679, 27.817729]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 826,
                            "name": "Condensate Splitter Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.43859, 27.82591]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 827,
                            "name": "Connector Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.17733, 39.23405]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 828,
                            "name": "Corpus Christi LNG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.270114, 27.883675]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 829,
                            "name": "Corpus Christi Polymer Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.491132, 27.832601]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 830,
                            "name": "Corpus Christi Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.430849, 27.812534]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 831,
                            "name": "Cove Point LNG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-76.409404, 38.38786]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 832,
                            "name": "Covestro Industrial Park"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.9151186, 29.745828]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 833,
                            "name": "Cowboy Central Delivery Point"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.653258, 32.170494]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 834,
                            "name": "Coyote Springs Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-119.6154579, 45.618539]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 835,
                            "name": "Daybrook Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.20288, 39.57751]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 836,
                            "name": "Deepwater Port"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.029611, 28.555329]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 837,
                            "name": "Delfin LNG Deepwater Port (Port Delfin)"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.577832, 29.020699]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 838,
                            "name": "Delfin LNG Onshore Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.64361814, 29.76138888]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 839,
                            "name": "Delta LNG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-89.892403, 29.600917]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 840,
                            "name": "Demicks Lake Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-102.989511, 47.887505]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 841,
                            "name": "DeRidder Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.28578615, 30.826491]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 842,
                            "name": "Dickinson Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-102.909823, 46.854857]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 843,
                            "name": "Donaldsonville Nitrogen Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.957397, 30.100632]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 844,
                            "name": "Dow Texas Operations Freeport"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.349166, 28.977777]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 845,
                            "name": "Driftwood LNG Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.336995, 30.103252]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 846,
                            "name": "Dunnellon Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-82.36547537, 29.071169]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 847,
                            "name": "Eagle Jacksonville LNG Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.61551, 30.41224]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 848,
                            "name": "East Calcasieu Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.03412, 30.15441]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 849,
                            "name": "Eastman Chemical Texas Operations"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.68802138, 32.439076]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 850,
                            "name": "East Mountain Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.864166, 39.343869]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 851,
                            "name": "Elba Island LNG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.000989, 32.088993]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 852,
                            "name": "El Dorado Chemical Manufacturing Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.688528, 33.265639]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 853,
                            "name": "El Dorado Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-96.871462, 37.799459]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 854,
                            "name": "Elkhorn Creek Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.132, 47.4056]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 855,
                            "name": "Elk River Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.323344, 38.486996]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 856,
                            "name": "Emerald Kalama Chemical Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-122.857319, 46.021132]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 857,
                            "name": "Enbridge Berthold Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-101.7522, 48.322575]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 858,
                            "name": "Enid Nitrogen Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.7639, 36.37858]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 859,
                            "name": "Entriken Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-78.139325, 40.309485]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 860,
                            "name": "Ethylene and Monoethylene Glycol Plants"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.286337, 30.230265]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 861,
                            "name": "Eunice Compressor Station No. 760"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.534327, 30.454908]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 862,
                            "name": "Eunice Fractionator"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.532309, 30.460589]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 863,
                            "name": "Fertilizer Manufacturing Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-88.321722, 39.791691]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 864,
                            "name": "Fertilizer Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-91.228512, 40.692368]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 865,
                            "name": "FG LA Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.861858, 29.971853]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 866,
                            "name": "FHR Corpus Christi West Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.520811, 27.835326]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 867,
                            "name": "Files Creek Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-79.836045, 38.820887]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 868,
                            "name": "Flickertail Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.013595, 48.195743]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 869,
                            "name": "Fort Dodge Nitrogen"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.018616, 42.499109]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 870,
                            "name": "Freeport LNG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.308433, 28.979918]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 871,
                            "name": "Galbraith Lake Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-149.332, 68.409]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 872,
                            "name": "Galena Park Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.225829, 29.732373]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 873,
                            "name": "Galveston Bay Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.925, 29.37444]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 874,
                            "name": "Garyville Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.597359, 30.069963]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 875,
                            "name": "Gas Treatment Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-148.558399, 70.317929]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 876,
                            "name": "Geismar Ethylene Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-91.052854, 30.235351]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 877,
                            "name": "Geismar Methanol Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-91.020133, 30.206521]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 878,
                            "name": "Geismar Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.995614, 30.182235]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 879,
                            "name": "Geismar Syngas Separation Unit"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.988806, 30.210053]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 880,
                            "name": "Gillis Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.231322, 30.510151]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 880,
                            "name": "Gillis Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.068234, 30.382448]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 881,
                            "name": "Gillis Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.231322, 30.510151]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 881,
                            "name": "Gillis Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.068234, 30.382448]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 882,
                            "name": "Golden Meadow Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.24175, 29.32793]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 883,
                            "name": "Golden Pass LNG Export Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.9282, 29.761733]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 884,
                            "name": "Goodluck Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-85.656389, 36.903889]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 885,
                            "name": "Goodrich Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.9383, 30.6097]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 886,
                            "name": "Grand Forks Fertilizer Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.124422, 47.97167]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 887,
                            "name": "Grayson Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-82.909201, 38.350966]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 888,
                            "name": "GTL Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.109209, 34.384555]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 889,
                            "name": "Gulf Access Bulk Liquids Storage Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.15111, 29.74861]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 890,
                            "name": "Gulf Coast Ammonia Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.89018, 29.38407]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 891,
                            "name": "Gulf Coast Growth Ventures Petrochemical and Plastics Manufacturing Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.309752, 27.927344]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 892,
                            "name": "Gulf Coast Methanol Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-89.922128, 29.622885]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 893,
                            "name": "Gulf LNG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-88.49982, 30.32437]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 894,
                            "name": "Hamilton Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.20528, 39.64194]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 895,
                            "name": "Harmon Creek Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.357286, 40.40122]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 896,
                            "name": "Harris Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.502814, 38.722499]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 897,
                            "name": "Harrison Hub Fractionation Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.106393, 40.402433]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 898,
                            "name": "Hartwell Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-83.013485, 34.002037]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 899,
                            "name": "Haven Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.809563, 37.906522]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 900,
                            "name": "Hawkeye Gas Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-102.867992, 48.037623]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 901,
                            "name": "Healy Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-149.116, 63.964]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 902,
                            "name": "Herminie Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-79.740344, 40.239329]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 903,
                            "name": "Hildreth Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-82.88621908, 30.070652]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 904,
                            "name": "Hinckley Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.92854795, 45.979133]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 905,
                            "name": "Holbrook Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.318049, 30.365454]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 906,
                            "name": "HollyFrontier Cheyenne Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-104.78002, 41.12396]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 907,
                            "name": "Holly Tulsa Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-96.00157, 36.12599]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 908,
                            "name": "Honolulu Creek Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-149.48, 63.087]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 909,
                            "name": "Hopedale Fractionation Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.936386, 40.3325]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 910,
                            "name": "Houston Central Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-96.626258, 29.469923]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 911,
                            "name": "Houston Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.253888, 29.699166]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 912,
                            "name": "Hydrogen Peroxide Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-122.983073, 46.1372]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 913,
                            "name": "Hydrogen Plant No. 6"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-82.551051, 36.535381]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 914,
                            "name": "Iowa Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.04853, 30.29925]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 915,
                            "name": "IVXP Decatur Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-87.06, 34.64]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 916,
                            "name": "Jackson Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-77.031564, 41.998566]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 917,
                            "name": "Janus Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.79115926, 39.254174]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 918,
                            "name": "Jefferson County Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-82.43194, 33.074075]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 919,
                            "name": "Jewell Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-105.4787, 43.48387]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 920,
                            "name": "Jones Creek Crude Storage Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.47240833, 28.991417]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 921,
                            "name": "Jordan Cove LNG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-124.258708, 43.428671]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 922,
                            "name": "Kalama Methanol Manufacturing and Marine Export Facility "
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-122.869193, 46.044753]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 923,
                            "name": "Kenai Nitrogen Operations"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-151.365174, 60.66894]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 924,
                            "name": "Kenai Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-151.367305, 60.683876]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 925,
                            "name": "Klamath Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-121.373889, 42.033806]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 926,
                            "name": "Lafferty Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.906265, 39.224173]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 927,
                            "name": "Lake Charles Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.325946, 30.191196]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 928,
                            "name": "Lake Charles Liquefaction Export Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.283423, 30.109676]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 929,
                            "name": "Lake Charles Methanol Gasification Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.305403, 30.187486]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 930,
                            "name": "Lake Charles Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.275864, 30.244975]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 931,
                            "name": "Lambert Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-79.341583, 36.82642]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 932,
                            "name": "La Porte Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.06111, 29.70639]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 933,
                            "name": "Larew Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.997058, 39.827551]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 934,
                            "name": "Lateral B8 Compressor Station "
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-110.0767, 41.5022]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 935,
                            "name": "Lemont Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-88.048571, 41.64087]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 936,
                            "name": "Lima Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-84.113894, 40.721407]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 937,
                            "name": "Limetree Bay Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-64.75410864, 17.710307]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 938,
                            "name": "Linde Lima Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-84.113953, 40.721478]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 939,
                            "name": "LIPJV Lake Charles Chemical Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.275393, 30.245673]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 940,
                            "name": "Liquefaction Plant and Marine Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-151.3593, 60.6655]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 941,
                            "name": "Little Missouri Gas Plant and Smokey Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.261944, 47.696111]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 942,
                            "name": "Lone Oak Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.581316, 39.882501]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 943,
                            "name": "Longhorn Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.857222, 32.371667]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 944,
                            "name": "Longhorn Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.526412, 33.311964]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 945,
                            "name": "Longville Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.22803, 30.59757]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 946,
                            "name": "Lost River Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-78.86162, 38.87517]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 947,
                            "name": "Louisiana Fertilizer Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.524564, 30.0336]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 948,
                            "name": "Lucerne Natural Gas Processing Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-104.661964, 40.455791]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 949,
                            "name": "Luling Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.351753, 29.925399]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 950,
                            "name": "Magna LNG Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-112.0775623, 40.732158]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 951,
                            "name": "Magnolia LNG Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.296869, 30.105994]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 952,
                            "name": "Majorsville Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.52056, 39.96361]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 953,
                            "name": "Mamou Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.43037, 30.579653]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 954,
                            "name": "Marcellus LNG Production Facility I"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-76.236592, 41.654811]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 955,
                            "name": "Marcellus Methanol Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.833, 39.7282]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 956,
                            "name": "Marcus Hook Industrial Complex"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-75.414499, 39.812191]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 957,
                            "name": "Marvindale Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-78.497458, 41.704803]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 958,
                            "name": "Mepco Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.149167, 39.656111]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1056,
                            "name": "Seahawk Crude Condensate Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-96.55139, 28.6825]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1057,
                            "name": "Sea Port Oil Terminal (SPOT) Deepwater Port"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.14013, 28.46645]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1058,
                            "name": "Sendero Carlsbad Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-104.122578, 32.263297]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1059,
                            "name": "Seneca Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-79.37607, 38.84861]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1060,
                            "name": "Seneca Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.348219, 39.799995]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1061,
                            "name": "Shamrock Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-79.841136, 39.927947]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1062,
                            "name": "Shelburn Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-91.197021, 32.874207]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1063,
                            "name": "Sherwood Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.733372, 39.269339]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1064,
                            "name": "Sherwood Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.687911, 39.270893]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1065,
                            "name": "Shintech Plaquemine Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-91.17258129, 30.259603]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1066,
                            "name": "Shirley Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.809279, 39.424914]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1067,
                            "name": "Sholem Booster Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.58534, 34.49243]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1068,
                            "name": "Sierrita Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-111.193098, 32.125651]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1069,
                            "name": "Sinclair Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-107.1102, 41.77937]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1070,
                            "name": "Sinton Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.492572, 28.091248]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1071,
                            "name": "Smithburg Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.73437, 39.28317]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1072,
                            "name": "Smith Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.358436, 40.415621]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1073,
                            "name": "Solvay Augusta Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-82.01174264, 33.368386]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1074,
                            "name": "South Boyce Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.63141, 31.34265]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1075,
                            "name": "South Canton Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.803337, 39.334203]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1076,
                            "name": "South Eddy Cryo Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.832375, 32.169083]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1077,
                            "name": "South Needles Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-114.611174, 34.694203]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1078,
                            "name": "Stallworth Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.757716, 37.868026]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1079,
                            "name": "Station 119A"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.716505, 38.451791]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1080,
                            "name": "St Charles Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.46861, 29.98055]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1081,
                            "name": "St. Charles Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.392502, 29.985746]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1082,
                            "name": "Steamboat Processing Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-105.49047, 42.79192]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1083,
                            "name": "St. James Methanol Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.866582, 30.039887]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1084,
                            "name": "Stony Point Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-74.019602, 41.243159]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1085,
                            "name": "Superior Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.0684, 46.68989]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1086,
                            "name": "Sweeny/Old Ocean Polyethylene Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.746643, 29.074952]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1087,
                            "name": "Synthetic Fertilizer"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-95.278481, 36.242761]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1088,
                            "name": "Tacoma LNG Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-122.399978, 47.276552]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1089,
                            "name": "Tamarack Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-77.836069, 41.435943]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1090,
                            "name": "Tamela Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.842725, 39.326]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1091,
                            "name": "Taminco Pace Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-87.1420059, 30.580069]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1092,
                            "name": "Tatums Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.47542, 34.52105]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1094,
                            "name": "Terra Alta Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-79.546343, 39.419872]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1095,
                            "name": "Texas City Chemical Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-94.92968, 29.35849]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1096,
                            "name": "Texas LNG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.239703, 26.045442]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1097,
                            "name": "Theodore River Heater Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-150.999, 61.325]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1098,
                            "name": "Threedubs Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.61862, 40.19277]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1099,
                            "name": "Tichenal Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.49637, 39.18424]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1100,
                            "name": "Tioga Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-102.9072, 48.4026]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1101,
                            "name": "Toledo Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-83.450684, 41.674646]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1102,
                            "name": "Trenton Central RVP Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.849771, 48.12674]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1103,
                            "name": "Trilon M Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-88.135, 30.526]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1104,
                            "name": "Tuco Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-105.551, 43.5874]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1105,
                            "name": "Turkey Creek Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-92.4244444, 30.939722]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1106,
                            "name": "Tuscarawas Gas Processing Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.354071, 40.344537]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1107,
                            "name": "Underwood Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.871583, 39.432517]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1108,
                            "name": "Vail Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-110.810039, 32.066473]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1109,
                            "name": "Valero McKee Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-101.873333, 35.951666]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1110,
                            "name": "Valero Port Arthur Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.962992, 29.864497]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1111,
                            "name": "Victoria Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-96.953232, 28.677429]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1112,
                            "name": "Wacker Polysilicon Manufacturing Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-84.795462, 35.297098]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1113,
                            "name": "Wadestown 5 Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.334733, 39.705065]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1114,
                            "name": "Waynoka Natural Gas Processing Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-98.7635, 36.6526]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1115,
                            "name": "West Delta LNG Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-89.655653, 29.081995]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1116,
                            "name": "Westlake Sulphur Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-93.325658, 30.202496]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1117,
                            "name": "West Mountain Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.978431, 39.321042]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1118,
                            "name": "West Porcupine Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-105.36575, 43.63414]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1119,
                            "name": "Wetzel Rich 1 Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.73894, 39.51644]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1120,
                            "name": "Wetzel Rich 2 Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-80.8077, 39.5496]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1121,
                            "name": "Weymouth Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-70.963312, 42.244686]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1122,
                            "name": "White Oak Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.142129, 39.041577]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1123,
                            "name": "Wild Basin Gas Processing and Crude Handling Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.192392, 47.858703]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1124,
                            "name": "Willcox and Dragoon Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-109.66218, 32.108835]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1125,
                            "name": "Willow Lake Gas Processing Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-104.103303, 32.194986]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1126,
                            "name": "Wood River Refinery and Hartford Terminal"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.095067, 38.812827]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1127,
                            "name": "Woods Cross Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-111.905138, 40.88452]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1128,
                            "name": "Worland Compressor Station"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-107.91529, 44.12498]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1129,
                            "name": "Wynnewood Refinery"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-97.1639, 34.6325]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1130,
                            "name": "YCI Methanol Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.854388, 29.983315]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1131,
                            "name": "Zia Hills Central Facility"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.712359, 32.022008]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "id": 1132,
                            "name": "Zia II Gas Plant"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-103.8089, 32.64306]
                        }
                    }
                ]
            };

            $rootScope.page = {};

            self.alerts = [];

            function closeAlerts() {

                self.alerts = [];

            }

            self.status = {
                loading: true
            };

            self.padding = {
                top: 100,
                right: 100,
                bottom: 100,
                left: 100
            };

            self.presentChildModal = function(featureType) {

                if (featureType !== 'practice' &&
                    featureType !== 'site') return;

                self.showChildModal = true;

                self.childType = featureType;

            };

            self.showElements = function() {

                $timeout(function() {

                    self.status.loading = false;

                    self.status.processing = false;

                }, 0);

            };

            self.toggleLayerConstraint = function () {

                console.log(
                    'toggleLayerConstraint:showAllFeatures',
                    self.showAllFeatures
                );

                LayerUtil.toggleFocusFilter(
                    self.map,
                    self.showAllFeatures);

            };

            self.fetchPrimaryNode = function (featureType, featureId,
                                              programId, callback) {

                console.log(
                    'self.fetchPrimaryNode:featureType',
                    featureType
                );

                console.log(
                    'self.fetchPrimaryNode:featureId',
                    featureId
                );

                console.log(
                    'self.fetchPrimaryNode:programId',
                    programId
                );

                //
                // Reset stored array of queried features.
                //

                self.queryFeatures = undefined;

                AtlasDataManager.setQueryFeatures([]);

                var cls = self.clsMap[featureType];

                if (cls === undefined) return;

                var params = {
                    access_token: self.accessToken,
                    id: featureId,
                    defer: true,
                    src: 'atlas'
                };

                if (featureType === 'territory') {

                    params.exclude = [
                        'creator',
                        'geometry',
                        'intersections',
                        'practices',
                        'simple_geometry',
                        'targets',
                        'tasks'
                    ].join(',');

                    if (!Number.isInteger(parseInt(featureId, 10))) {

                        params.id = Utility.machineName(
                            featureId,
                            '_'
                        );

                    }

                }

                if (programId) {

                    params.program = programId;

                }

                cls.getSingle(
                    params
                ).$promise.then(function(successResponse) {

                    delete successResponse.$promise;

                    delete successResponse.$resolved;

                    self.permissions = successResponse.permissions;

                    self.primaryNode = successResponse;

                    if (!self.primaryNode.hasOwnProperty('properties')) {

                        self.primaryNode.properties = self.primaryNode;

                    }

                    self.featureType = self.primaryNode.properties.type;

                    self.featureClass = self.clsMap[self.featureType];

                    if (!self.primaryNode.hasOwnProperty('type')) {

                        self.primaryNode.type = 'Feature';

                    }

                    if ((featureType === 'practice' ||
                        featureType === 'site')) {

                        self.delineateWatershed(self.primaryNode);

                    }

                    AtlasDataManager.setPrimaryNode(self.primaryNode);

                    self.showElements();

                    MapUtil.fitMap(
                        self.map,
                        self.primaryNode,
                        self.padding,
                        false
                    );

                    if (featureType === 'territory') {

                        self.processMetrics(
                            successResponse.metric_progress
                        );

                    } else {

                        self.loadMetrics(self.primaryNode.properties.id);

                    }

                    //
                    // Set banner image in side panel.
                    //

                    AtlasLayoutUtil.clearBannerImage();

                    if (self.primaryNode.properties.picture) {

                        AtlasLayoutUtil.setBannerImage(
                            self.primaryNode
                        );

                    }

                    if (callback) callback();

                }, function(errorResponse) {

                    console.log('Unable to load feature data.');

                    self.showElements();

                    if (callback) callback();

                });

            };

            self.fetchStation = function (target) {

                //
                // Reset stored array of queried features.
                //

                self.queryFeatures = undefined;

                AtlasDataManager.setQueryFeatures([]);

                self.showLayerOptions = false;

                self.station = target;

                self.toggleSidebar(false, true);

                $timeout(function () {

                    var frame = document.getElementsByTagName('iframe')[0];

                    console.log(
                        'map.click:frame:',
                        frame
                    );

                    frame.setAttribute('height', $window.innerHeight);
                    frame.setAttribute('width', $window.innerWidth);

                    frame.style.height = $window.innerHeight;
                    frame.style.width = $window.innerWidth;

                    frame.style.backgroundColor = 'transparent';
                    frame.frameBorder = '0';
                    frame.allowTransparency = 'true';

                    frame.src = [
                        environment.waterReportApiUrl.concat('/v2/embed/station/'),
                        self.station.properties.id,
                        '?t=' + Date.now()
                    ].join('');

                }, 10);

            };

            self.fetchMap = function () {

                self.programSelection = undefined;

                self.primaryNode = undefined;

                if (angular.isDefined(self.mapSummary) &&
                    angular.isDefined(self.map)) {

                    self.processMetrics(self.primaryMetrics);

                    MapUtil.fitMap(
                        self.map,
                        self.mapSummary,
                        self.padding,
                        false
                    );

                    return;

                }

                MapInterface.get({
                    access_token: self.accessToken,
                    id: $routeParams.id,
                    defer: true
                }).$promise.then(function(successResponse) {

                    self.summary = successResponse;

                    self.mapSummary = successResponse;

                    self.featureClass = MapInterface;

                    self.loadMetrics($routeParams.id, true);

                    self.filterString = AtlasDataManager.createFilterString(
                        successResponse
                    );

                    LayerUtil.setGlobalLabelColor(successResponse.style);

                    if (!angular.isDefined(self.map)) {

                        self.stageMap(true);

                    }

                }, function(errorResponse) {

                    console.log('errorResponse', errorResponse);

                });

            };

            self.positionSidebar = function(elem, forceClose) {

                forceClose = (typeof forceClose === 'boolean') ? forceClose : false;

                var transform = 'translateX(' + 0 + 'px)';

                if (self.collapsed || forceClose) {

                    transform = 'translateX(-' + elem.offsetWidth + 'px)';

                }

                elem.style.transform = transform;

            };

            self.toggleSidebar = function(fitMap, forceClose) {

                fitMap = (typeof fitMap === 'boolean') ? fitMap : true;

                forceClose = (typeof forceClose === 'boolean') ? forceClose : false;

                self.collapsed = !self.collapsed;

                console.log(
                    'self.toggleSidebar:collapsed',
                    self.collapsed
                );

                var elem = document.querySelector('.sidebar');

                self.padding.left = self.collapsed ? 100 : elem.offsetWidth + 100;

                console.log(
                    'self.toggleSidebar:padding:',
                    self.padding
                );

                if (fitMap) {

                    MapUtil.fitMap(
                        self.map,
                        self.primaryNode,
                        self.padding,
                        true
                    );

                }

                self.positionSidebar(elem, forceClose);

            };

            self.positionMenu = function(elem) {

                var transform = 'translateX(' + 0 + 'px)';

                if (self.menuCollapsed) {

                    transform = 'translateX(' + elem.offsetWidth + 'px)';

                }

                console.log(
                    'self.positionMenu:transform',
                    transform
                );

                elem.style.transform = transform;

            };

            self.toggleMenu = function() {

                self.menuCollapsed = !self.menuCollapsed;

                console.log(
                    'self.toggleMenu:menuCollapsed',
                    self.menuCollapsed
                );

                var elem = document.querySelector('#sidebar');

                console.log(
                    'self.toggleMenu:elem',
                    elem
                );

                self.positionMenu(elem);

            };

            self.delineateWatershed = function(feature) {

                $http({
                    method: 'POST',
                    url: 'https://watersheds.cci.drexel.edu/api/watershedboundary/',
                    data: feature.geometry
                }).then(function successCallback(successResponse) {

                    console.log(
                        'delineateWatershed:successResponse:',
                        successResponse);

                    var drainageFeature = {
                        "type": "Feature",
                        "geometry": successResponse.data,
                        "properties": {
                            "id": DRAINAGE_ID
                        }
                    };

                    AtlasDataManager.trackFeature(
                        'drainage',
                        'polygon',
                        drainageFeature
                    );

                    // set drainage source data

                    var source = self.map.getSource(DRAINAGE_ID);

                    if (source !== undefined) {

                        source.setData({
                            type: 'FeatureCollection',
                            'features': [
                                drainageFeature
                            ]
                        });

                    }

                }, function errorCallback(errorResponse) {

                    console.log(
                        'delineateWatershed:errorResponse:',
                        errorResponse
                    );

                });

            };

            self.toggleLayer = function(layerId) {

                console.log(
                    'self.toggleLayer:layerId:',
                    layerId
                );

                self.preventFullCycle = true;

                if (layerId.endsWith('*')) {

                    var components = layerId.split('.');

                    var featureType = components[1];

                    var layerTypes = [
                        'linestring',
                        'point',
                        'polygon'
                    ];

                    layerTypes.forEach(function (layerType) {

                        var layerRef = [
                            'fd',
                            featureType,
                            layerType
                        ].join('.');

                        LayerUtil.toggleLayer(layerRef, self.map);

                    });

                } else {

                    LayerUtil.toggleLayer(layerId, self.map);

                }

            };

            self.switchMapStyle = function(style, index) {

                console.log('self.switchMapStyle --> styleId', style);

                console.log('self.switchMapStyle --> index', index);

                console.log(
                    'self.switchMapStyle:currentStyle',
                    self.map.getStyle()
                );

                self.visibilityIndex = LayerUtil.visibilityIndex(self.map);

                console.log(
                    'switchMapStyle:visibilityIndex:',
                    self.visibilityIndex);

                self.currentStyleString = MapUtil.getStyleString(self.map);

                console.log(
                    'switchMapStyle:currentStyleString:',
                    self.currentStyleString);

                self.mapOptions.style = self.mapStyles[index].url;

                LayerUtil.setGlobalLabelColor(
                    self.mapOptions.style
                );

                self.map.setStyle(
                    self.mapStyles[index].url,
                    {
                        diff: false
                    }
                );

            };

            self.getMapOptions = function() {

                self.mapStyles = mapbox.baseStyles;

                console.log(
                    'self.createMap --> mapStyles',
                    self.mapStyles);

                self.activeStyle = 0;

                console.log(
                    'self.createMap --> accessToken',
                    mapboxgl.accessToken);

                self.mapOptions = JSON.parse(JSON.stringify(mapbox.defaultOptions));

                self.mapOptions.container = 'primary--map';

                self.mapOptions.style = self.mapStyles[self.activeStyle].url;

                return self.mapOptions;

            };

            self.createMap = function(options) {

                if (!options) return;

                try {

                    self.map = new mapboxgl.Map(options);

                } catch (e) {

                    console.log(e);

                    return;

                }

                self.map.on('click', function (e) {

                    if (self.station) {

                        self.station = undefined;

                        self.toggleSidebar(false);

                    }

                    var features = LayerUtil.validateQueryFeatures(
                        self.map.queryRenderedFeatures(e.point)
                    );

                    console.log(
                        'map.click:features:',
                        features
                    );

                    if (!features.length) return;

                    if (features.length > 1) {

                        console.log(
                            'map.click:features.length > 1:',
                            features
                        );

                        $scope.$apply(function () {

                            self.queryFeatures = features;

                            AtlasDataManager.setQueryFeatures(
                                features
                            );

                        });

                    } else {

                        var target = features[0];

                        console.log(
                            'map.click:target:',
                            target
                        );

                        // HighlightLayer.setHighlight(
                        //     self.map,
                        //     target
                        // );

                        if (target.layer.id.indexOf('station') >= 0) {

                            console.log(
                                'map.click:station:',
                                target
                            );

                            self.fetchStation(target);

                        } else {

                            var primaryId = undefined;

                            if (angular.isDefined(self.primaryNode)) {

                                primaryId = self.primaryNode.properties.id;

                            }

                            if (target.properties.id !== primaryId) {

                                self.urlData.node = [
                                    target.properties.type,
                                    '.',
                                    target.properties.id
                                ].join('');

                                self.fetchPrimaryNode(
                                    target.properties.type,
                                    target.properties.id
                                );

                            }

                        }

                    }

                });

                self.map.on('styledata', function() {

                    console.log(
                        'styledata:style:',
                        self.map.getStyle()
                    );

                    console.log(
                        'styledata:currentStyleString:',
                        self.currentStyleString
                    );

                    //
                    // Reset flag set ahead of single layer visibility change.
                    //

                    if (self.preventFullCycle) {

                        self.preventFullCycle = false;

                        return;

                    }

                    var styleString = MapUtil.getStyleString(self.map);

                    console.log(
                        'styledata:styleString:',
                        styleString
                    );

                    //
                    // Set text color for label layers.
                    //

                    LayerUtil.setTextColor(self.map);

                    if (!angular.isDefined(self.currentStyleString)) return;

                    //
                    // Restore reference sources and layers.
                    //

                    self.populateMap();

                    //
                    // Restore feature source data.
                    //

                    SourceUtil.restoreSources(self.map);

                    //
                    // Remove default project layer filter since
                    // all snapshot features are pre-filtered.
                    //

                    LayerUtil.removeProjectFilter(self.map);

                });

                self.map.on('moveend', function() {

                    // if (self.singleProjectMode) return;

                    // if (angular.isDefined(self.mapSummary) &&
                    //     !self.singleProjectMode) {
                    //
                    //     var projects = self.mapSummary.projects;
                    //
                    //     console.log(
                    //         'self.map.moveend:projects',
                    //         projects
                    //     );
                    //
                    //     if (Array.isArray(projects)) {
                    //
                    //         if (projects.length === 1) {
                    //
                    //             self.singleProjectMode = true;
                    //
                    //             delete self.urlData.filters;
                    //
                    //             self.urlData.node = [
                    //                 'project.',
                    //                 projects[0].id
                    //             ].join('');
                    //
                    //             self.refreshFeatureLayers();
                    //
                    //             return;
                    //
                    //         }
                    //
                    //     }
                    //
                    // }

                    var center = self.map.getCenter();

                    console.log(
                        'self.map.moveend:center:',
                        center
                    );

                    if (!self.mapCenter) {

                        self.mapCenter = center;

                    }

                    console.log(
                        'self.map.moveend:self.mapCenter:',
                        self.mapCenter
                    );

                    var zoom = Utility.precisionRound(
                        self.map.getZoom(),
                        2
                    );

                    console.log(
                        'self.map.moveend:zoom:',
                        zoom
                    );

                    if (!self.trackedZoom) {

                        self.trackedZoom = zoom;

                    }

                    console.log(
                        'self.map.moveend:self.trackedZoom:',
                        self.trackedZoom
                    );

                    var zoomDelta = Math.abs(
                        Math.floor(zoom) - Math.floor(self.trackedZoom)
                    );

                    console.log(
                        'self.map.moveend:zoomDelta:',
                        zoomDelta
                    );

                    var lngDelta = Math.abs(center.lng - self.mapCenter.lng);

                    console.log(
                        'self.map.moveend:lngDelta:',
                        lngDelta
                    );

                    var latDelta = Math.abs(center.lat - self.mapCenter.lat);

                    console.log(
                        'self.map.moveend:latDelta:',
                        latDelta
                    );

                    var tolerance = 0.001;

                    if (zoomDelta > 0 ||
                        lngDelta >= tolerance ||
                        latDelta >= tolerance) {

                        self.mapCenter = center;

                        self.trackedZoom = zoom;

                        EsriLayerService.refreshFeatureLayers(self.map);

                        // self.refreshFeatureLayers();

                    }

                    // self.refreshFeatureLayers();

                });

                self.map.on('load', function() {

                    var scale = new mapboxgl.ScaleControl({
                        maxWidth: 80,
                        unit: 'imperial'
                    });

                    self.map.addControl(scale, 'bottom-right');

                    var nav = new mapboxgl.NavigationControl();

                    self.map.addControl(nav, 'bottom-right');

                    var geocoder = new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        clearOnBlur: true,
                        countries: 'us',
                        mapboxgl: mapboxgl,
                        marker: false,
                        minLength: 3,
                        placeholder: 'Find addresses and places'
                    });

                    document.querySelector('.geocoder').appendChild(geocoder.onAdd(self.map));

                    self.padding.left = AtlasLayoutUtil.getLeftMapOffset();

                    var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);

                    var bounds = turf.bbox(line);

                    self.map.fitBounds(bounds, {
                        padding: self.padding
                    });

                    //
                    // Add reference sources and layers.
                    //

                    LayerUtil.resetCustomIdx();

                    self.populateMap();

                    LayerUtil.resetSources(self.map);

                    // MapUtil.fitMap(
                    //     self.map,
                    //     self.mapSummary,
                    //     self.padding,
                    //     false
                    // );

                    self.map.addSource('ogw-facility', {
                        'type': 'geojson',
                        'data': self.featureCollection
                    });

                    self.map.addLayer({
                        'id': 'ogw-facility',
                        'type': 'circle',
                        'source': 'ogw-facility', // reference the data source
                        'layout': {},
                        'paint': {
                            'circle-color': '#ff0000',
                            'circle-radius': [
                                'interpolate',
                                ['exponential', 0.5],
                                ['zoom'],
                                2,
                                0.5,
                                20,
                                6
                            ],
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#FFFFFF'
                        }
                    });

                    // LayerUtil.setProgramId(0);

                    // LayerUtil.addCustomLayers(
                    //     self.mapSummary.layers,
                    //     self.layers,
                    //     self.padding,
                    //     self.map,
                    //     self.fetchPrimaryNode);

                    // if (!self.singleProjectMode) {
                    //
                    //     self.updateUrlParams(self.filterString);
                    //
                    // }

                    self.showElements();

                });

            };

            self.setLayerVisibility = function () {

                var layerRefs = [];

                self.layers.forEach(function (layer) {

                    var visibility = layer.selected ? 'visible' : 'none';

                    if (layer.id.endsWith('*')) {

                        var components = layer.id.split('.');

                        var featureType = components[1];

                        var layerTypes = [
                            'linestring',
                            'point',
                            'polygon'
                        ];

                        layerTypes.forEach(function (layerType) {

                            var layerRef = [
                                'fd',
                                featureType,
                                layerType
                            ].join('.');

                            layerRefs.push({
                                id: layerRef,
                                visibility: visibility
                            });

                        });

                    } else {

                        layerRefs.push({
                            id: layer.id,
                            visibility: visibility
                        });

                    }

                });

                layerRefs.forEach(function (layerRef) {

                    var labelLayerId = layerRef.id + '-label';

                    var labelLayer = self.map.getLayer(labelLayerId);

                    if (labelLayer !== undefined) {

                        self.map.setLayoutProperty(
                            labelLayerId,
                            'visibility',
                            layerRef.visibility
                        );

                    }

                    self.map.setLayoutProperty(
                        layerRef.id,
                        'visibility',
                        layerRef.visibility
                    );

                });

            };

            self.populateMap = function () {

                LayerUtil.addReferenceSources(self.map);

                LayerUtil.addReferenceLayers(self.map);

                LabelLayer.addLabelLayers(self.map);

                DataLayer.addDataLayers(self.map);

                // HighlightLayer.addHighlightLayers(self.map);

                LayerUtil.addCustomLayers(
                    LayerUtil.customLayerIdx(),
                    self.layers,
                    self.padding,
                    self.map,
                    self.fetchPrimaryNode
                );

                LayerUtil.setVisibility(self.map, self.visibilityIndex);

                self.setLayerVisibility();

                LayerUtil.toggleFocusFilter(
                    self.map,
                    self.showAllFeatures
                );

            };

            self.stageMap = function(createMap) {

                AtlasLayoutUtil.sizeSidebar();

                if (createMap) {

                    if (!self.mapOptions) {

                        self.mapOptions = self.getMapOptions();

                    }

                    self.createMap(self.mapOptions);

                }

            };

            self.processMetrics = function (data) {

                Utility.processMetrics(data.features);

                if (data.hasOwnProperty('timestamp')) {

                    if (data.timestamp.toString().length === 10) {

                        data.timestamp = data.timestamp * 1000;

                    }

                    self.progressTimestamp = data.timestamp;

                }

                self.metrics = data.features;

                var nodeType;

                if (angular.isDefined(self.primaryNode)) {

                    nodeType = self.primaryNode.properties.type;

                }

                self.metrics.forEach(function(metric) {

                    Utility.calcProgress(
                        metric,
                        true,
                        nodeType
                    );

                });

                self.metrics = Utility.groupByModel(data.features);

                // self.metrics = Utility.groupByModel(data.features);

                console.log('self.metrics', self.metrics);

                $timeout(function () {

                    AtlasLayoutUtil.resizeMainContent();

                }, 50);

            }

            self.loadMetrics = function(featureId, primary) {

                self.featureClass.progress({
                    access_token: self.accessToken,
                    id: featureId,
                    defer: true
                }).$promise.then(function(successResponse) {

                    if (primary) {

                        self.primaryMetrics = successResponse;

                    }

                    self.processMetrics(successResponse);

                }, function(errorResponse) {

                    console.log('errorResponse', errorResponse);

                });

            };

            self.updateUrlParams = function (filterString) {

                if (!angular.isDefined(filterString) ||
                    typeof filterString !== 'string') {

                    filterString = self.urlData.filters;

                }

                console.log(
                    'self.updateUrlParams:filterString',
                    filterString
                );

                var urlParams = AtlasDataManager.createURLData(
                    self.primaryNode,
                    false,
                    {
                        filterString: filterString,
                        style: self.urlData.style,
                        zoom: self.map.getZoom()
                    }
                );

                urlParams.access_token = encodeURIComponent(
                    btoa(self.accessToken)
                );

                console.log(
                    'self.updateUrlParams:urlParams',
                    urlParams
                );

                $location.search(urlParams);

                self.urlData = AtlasDataManager.getData(urlParams);

                console.log(
                    'self.updateUrlParams:urlData',
                    self.urlData
                );

            };

            self.extractUrlParams = function (params) {

                console.log(
                    'extractUrlParams:params:',
                    params
                );

                if (params.access_token) {

                    self.accessToken = atob(
                        decodeURIComponent(params.access_token)
                    );

                }

                self.origin = AtlasDataManager.getOrigin(params);

                console.log(
                    'extractUrlParams:origin:',
                    self.origin
                );

                var dataObj = AtlasDataManager.getData(params);

                console.log(
                    'extractUrlParams:dataObj:',
                    dataObj
                );

                self.urlData = dataObj || {};

                if (!self.user) {

                    self.loadUser();

                }

            };

            window.addEventListener('popstate', function (event) {
                // The popstate event is fired each time when the current history entry changes.

                var params = $location.search();

                self.extractUrlParams(params);

                // var nodeString = self.urlData.node;
                //
                // var nodeTokens = nodeString.split('.');
                //
                // self.fetchPrimaryNode(
                //     nodeTokens[0],
                //     +nodeTokens[1]
                // );

            }, false);

            $scope.$on('$destroy', function () {

                console.log(
                    'AtlasController:destroy...'
                );

                //
                // Perform a hard reset of all map data.
                //

                AtlasDataManager.resetTrackedFeatures();

                // LayerUtil.resetCustomIdx();
                //
                // LayerUtil.removeLayers(self.map);
                //
                // LayerUtil.resetSources(self.map);

                if (angular.isDefined(self.map)) self.map.remove();

            });

            //
            // Verify Account information for proper UI element display
            //

            self.loadUser = function () {

                User.me({
                    access_token: self.accessToken,
                    defer: true
                }).$promise.then(function(userResponse) {

                    $rootScope.user = Account.userObject = userResponse;

                    self.permissions = {};

                    self.user = $rootScope.user;

                    $rootScope.page.title = 'Atlas';

                    self.fetchMap();

                });

            };

            //
            // Assign map to a scoped variable
            //

            // var params = $location.search();
            //
            // self.extractUrlParams(params, true);

            self.stageMap(true);

        });