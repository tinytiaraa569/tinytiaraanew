// craete product

import axios from "axios"
import { server } from "../../server"



export const createProduct = (
    name,
    skuid,
    description,
    category,
    subcategory,
    tags,
    originalPrice,
    discountPrice,
    stock,
    designno,
    shopId,
    images,
    withchainimages,
    withchainoutimages,
    YellowGoldclr,
    RoseGoldclr,
    WhiteGoldclr,
    YellowGoldclrStock,
    RoseGoldclrStock,
    WhiteGoldclrStock,
    goldWeight,
    diamondWeight,
    dimension,
    // height,
    // width,
    enamelColors,

    //wnamel stocks

    deepblueYellowGoldclrStock,
    deepblueRoseGoldclrStock,
    deepblueWhiteGoldclrStock,

    pinkYellowGoldclrStock,
    pinkRoseGoldclrStock,
    pinkWhiteGoldclrStock,


    turquoiseYellowGoldclrStock,
    turquoiseRoseGoldclrStock,
    turquoiseWhiteGoldclrStock,

    redYellowGoldclrStock,
    redRoseGoldclrStock,
    redWhiteGoldclrStock,

    blackYellowGoldclrStock,
    blackRoseGoldclrStock,
    blackWhiteGoldclrStock,

    deepgreenYellowGoldclrStock,
    deepgreenRoseGoldclrStock,
    deepgreenWhiteGoldclrStock,

    lotusgreenYellowGoldclrStock,
    lotusgreenRoseGoldclrStock,
    lotusgreenWhiteGoldclrStock,
    // enamelColorImages

    gender,
    ageGroup,
    combinations,
    combinationmetalImages,
    combinationStocks

) => async (dispatch) => {
    try {
        dispatch({
            type: "productCreateRequest"
        })

        const config = { headers: { "Content-Type": "multipart/form-data" } }


        const { data } = await axios.post(
            `${server}/product/create-product`,
            name,
            skuid,
            description,
            category,
            subcategory,
            tags,
            originalPrice,
            discountPrice,
            stock,
            designno,
            shopId,
            images,
            withchainimages,
            withchainoutimages,
            YellowGoldclr,
            RoseGoldclr,
            WhiteGoldclr,
            goldWeight,
            diamondWeight,
            dimension,
            // height,
            // width,
            enamelColors,
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock,
            // enamelColorImages,

            deepblueYellowGoldclrStock,
            deepblueRoseGoldclrStock,
            deepblueWhiteGoldclrStock,

            //pinkenamel
            pinkYellowGoldclrStock,
            pinkRoseGoldclrStock,
            pinkWhiteGoldclrStock,


            turquoiseYellowGoldclrStock,
            turquoiseRoseGoldclrStock,
            turquoiseWhiteGoldclrStock,

            redYellowGoldclrStock,
            redRoseGoldclrStock,
            redWhiteGoldclrStock,

            blackYellowGoldclrStock,
            blackRoseGoldclrStock,
            blackWhiteGoldclrStock,

            deepgreenYellowGoldclrStock,
            deepgreenRoseGoldclrStock,
            deepgreenWhiteGoldclrStock,

            lotusgreenYellowGoldclrStock,
            lotusgreenRoseGoldclrStock,
            lotusgreenWhiteGoldclrStock,
            gender,
            ageGroup,
            combinations,
            combinationmetalImages,
            combinationStocks,
            config
        )


        dispatch({
            type: "productCreateSuccess",
            payload: data.product
        })

    } catch (error) {

        dispatch({
            type: "productCreateFail",
            payload: error.response.data.message
        })

    }
}


// get All Products of a shop

export const getAllProductShop = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsShopRequest"
        })



        const { data } = await axios.get(
            `${server}/product/get-all-products-shop/${id}`,
        )

        dispatch({
            type: "getAllProductsShopSuccess",
            payload: data.products
        })

    } catch (error) {

        dispatch({
            type: "getAllProductsShopFailed",
            payload: error.response.data.message
        })

    }
}


//delete  products 

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProductRequest"
        })



        const { data } = await axios.delete(
            `${server}/product/delete-shop-product/${id}`, { withCredentials: true }
        )

        dispatch({
            type: "deleteProductSuccess",
            payload: data.products
        })

    } catch (error) {

        dispatch({
            type: "deleteProductFailed",
            payload: error.response.data.message
        })

    }
}

