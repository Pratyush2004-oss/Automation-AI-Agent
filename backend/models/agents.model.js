import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    knowledgeBase: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    tools: [
        {
            type: String,
            required: true
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const AgentModel = mongoose.model("agent", AgentSchema);

export default AgentModel;