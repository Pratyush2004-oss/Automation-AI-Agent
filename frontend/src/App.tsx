import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./app.router";
import { useAuthDispatch } from "./features/auth/store/hooks";
import { setUser } from "./features/auth/store/user.slice";
import { useCheckMeQuery } from "./features/auth/tanstack";
const App = () => {
  const { data: user, isLoading } = useCheckMeQuery();
  const authDispatch = useAuthDispatch();
  useEffect(() => {
    if (user) authDispatch(setUser(user));
  }, [user, authDispatch]);
  if (isLoading) return <div>Loading...</div>

  return (
    <RouterProvider router={Router} />
  )
}

export default App