// get all products
// actions/productActions.js
export const getAllProducts = (limit = 20, offset = 0) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsRequest",
        });

        const { data } = await axios.get(`${server}/product/get-all-products`, {
            params: { limit, offset } // Add parameters for pagination
        });
        
        dispatch({
            type: "getAllProductsSuccess",
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: "getAllProductsFailed",
            payload: error.response.data.message,
        });
    }
};




// export const updateProduct = (
//     { id, // Product ID to update
//         name,
//         skuid,
//         description,
//         category,
//         subcategory,
//         tags,
//         originalPrice,
//         discountPrice,
//         stock,
//         designno,
//         shopId,
//         images,
//         withchainimages,
//         withchainoutimages,
//         YellowGoldclr,
//         RoseGoldclr,
//         WhiteGoldclr,
//         YellowGoldclrStock,
//         RoseGoldclrStock,
//         WhiteGoldclrStock,
//         goldWeight,
//         diamondWeight,
//         dimension,
//         enamelColors,
//         deepblueYellowGoldclrStock,
//         deepblueRoseGoldclrStock,
//         deepblueWhiteGoldclrStock,
//         pinkYellowGoldclrStock,
//         pinkRoseGoldclrStock,
//         pinkWhiteGoldclrStock,
//         turquoiseYellowGoldclrStock,
//         turquoiseRoseGoldclrStock,
//         turquoiseWhiteGoldclrStock,
//         redYellowGoldclrStock,
//         redRoseGoldclrStock,
//         redWhiteGoldclrStock,
//         blackYellowGoldclrStock,
//         blackRoseGoldclrStock,
//         blackWhiteGoldclrStock,
//         deepgreenYellowGoldclrStock,
//         deepgreenRoseGoldclrStock,
//         deepgreenWhiteGoldclrStock,
//         lotusgreenYellowGoldclrStock,
//         lotusgreenRoseGoldclrStock,
//         lotusgreenWhiteGoldclrStock,
//         gender,
//         ageGroup }
// ) => async (dispatch) => {
//     try {
//         dispatch({ type: "productUpdateRequest" });


//         console.log({
//             id, // Product ID to update
//             name,
//             skuid,
//             description,
//             category,
//             subcategory,
//             tags,
//             originalPrice,
//             discountPrice,
//             stock,
//             designno,
//             shopId,
//             images,
//             withchainimages,
//             withchainoutimages,
//             YellowGoldclr,
//             RoseGoldclr,
//             WhiteGoldclr,
//             YellowGoldclrStock,
//             RoseGoldclrStock,
//             WhiteGoldclrStock,
//             goldWeight,
//             diamondWeight,
//             dimension,
//             enamelColors,
//             deepblueYellowGoldclrStock,
//             deepblueRoseGoldclrStock,
//             deepblueWhiteGoldclrStock,
//             pinkYellowGoldclrStock,
//             pinkRoseGoldclrStock,
//             pinkWhiteGoldclrStock,
//             turquoiseYellowGoldclrStock,
//             turquoiseRoseGoldclrStock,
//             turquoiseWhiteGoldclrStock,
//             redYellowGoldclrStock,
//             redRoseGoldclrStock,
//             redWhiteGoldclrStock,
//             blackYellowGoldclrStock,
//             blackRoseGoldclrStock,
//             blackWhiteGoldclrStock,
//             deepgreenYellowGoldclrStock,
//             deepgreenRoseGoldclrStock,
//             deepgreenWhiteGoldclrStock,
//             lotusgreenYellowGoldclrStock,
//             lotusgreenRoseGoldclrStock,
//             lotusgreenWhiteGoldclrStock,
//             gender,
//             ageGroup
//         }, "from action in redux")


