import {FC} from "react";
import {RouteObject} from "react-router";

export type PageType = FC & Pick<RouteObject, "loader">;