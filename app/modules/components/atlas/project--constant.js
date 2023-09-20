'use strict';

/**
 * @ngdoc service
 * @name cleanWaterCommunitiesApp.state
 * @description
 * # state
 * Service in the cleanWaterCommunitiesApp.
 */
angular.module('OilGasWatch')
    .constant('ProjectCollection', {
        idx: [{
            "facility": "FG LA Complex",
            "status": "On hold",
            "sector": "Petrochemicals and Plastics",
            "id": 865,
            "ghg": 13628091,
            "company": "FG LA, LLC",
            "project": "FG LA Complex",
            "state": "LA"
        },
            {
                "facility": "Sabine Pass LNG Terminal",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 1047,
                "ghg": 10771012,
                "company": "Sabine Pass LNG LP",
                "project": "Sabine Pass LNG Terminal",
                "state": "LA"
            },
            {
                "facility": "Driftwood LNG Facility",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 845,
                "ghg": 9513442,
                "company": "Driftwood LNG LLC",
                "project": "Driftwood LNG Facility",
                "state": "LA"
            },
            {
                "facility": "Liquefaction Plant",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 940,
                "ghg": 8572968,
                "company": "Alaska Gasline Development Corporation",
                "project": "New Liquefaction Plant",
                "state": "AK"
            },
            {
                "facility": "GTL Plant",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 888,
                "ghg": 8378365,
                "company": "Energy Security Partners",
                "project": "Gas to Liquids (GTL) Plant",
                "state": "AR"
            },
            {
                "facility": "Rio Grande LNG and Rio Bravo Pipeline Compressor",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1039,
                "ghg": 8198227,
                "company": "Rio Grande LNG, LLC",
                "project": "Rio Grande LNG and Rio Bravo Pipeline Compressor",
                "state": "TX"
            },
            {
                "facility": "Plaquemines LNG Plant & Pipelines",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1012,
                "ghg": 8144463,
                "company": "Venture Global Plaquemines LNG, LLC",
                "project": "Plaquemines LNG Terminal",
                "state": "LA"
            },
            {
                "facility": "Delta LNG Terminal",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 839,
                "ghg": 7771098,
                "company": "Venture Global Delta LNG LLC",
                "project": "Delta LNG Terminal",
                "state": "LA"
            },
            {
                "facility": "Gas Treatment Plant",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 875,
                "ghg": 7278238,
                "company": "Alaska Gasline Development Corporation",
                "project": "New Gas Treatment Plant",
                "state": "AK"
            },
            {
                "facility": "Lake Charles Methanol Gasification Facility",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 929,
                "ghg": 6014977,
                "company": "Lake Charles Methanol, LLC",
                "project": "Lake Charles Methanol Facility - Lake Charles Methanol Project",
                "state": "LA"
            },
            {
                "facility": "Nacero Penwell Facility",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 982,
                "ghg": 5800180,
                "company": "Nacero TX 1 LLC",
                "project": "Nacero Penwell Facility",
                "state": "TX"
            },
            {
                "facility": "Corpus Christi LNG Terminal",
                "status": "Operating",
                "sector": "Liquefied Natural Gas",
                "id": 828,
                "ghg": 5538226,
                "company": "Corpus Christi Liquefaction, LLC\/Corpus Christi Liquefaction Stage III, LLC",
                "project": "Trains 1, 2, and 3",
                "state": "TX"
            },
            {
                "facility": "Cameron LNG Facility",
                "status": "Pre-construction",
                "sector": "Liquefied Natural Gas",
                "id": 789,
                "ghg": 5071105,
                "company": "Cameron LNG, LLC",
                "project": "Cameron LNG Phase II",
                "state": "LA"
            },
            {
                "facility": "Golden Pass LNG Export Terminal",
                "status": null,
                "sector": "Natural Gas",
                "id": 883,
                "ghg": 4940072,
                "company": "Golden Pass LNG Terminal LLC",
                "project": "Golden Pass LNG Export Project",
                "state": "TX"
            },
            {
                "facility": "Delfin LNG Deepwater Port",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 837,
                "ghg": 4857091,
                "company": "Delfin LNG, LLC",
                "project": "Delfin LNG Project - Deepwater Port",
                "state": "LA"
            },
            {
                "facility": "Port Arthur LNG Export Terminal",
                "status": "Pre-construction",
                "sector": "Liquefied Natural Gas",
                "id": 1019,
                "ghg": 4659930,
                "company": "Port Arthur LNG, LLC",
                "project": "Port Arthur LNG Base Project",
                "state": "TX"
            },
            {
                "facility": "Donaldsonville Nitrogen Complex",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 843,
                "ghg": 4573136,
                "company": "CF Industries Nitrogen, LLC",
                "project": "Donaldsonville Nitrogen Complex",
                "state": "LA"
            },
            {
                "facility": "Louisiana Fertilizer Plant",
                "status": "Pre-construction",
                "sector": "Nitrogen",
                "id": 947,
                "ghg": 4527943,
                "company": "Eurochem Louisiana, LLC",
                "project": "Louisiana Fertilizer Plant",
                "state": "LA"
            },
            {
                "facility": "Lake Charles Liquefaction Export Terminal",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 928,
                "ghg": 4321253,
                "company": "Lake Charles LNG LLC",
                "project": "Lake Charles Liquefaction Export Terminal",
                "state": "LA"
            },
            {
                "facility": "Port Arthur Refinery",
                "status": "Under construction",
                "sector": "Oil",
                "id": 1020,
                "ghg": 4191941,
                "company": "Motiva Enterprises LLC",
                "project": "Naphtha Growth and C9 Splitter Project",
                "state": "TX"
            },
            {
                "facility": "Calcasieu Pass LNG Terminal",
                "status": "Commissioning",
                "sector": "Natural Gas",
                "id": 786,
                "ghg": 3970643,
                "company": "Venture Global Calcasieu Pass, LLC",
                "project": "Calcasieu Pass LNG Project",
                "state": "LA"
            },
            {
                "facility": "Cameron LNG Facility",
                "status": "Operating",
                "sector": "Liquefied Natural Gas",
                "id": 789,
                "ghg": 3958512,
                "company": "Cameron LNG, LLC",
                "project": "Cameron LNG Phase I",
                "state": "LA"
            },
            {
                "facility": "Chemical Orange Polyethylene Plant",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 802,
                "ghg": 3891942,
                "company": "Chevron Phillips Chemical Company, LP",
                "project": "Chevron Phillips Chemical Orange Polyethylene Plant",
                "state": "TX"
            },
            {
                "facility": "Holly Tulsa Refinery",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 907,
                "ghg": 3588406,
                "company": "HollyFrontier Tulsa Refining LLC (formerly Holly Refining and Marketing Co.)",
                "project": "Holly Tulsa Refinery, East",
                "state": "OK"
            },
            {
                "facility": "LIPJV Lake Charles Chemical Complex",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 939,
                "ghg": 3586620,
                "company": "Louisiana Integrated Polyethylene JV LLC (Sasol Chemicals USA LLC and LyondellBasell; dba Equistar Chemicals, LP)",
                "project": "Lake Charles Chemical Complex - Lake Charles Chemicals Project",
                "state": "LA"
            },
            {
                "facility": "Commonwealth LNG Terminal",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 809,
                "ghg": 3385224,
                "company": "Commonwealth LNG LLC",
                "project": "Commonwealth LNG Project",
                "state": "LA"
            },
            {
                "facility": "Port Arthur Ethane Cracker",
                "status": "On hold",
                "sector": "Petrochemicals and Plastics",
                "id": 3230,
                "ghg": 3311393,
                "company": "Motiva Enterprises LLC",
                "project": "Port Arthur Ethane Cracker (1)",
                "state": "TX"
            },
            {
                "facility": "Formosa Point Comfort Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1015,
                "ghg": 3175294,
                "company": "Formosa Plastics Corporation",
                "project": "Olefins 3 and PDH Plant",
                "state": "TX"
            },
            {
                "facility": "Port Arthur LNG Export Terminal",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1019,
                "ghg": 3081270,
                "company": "Port Arthur LNG, LLC",
                "project": "Port Arthur LNG Expansion Project",
                "state": "TX"
            },
            {
                "facility": "Gulf Coast Growth Ventures Petrochemical and Plastics Manufacturing Complex",
                "status": "Under construction",
                "sector": "Petrochemicals and Plastics",
                "id": 891,
                "ghg": 2954185.5,
                "company": "Gulf Coast Growth Ventures LLC",
                "project": "Ethylene Plant, MEG Plant, LDPE Plant",
                "state": "TX"
            },
            {
                "facility": "Port Neal Nitrogen Complex",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 1021,
                "ghg": 2908212,
                "company": "CF Industries Nitrogen, LLC",
                "project": "New Ammonia and Urea Plants",
                "state": "IA"
            },
            {
                "facility": "Gulf LNG Terminal",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 893,
                "ghg": 2885787,
                "company": "Gulf LNG Liquefaction Company, LLC",
                "project": "Gulf LNG Liquefaction Project",
                "state": "MS"
            },
            {
                "facility": "Valero Port Arthur Refinery",
                "status": "Under construction",
                "sector": "Oil",
                "id": 1110,
                "ghg": 2862639,
                "company": "Premcor Refining Group Inc.",
                "project": "Valero Port Arthur Refinery",
                "state": "TX"
            },
            {
                "facility": "Gulf Coast Methanol Complex",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 892,
                "ghg": 2533377,
                "company": "IGP Methanol",
                "project": "Gulf Coast Methanol Complex",
                "state": "LA"
            },
            {
                "facility": "Magnolia LNG Facility",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 951,
                "ghg": 2459714.23,
                "company": "Magnolia LNG, LLC",
                "project": "Magnolia LNG Facility",
                "state": "LA"
            },
            {
                "facility": "Odessa Petrochemical Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 997,
                "ghg": 2401820,
                "company": "REXtac, LLC",
                "project": "Odessa Petrochemical Plant",
                "state": "TX"
            },
            {
                "facility": "Dow Texas Operations Freeport",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 844,
                "ghg": 2361294,
                "company": "Dow Chemical Company",
                "project": "Freeport Light Hydrocarbons Plant No",
                "state": "TX"
            },
            {
                "facility": "Nitrogen Fertilizer Manufacturing Facility",
                "status": "Pre-construction",
                "sector": "Nitrogen",
                "id": 990,
                "ghg": 2350057,
                "company": "Midwest Fertilizer Company LLC",
                "project": "Nitrogen Fertilizer Manufacturing Facility",
                "state": "IN"
            },
            {
                "facility": "Petrochemicals Complex",
                "status": "Under construction",
                "sector": "Petrochemicals and Plastics",
                "id": 1006,
                "ghg": 2303645,
                "company": "Shell Chemical Appalachia, LLC",
                "project": "Petrochemicals Complex",
                "state": "PA"
            },
            {
                "facility": "Iowa Fertilizer Company",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 864,
                "ghg": 2300368,
                "company": "Iowa Fertilizer Company",
                "project": "IFC Fertilizer Complex",
                "state": "IA"
            },
            {
                "facility": "Holly Tulsa Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 907,
                "ghg": 2242311,
                "company": "HollyFrontier Tulsa Refining LLC (formerly Holly Refining and Marketing Co.)",
                "project": "Holly Tulsa Refinery East, West, and Loading Terminal",
                "state": "OK"
            },
            {
                "facility": "Kenai Nitrogen Operations",
                "status": "Pre-construction",
                "sector": "Nitrogen",
                "id": 923,
                "ghg": 2197970,
                "company": "Agrium U.S. Inc.",
                "project": "Kenai Nitrogen Operations",
                "state": "AK"
            },
            {
                "facility": "Big Lake Fuels Methanol Plant (formerly G2X Plant)",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 766,
                "ghg": 2094765,
                "company": "Big Lake Fuels, LLC",
                "project": "Big Lake Fuels Methanol Plant (formerly G2X Plant)",
                "state": "LA"
            },
            {
                "facility": "Geismar Methanol Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 877,
                "ghg": 2080568,
                "company": "Methanex USA",
                "project": "Geismar Methanol - Plants 1 and 2",
                "state": "LA"
            },
            {
                "facility": "Freeport LNG Terminal",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 870,
                "ghg": 2037896,
                "company": "Freeport LNG Development, L.P.",
                "project": "Freeport LNG Liquefaction Plant & Pretreatment Projects",
                "state": "TX"
            },
            {
                "facility": "Cove Point LNG Terminal",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 831,
                "ghg": 2030998,
                "company": "Dominion Energy Cove Point LNG, LP",
                "project": "Cove Point Liquefaction Project",
                "state": "MD"
            },
            {
                "facility": "St. James Methanol Plant",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 1083,
                "ghg": 2023770,
                "company": "South Louisiana Methanol, LP",
                "project": "St",
                "state": "LA"
            },
            {
                "facility": "Dyno Nobel Ammonia Production Facility",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 746,
                "ghg": 1976157.649,
                "company": "Dyno Nobel LA Ammonia LLC",
                "project": "New Ammonia Production Facility",
                "state": "LA"
            },
            {
                "facility": "Jordan Cove LNG Terminal",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 921,
                "ghg": 1969795,
                "company": "Jordan Cove Energy Project, L.P., Jordan Cove Energy, LLC",
                "project": "Jordan Cove LNG Terminal",
                "state": "OR"
            },
            {
                "facility": "Cronus Chemicals Ammonia Production Facility",
                "status": "Pre-construction",
                "sector": "Nitrogen",
                "id": 863,
                "ghg": 1822415,
                "company": "Cronus Chemicals, LLC",
                "project": "Cronus Chemicals Ammonia Production Facility (1)",
                "state": "IL"
            },
            {
                "facility": "PTTGC Petrochemical Complex",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 1024,
                "ghg": 1785000,
                "company": "PTTCG America LLC",
                "project": "US Petrochemical Complex Project",
                "state": "OH"
            },
            {
                "facility": "Koch Methanol St. James Methanol Plant (previously YCI Methanol Plant)",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1130,
                "ghg": 1621079,
                "company": "Koch Methanol St. James, LLC (formerly YCI Methanol One, LLC and Yuhuang Chemical Inc.)",
                "project": "Koch Methanol St",
                "state": "LA"
            },
            {
                "facility": "Chocolate Bayou Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 805,
                "ghg": 1556150,
                "company": "INEOS USA LLC",
                "project": "Chocolate Bayou Chemical Plant - Chocolate Bayou Steam Generating Station",
                "state": "TX"
            },
            {
                "facility": "Agrium US Borger Nitrogen Operations",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 742,
                "ghg": 1531239,
                "company": "Agrium U.S. Inc.",
                "project": "Agrium US Borger Nitrogen Operations",
                "state": "TX"
            },
            {
                "facility": "Pallas Nitrogen Plant",
                "status": "Pre-construction",
                "sector": "Nitrogen",
                "id": 1002,
                "ghg": 1494182,
                "company": "Pallas Nitrogen LLC",
                "project": "Pallas Nitrogen Plant",
                "state": "OH"
            },
            {
                "facility": "Natrium Power Plant",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 985,
                "ghg": 1475625,
                "company": "Blue Racer Midstream, LLC",
                "project": "Natrium Power Plant",
                "state": "WV"
            },
            {
                "facility": "Baytown Olefins Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 759,
                "ghg": 1453293,
                "company": "Exxon Mobil Corp., Bechtel Oil Gas and Chemicals Inc",
                "project": "Baytown Olefins Plant - Ethylene Unit Expansion",
                "state": "TX"
            },
            {
                "facility": "Cedar Bayou Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 794,
                "ghg": 1405912,
                "company": "Chevron Phillips Chemical Company, LP",
                "project": "Ethylene Production Expansion",
                "state": "TX"
            },
            {
                "facility": "Port Arthur Side Ethane Cracker",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1018,
                "ghg": 1396476,
                "company": "Bayport Polymers LLC (Baystar)",
                "project": "Port Arthur Side Ethane Cracker (1)",
                "state": "TX"
            },
            {
                "facility": "Enterprise Mont Belvieu Complex",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 970,
                "ghg": 1342659,
                "company": "Enterprise Products",
                "project": "Mont Belvieu Complex - PDH I",
                "state": "TX"
            },
            {
                "facility": "El Dorado Chemical Manufacturing Facility",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 852,
                "ghg": 1294790,
                "company": "El Dorado Chemical Company",
                "project": "DM Weatherly (DMW) Nitric Acid Plant",
                "state": "AR"
            },
            {
                "facility": "Centurion Brownsville Condensate Splitter Facility",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 798,
                "ghg": 1236362,
                "company": "Jupiter Brownsville, LLC",
                "project": "Heavy Condensate Upgrader Project",
                "state": "TX"
            },
            {
                "facility": "Methanol Process Unit",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 960,
                "ghg": 1202090,
                "company": "OCI Beaumont LLC, Eastman Chemical Company, BMC Holdings Inc., Terra Nitrogen, Pandora Methanol LLC",
                "project": "Beaumont Plant - Methanol Process Unit Expansion",
                "state": "TX"
            },
            {
                "facility": "Air Liquide Large Industries US",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 758,
                "ghg": 1190162,
                "company": "Air Liquide Large Industries U.S. LP",
                "project": "Bayou Cogeneration Plant, Turbine Replacement Project",
                "state": "TX"
            },
            {
                "facility": "Natural Gas to Gasoline Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 986,
                "ghg": 1175081,
                "company": "Natgasoline LLC",
                "project": "Beaumont Gas to Gasoline Plant",
                "state": "TX"
            },
            {
                "facility": "Westlake Ethylene Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 927,
                "ghg": 1158682,
                "company": "Indorama Ventures Olefins LLC",
                "project": "Westlake Ethylene Plant (1)",
                "state": "LA"
            },
            {
                "facility": "Olefins Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 998,
                "ghg": 1157041.43,
                "company": "Equistar Chemicals LP",
                "project": "Olefins Plant Expansion",
                "state": "TX"
            },
            {
                "facility": "Ethylene & Derivatives Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 860,
                "ghg": 1155059,
                "company": "LACC LLC",
                "project": "Ethylene and Monoethylene Glycol Plants",
                "state": "LA"
            },
            {
                "facility": "Monoethylene Glycol Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 3605,
                "ghg": 1155059,
                "company": "Lotte Chemical Louisiana LLC",
                "project": "Ethylene and Monoethylene Glycol Plants",
                "state": "LA"
            },
            {
                "facility": "Enid Nitrogen Plant",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 858,
                "ghg": 1154153,
                "company": "Koch Nitrogen",
                "project": "Enid Nitrogen Plant - Capacity Expansion Project",
                "state": "OK"
            },
            {
                "facility": "Praxair Clear Lake Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1022,
                "ghg": 1148305,
                "company": "Praxair, Inc.",
                "project": "Praxair Clear Lake Plant",
                "state": "TX"
            },
            {
                "facility": "Grand Forks Fertilizer Plant",
                "status": "Pre-construction",
                "sector": "Nitrogen",
                "id": 886,
                "ghg": 1146226,
                "company": "Northern Plains Nitrogen, LLP",
                "project": "Grand Forks Fertilizer Plant",
                "state": "ND"
            },
            {
                "facility": "Baton Rouge H2 Plant",
                "status": "Operating",
                "sector": "Oil",
                "id": 3654,
                "ghg": 1122924,
                "company": "Air Products & Chemicals Inc.",
                "project": "Baton Rouge H2 Plant (1)",
                "state": "LA"
            },
            {
                "facility": "Marcellus LNG Production Facility I",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 954,
                "ghg": 1107679,
                "company": "New Fortress Energy LLC\/Bradford County Real Estate Partners LLC",
                "project": "Marcellus LNG Production Facility I",
                "state": "PA"
            },
            {
                "facility": "BP Cherry Point Refinery",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 776,
                "ghg": 1097792,
                "company": "BP West Coast Products LLC",
                "project": "BP Coker Heaters Replacement Project",
                "state": "WA"
            },
            {
                "facility": "Motiva Enterprises Polyethylene Manufacturing Complex",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 977,
                "ghg": 1095294.94,
                "company": "Motiva Chemicals LLC",
                "project": "LLDPE and HDPE",
                "state": "TX"
            },
            {
                "facility": "Kalama Methanol Manufacturing and Marine Export Facility ",
                "status": "Canceled",
                "sector": "Petrochemicals and Plastics",
                "id": 922,
                "ghg": 1076000,
                "company": "Northwest Innovation Works Kalama, LLC",
                "project": "Kalama Methanol Manufacturing and Marine Export Facility ",
                "state": "WA"
            },
            {
                "facility": "Cowboy Central Delivery Point",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 833,
                "ghg": 1048600,
                "company": "XTO Energy, Inc.",
                "project": "Cowboy Central Delivery Point",
                "state": "NM"
            },
            {
                "facility": "West Delta LNG Terminal",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1115,
                "ghg": 1041670,
                "company": "West Delta LNG, LLC",
                "project": "West Delta LNG Terminal",
                "state": "LA"
            },
            {
                "facility": "Calvert City Plant",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 788,
                "ghg": 1017038,
                "company": "Westlake Chemical Corporation",
                "project": "Vinyls Plant, PVC Plant, and Ethylene Plant",
                "state": "KY"
            },
            {
                "facility": "Garyville Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 874,
                "ghg": 1013648,
                "company": "Marathon Petroleum, LLC",
                "project": "Unit 10 Crude Revamp, Coker Max, Sulfur Reliability, and FCC Rate Increase Projects",
                "state": "LA"
            },
            {
                "facility": "Flint Hills Resources Houston Chemical Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1023,
                "ghg": 1012080,
                "company": "Flint Hills Resources Houston Chemical, LLC",
                "project": "Propylene Capacity Expansion",
                "state": "TX"
            },
            {
                "facility": "Salt Lake City Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1049,
                "ghg": 988625,
                "company": "Chevron Products Company",
                "project": "Salt Lake City Refinery - SLR Retrofit Project and Reformer Compressor Limits",
                "state": "UT"
            },
            {
                "facility": "Shintech Plaquemine Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1065,
                "ghg": 932238,
                "company": "Shintech Louisiana, LLC",
                "project": "Shintech Plaquemine Plant - Ethylene Plant 1 (PEP-1)",
                "state": "LA"
            },
            {
                "facility": "BASF TOTAL FINA NAFTA Region Olefins Complex",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 754,
                "ghg": 915542,
                "company": "BASF TOTAL Petrochemicals LLC",
                "project": "Ethylene Cracker Furnace Expansion",
                "state": "TX"
            },
            {
                "facility": "Corpus Christi LNG Terminal",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 828,
                "ghg": 900845,
                "company": "Corpus Christi Liquefaction, LLC\/Corpus Christi Liquefaction Stage III, LLC",
                "project": "Stage III Expansion Project",
                "state": "TX"
            },
            {
                "facility": "Oxychem Ingleside Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1000,
                "ghg": 887882,
                "company": "Occidental Chemical Corporation",
                "project": "Oxychem Ingleside Plant",
                "state": "TX"
            },
            {
                "facility": "Natrium Extraction and Fractionation Processing Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 984,
                "ghg": 882381,
                "company": "Blue Racer Midstream, LLC",
                "project": "Natrium Extraction and Fractionation Processing Plant",
                "state": "WV"
            },
            {
                "facility": "Galveston Bay Refinery",
                "status": "Under construction",
                "sector": "Oil",
                "id": 873,
                "ghg": 851305,
                "company": "Blanchard Refining Co.",
                "project": "Galveston Bay Refinery",
                "state": "TX"
            },
            {
                "facility": "Channelview Chemical Complex",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 799,
                "ghg": 831675,
                "company": "Equistar Chemicals LP",
                "project": "Equistar Chemicals Channelview Complex - Methanol Reformer Restart",
                "state": "TX"
            },
            {
                "facility": "Channelview Chemical Complex",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 799,
                "ghg": 822945,
                "company": "Equistar Chemicals LP",
                "project": "PO\/TBA Units",
                "state": "TX"
            },
            {
                "facility": "Lyondell Chemical Channelview",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 3598,
                "ghg": 822945,
                "company": null,
                "project": "PO\/TBA Units",
                "state": "TX"
            },
            {
                "facility": "PDH Chocolate Bayou Plant",
                "status": "Canceled",
                "sector": "Petrochemicals and Plastics",
                "id": 804,
                "ghg": 795940,
                "company": "C3 Petrochemicals",
                "project": "New PDH Unit",
                "state": "TX"
            },
            {
                "facility": "Geismar Plant",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 878,
                "ghg": 782905,
                "company": "Shell Chemical LP",
                "project": "Ethylene Oxide\/Ethylene Glycol Unit (EOEG-5)",
                "state": "LA"
            },
            {
                "facility": "Rio Bravo Pipeline Compressor Station 1",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1038,
                "ghg": 761403,
                "company": "Rio Bravo Pipeline Company",
                "project": "Rio Bravo Pipeline Compressor Station 1",
                "state": "TX"
            },
            {
                "facility": "Corpus Christi Polymer Plant",
                "status": "Under construction",
                "sector": "Petrochemicals and Plastics",
                "id": 829,
                "ghg": 726360,
                "company": "Corpus Christi Polymers LLC",
                "project": "Project Jumbo – M&G Utilities Plant",
                "state": "TX"
            },
            {
                "facility": "Victoria Plant",
                "status": "Under construction",
                "sector": "Petrochemicals and Plastics",
                "id": 1111,
                "ghg": 723166,
                "company": "INVISTA S.a.r.l.",
                "project": "Victoria Plant - Adiponitrile Unit Upgrade",
                "state": "TX"
            },
            {
                "facility": "Hopedale Fractionation Facility",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 909,
                "ghg": 720483,
                "company": "MarkWest Ohio Fractionation Company, L.L.C",
                "project": "Hopedale Fractionation Facility - Plants 1-5",
                "state": "OH"
            },
            {
                "facility": "Borger Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 775,
                "ghg": 720045,
                "company": "Phillips 66 Company",
                "project": "Borger Refinery Boiler Project",
                "state": "TX"
            },
            {
                "facility": "Borger Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 775,
                "ghg": 720045,
                "company": "WRB Refining LP",
                "project": "Borger Refinery Boiler Project",
                "state": "TX"
            },
            {
                "facility": "Shintech Plaquemine Plant",
                "status": "Under construction",
                "sector": "Petrochemicals and Plastics",
                "id": 1065,
                "ghg": 717338,
                "company": "Shintech Louisiana, LLC",
                "project": "Shintech Plaquemine Plant - SPP-3 Expansion Project",
                "state": "LA"
            },
            {
                "facility": "Ticona Polymers Bishop Facility",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 769,
                "ghg": 705543,
                "company": "Ticona Polymers",
                "project": "Boiler Expansion",
                "state": "TX"
            },
            {
                "facility": "Garyville Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 874,
                "ghg": 701382,
                "company": "Marathon Petroleum, LLC",
                "project": "Cat Max, U55 GDU Natural Gasoline, Unit 210 Revamp, and Unit 5 Merox Reroute Projects",
                "state": "LA"
            },
            {
                "facility": "Mont Belvieu Fractionator",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 972,
                "ghg": 626882,
                "company": "Lone Star NGL Fractionators LLC, Lone Star NGL Mont Belvieu LP",
                "project": "Mont Belvieu Fractionator Project",
                "state": "TX"
            },
            {
                "facility": "La Porte Complex",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 932,
                "ghg": 606483,
                "company": "Equistar Chemicals LP",
                "project": "La Porte Complex",
                "state": "TX"
            },
            {
                "facility": "Texas LNG Terminal",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1096,
                "ghg": 604087,
                "company": "Texas LNG Brownsville, LLC",
                "project": "Texas LNG Project",
                "state": "TX"
            },
            {
                "facility": "Channelview Chemical Complex",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 799,
                "ghg": 602000,
                "company": "Equistar Chemicals LP",
                "project": "Equistar Chemicals Channelview Complex - Olefins Production Units 1 and 2",
                "state": "TX"
            },
            {
                "facility": "Enterprise Mont Belvieu Complex",
                "status": "Under construction",
                "sector": "Petrochemicals and Plastics",
                "id": 970,
                "ghg": 600086,
                "company": "Enterprise Products",
                "project": "Mont Belvieu Complex - PDH II",
                "state": "TX"
            },
            {
                "facility": "Gillis Compressor Station (CS-01)",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 880,
                "ghg": 590115,
                "company": "Driftwood Pipeline LLC",
                "project": "Gillis Compressor Station (CS-01)",
                "state": "LA"
            },
            {
                "facility": "Dow Texas Operations Freeport",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 844,
                "ghg": 580924,
                "company": "Dow Chemical Company",
                "project": "Freeport Light Hydrocarbons Plant No",
                "state": "TX"
            },
            {
                "facility": "Ticona Polymers Bishop Facility",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 769,
                "ghg": 580613,
                "company": "Ticona Polymers",
                "project": "Bishop Methanol Plant",
                "state": "TX"
            },
            {
                "facility": "Pine Bend Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1008,
                "ghg": 576011,
                "company": null,
                "project": "Pine Bend Refinery - Technology and Efficiency Improvement Projects",
                "state": "MN"
            },
            {
                "facility": "Ramsey Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1026,
                "ghg": 568067,
                "company": "Delaware Basin Midstream, LLC",
                "project": "Ramsey Gas Plant",
                "state": "TX"
            },
            {
                "facility": "Plaquemines Liquids Terminal",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 1011,
                "ghg": 566466,
                "company": "Plaquemines Liquid Terminal, LLC",
                "project": "Plaquemines Liquids Terminal",
                "state": "LA"
            },
            {
                "facility": "Ammonia Production Plant",
                "status": "Pre-construction",
                "sector": "Nitrogen",
                "id": 747,
                "ghg": 550839,
                "company": "TopChem Pollock, LLC",
                "project": "Ammonia Production Plant",
                "state": "LA"
            },
            {
                "facility": "South Eddy Cryo Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1076,
                "ghg": 537690,
                "company": "Enterprise Field Services",
                "project": "South Eddy Cryo Plant",
                "state": "NM"
            },
            {
                "facility": "Clear Lake Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 806,
                "ghg": 535218,
                "company": "Fairway Methanol LLC, Arkema Inc., Celanese Ltd.",
                "project": "Clear Lake Plant",
                "state": "TX"
            },
            {
                "facility": "Mont Belvieu Complex",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 971,
                "ghg": 515420.98,
                "company": "Targa Midstream Services LLC",
                "project": "Fractionation Trains 7, 8, and 9",
                "state": "TX"
            },
            {
                "facility": "Roadrunner Gas Processing Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1041,
                "ghg": 507880,
                "company": "Lucid Energy Delaware, LLC",
                "project": "Roadrunner Gas Processing Plant",
                "state": "NM"
            },
            {
                "facility": "Borger Refinery",
                "status": "Unknown",
                "sector": "Oil",
                "id": 775,
                "ghg": 470082.58,
                "company": "Phillips 66 Company",
                "project": "Borger Refinery, Crude Flexibility and Modernization Project",
                "state": "TX"
            },
            {
                "facility": "Borger Refinery",
                "status": "Unknown",
                "sector": "Oil",
                "id": 775,
                "ghg": 470082.58,
                "company": "WRB Refining LP",
                "project": "Borger Refinery, Crude Flexibility and Modernization Project",
                "state": "TX"
            },
            {
                "facility": "Sinton Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1070,
                "ghg": 450475,
                "company": "Cheniere Corpus Christi Pipeline",
                "project": "Sinton Compressor Station",
                "state": "TX"
            },
            {
                "facility": "Lemont Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 935,
                "ghg": 450000,
                "company": "CITGO Petroleum Corp",
                "project": "Lemont Refinery",
                "state": "IL"
            },
            {
                "facility": "Delfin LNG Onshore Facility",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 838,
                "ghg": 445766,
                "company": "Delfin LNG, LLC",
                "project": "Delfin LNG Project - Onshore Facility",
                "state": "LA"
            },
            {
                "facility": "Dickinson Refinery",
                "status": "Under construction",
                "sector": "Oil",
                "id": 842,
                "ghg": 441553,
                "company": "Dakota Prairie Refining, LLC",
                "project": "Renewable Diesel Project (RDP)",
                "state": "ND"
            },
            {
                "facility": "Corpus Christi Polymer Plant",
                "status": "Under construction",
                "sector": "Petrochemicals and Plastics",
                "id": 829,
                "ghg": 438273,
                "company": "Corpus Christi Polymers LLC",
                "project": "Project Jumbo – M&G PET Plant",
                "state": "TX"
            },
            {
                "facility": "Superior Refinery",
                "status": "Under construction",
                "sector": "Oil",
                "id": 1085,
                "ghg": 424573,
                "company": "Superior Refining Company, LLC",
                "project": "Rebuild Project and Asphalt Import Project",
                "state": "WI"
            },
            {
                "facility": "Superior Refinery",
                "status": "Under construction",
                "sector": "Oil",
                "id": 1085,
                "ghg": 421187,
                "company": "Superior Refining Company, LLC",
                "project": "Superior Flexibility Project",
                "state": "WI"
            },
            {
                "facility": "Beaumont Refinery",
                "status": "Under construction",
                "sector": "Oil",
                "id": 761,
                "ghg": 414961,
                "company": "ExxonMobil Oil Corporation",
                "project": "Beaumont Refinery Expansion",
                "state": "TX"
            },
            {
                "facility": "Rock Springs Fertilizer Complex",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 1044,
                "ghg": 403655,
                "company": "Simplot Phosphates, LLC",
                "project": "Rock Springs Fertilizer Complex",
                "state": "WY"
            },
            {
                "facility": "Bradshaw Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 777,
                "ghg": 401968,
                "company": "Mountain Valley Pipeline, LLC",
                "project": "Bradshaw Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Iowa Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 914,
                "ghg": 391235,
                "company": "Trunkline Gas Company",
                "project": "Iowa Compressor Station (previously Compressor Station 203-A)",
                "state": "LA"
            },
            {
                "facility": "Natrium Extraction and Fractionation Processing Plant",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 984,
                "ghg": 389221,
                "company": "Blue Racer Midstream, LLC",
                "project": "Natrium Extraction and Fractionation Processing Plant",
                "state": "WV"
            },
            {
                "facility": "Elba Island LNG Terminal",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 851,
                "ghg": 378453,
                "company": "Southern Liquefaction Company, LLC",
                "project": "Elba Liquefaction Terminal",
                "state": "GA"
            },
            {
                "facility": "Westlake Petrochemical Complex",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1116,
                "ghg": 377043,
                "company": "Westlake Chemical OpCo LP",
                "project": "Petro I and Petro II Expansion Project",
                "state": "LA"
            },
            {
                "facility": "Port Arthur Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1020,
                "ghg": 376793,
                "company": "Motiva Enterprises LLC",
                "project": "HCU2\/DHT Expansion Project",
                "state": "TX"
            },
            {
                "facility": "Geismar Methanol Plant",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 877,
                "ghg": 365306,
                "company": "Methanex USA",
                "project": "Geismar Methanol - Plant 3 and Plant 2 Debottleneck Project",
                "state": "LA"
            },
            {
                "facility": "Mosaic Faustina Plant",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 976,
                "ghg": 365227,
                "company": "Mosaic Fertilizer LLC",
                "project": "Mosaic Faustina Plant",
                "state": "LA"
            },
            {
                "facility": "FHR Corpus Christi West Plant",
                "status": "Operating",
                "sector": "Oil",
                "id": 866,
                "ghg": 359991,
                "company": null,
                "project": "West Plant",
                "state": "TX"
            },
            {
                "facility": "Sinclair Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1069,
                "ghg": 359975,
                "company": "Sinclair Wyoming Refining Company",
                "project": "2013 Crude Oil Optimization Project",
                "state": "WY"
            },
            {
                "facility": "Victoria Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1111,
                "ghg": 356451,
                "company": "INVISTA S.a.r.l.",
                "project": "Victoria Plant - Adipic Acid Unit Upgrade",
                "state": "TX"
            },
            {
                "facility": "Annova LNG Brownsville",
                "status": "Canceled",
                "sector": "Natural Gas",
                "id": 750,
                "ghg": 353072,
                "company": "Annova LNG",
                "project": "Annova LNG Brownsville",
                "state": "TX"
            },
            {
                "facility": "Pine Bend Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1008,
                "ghg": 345263,
                "company": null,
                "project": "Pine Bend Refinery - Cogeneration Facility",
                "state": "MN"
            },
            {
                "facility": "Zia II Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1132,
                "ghg": 340532,
                "company": "DCP Midstream, LP",
                "project": "Zia II Gas Plant",
                "state": "NM"
            },
            {
                "facility": "Red Hills Gas Processing Plant",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 1028,
                "ghg": 333599.1,
                "company": "Lucid Energy Delaware, LLC",
                "project": "Red Hills Gas Processing Plant",
                "state": "NM"
            },
            {
                "facility": "Wild Basin Gas Processing and Crude Handling Facility",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1123,
                "ghg": 329153,
                "company": "Oasis Midstream Services",
                "project": "Wild Basin Gas Processing and Crude Handling Facility",
                "state": "ND"
            },
            {
                "facility": "Haven Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 899,
                "ghg": 323966,
                "company": "Next Generation Processing, LLC",
                "project": "Haven Gas Plant",
                "state": "KS"
            },
            {
                "facility": "St. Charles Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1081,
                "ghg": 321304,
                "company": "Valero Refining - New Orleans, LLC",
                "project": "Dock Upgrade, New Alky Unit, Gasoline Blending, and Reformer Optimization Projects",
                "state": "LA"
            },
            {
                "facility": "Basile Compressor Station (CS-02)",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 755,
                "ghg": 320746,
                "company": "Driftwood Pipeline LLC",
                "project": "Basile Compressor Station (CS-02)",
                "state": "LA"
            },
            {
                "facility": "Beauregard Parish Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 763,
                "ghg": 318955,
                "company": "Port Arthur Pipeline LLC",
                "project": "Beauregard Parish Compressor Station (Milepost 72)",
                "state": "LA"
            },
            {
                "facility": "Stony Point Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1084,
                "ghg": 310385,
                "company": null,
                "project": "Stony Point Compressor Station",
                "state": "NY"
            },
            {
                "facility": "Lima Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 936,
                "ghg": 309283,
                "company": "Lima Refining Company",
                "project": "Lima Refinery",
                "state": "OH"
            },
            {
                "facility": "Trenton Central RVP Station",
                "status": "Operating",
                "sector": "Oil",
                "id": 1102,
                "ghg": 305578,
                "company": "Equinor Pipelines, LLC",
                "project": "Trenton Central RVP Station",
                "state": "ND"
            },
            {
                "facility": "Luling Plant",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 949,
                "ghg": 304953,
                "company": "Bayer CropScience LP",
                "project": "Dicamba Manufacturing Project (Pesticides)",
                "state": "LA"
            },
            {
                "facility": "Hartwell Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 898,
                "ghg": 293200,
                "company": "Elba Express Company, LLC",
                "project": "Hartwell Compressor Station",
                "state": "GA"
            },
            {
                "facility": "Seneca Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1059,
                "ghg": 286499,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Seneca Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Pine Bend Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1008,
                "ghg": 283758,
                "company": null,
                "project": "Pine Bend Refinery - Propylene Storage and Distribution Project",
                "state": "MN"
            },
            {
                "facility": "Woods Cross Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1127,
                "ghg": 279610,
                "company": "HollyFrontier Tulsa Refining LLC (formerly Holly Refining and Marketing Co.)",
                "project": "Heavy Crude Processing Project",
                "state": "UT"
            },
            {
                "facility": "Sandstrom Water Treatment Facility",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1052,
                "ghg": 276583,
                "company": "Sandstrom Water Treatment Facility LLC",
                "project": "Sandstrom Water Treatment Facility",
                "state": "WV"
            },
            {
                "facility": "Houston Plant",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 911,
                "ghg": 274494,
                "company": "TPC Group LLC",
                "project": "BD Expansion Project",
                "state": "TX"
            },
            {
                "facility": "Texas City Chemical Plant",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 1095,
                "ghg": 273232,
                "company": "INEOS Styrolution America LLC",
                "project": "Boiler Project",
                "state": "TX"
            },
            {
                "facility": "Eunice Fractionator",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 862,
                "ghg": 265099,
                "company": "Enlink Processing Services, LLC",
                "project": "Crosstex Fractionation Expansion Project",
                "state": "LA"
            },
            {
                "facility": "Lucerne Natural Gas Processing Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 948,
                "ghg": 264828,
                "company": null,
                "project": "Lucerne 2 Gas Plant",
                "state": "CO"
            },
            {
                "facility": "Lone Oak Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 942,
                "ghg": 263848,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Lone Oak Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Mount Olive Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 980,
                "ghg": 263840,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Mount Olive Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Linde Lima Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 938,
                "ghg": 262812,
                "company": "Matheson Tri-Gas, Inc.",
                "project": "Linde Lima 3",
                "state": "OH"
            },
            {
                "facility": "Steamboat Processing Facility",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1082,
                "ghg": 259292,
                "company": "Thunder Creek Gas Services, LLC",
                "project": "Steamboat Processing Facility",
                "state": "WY"
            },
            {
                "facility": "Longhorn Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 943,
                "ghg": 259101,
                "company": "XTO Energy, Inc.",
                "project": "Longhorn Compressor Station",
                "state": "NM"
            },
            {
                "facility": "Hillabee Compressor Station 105 (1)",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 811,
                "ghg": 258464,
                "company": "Transcontinental Gas Pipe Line Company, LLC",
                "project": "Hillabee Compressor Station 105",
                "state": "AL"
            },
            {
                "facility": "Sagwon Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1048,
                "ghg": 257703.5434,
                "company": "Alaska Gasline Development Corporation",
                "project": "Sagwon Compressor Station",
                "state": "AK"
            },
            {
                "facility": "3 Bear Libby Gas Plant",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 739,
                "ghg": 254861,
                "company": "3 Bear Delaware Operating – NM, LLC",
                "project": "3 Bear Libby Gas Plant (1)",
                "state": "NM"
            },
            {
                "facility": "Plaquemine NGL Fractionation Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1010,
                "ghg": 254415,
                "company": "Enlink Processing Services, LLC",
                "project": "Plaquemine NGL Fractionation Plant",
                "state": "LA"
            },
            {
                "facility": "Sherwood Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1064,
                "ghg": 246587,
                "company": null,
                "project": "Sherwood Gas Plant - Plants VII-XIII",
                "state": "WV"
            },
            {
                "facility": "Middlebourne V Compressor Station",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 963,
                "ghg": 245801,
                "company": "Antero Midstream LLC",
                "project": "Middlebourne V Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Billings Refinery",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 768,
                "ghg": 243782,
                "company": "Phillips 66 Company",
                "project": "Billings Refinery",
                "state": "MT"
            },
            {
                "facility": "Galena Park Terminal",
                "status": "Operating",
                "sector": "Oil",
                "id": 872,
                "ghg": 243545,
                "company": "Kinder Morgan Crude & Condensate LLC (formerly KM Liquids Terminals, LLC)",
                "project": "Galena Park Terminal, KMCC Crude Condensate Splitter Facility",
                "state": "TX"
            },
            {
                "facility": "Corpus Christi Terminal",
                "status": "Operating",
                "sector": "Oil",
                "id": 830,
                "ghg": 237204,
                "company": "Magellan Terminal Holdings, LP",
                "project": "Corpus Christi Terminal, Condensate Splitter Facility",
                "state": "TX"
            },
            {
                "facility": "Middlebourne IV Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 962,
                "ghg": 235941,
                "company": "Antero Midstream LLC",
                "project": "Middlebourne IV Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Mont Belvieu NGL Fractionation Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 973,
                "ghg": 232635,
                "company": "ONEOK Hydrocarbon LP",
                "project": "Mont Belvieu NGL Fractionation Plant",
                "state": "TX"
            },
            {
                "facility": "Klamath Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 925,
                "ghg": 231035,
                "company": "Williams Pacific Connector Gas Operator, LLC",
                "project": "Klamath Compressor Station",
                "state": "OR"
            },
            {
                "facility": "Alexandria Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 744,
                "ghg": 230032,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Alexandria Compressor Station",
                "state": "LA"
            },
            {
                "facility": "Longhorn Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 944,
                "ghg": 229173,
                "company": "Targa Gas Processing LLC",
                "project": "Longhorn Gas Plant",
                "state": "TX"
            },
            {
                "facility": "Blue Moon Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 772,
                "ghg": 227957,
                "company": "EQM Poseidon Midstream, LLC",
                "project": "Blue Moon Compressor Station",
                "state": "PA"
            },
            {
                "facility": "Elk River Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 855,
                "ghg": 227640,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Elk River Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Coldfoot Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 808,
                "ghg": 227495.8401,
                "company": "Alaska Gasline Development Corporation",
                "project": "Coldfoot Compressor Station (1)",
                "state": "AK"
            },
            {
                "facility": "Galbraith Lake Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 871,
                "ghg": 227495.8401,
                "company": "Alaska Gasline Development Corporation",
                "project": "Galbraith Lake Compressor Station",
                "state": "AK"
            },
            {
                "facility": "Healy Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 901,
                "ghg": 227495.8401,
                "company": "Alaska Gasline Development Corporation",
                "project": "Healy Compressor Station",
                "state": "AK"
            },
            {
                "facility": "Minto Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 966,
                "ghg": 227495.8401,
                "company": "Alaska Gasline Development Corporation",
                "project": "Minto Compressor Station",
                "state": "AK"
            },
            {
                "facility": "Ray River Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1027,
                "ghg": 227495.8401,
                "company": "Alaska Gasline Development Corporation",
                "project": "Ray River Compressor Station",
                "state": "AK"
            },
            {
                "facility": "Sherwood Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1063,
                "ghg": 224497,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Sherwood Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Marcus Hook Industrial Complex",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 956,
                "ghg": 223200,
                "company": "Sunoco Partners Marketing & Terminals, L.P.",
                "project": "Marcus Hook Industrial Complex",
                "state": "PA"
            },
            {
                "facility": "Oak Grove Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 996,
                "ghg": 222983,
                "company": "Williams Ohio Valley Midstream, LLC",
                "project": "Oak Grove Gas Plant",
                "state": "WV"
            },
            {
                "facility": "Condensate Splitter Facility",
                "status": "Operating",
                "sector": "Oil",
                "id": 825,
                "ghg": 217439,
                "company": "Buckeye Texas Processing LLC",
                "project": "Condensate Splitter Facility",
                "state": "TX"
            },
            {
                "facility": "Chicot Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 803,
                "ghg": 216957,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Chicot Compressor Station",
                "state": "LA"
            },
            {
                "facility": "Chocolate Bayou Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 805,
                "ghg": 216654,
                "company": "INEOS USA LLC",
                "project": "Chocolate Bayou Plant - Cracking Furnace Expansion",
                "state": "TX"
            },
            {
                "facility": "LA XPress Red Mountain Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 1030,
                "ghg": 214601,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "LA XPress Red Mountain Compressor Station (1)",
                "state": "LA"
            },
            {
                "facility": "LA XPress Red Mountain Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 1030,
                "ghg": 214601,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "LA XPress Red Mountain Compressor Station (1)",
                "state": "NM"
            },
            {
                "facility": "Shelburn Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 1062,
                "ghg": 214536,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Shelburn Compressor Station",
                "state": "LA"
            },
            {
                "facility": "Point Thomson Production Facility",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1016,
                "ghg": 212737,
                "company": "ExxonMobil Alaska Production Inc.",
                "project": "Point Thomson Production Facility",
                "state": "AK"
            },
            {
                "facility": "Rabideux Creek Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1025,
                "ghg": 211266.53,
                "company": "Alaska Gasline Development Corporation",
                "project": "Rabideux Creek Compressor Station",
                "state": "AK"
            },
            {
                "facility": "Nutrien Lima Nitrogen Plant",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 995,
                "ghg": 210587,
                "company": "PCS Nitrogen Ohio, L.P.",
                "project": "Nutrien Lima Nitrogen Plant",
                "state": "OH"
            },
            {
                "facility": "Grayson Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 887,
                "ghg": 210323,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Grayson Compressor Station",
                "state": "KY"
            },
            {
                "facility": "Wood River Refinery and Hartford Terminal",
                "status": "Operating",
                "sector": "Oil",
                "id": 1126,
                "ghg": 209350,
                "company": "Phillips 66 Carrier, LLC",
                "project": "Wood River CORE Expansion and Hartford Terminal Expansion Projects",
                "state": "IL"
            },
            {
                "facility": "Emerald Kalama Chemical Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 856,
                "ghg": 208475,
                "company": "Emerald Kalama Chemical, LLC",
                "project": "Plasticizer Plant Expansion",
                "state": "WA"
            },
            {
                "facility": "Compressor Station 607",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 819,
                "ghg": 208299.49,
                "company": "Transcontinental Gas Pipe Line Company, LLC",
                "project": "Compressor Station 607",
                "state": "PA"
            },
            {
                "facility": "Port Arthur North Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 992,
                "ghg": 208070,
                "company": "Oasis Midstream Services",
                "project": "Texas Connector Project- North Compressor Station",
                "state": "ND"
            },
            {
                "facility": "Port Arthur North Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 992,
                "ghg": 208070,
                "company": "Oasis Midstream Services",
                "project": "Texas Connector Project- North Compressor Station",
                "state": "TX"
            },
            {
                "facility": "Port Arthur North Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 992,
                "ghg": 208070,
                "company": "Port Arthur Pipeline LLC",
                "project": "Texas Connector Project- North Compressor Station",
                "state": "ND"
            },
            {
                "facility": "Port Arthur North Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 992,
                "ghg": 208070,
                "company": "Port Arthur Pipeline LLC",
                "project": "Texas Connector Project- North Compressor Station",
                "state": "TX"
            },
            {
                "facility": "SE Trail Compressor Station 165",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 812,
                "ghg": 207902,
                "company": "Transcontinental Gas Pipe Line Company, LLC",
                "project": "SE Trail Compressor Station 165 (1)",
                "state": "VA"
            },
            {
                "facility": "CCI Corpus Christi Condensate Splitter Facility",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 826,
                "ghg": 207771,
                "company": "Port of Corpus Christi Authority of Nueces County\/Junction Energy Capital",
                "project": "Condensate Splitter Facility",
                "state": "TX"
            },
            {
                "facility": "Armagh Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 751,
                "ghg": 207046,
                "company": "Texas Eastern Transmission, LP",
                "project": "Armagh Compressor Station",
                "state": "PA"
            },
            {
                "facility": "Gillis Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 881,
                "ghg": 206940,
                "company": "Cheniere Creole Trail Pipeline LP",
                "project": "Cheniere Gillis Compressor Station",
                "state": "LA"
            },
            {
                "facility": "Enterprise Mont Belvieu Complex",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 970,
                "ghg": 205256,
                "company": "Enterprise Products",
                "project": "Mont Belvieu Complex - Train 7 & 8",
                "state": "TX"
            },
            {
                "facility": "Hillabee Compressor Station 95",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 824,
                "ghg": 204590,
                "company": "Transcontinental Gas Pipe Line Company, LLC",
                "project": "Hillabee Compressor Station 95 (1)",
                "state": "AL"
            },
            {
                "facility": "Milford Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 964,
                "ghg": 204569,
                "company": "DTE Gas Company",
                "project": "Milford Compressor Station",
                "state": "MI"
            },
            {
                "facility": "Rose Valley and Hopeton Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1045,
                "ghg": 203217,
                "company": "Mid-America Midstream Gas Services",
                "project": "Rose Valley and Hopeton Plant",
                "state": "OK"
            },
            {
                "facility": "Seneca Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1060,
                "ghg": 202987,
                "company": "MarkWest Utica EMG, L.L.C.",
                "project": "Seneca Gas Plant",
                "state": "OH"
            },
            {
                "facility": "Bucking Horse Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 781,
                "ghg": 200362,
                "company": "Jackalope Gas Gathering Services, Inc.",
                "project": "Bucking Horse Gas Plant Expansion (BHGP-II)",
                "state": "WY"
            },
            {
                "facility": "Morehead Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 975,
                "ghg": 199212,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Morehead Compressor Station",
                "state": "KY"
            },
            {
                "facility": "Buffalo Creek Gas Processing Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 783,
                "ghg": 198607,
                "company": "Mid-America Midstream Gas Services",
                "project": "Buffalo Creek Gas Processing Plant",
                "state": "OK"
            },
            {
                "facility": "Mamou Compressor Station (CS-03)",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 953,
                "ghg": 198198,
                "company": "Driftwood Pipeline LLC",
                "project": "Mamou Compressor Station (CS-03)",
                "state": "LA"
            },
            {
                "facility": "Valero McKee Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1109,
                "ghg": 195625,
                "company": "Valero Energy (formerly Diamond Shamrock)",
                "project": "Valero McKee Refinery",
                "state": "TX"
            },
            {
                "facility": "Garyville Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 874,
                "ghg": 195017,
                "company": "Marathon Petroleum, LLC",
                "project": "Coker 3 Project and Refinery Optimization Project",
                "state": "LA"
            },
            {
                "facility": "Mockingbird Hill Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 968,
                "ghg": 194675,
                "company": "Dominion Transmission Inc.",
                "project": "Mockingbird Hill Compressor Station Expansion",
                "state": "WV"
            },
            {
                "facility": "White Oak Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1122,
                "ghg": 193194,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "White Oak Compressor Station",
                "state": "WV"
            },
            {
                "facility": "HollyFrontier Cheyenne Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 906,
                "ghg": 191122,
                "company": "Frontier Refining, LLC",
                "project": "HollyFrontier Cheyenne Refinery",
                "state": "WY"
            },
            {
                "facility": "El Dorado Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 853,
                "ghg": 190119,
                "company": "Frontier El Dorado Refining, LLC",
                "project": "Holly Frontier Naphtha Fractionation Project",
                "state": "KS"
            },
            {
                "facility": "Demicks Lake Gas Plant",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 840,
                "ghg": 189564,
                "company": null,
                "project": "Demicks Lake Gas Plant I and II",
                "state": "ND"
            },
            {
                "facility": "Harris Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 896,
                "ghg": 188194,
                "company": "Mountain Valley Pipeline, LLC",
                "project": "Harris Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Albany Compressor Station",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 743,
                "ghg": 187499,
                "company": "Sabal Trail Transmission, LLC",
                "project": "Albany Compressor Station",
                "state": "GA"
            },
            {
                "facility": "Hildreth Compressor Station",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 903,
                "ghg": 186190,
                "company": "Sabal Trail Transmission, LLC",
                "project": "Hildreth Compressor Station",
                "state": "FL"
            },
            {
                "facility": "Bluewater SPM Deepwater Port",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 773,
                "ghg": 185453,
                "company": "Bluewater Texas Terminals LLC",
                "project": "Bluewater SMP Project - Deepwater Port",
                "state": "TX"
            },
            {
                "facility": "NGPL Compressor Station 304",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 816,
                "ghg": 184284,
                "company": null,
                "project": "NGPL Compressor Station 304 (1)",
                "state": "TX"
            },
            {
                "facility": "Shamrock Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1061,
                "ghg": 183497,
                "company": "Laurel Mountain Midstream, LLC",
                "project": "Shamrock Compressor Station",
                "state": "PA"
            },
            {
                "facility": "Honolulu Creek Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 908,
                "ghg": 182997.79,
                "company": "Alaska Gasline Development Corporation",
                "project": "Honolulu Creek Compressor Station",
                "state": "AK"
            },
            {
                "facility": "Geismar Ethylene Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 876,
                "ghg": 182265,
                "company": "NOVA Chemicals Olefins LLC",
                "project": "Ethylene Capacity Expansion Project",
                "state": "LA"
            },
            {
                "facility": "Stallworth Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 1078,
                "ghg": 177198,
                "company": "Mountain Valley Pipeline, LLC",
                "project": "Stallworth Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Paint Lick Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1001,
                "ghg": 175671,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Paint Lick Compressor Station",
                "state": "KY"
            },
            {
                "facility": "Celestine Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 795,
                "ghg": 174352,
                "company": "ANR Pipeline Company",
                "project": "Celestine Station",
                "state": "IN"
            },
            {
                "facility": "Wetzel Rich 2 Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1120,
                "ghg": 174127,
                "company": "Antero Midstream LLC",
                "project": "Wetzel Rich 2 Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Sea Port Oil Terminal (SPOT) Deepwater Port",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 1057,
                "ghg": 173257,
                "company": "SPOT Terminal Services LLC (Enterprise Products Operating LLC)",
                "project": "Sea Port Oil Terminal (SPOT) Deepwater Port",
                "state": "TX"
            },
            {
                "facility": "Wetzel Rich 1 Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1119,
                "ghg": 173180,
                "company": "Antero Midstream LLC",
                "project": "Wetzel Rich 1 Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Lake Charles Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 930,
                "ghg": 171624,
                "company": "Phillips 66",
                "project": "2013 Boiler Replacement Project",
                "state": "LA"
            },
            {
                "facility": "Reunion Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1032,
                "ghg": 170019,
                "company": "Sabal Trail Transmission, LLC",
                "project": "Reunion Compressor Station",
                "state": "FL"
            },
            {
                "facility": "Holbrook Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 905,
                "ghg": 169593,
                "company": "Cameron Interstate Pipeline, LLC",
                "project": "Holbrook Compressor Station",
                "state": "LA"
            },
            {
                "facility": "South Canton Compressor Station",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 1075,
                "ghg": 169328,
                "company": "Antero Midstream LLC",
                "project": "South Canton Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Redhook Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1029,
                "ghg": 168000,
                "company": "Equitrans, LP",
                "project": "Redhook Compressor Station",
                "state": "PA"
            },
            {
                "facility": "East Mountain Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 850,
                "ghg": 166431,
                "company": "Antero Midstream LLC",
                "project": "East Mountain Station",
                "state": "WV"
            },
            {
                "facility": "Buckeye Texas Hub",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 780,
                "ghg": 165595,
                "company": "Buckeye Texas Hub, LLC",
                "project": "Hub Expansion",
                "state": "TX"
            },
            {
                "facility": "Compressor Station 79",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 822,
                "ghg": 164706,
                "company": "Tennessee Gas Pipeline Company, LLC",
                "project": "Compressor Station 79",
                "state": "TN"
            },
            {
                "facility": "Big Lizard Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 767,
                "ghg": 162083,
                "company": "Lucid Energy Delaware, LLC",
                "project": "Big Lizard Compressor Station",
                "state": "NM"
            },
            {
                "facility": "Mont Belvieu Complex",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 971,
                "ghg": 160241,
                "company": "Targa Midstream Services LLC",
                "project": "Fractionation Train 5",
                "state": "TX"
            },
            {
                "facility": "Middlebourne III Compressor",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 961,
                "ghg": 158287,
                "company": "Antero Midstream LLC",
                "project": "Middlebourne III Compressor",
                "state": "WV"
            },
            {
                "facility": "Tatums Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1092,
                "ghg": 157921,
                "company": "Midship Pipeline Company, L.L.C.",
                "project": "Tatums Compressor Station",
                "state": "OK"
            },
            {
                "facility": "Mermentau Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 959,
                "ghg": 155807,
                "company": "ANR Pipeline Company",
                "project": "Mermentau Compressor Station",
                "state": "LA"
            },
            {
                "facility": "Chevron Phillips Chemical Sweeny Old Ocean Facilities",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1086,
                "ghg": 154911,
                "company": "Chevron Phillips Chemical Company, LP",
                "project": "New Polyethylene Plant and Nitrogen Recovery Unit",
                "state": "TX"
            },
            {
                "facility": "Buckeye South Texas Gateway Terminal",
                "status": "Operating",
                "sector": "Oil",
                "id": 779,
                "ghg": 154855,
                "company": "South Texas Gateway Operating LLC",
                "project": "Buckeye South Texas Gateway Terminal",
                "state": "TX"
            },
            {
                "facility": "Saturn Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1054,
                "ghg": 154601,
                "company": "EQT Gathering Opco, LLC",
                "project": "Saturn Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Beaumont Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 760,
                "ghg": 153939,
                "company": "Arkema Inc.",
                "project": "Beaumont Plant",
                "state": "TX"
            },
            {
                "facility": "Pine Bend Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1008,
                "ghg": 152817,
                "company": null,
                "project": "Pine Bend Refinery - 21 Unit Heater Replacement Project",
                "state": "MN"
            },
            {
                "facility": "Connector Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 827,
                "ghg": 152721,
                "company": "Goff Connector, LLC",
                "project": "Connector Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Toledo Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1101,
                "ghg": 152287,
                "company": "BP Husky Refining, LLC",
                "project": "Toledo Refinery",
                "state": "OH"
            },
            {
                "facility": "Underwood Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1107,
                "ghg": 152108,
                "company": "Antero Midstream LLC",
                "project": "Underwood Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Bennington Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 764,
                "ghg": 151016,
                "company": "Midship Pipeline Company, L.L.C.",
                "project": "Bennington Compressor Station",
                "state": "OK"
            },
            {
                "facility": "Payne Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1004,
                "ghg": 150500,
                "company": "XCL Midstream Operating, LLC",
                "project": "Payne Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Goodluck Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 884,
                "ghg": 148774,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Goodluck Compressor Station",
                "state": "KY"
            },
            {
                "facility": "Janus Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 917,
                "ghg": 147621,
                "company": "EQT Gathering",
                "project": "Janus Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Mepco Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 958,
                "ghg": 145987,
                "company": "DTE Appalachia Gathering, LLC",
                "project": "Mepco Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Catlettsburg Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 793,
                "ghg": 145913,
                "company": "MPLX Terminals, LLC",
                "project": "Catlettsburg Refinery",
                "state": "KY"
            },
            {
                "facility": "Synthetic Fertilizer",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 1087,
                "ghg": 140420,
                "company": "Pryor Chemical",
                "project": "Synthetic Fertilizer Plant",
                "state": "OK"
            },
            {
                "facility": "Rio Bravo Pipeline Booster Station 2",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1037,
                "ghg": 140194,
                "company": "Rio Bravo Pipeline Company",
                "project": "Rio Bravo Pipeline Booster Station 2",
                "state": "TX"
            },
            {
                "facility": "Cleveland Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 807,
                "ghg": 140169,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Cleveland Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Mt. Airy Terminal ",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 981,
                "ghg": 139852,
                "company": "Mt. Airy Terminal LLC",
                "project": "Terminal Storage Capacity Expansion Project",
                "state": "LA"
            },
            {
                "facility": "REX Cheyenne Hub Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1034,
                "ghg": 138804,
                "company": "Rockies Express Pipeline LLC",
                "project": "REX Cheyenne Hub Compressor Station",
                "state": "CO"
            },
            {
                "facility": "Mont Belvieu Plastics Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 974,
                "ghg": 138216,
                "company": "Exxon Chemical Co., Chevron Philips Chemical Company LP",
                "project": "Mont Belvieu Plastics Plant - Polyethylene Unit Expansion",
                "state": "TX"
            },
            {
                "facility": "Theodore River Heater Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1097,
                "ghg": 138010.31,
                "company": "Alaska Gasline Development Corporation",
                "project": "Theodore River Heater Station",
                "state": "AK"
            },
            {
                "facility": "Gulf Access Bulk Liquids Storage Terminal",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 889,
                "ghg": 137976,
                "company": "Gulf Access Terminal LLC",
                "project": "Gulf Access Bulk Liquids Storage Terminal",
                "state": "TX"
            },
            {
                "facility": "Cadiz Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 785,
                "ghg": 137929,
                "company": "MarkWest Utica EMG, L.L.C.",
                "project": "Cadiz Gas Plant",
                "state": "OH"
            },
            {
                "facility": "Sanderson Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1050,
                "ghg": 137328,
                "company": "Outrigger Energy",
                "project": "Sanderson Gas Plant",
                "state": "ND"
            },
            {
                "facility": "Sand Hill Compression Facility",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1051,
                "ghg": 135501,
                "company": "Appalachia Midstream Services LLC",
                "project": "Sand Hill Compression Facility",
                "state": "WV"
            },
            {
                "facility": "Lost River Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 946,
                "ghg": 133989,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Lost River Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Hillabee Compressor Station 84",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 823,
                "ghg": 133570,
                "company": "Transcontinental Gas Pipe Line Company, LLC",
                "project": "Hillabee Compressor Station 84 (1)",
                "state": "AL"
            },
            {
                "facility": "Channing Compressor",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 800,
                "ghg": 133283,
                "company": null,
                "project": "Channing Compressor",
                "state": "WV"
            },
            {
                "facility": "Compressor Station 610",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 820,
                "ghg": 133155,
                "company": "Transcontinental Gas Pipe Line Company, LLC",
                "project": "Compressor Station 610",
                "state": "PA"
            },
            {
                "facility": "Marcellus Methanol Plant",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 955,
                "ghg": 130854,
                "company": "Primus Green Energy, Inc",
                "project": "Marcellus Methanol Plant",
                "state": "WV"
            },
            {
                "facility": "Compressor Station 620",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 821,
                "ghg": 128660.79,
                "company": "Transcontinental Gas Pipe Line Company, LLC",
                "project": "Compressor Station 620",
                "state": "PA"
            },
            {
                "facility": "Monroe Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 969,
                "ghg": 127248,
                "company": "Antero Midstream LLC",
                "project": "Monroe Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Lambert Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 931,
                "ghg": 126442,
                "company": null,
                "project": "Lambert Compressor Station",
                "state": "VA"
            },
            {
                "facility": "Mountain Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 979,
                "ghg": 126007,
                "company": "Antero Midstream LLC",
                "project": "Mountain Station",
                "state": "WV"
            },
            {
                "facility": "Threedubs Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1098,
                "ghg": 125125,
                "company": "Appalachia Midstream Services LLC",
                "project": "Threedubs Compressor Station",
                "state": "WV"
            },
            {
                "facility": "East Calcasieu Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 848,
                "ghg": 124091,
                "company": null,
                "project": "East Calcasieu Compressor Station",
                "state": "LA"
            },
            {
                "facility": "Tamela Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1090,
                "ghg": 123309,
                "company": "Antero Midstream LLC",
                "project": "Tamela Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Dickinson Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 842,
                "ghg": 123283,
                "company": "Dakota Prairie Refining, LLC",
                "project": "Dickinson Refinery",
                "state": "ND"
            },
            {
                "facility": "Nichols Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 989,
                "ghg": 123053,
                "company": "Antero Midstream LLC",
                "project": "Nichols Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Beaumont Terminal",
                "status": "Operating",
                "sector": "Oil",
                "id": 762,
                "ghg": 122151,
                "company": "Phillips 66 Pipeline, LLC",
                "project": "Beaumont Terminal, Terminal Growth Project",
                "state": "TX"
            },
            {
                "facility": "Shintech Plaquemine Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1065,
                "ghg": 118383,
                "company": "Shintech Louisiana, LLC",
                "project": "Shintech Plaquemine Plant - Plants 1, 2, and Hydrochloric Acid Production Furnace 3",
                "state": "LA"
            },
            {
                "facility": "Ridgeline Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1035,
                "ghg": 118126,
                "company": "Appalachia Midstream Services LLC",
                "project": "Ridgeline Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Mountaineer Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 978,
                "ghg": 118014,
                "company": "Appalachia Midstream Services LLC",
                "project": "Mountaineer Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Shirley Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1066,
                "ghg": 117774,
                "company": "CNX Midstream Operating Company, LLC",
                "project": "Shirley Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Wynnewood Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1129,
                "ghg": 116905,
                "company": "Wynnewood Refining Company, LLC",
                "project": "Wynnewood Refinery",
                "state": "OK"
            },
            {
                "facility": "3 Brothers Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 740,
                "ghg": 116031,
                "company": "MarkWest Liberty Midstream & Resources, LLC",
                "project": "3 Brothers Compressor Station",
                "state": "PA"
            },
            {
                "facility": "Geismar Syngas Separation Unit",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 879,
                "ghg": 114344,
                "company": "Praxair, Inc.",
                "project": "Geismar Syngas Separation Unit",
                "state": "LA"
            },
            {
                "facility": "Hawkeye Gas Facility",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 900,
                "ghg": 114316,
                "company": "Hess North Dakota Pipelines, LLC",
                "project": "Hawkeye Gas Facility",
                "state": "ND"
            },
            {
                "facility": "Pioneer Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1009,
                "ghg": 113748,
                "company": "Appalachia Midstream Services LLC",
                "project": "Pioneer Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Buffalo Compression Facility",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 782,
                "ghg": 113589,
                "company": "Appalachia Midstream Services LLC",
                "project": "Buffalo Compression Facility",
                "state": "WV"
            },
            {
                "facility": "Daybrook Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 835,
                "ghg": 113510,
                "company": "DTE Appalachia Gathering, LLC",
                "project": "Daybrook Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Blake Ridge Compression Facility",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 770,
                "ghg": 112944,
                "company": "Appalachia Midstream Services LLC",
                "project": "Blake Ridge Compression Facility",
                "state": "WV"
            },
            {
                "facility": "Lafferty Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 926,
                "ghg": 111004,
                "company": "Antero Midstream LLC",
                "project": "Lafferty Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Entriken Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 859,
                "ghg": 110640,
                "company": "Texas Eastern Transmission, LP",
                "project": "Entriken Compressor Station",
                "state": "PA"
            },
            {
                "facility": "Canton North Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 790,
                "ghg": 108975,
                "company": "Antero Midstream LLC",
                "project": "Canton North Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Calumet Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 787,
                "ghg": 108560,
                "company": "Midship Pipeline Company, L.L.C.",
                "project": "Calumet Compressor Station",
                "state": "OK"
            },
            {
                "facility": "SE Trail Compressor Station 175",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 813,
                "ghg": 108558,
                "company": "Transcontinental Gas Pipe Line Company, LLC",
                "project": "SE Trail Compressor Station 175 (1)",
                "state": "VA"
            },
            {
                "facility": "Kenai Refinery",
                "status": "On hold",
                "sector": "Oil",
                "id": 924,
                "ghg": 106988,
                "company": "Tesoro Alaska Company LLC",
                "project": "New Combined Heat and Power (CHP) Cogeneration System",
                "state": "AK"
            },
            {
                "facility": "Herminie Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 902,
                "ghg": 106592,
                "company": "Laurel Mountain Midstream, LLC",
                "project": "Herminie Compressor Station",
                "state": "PA"
            },
            {
                "facility": "Willow Lake Gas Processing Plant",
                "status": "Partially operating",
                "sector": "Natural Gas",
                "id": 1125,
                "ghg": 106376.28,
                "company": "Crestwood New Mexico Pipeline, LLC",
                "project": "Willow Lake Gas Processing Plant",
                "state": "NM"
            },
            {
                "facility": "Files Creek Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 867,
                "ghg": 105821,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Files Creek Compressor Station",
                "state": "WV"
            },
            {
                "facility": "West Mountain Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1117,
                "ghg": 105097,
                "company": "Antero Midstream LLC",
                "project": "West Mountain Station",
                "state": "WV"
            },
            {
                "facility": "Smithburg Gas Plant",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1071,
                "ghg": 104158,
                "company": "Sherwood Midstream, LLC",
                "project": "Smithburg Gas Plant",
                "state": "WV"
            },
            {
                "facility": "Seahawk Crude Condensate Terminal",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 1056,
                "ghg": 103085,
                "company": "Max Midstream Texas, LLC",
                "project": "Seahawk Crude Condensate Terminal",
                "state": "TX"
            },
            {
                "facility": "Anhydrous Ammonia Production Facility",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 749,
                "ghg": 100554,
                "company": "Fortigen Geneva, LLC",
                "project": "Anhydrous Ammonia Production Facility",
                "state": "NE"
            },
            {
                "facility": "50 Buttes Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 741,
                "ghg": 99954,
                "company": "Thunder Creek Gas Services, LLC",
                "project": "50 Buttes Gas Plant",
                "state": "WY"
            },
            {
                "facility": "Dunnellon Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 846,
                "ghg": 99872,
                "company": "Sabal Trail Transmission, LLC",
                "project": "Dunnellon Compressor Station",
                "state": "FL"
            },
            {
                "facility": "Wacker Polysilicon Manufacturing Facility",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1112,
                "ghg": 99000,
                "company": "Wacker Polysilicon North America, LLC",
                "project": "Wacker Polysilicon Manufacturing Facility",
                "state": "TN"
            },
            {
                "facility": "Nederland Terminal",
                "status": "Operating",
                "sector": "Oil",
                "id": 988,
                "ghg": 98630.46,
                "company": "Sunoco Partners Marketing & Terminals, L.P.",
                "project": "Nederland Terminal",
                "state": "TX"
            },
            {
                "facility": "Tuscarawas Gas Processing Plant",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1106,
                "ghg": 97917,
                "company": "El Paso Midstream Group Inc.",
                "project": "Tuscarawas Gas Processing Plant",
                "state": "OH"
            },
            {
                "facility": "Pendleton Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1005,
                "ghg": 97668,
                "company": "Empire Pipeline, Inc.",
                "project": "Pendleton Compressor Station",
                "state": "NY"
            },
            {
                "facility": "Sabine Compressor Station 348",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 817,
                "ghg": 97617,
                "company": "Natural Gas Pipeline Company of America, LLC",
                "project": "Sabine Compressor Station 348 (1)",
                "state": "LA"
            },
            {
                "facility": "Tamarack Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 1089,
                "ghg": 96587,
                "company": "National Fuel Gas Supply Corporation",
                "project": "Tamarack Compressor Station",
                "state": "PA"
            },
            {
                "facility": "Flickertail Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 868,
                "ghg": 96586,
                "company": "Nesson Gathering System, LLC",
                "project": "Flickertail Compressor Station",
                "state": "ND"
            },
            {
                "facility": "RoughRider Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1046,
                "ghg": 96586,
                "company": "Nesson Gathering System, LLC",
                "project": "RoughRider Compressor Station",
                "state": "ND"
            },
            {
                "facility": "Sasol Lake Charles Chemical Complex",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1053,
                "ghg": 96038,
                "company": "Sasol North America, Inc.",
                "project": "Lake Charles Chemical Complex - Comonomer Unit 1",
                "state": "LA"
            },
            {
                "facility": "Little Missouri Gas Plant and Smokey Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 941,
                "ghg": 92836,
                "company": "Targa Badlands, LLC",
                "project": "Little Missouri Gas Plant - Phase 5 Project",
                "state": "ND"
            },
            {
                "facility": "Smith Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1072,
                "ghg": 92270,
                "company": "MarkWest Liberty Midstream & Resources, LLC",
                "project": "Smith Compressor Station",
                "state": "PA"
            },
            {
                "facility": "Calvert City Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 788,
                "ghg": 92059,
                "company": "Westlake Chemical Corporation",
                "project": "Ethylene Plant",
                "state": "KY"
            },
            {
                "facility": "Jackson Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 916,
                "ghg": 91488,
                "company": "Empire Pipeline, Inc.",
                "project": "Jackson Compressor Station",
                "state": "PA"
            },
            {
                "facility": "Centerville Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 796,
                "ghg": 91470,
                "company": "ANR Pipeline Company",
                "project": "Centerville Compressor Station",
                "state": "LA"
            },
            {
                "facility": "Golden Meadow Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 882,
                "ghg": 91132,
                "company": "ANR Pipeline Company",
                "project": "Golden Meadow Compressor Station",
                "state": "LA"
            },
            {
                "facility": "Enid Nitrogen Plant",
                "status": "Pre-construction",
                "sector": "Nitrogen",
                "id": 858,
                "ghg": 91011,
                "company": "Koch Nitrogen",
                "project": "Enid Nitrogen Plant - UR2 Improvements Project",
                "state": "OK"
            },
            {
                "facility": "Hamilton Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 894,
                "ghg": 89452,
                "company": "M3 Appalachia Gathering, LLC",
                "project": "Hamilton Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Hydrogen Peroxide Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 912,
                "ghg": 89000,
                "company": "Solvay Chemicals, Inc.",
                "project": "Hydrogen Peroxide Plant Expansion",
                "state": "WA"
            },
            {
                "facility": "Larew Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 933,
                "ghg": 86658,
                "company": "Ohio Gathering Company, LLC",
                "project": "Larew Compressor Station",
                "state": "OH"
            },
            {
                "facility": "Jefferson County Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 918,
                "ghg": 85596,
                "company": "Elba Express Company, LLC",
                "project": "Jefferson County Compressor Station",
                "state": "GA"
            },
            {
                "facility": "Station 119A",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1079,
                "ghg": 84878,
                "company": "Tennessee Gas Pipeline Company, LLC",
                "project": "Station 119A",
                "state": "WV"
            },
            {
                "facility": "Carpenter Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 791,
                "ghg": 83455,
                "company": null,
                "project": "Carpenter Compressor Station",
                "state": "PA"
            },
            {
                "facility": "Tichenal Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1099,
                "ghg": 82652,
                "company": "E. Marcellus Asset Company, LLC",
                "project": "Tichenal Station",
                "state": "WV"
            },
            {
                "facility": "Revolution Cryogenic Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1033,
                "ghg": 82112,
                "company": "ETC Northeast Pipeline LLC",
                "project": "Revolution Cryogenic Plant",
                "state": "PA"
            },
            {
                "facility": "Sinclair Refinery",
                "status": "Under construction",
                "sector": "Oil",
                "id": 1069,
                "ghg": 80175,
                "company": "Sinclair Wyoming Refining Company",
                "project": "2020 Boilerhouse Turnaround Project",
                "state": "WY"
            },
            {
                "facility": "Harmon Creek Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 895,
                "ghg": 79795,
                "company": null,
                "project": "Harmon Creek Gas Plant",
                "state": "PA"
            },
            {
                "facility": "Waynoka Natural Gas Processing Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1114,
                "ghg": 78885,
                "company": "Atlas Pipeline Mid-Continent WestOK, LLC",
                "project": "Waynoka Natural Gas Processing Plant",
                "state": "OK"
            },
            {
                "facility": "Harrison Hub Fractionation Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 897,
                "ghg": 78438,
                "company": "Utica East Ohio Midstream, LLC",
                "project": "Harrison Hub Fractionation Plant",
                "state": "OH"
            },
            {
                "facility": "Port Arthur North Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 992,
                "ghg": 78138,
                "company": "Oasis Midstream Services",
                "project": "North Compressor Station",
                "state": "ND"
            },
            {
                "facility": "Port Arthur North Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 992,
                "ghg": 78138,
                "company": "Oasis Midstream Services",
                "project": "North Compressor Station",
                "state": "TX"
            },
            {
                "facility": "Port Arthur North Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 992,
                "ghg": 78138,
                "company": "Port Arthur Pipeline LLC",
                "project": "North Compressor Station",
                "state": "ND"
            },
            {
                "facility": "Port Arthur North Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 992,
                "ghg": 78138,
                "company": "Port Arthur Pipeline LLC",
                "project": "North Compressor Station",
                "state": "TX"
            },
            {
                "facility": "Gulfstream Compressor Station 410 (1)",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 810,
                "ghg": 78039,
                "company": "Gulfstream Natural Gas System, LLC",
                "project": "Gulfstream Compressor Station 410",
                "state": "AL"
            },
            {
                "facility": "Jewell Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 919,
                "ghg": 77533,
                "company": "Rowdy Pipeline, LLC",
                "project": "Jewell Gas Plant",
                "state": "WY"
            },
            {
                "facility": "Majorsville Gas Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 952,
                "ghg": 77102,
                "company": null,
                "project": "Majorsville Gas Plant VII",
                "state": "WV"
            },
            {
                "facility": "Eagle Jacksonville LNG Facility",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 847,
                "ghg": 74511,
                "company": "Eagle LNG Partners Jacksonville, LLC",
                "project": "Eagle Jacksonville LNG Facility",
                "state": "FL"
            },
            {
                "facility": "BP Cherry Point Refinery",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 776,
                "ghg": 73924,
                "company": "BP West Coast Products LLC",
                "project": "North Vacuum Heater Project",
                "state": "WA"
            },
            {
                "facility": "Turkey Creek Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1105,
                "ghg": 72444,
                "company": "ANR Pipeline Company",
                "project": "Turkey Creek Compressor Station",
                "state": "LA"
            },
            {
                "facility": "Zia Hills Central Facility",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 1131,
                "ghg": 71417,
                "company": "ConocoPhillips Company",
                "project": "Zia Hills Central Facility",
                "state": "NM"
            },
            {
                "facility": "Rincon Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1036,
                "ghg": 70949,
                "company": "Elba Express Company, LLC",
                "project": "Rincon Compressor Station",
                "state": "GA"
            },
            {
                "facility": "NGPL Compressor Station 301",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 815,
                "ghg": 70699,
                "company": null,
                "project": "NGPL Compressor Station 301 (1)",
                "state": "TX"
            },
            {
                "facility": "Dow Texas Operations Freeport",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 844,
                "ghg": 70349,
                "company": "Dow Chemical Company",
                "project": "Polyethylene 7 Facility",
                "state": "TX"
            },
            {
                "facility": "Marvindale Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 957,
                "ghg": 70253,
                "company": "National Fuel Gas Supply Corporation",
                "project": "Marvindale Compressor Station",
                "state": "PA"
            },
            {
                "facility": "Formosa Point Comfort Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1015,
                "ghg": 67135,
                "company": "Formosa Plastics Corporation",
                "project": "Low Density Polyethylene Plant",
                "state": "TX"
            },
            {
                "facility": "Goodrich Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 885,
                "ghg": 65899,
                "company": "Gulf South Pipeline Company, LP",
                "project": "Goodrich Compressor Station",
                "state": "TX"
            },
            {
                "facility": "Sinclair Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1069,
                "ghg": 64765,
                "company": "Sinclair Wyoming Refining Company",
                "project": "Delayed Coking Unit Upgrade Project",
                "state": "WY"
            },
            {
                "facility": "Sierrita Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1068,
                "ghg": 63153,
                "company": "Sierrita Gas Pipeline LLC",
                "project": "Sierrita Compressor Station",
                "state": "AZ"
            },
            {
                "facility": "North Randlett Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 994,
                "ghg": 61678,
                "company": "Crescent Point Energy U.S. Corp",
                "project": "North Randlett Compressor Station",
                "state": "UT"
            },
            {
                "facility": "Weymouth Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1121,
                "ghg": 61340,
                "company": "Algonquin Gas Transmission, LLC",
                "project": "Weymouth Compressor Station",
                "state": "MA"
            },
            {
                "facility": "Casper Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 792,
                "ghg": 59685.9,
                "company": "Sinclair Casper Refining Company",
                "project": "Crude Rate Expansion Project",
                "state": "WY"
            },
            {
                "facility": "Riverside Compressor Station",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 1040,
                "ghg": 57041.7,
                "company": null,
                "project": "Riverside Compressor Station",
                "state": "ND"
            },
            {
                "facility": "Tuco Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1104,
                "ghg": 56776,
                "company": "Rowdy Pipeline, LLC",
                "project": "Tuco Compressor Station",
                "state": "WY"
            },
            {
                "facility": "Baton Rouge Refinery",
                "status": "Unknown",
                "sector": "Oil",
                "id": 756,
                "ghg": 56478,
                "company": "ExxonMobil",
                "project": "Sulfur Project",
                "state": "LA"
            },
            {
                "facility": "Willcox and Dragoon Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1124,
                "ghg": 55062,
                "company": null,
                "project": "Willcox and Dragoon Compressor Station",
                "state": "AZ"
            },
            {
                "facility": "Tioga Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1100,
                "ghg": 52842,
                "company": "WBI Energy Transmission, Inc.",
                "project": "Tioga Compressor Station",
                "state": "ND"
            },
            {
                "facility": "South Mainline Red Mountain Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1031,
                "ghg": 51651,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "South Mainline Red Mountain Compressor Station (1)",
                "state": "LA"
            },
            {
                "facility": "South Mainline Red Mountain Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1031,
                "ghg": 51651,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "South Mainline Red Mountain Compressor Station (1)",
                "state": "NM"
            },
            {
                "facility": "Magna LNG Facility",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 950,
                "ghg": 48389,
                "company": "Dominion Energy Utah",
                "project": "Magna LNG Facility",
                "state": "UT"
            },
            {
                "facility": "Sinclair Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1069,
                "ghg": 47667,
                "company": "Sinclair Wyoming Refining Company",
                "project": "FCCU Feed Heater Replacement Project",
                "state": "WY"
            },
            {
                "facility": "Marcus Hook Industrial Complex",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 956,
                "ghg": 47062,
                "company": "Sunoco Partners Marketing & Terminals, L.P.",
                "project": "Marcus Hook Industrial Complex - Project Phoenix",
                "state": "PA"
            },
            {
                "facility": "Limetree Bay Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 937,
                "ghg": 46728,
                "company": "Limetree Bay Terminals, LLC and Limetree Bay Refining, LLC",
                "project": "Limetree Bay Refinery - Bitumen Storage, Heated Tank Storage and Marine Loading Projects",
                "state": "VI"
            },
            {
                "facility": "Hinckley Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 904,
                "ghg": 42541,
                "company": "Northern Natural Gas Company",
                "project": "Hinckley Compressor Station",
                "state": "MN"
            },
            {
                "facility": "Oxford Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 999,
                "ghg": 41642,
                "company": "Algonquin Gas Transmission, LLC",
                "project": "Oxford Compressor Station",
                "state": "CT"
            },
            {
                "facility": "Longville Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 945,
                "ghg": 40901,
                "company": "Trunkline Gas Company",
                "project": "Longville Compressor Station",
                "state": "LA"
            },
            {
                "facility": "Chaplin Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 801,
                "ghg": 38661,
                "company": "Algonquin Gas Transmission, LLC",
                "project": "Chaplin Compressor Station",
                "state": "CT"
            },
            {
                "facility": "Vail Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1108,
                "ghg": 35930,
                "company": null,
                "project": "Vail Compressor Station, Piping Modification Project",
                "state": "AZ"
            },
            {
                "facility": "Elkhorn Creek Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 854,
                "ghg": 34654,
                "company": "WBI Energy Transmission, Inc.",
                "project": "Elkhorn Creek Compressor Station",
                "state": "ND"
            },
            {
                "facility": "Altamont Main Gas Processing Plant",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 745,
                "ghg": 34471,
                "company": "Kinder Morgan Altamont LLC",
                "project": "Altamont Main Gas Processing Plant - Flare Replacement Project",
                "state": "UT"
            },
            {
                "facility": "Aurora Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 752,
                "ghg": 33821,
                "company": "Tallgrass Midstream, LLC",
                "project": "Well Draw – Aurora Compressor Station",
                "state": "WY"
            },
            {
                "facility": "Tacoma LNG Facility",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 1088,
                "ghg": 32040.84477,
                "company": "Puget Sound Energy",
                "project": "Tacoma LNG Facility",
                "state": "WA"
            },
            {
                "facility": "West Porcupine Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1118,
                "ghg": 30195,
                "company": "Tallgrass Midstream, LLC",
                "project": "West Porcupine Compressor Station",
                "state": "WY"
            },
            {
                "facility": "OQ Chemicals Bay City Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 3252,
                "ghg": 28406,
                "company": "OQ Chemicals",
                "project": "Propanol II Unit",
                "state": "TX"
            },
            {
                "facility": "Altamont Main Gas Processing Plant",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 745,
                "ghg": 28095,
                "company": "Kinder Morgan Altamont LLC",
                "project": "Altamont Main Gas Processing Plant - 2013 Expansion Project",
                "state": "UT"
            },
            {
                "facility": "Taminco Pace Plant",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1091,
                "ghg": 25906,
                "company": "Taminco US LLC",
                "project": "No",
                "state": "FL"
            },
            {
                "facility": "Channelview Chemical Complex",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 799,
                "ghg": 19190.21,
                "company": "Equistar Chemicals LP",
                "project": "Equistar Chemicals Channelview Complex - Polypropylene (PP) Unit",
                "state": "TX"
            },
            {
                "facility": "Enid Nitrogen Plant",
                "status": "Operating",
                "sector": "Nitrogen",
                "id": 858,
                "ghg": 18909,
                "company": "Koch Nitrogen",
                "project": "Enid Nitrogen Plant - Engines Project",
                "state": "OK"
            },
            {
                "facility": "Blue Marlin Offshore Port",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 771,
                "ghg": 16503,
                "company": "Blue Marlin Offshore Port LLC",
                "project": "Blue Marlin Offshore Port",
                "state": "TX"
            },
            {
                "facility": "Nash Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 983,
                "ghg": 16355.6,
                "company": "Southern Star Central Gas Pipeline, Inc.",
                "project": "Nash Compressor Station",
                "state": "OK"
            },
            {
                "facility": "Enbridge Berthold Terminal",
                "status": "Operating",
                "sector": "Oil",
                "id": 857,
                "ghg": 15441.55,
                "company": "NDPC, LLC",
                "project": "Enbridge Berthold Terminal",
                "state": "ND"
            },
            {
                "facility": "Dayton Yard (Brightmark Plastics to Fuel Plant)",
                "status": "Pre-construction",
                "sector": "Petrochemicals and Plastics",
                "id": 778,
                "ghg": 15220,
                "company": "Brightmark Plastics Renewal Texas LLC",
                "project": "Brightmark Plastics to Fuel Plant",
                "state": "TX"
            },
            {
                "facility": "Terra Alta Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1094,
                "ghg": 14620.7,
                "company": "Columbia Gulf Transmission, LLC",
                "project": "Terra Alta Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Sasol Lake Charles Chemical Complex",
                "status": "Operating",
                "sector": "Petrochemicals and Plastics",
                "id": 1053,
                "ghg": 14453,
                "company": "Sasol North America, Inc.",
                "project": "Lake Charles Chemicals Project, Guerbet Alcohols Unit",
                "state": "LA"
            },
            {
                "facility": "Coyote Springs Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 834,
                "ghg": 13402,
                "company": "Gas Transmission Northwest LLC",
                "project": "Coyote Springs Compressor Station",
                "state": "OR"
            },
            {
                "facility": "Wadestown 5 Compressor Station",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1113,
                "ghg": 13354,
                "company": null,
                "project": "Wadestown 5 Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Compressor Station 261",
                "status": "Under construction",
                "sector": "Natural Gas",
                "id": 814,
                "ghg": 11685,
                "company": null,
                "project": "Compressor Station 261",
                "state": "MA"
            },
            {
                "facility": "Sholem Booster Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 1067,
                "ghg": 10870.4,
                "company": "Midship Pipeline Company, L.L.C.",
                "project": "Sholem Booster Station",
                "state": "OK"
            },
            {
                "facility": "Deepwater Port",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 836,
                "ghg": 8862,
                "company": "Texas GulfLink, LLC",
                "project": "Texas GulfLink Terminal Project - Deepwater Port",
                "state": "TX"
            },
            {
                "facility": "Lake Charles Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 930,
                "ghg": 4991.52,
                "company": "Phillips 66",
                "project": "Increased Export Capacity Project",
                "state": "LA"
            },
            {
                "facility": "Miller Compressor Station",
                "status": "Operating",
                "sector": "Natural Gas",
                "id": 965,
                "ghg": 3923,
                "company": "Appalachia Midstream Services LLC",
                "project": "Miller Compressor Station",
                "state": "WV"
            },
            {
                "facility": "Sinclair Refinery",
                "status": "Operating",
                "sector": "Oil",
                "id": 1069,
                "ghg": 3894,
                "company": "Sinclair Wyoming Refining Company",
                "project": "2017 #1 HDS and Reformer Expansion Project",
                "state": "WY"
            },
            {
                "facility": "Central Delivery Facility",
                "status": "Operating",
                "sector": "Oil",
                "id": 797,
                "ghg": 2700,
                "company": "Arrow Midstream Holdings, LLC",
                "project": "Central Delivery Facility",
                "state": "ND"
            },
            {
                "facility": "Sawtooth NGL Storage Facility",
                "status": "Pre-construction",
                "sector": "Natural Gas",
                "id": 1055,
                "ghg": 2637.23,
                "company": "Sawtooth Caverns, LLC",
                "project": "Sawtooth NGL Storage Facility",
                "state": "UT"
            },
            {
                "facility": "Jones Creek Crude Storage Terminal",
                "status": "Pre-construction",
                "sector": "Oil",
                "id": 920,
                "ghg": 888,
                "company": "Texas GulfLink, LLC",
                "project": "Texas GulfLink Terminal Project - Jones Creek Crude Storage Terminal",
                "state": "TX"
            }
        ]
    });