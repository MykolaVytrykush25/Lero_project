"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

//types
import { Status } from "@/@types/base";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const { userData, status } = useSelector(userSelector);

  useEffect(() => {
    if (status === Status.SUCCESS && !userData?.id) {
      router.push("/login");
    }
  }, [userData, status, router]);

  if (status !== Status.SUCCESS) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
