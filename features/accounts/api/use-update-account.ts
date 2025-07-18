import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { z } from "zod";

const updateAccountSchema = z.object({
    name: z.string()
});

type UpdateAccountData = z.input<typeof updateAccountSchema>;

export const useUpdateAccount = (id?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateAccountData) => {
            if (!id) {
                throw new Error("Account ID is required");
            }

            const response = await client.api.accounts[":id"].$patch({
                param: { id },
                json: data
            });

            if (!response.ok) {
                throw new Error("Failed to update account");
            }

            return response.json();
        },
        // Remove onSuccess from hook - handle in component for better control

    });
}; 