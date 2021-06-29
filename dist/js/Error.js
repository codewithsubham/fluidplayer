let message =
    "Recorded video is under review , testing & maintenance. Our team is working to resolve the technical concern very soon . Sorry for the inconvenience. <br> Best wishes & thanks <br>Team Vision IAS  ";

const errorCode = {
    Dash: {
        manifestError: {
            parse:
                "Sorry there was an error while loading Video , Please Refresh Your page (0EDMP)",
            nostreams:
                "Sorry there was an error while loading Video , Please Refresh Your page (0EDMN)",
            codec:
                "Sorry the was an error with Video file Please Refresh Your page (0EDMC)",
        },
        download: {
            manifest:
                "Sorry there was an error while loading Video , Please Refresh Your page (1EDDM) -> (0EDMP)",
            initialization: "Sorry video file could not be load (1EDDI)",
            content:
                "Sorry for inconvenience , please refres  your page (1EDDC)",
        },
        mediasource: "Sorry , Please try again (2EDM)",
    },
    Hls: {
        networkError: {
            mediaError: message + "(3EHNME)",
            manifestLoadError: message + "(3EHNM)",
            fragLoadTimeOut: message + "(3EHNF)",
            manifestLoadTimeOut: message + "(3EHNM1)",
            manifestParsingError: message + "(3EHNM2)",
            levelLoadError: message + "(3EHNL)",
        },
        mediaError: {
            bufferStalledError: message + "(4EHMB)",
        },
    },
    Db:
        "Something went wrong withyour bookmark ,Please refresh or try after sometime  (5EHD)",
    undefined: message + "(000000)",
};
