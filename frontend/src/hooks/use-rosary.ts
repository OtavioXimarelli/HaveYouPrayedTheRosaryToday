"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  submitCheckIn,
  checkTodayStatus,
  getFeed,
  getUserStats,
  addAmen,
  addComment,
} from "@/services/api";
import {
  CreateCheckInRequest,
  AddAmenRequest,
  AddCommentRequest,
} from "@/types";

// ===========================
// Query Keys
// ===========================

export const queryKeys = {
  todayStatus: ["today-status"] as const,
  userStats: ["user-stats"] as const,
  feed: ["feed"] as const,
};

// ===========================
// Check-in Hooks
// ===========================

export function useTodayStatus() {
  return useQuery({
    queryKey: queryKeys.todayStatus,
    queryFn: checkTodayStatus,
  });
}

export function useSubmitCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateCheckInRequest) => submitCheckIn(request),
    onSuccess: () => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.todayStatus });
      queryClient.invalidateQueries({ queryKey: queryKeys.userStats });
      queryClient.invalidateQueries({ queryKey: queryKeys.feed });
    },
  });
}

// ===========================
// Stats Hooks
// ===========================

export function useUserStats() {
  return useQuery({
    queryKey: queryKeys.userStats,
    queryFn: getUserStats,
  });
}

// ===========================
// Feed Hooks
// ===========================

export function useFeed() {
  return useQuery({
    queryKey: queryKeys.feed,
    queryFn: () => getFeed(),
  });
}

export function useAddAmen() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AddAmenRequest) => addAmen(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feed });
    },
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AddCommentRequest) => addComment(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feed });
    },
  });
}
