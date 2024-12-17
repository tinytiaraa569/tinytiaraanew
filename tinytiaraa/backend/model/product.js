const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Product Name']
    },
    skuid: {
        type: String,
        required: [true, 'Please Enter Product sku id']
    },
    description: {
        type: String,
        required: [true, 'Please Enter Product Description']
    },
    category: {
        type: String,
        required: [true, 'Please Enter Product category']
    },
    subcategory: {
        type: String,
       
    },
    tags: {
        type: String,
        required: [true, 'Please Enter Product tags']
    },
    originalPrice: {
        type: Number,

    },
    discountPrice: {
        type: Number,
        // required: [true, 'Please Enter Product Price']
    },
    stock: {
        type: Number,
        // required: [true, 'Please Enter Product Stocks']
    },
    images: [
        // {
        //     type: String,
        // },
        {
            public_id: {
                type: String,
                // required: true,
            },
            url: {
                type: String,
                // required: true,
            },
        },
    ],
    withchainimages: [
        {
            public_id: {
                type: String

            },
            url: {
                type: String

            },
        },
    ],


    withchainoutimages: [
        // {
        //     type: String,
        // },
        {
            public_id: {
                type: String

            },
            url: {
                type: String

            },
        },
    ],


    MetalColor: {
        YellowGoldclr: [
            {
                public_id: {
                    type: String

                },
                url: {
                    type: String

                },
            },
        ],
        RoseGoldclr: [
            {
                public_id: {
                    type: String

                },
                url: {
                    type: String

                },
            },
        ],
        WhiteGoldclr: [
            {
                public_id: {
                    type: String

                },
                url: {
                    type: String

                },
            },
        ],

    },




    // enamel color 



    enamelColors: {
        Deep_Blue: {
            deepblueYellowGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            deepblueRoseGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            deepblueWhiteGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
        },
        Pink: {
            pinkYellowGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            pinkRoseGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            pinkWhiteGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
        },
        Turquoise: {
            turquoiseYellowGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            turquoiseRoseGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            turquoiseWhiteGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
        },
        Red: {
            redYellowGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            redRoseGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            redWhiteGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
        },
        Black: {
            blackYellowGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            blackRoseGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            blackWhiteGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
        },
        Deep_Green: {
            deepgreenYellowGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            deepgreenRoseGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            deepgreenWhiteGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
        },
        Lotus_Green: {
            lotusgreenYellowGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            lotusgreenRoseGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            lotusgreenWhiteGoldclr: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    },
                },
            ],
        }
        
    },


    Enamelcolorstock: {
        deepblue: {
            deepblueYellowGoldclrStock: {
                type: Number,
            },
            deepblueRoseGoldclrStock: {
                type: Number,
            },
            deepblueWhiteGoldclrStock: {
                type: Number,
            }
        },
        pink: {
            pinkYellowGoldclrStock: {
                type: Number,
            },
            pinkRoseGoldclrStock: {
                type: Number,
            },
            pinkWhiteGoldclrStock: {
                type: Number,
            },
        },
        turquoise: {
            turquoiseYellowGoldclrStock: {
                type: Number,
            },
            turquoiseRoseGoldclrStock: {
                type: Number,
            },
            turquoiseWhiteGoldclrStock: {
                type: Number,
            }
        },

        red: {
            redYellowGoldclrStock: {
                type: Number,
            },
            redRoseGoldclrStock: {
                type: Number,
            },
            redWhiteGoldclrStock: {
                type: Number,
            }
        },

        black: {
            blackYellowGoldclrStock: {
                type: Number,
            },
            blackRoseGoldclrStock: {
                type: Number,
            },
            blackWhiteGoldclrStock: {
                type: Number,
            }
        },
        deepgreen: {
            deepgreenYellowGoldclrStock: {
                type: Number,
            },
            deepgreenRoseGoldclrStock: {
                type: Number,
            },
            deepgreenWhiteGoldclrStock: {
                type: Number,
            }
        },
        lotusgreen: {
            lotusgreenYellowGoldclrStock: {
                type: Number,
            },
            lotusgreenRoseGoldclrStock: {
                type: Number,
            },
            lotusgreenWhiteGoldclrStock: {
                type: Number,
            }
        }

    },

    metalPrice: { // New field for metal price
        type: Number,
    },
    diamondPrice: { // New field for diamond price
        type: Number,
    },
    labourPrice: { // New field for labour price
        type: Number,
    },
    gstPrice: { // New field for GST
        type: Number,
    },


    shopId: {
        type: String,
        required: true
    },

    designno: {
        type: String,
        required: true
    },
    reviews: [
        {
            user: {
                type: Object
            },
            rating: {
                type: Number
            },
            comment: {
                type: String
            },
            productId: {
                type: String
            },
            CreatedAt: {
                type: Date,
                default: Date.now()
            }

        },
    ],
    reviewImages: [
        {
            type: String,
        },
    ],

    Metalcolorstock: {
        YellowGoldclrStock: {
            type: Number,
        },
        RoseGoldclrStock: {
            type: Number,
        },
        WhiteGoldclrStock: {
            type: Number,
        }
    },

    goldWeight: {
        weight: {
            type: String,
        },
        purity: {
            type: String,
        },
    },
    diamondWeight: {
        weight: {
            type: String,
        },
        quality: {
            type: String,
        },
    },
    dimension: {
        height: {
            type: String,
        },
        width: {
            type: String,
        },
    },
    ratings: {
        type: Number
    },

    gender: {
        girl: Boolean,
        boy: Boolean,
        unisex: Boolean
    },

    ageGroup: {
        infants: { type: Boolean },
        kids: { type: Boolean },
        teens: { type: Boolean },
        mom: { type: Boolean },
    },

    sold_out: {
        type: Number,
        default: 0,
    },


    // new combination 

        combinations: {
          type: [String],  // Array of combination names, e.g., redgreen, blackgreen
          
        },

        combinationmetalImages: {
          type: Map,
          of: {
            type: Map,
            of: [
              {
                public_id: { type: String },
                url: { type: String },
              },
            ],  // List of image URLs for each metal type (yellowGold, roseGold, whiteGold)
          },
      },
      combinationStocks: {
        type: Map,
        of: {
          yellowGold: { type: Number, default: 0 },
          roseGold: { type: Number, default: 0 },
          whiteGold: { type: Number, default: 0 },
        },
      },
    CreatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", productSchema)