import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";

export const useAgentDispatch = useDispatch.withTypes<AppDispatch>();
export const useAgentSelector = useSelector.withTypes<RootState>();