//         // Send the request
//         const { data } = await axios.put(
//             `${server}/product/update-product/${id}`, // Endpoint to update the product
//             {
//                 id, // Product ID to update
//                 name,
//                 skuid,
//                 description,
//                 category,
//                 subcategory,
//                 tags,
//                 originalPrice,
//                 discountPrice,
//                 stock,
//                 designno,
//                 shopId,
//                 images,
//                 withchainimages,
//                 withchainoutimages,
//                 YellowGoldclr,
//                 RoseGoldclr,
//                 WhiteGoldclr,
//                 YellowGoldclrStock,
//                 RoseGoldclrStock,
//                 WhiteGoldclrStock,
//                 goldWeight,
//                 diamondWeight,
//                 dimension,
//                 enamelColors,
//                 deepblueYellowGoldclrStock,
//                 deepblueRoseGoldclrStock,
//                 deepblueWhiteGoldclrStock,
//                 pinkYellowGoldclrStock,
//                 pinkRoseGoldclrStock,
//                 pinkWhiteGoldclrStock,
//                 turquoiseYellowGoldclrStock,
//                 turquoiseRoseGoldclrStock,
//                 turquoiseWhiteGoldclrStock,
//                 redYellowGoldclrStock,
//                 redRoseGoldclrStock,
//                 redWhiteGoldclrStock,
//                 blackYellowGoldclrStock,
//                 blackRoseGoldclrStock,
//                 blackWhiteGoldclrStock,
//                 deepgreenYellowGoldclrStock,
//                 deepgreenRoseGoldclrStock,
//                 deepgreenWhiteGoldclrStock,
//                 lotusgreenYellowGoldclrStock,
//                 lotusgreenRoseGoldclrStock,
//                 lotusgreenWhiteGoldclrStock,
//                 gender,
//                 ageGroup
//             },
//             { headers: { "Content-Type": "multipart/form-data" } }
//         );

//         console.log(data,"Check data")

//         dispatch({
//             type: "productUpdateSuccess",
//             payload: data.product
//         });
//     } catch (error) {
//         dispatch({
//             type: "productUpdateFail",
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message
//         });
//     }
// };


