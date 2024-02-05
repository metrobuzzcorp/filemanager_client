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

export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};
