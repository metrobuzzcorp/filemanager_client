export const routeCreator = (
  path: string,
  method: "get" | "put" | "post" | "delete" | "patch" = "get"
) => ({
  path,
  method,
});

export const endpointBuilder = (endpointStrings: string[]) => {
  return endpointStrings.join("");
};
