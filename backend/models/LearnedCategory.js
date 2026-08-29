import mongoose from "mongoose"

//schema
const learnedCategorySchema = mongoose.Schema({
    keyword: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    }
})


//model
const learnedCategoryModel = mongoose.model("LearnedCategory", learnedCategorySchema)

//export model
export default learnedCategoryModel