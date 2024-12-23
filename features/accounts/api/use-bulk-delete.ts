import {toast} from "sonner";
import {InferRequestType, InferResponseType} from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {client} from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteAccounts = () => {
    const queryClient = useQueryClient();

    return useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({json});
            return await response.json();
        },
        onError: (error) => {
            toast.error("Failed to Delete Accounts");
        },
        onSuccess: async () => {
            toast.success("Account deleted");
            await queryClient.invalidateQueries({queryKey: ["accounts"]});
        }
    });
}