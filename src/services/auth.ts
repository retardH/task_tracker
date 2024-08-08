import { fetcher } from "@/lib/fetcher";
import { IResponse, type ILoginpayload } from "@/models";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (
      payload: ILoginpayload,
    ): Promise<
      IResponse<{ accessToken: string; id: string; name: string; staffId: string }>
    > => {
      return await fetcher("post", "/Login", payload);
    },
  });
};