export const updateProduct = (
    { id, // Product ID to update
        name,
        skuid,
        description,
        category,
        subcategory,
        tags,
        originalPrice,
        discountPrice,
        stock,
        designno,
        shopId,
        images,
        withchainimages,
        withchainoutimages,
        YellowGoldclr,
        RoseGoldclr,
        WhiteGoldclr,
        YellowGoldclrStock,
        RoseGoldclrStock,
        WhiteGoldclrStock,
        goldWeight,
        diamondWeight,
        dimension,
        enamelColors,
        deepblueYellowGoldclrStock,
        deepblueRoseGoldclrStock,
        deepblueWhiteGoldclrStock,
        pinkYellowGoldclrStock,
        pinkRoseGoldclrStock,
        pinkWhiteGoldclrStock,
        turquoiseYellowGoldclrStock,
        turquoiseRoseGoldclrStock,
        turquoiseWhiteGoldclrStock,
        redYellowGoldclrStock,
        redRoseGoldclrStock,
        redWhiteGoldclrStock,
        blackYellowGoldclrStock,
        blackRoseGoldclrStock,
        blackWhiteGoldclrStock,
        deepgreenYellowGoldclrStock,
        deepgreenRoseGoldclrStock,
        deepgreenWhiteGoldclrStock,
        lotusgreenYellowGoldclrStock,
        lotusgreenRoseGoldclrStock,
        lotusgreenWhiteGoldclrStock,
        gender,
        ageGroup,

        deepblueYellowGoldclr,
            deepblueRoseGoldclr,
            deepblueWhiteGoldclr,

            pinkYellowGoldclr,
            pinkRoseGoldclr,
            pinkWhiteGoldclr,

            turquoiseYellowGoldclr,
            turquoiseRoseGoldclr,
            turquoiseWhiteGoldclr,

            redYellowGoldclr,
            redRoseGoldclr,
            redWhiteGoldclr,

            blackYellowGoldclr,
            blackRoseGoldclr,
            blackWhiteGoldclr,

            deepgreenYellowGoldclr,
            deepgreenRoseGoldclr,
            deepgreenWhiteGoldclr,

            lotusgreenYellowGoldclr,
            lotusgreenRoseGoldclr,
            lotusgreenWhiteGoldclr,


    
    
    
    }
) => async (dispatch) => {
    try {
        dispatch({ type: "productUpdateRequest" });


        console.log({
            id, // Product ID to update
            name,
            skuid,
            description,
            category,
            subcategory,
            tags,
            originalPrice,
            discountPrice,
            stock,
            designno,
            shopId,
            images,
            withchainimages,
            withchainoutimages,
            YellowGoldclr,
            RoseGoldclr,
            WhiteGoldclr,
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock,
            goldWeight,
            diamondWeight,
            dimension,
            enamelColors,
            deepblueYellowGoldclrStock,
            deepblueRoseGoldclrStock,
            deepblueWhiteGoldclrStock,
            pinkYellowGoldclrStock,
            pinkRoseGoldclrStock,
            pinkWhiteGoldclrStock,
            turquoiseYellowGoldclrStock,
            turquoiseRoseGoldclrStock,
            turquoiseWhiteGoldclrStock,
            redYellowGoldclrStock,
            redRoseGoldclrStock,
            redWhiteGoldclrStock,
            blackYellowGoldclrStock,
            blackRoseGoldclrStock,
            blackWhiteGoldclrStock,
            deepgreenYellowGoldclrStock,
            deepgreenRoseGoldclrStock,
            deepgreenWhiteGoldclrStock,
            lotusgreenYellowGoldclrStock,
            lotusgreenRoseGoldclrStock,
            lotusgreenWhiteGoldclrStock,
            gender,
            ageGroup,


            deepblueYellowGoldclr,
            deepblueRoseGoldclr,
            deepblueWhiteGoldclr,

            pinkYellowGoldclr,
            pinkRoseGoldclr,
            pinkWhiteGoldclr,

            turquoiseYellowGoldclr,
            turquoiseRoseGoldclr,
            turquoiseWhiteGoldclr,

            redYellowGoldclr,
            redRoseGoldclr,
            redWhiteGoldclr,

            blackYellowGoldclr,
            blackRoseGoldclr,
            blackWhiteGoldclr,

            deepgreenYellowGoldclr,
            deepgreenRoseGoldclr,
            deepgreenWhiteGoldclr,

            lotusgreenYellowGoldclr,
            lotusgreenRoseGoldclr,
            lotusgreenWhiteGoldclr,


        }, "from action in redux")

        let updatedproductdata = {
            id, // Product ID to update
            name,
            skuid,
            description,
            category,
            subcategory,
            tags,
            originalPrice,
            discountPrice,
            stock,
            designno,
            shopId,
            images,
            withchainimages,
            withchainoutimages,
            YellowGoldclr,
            RoseGoldclr,
            WhiteGoldclr,
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock,
            goldWeight,
            diamondWeight,
            dimension,
            enamelColors,
            deepblueYellowGoldclrStock,
            deepblueRoseGoldclrStock,
            deepblueWhiteGoldclrStock,
            pinkYellowGoldclrStock,
            pinkRoseGoldclrStock,
            pinkWhiteGoldclrStock,
            turquoiseYellowGoldclrStock,
            turquoiseRoseGoldclrStock,
            turquoiseWhiteGoldclrStock,
            redYellowGoldclrStock,
            redRoseGoldclrStock,
            redWhiteGoldclrStock,
            blackYellowGoldclrStock,
            blackRoseGoldclrStock,
            blackWhiteGoldclrStock,
            deepgreenYellowGoldclrStock,
            deepgreenRoseGoldclrStock,
            deepgreenWhiteGoldclrStock,
            lotusgreenYellowGoldclrStock,
            lotusgreenRoseGoldclrStock,
            lotusgreenWhiteGoldclrStock,
            gender,
            ageGroup,
            
            deepblueYellowGoldclr,
            deepblueRoseGoldclr,
            deepblueWhiteGoldclr,

            pinkYellowGoldclr,
            pinkRoseGoldclr,
            pinkWhiteGoldclr,

            turquoiseYellowGoldclr,
            turquoiseRoseGoldclr,
            turquoiseWhiteGoldclr,

            redYellowGoldclr,
            redRoseGoldclr,
            redWhiteGoldclr,

            blackYellowGoldclr,
            blackRoseGoldclr,
            blackWhiteGoldclr,

            deepgreenYellowGoldclr,
            deepgreenRoseGoldclr,
            deepgreenWhiteGoldclr,

            lotusgreenYellowGoldclr,
            lotusgreenRoseGoldclr,
            lotusgreenWhiteGoldclr,


        }

        console.log(updatedproductdata,"updatedproductdata")

        // Send the request
        const { data } = await axios.put(
            `${server}/product/update-product/${id}`, // Endpoint to update the product
            updatedproductdata,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log(data, "Check data")

        dispatch({
            type: "productUpdateSuccess",
            payload: data.product
        });
    } catch (error) {
        dispatch({
            type: "productUpdateFail",
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
