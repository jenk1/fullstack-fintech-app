import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

export const useDeleteAccount = (id?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            if (!id) {
                throw new Error("Account ID is required");
            }

            const response = await client.api.accounts[":id"].$delete({
                param: { id }
            });

            if (!response.ok) {
                throw new Error("Failed to delete account");
            }

            return response.json();
        },
        onSuccess: () => {
            // Use refetchQueries instead of invalidateQueries for more predictable behavior
            queryClient.refetchQueries({ queryKey: ["accounts"] });
            queryClient.invalidateQueries({ queryKey: ["accounts", id] });
        },

    });
};