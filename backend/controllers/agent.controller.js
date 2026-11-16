import expressAsyncHandler from "express-async-handler";
import AgentModel from "../models/agents.model.js";

/**
 * @createAgent
 * @description create an agent
 * @route POST /api/v1/agents
 * @body { name: string, knowledgeBase: string, instructions: string, tools: string[] }
 * @access private
 * 
 */
export const createAgent = expressAsyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).json({ message: "Unauthorized, user not found" });

        const { name, knowledgeBase, instructions, tools } = req.body;
        if (!name || !knowledgeBase || !instructions || !tools) return res.status(400).json({ message: "All fields are required" });

        // check for tools if it is an array
        if (!Array.isArray(tools)) return res.status(400).json({ message: "Tools must be an array" });

        const agent = await AgentModel.create({
            userId: user._id,
            name,
            knowledgeBase,
            instructions,
            tools
        });
        res.status(201).json({ agent, message: "Agent created successfully" });
    } catch (error) {
        console.log(`Error in creating Agent: ${error}`);
        next(error);
    }
});

/**
 * @getAllAgents
 * @description get all agents
 * @route GET /api/v1/agents
 * @access private
 */
export const getAllAgents = expressAsyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).json({ message: "Unauthorized, user not found" });

        const agents = await AgentModel.find({ userId: user._id });
        res.status(200).json(agents);
    } catch (error) {
        console.log(`Error in fetching the agents: ${error}`);
        next(error);
    }
})

/**
 * @getAgentById
 * @description get agent by id
 * @route GET /api/v1/agents/:id
 * @params { id: string }
 * @access private
 */
export const getAgentById = expressAsyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        if (!user) return res.status(401).json({ message: "Unauthorized, user not found" });
        const agent = await AgentModel.findById(id);
        if (!agent) return res.status(404).json({ message: "Agent not found" });

        if (agent.userId.toString() !== user._id.toString()) return res.status(401).json({ message: "Unauthorized, agent not found" });
        res.status(200).json(agent);
    } catch (error) {
        console.log(`Error in fetching the agent: ${error}`);
        next(error);
    }
})

/**
 * @deleteAgent
 * @description delete agent by id
 * @route DELETE /api/v1/agents/:id
 * @params { id: string }
 * @access private
 */
export const deleteAgent = expressAsyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        if (!user) return res.status(401).json({ message: "Unauthorized, user not found" });
        const agent = await AgentModel.findById(id);
        if (!agent) return res.status(404).json({ message: "Agent not found" });

        if (agent.userId.toString() !== user._id.toString()) return res.status(401).json({ message: "Unauthorized, agent not found" });
        await AgentModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Agent deleted successfully" });
    } catch (error) {
        console.log(`Error in deleting the agent: ${error}`);
        next(error);
    }
})